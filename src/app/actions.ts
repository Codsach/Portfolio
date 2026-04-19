'use server';

import { z } from 'zod';
import { validateContactFormContent } from '@/ai/flows/validate-contact-form-content';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type FormState = {
  message: 'success' | 'error' | '';
  errors?: {
    isAppropriate?: string;
    reason?: string;
  };
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'error',
      errors: {
        reason: 'Invalid form data provided.',
      },
    };
  }

  try {
    const { name, email, message } = validatedFields.data;
    
    // Use Genkit AI flow to validate content
    const validationResult = await validateContactFormContent({
      name,
      email,
      message,
    });

    if (!validationResult.isAppropriate) {
      return {
        message: 'error',
        errors: {
          isAppropriate: 'false',
          reason: validationResult.reason || 'Inappropriate content detected.',
        },
      };
    }

    // Here you would typically save the data to a database like Firestore
    // For this example, we'll simulate a successful save.
    console.log(`Sending email to rsachinsachi@gmail.com...`, {
      from: email,
      name,
      message,
    });
    
    // Simulate some async work
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: 'success' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      message: 'error',
      errors: {
        reason: 'An unexpected error occurred. Please try again later.',
      },
    };
  }
}
