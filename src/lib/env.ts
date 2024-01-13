import { z } from 'zod';

export const envSchema = z.object({
  //   NODE_ENV: z.string().default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
