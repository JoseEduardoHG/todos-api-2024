import { z } from 'zod';

const envSchema = z.object({
  //   NODE_ENV: z.string().default('development'),
  PORT: z.string().default('5000'),
  MONGO_INITDB_ROOT_USERNAME: z.string().min(1),
  MONGO_INITDB_ROOT_PASSWORD: z.string().min(1),
  MONGO_INITDB_DATABASE: z.string().min(1),
  MONGODB_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
