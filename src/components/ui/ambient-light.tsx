'use client';

/**
 * AmbientLight — a reusable atmospheric background lighting layer.
 * Renders large blurred radial gradients (muted indigo + teal) behind
 * all page content to give a cinematic, depth-forward feel.
 *
 * Usage: place this as the FIRST child inside any full-page wrapper
 * or directly in layout.tsx, set to fixed positioning.
 */
export function AmbientLight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top-left: deep indigo bloom */}
      <div
        className="absolute -top-[20%] -left-[15%] h-[70vh] w-[60vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '0s',
        }}
      />

      {/* Top-right: cyber cyan aurora bloom */}
      <div
        className="absolute -top-[10%] right-[5%] h-[55vh] w-[45vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '3s',
        }}
      />

      {/* Center: cyber cyan whisper */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 h-[40vh] w-[50vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 245, 255, 0.035) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animationDelay: '6s',
        }}
      />

      {/* Bottom-right: deep indigo bloom */}
      <div
        className="absolute bottom-[5%] -right-[10%] h-[50vh] w-[50vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '4s',
        }}
      />

      {/* Bottom-left: teal bloom */}
      <div
        className="absolute bottom-[10%] -left-[5%] h-[45vh] w-[40vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.05) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}
