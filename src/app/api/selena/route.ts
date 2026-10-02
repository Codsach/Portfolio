import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from '@/lib/selena-prompt';

// ── Rate limiter (in-memory, per IP) ──────────────────────────────────────────
const RATE_LIMIT = 10; // max requests
const RATE_WINDOW_MS = 60_000; // per 60 seconds

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Clean up expired entries periodically
  if (rateBuckets.size > 500) {
    for (const [key, bucket] of rateBuckets) {
      if (now > bucket.resetAt) rateBuckets.delete(key);
    }
  }

  const bucket = rateBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT) {
    return false;
  }

  bucket.count++;
  return true;
}

// ── Gemini client ─────────────────────────────────────────────────────────────
function getClient() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not configured');
  }
  return new GoogleGenAI({ apiKey });
}

// ── API route ─────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  // Rate limit check
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment before sending another message.' },
      { status: 429 }
    );
  }

  // Parse request body
  let messages: { role: string; content: string }[];
  try {
    const body = await request.json();
    messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      );
    }
  } catch {
    return Response.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Build Gemini request
  try {
    const client = getClient();
    const systemPrompt = buildSystemPrompt();

    // Convert all messages to Gemini format — full conversation goes in `contents`
    const geminiContents = messages.map((msg) => ({
      role: msg.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: msg.content }],
    }));

    // Stream the response with model fallbacks
    const candidateModels = ['gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-2.5-flash-lite'];
    let response = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        response = await client.models.generateContentStream({
          model: modelName,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
          contents: geminiContents,
        });
        break;
      } catch (err) {
        console.warn(`Gemini model ${modelName} failed, trying next fallback:`, err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error('All Gemini models failed to respond');
    }


    // Create a ReadableStream from the Gemini stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error('Gemini streaming error:', err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (err) {
    console.error('Selena API error:', err);

    const message =
      err instanceof Error && err.message.includes('GOOGLE_API_KEY')
        ? 'Selena is currently unavailable.'
        : 'Something went wrong. Please try again in a moment.';

    return Response.json({ error: message }, { status: 500 });
  }
}
