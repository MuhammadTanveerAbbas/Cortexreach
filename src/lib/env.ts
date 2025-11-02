import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_GENAI_API_KEY: z.string().min(1, 'Google AI API key is required'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export function validateEnv() {
  try {
    return envSchema.parse({
      GOOGLE_GENAI_API_KEY: process.env.GOOGLE_GENAI_API_KEY,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      console.error('Environment validation failed:', errors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

let _env: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (!_env) {
    _env = validateEnv();
  }
  return _env;
}

export const env = typeof window === 'undefined' ? getEnv() : {} as z.infer<typeof envSchema>;
