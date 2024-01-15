import { env } from '@lib/env';
import { connect, connection } from 'mongoose';

export async function connectDB() {
  const db = await connect(env.MONGODB_URL, {
    dbName: env.MONGO_INITDB_DATABASE,
    auth: {
      username: env.MONGO_INITDB_ROOT_USERNAME,
      password: env.MONGO_INITDB_ROOT_PASSWORD,
    },
  });
  console.log(`MongoDB Connected to ${db.connection.db.databaseName}`);
}

connection.on('open', () => {
  console.log('MongoDB Connected');
});

connection.on('error', () => {
  console.log('MongoDB Connection Failed');
  process.exit(1);
});
