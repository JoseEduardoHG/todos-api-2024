import { env } from '@lib/env';
import { connect, connection } from 'mongoose';

export async function connectDB() {
  const db = await connect(env.MONGODB_URL);
  console.log(`MongoDB Connected to ${db.connection.db.databaseName}`);
}

connection.on('open', () => {
  console.log('MongoDB Connected');
});

connection.on('error', () => {
  console.log('MongoDB Connection Failed');
  process.exit(1);
});
