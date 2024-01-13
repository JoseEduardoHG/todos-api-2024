import modelOptions from '@config/modelOptions';
import { SALT_WORK_FACTOR } from '@constants/encryptValues';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: String,
    salt: {
      type: String,
      required: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshToken: String,
  },
  modelOptions,
);

UserSchema.methods.hashPassword = async function (password: string) {
  // generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // hash the password using our new salt
  const hashPassword = await bcrypt.hash(password, salt);

  this.salt = salt;
  this.password = hashPassword;
};

UserSchema.methods.verifyPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

type User = mongoose.InferSchemaType<typeof UserSchema>;

// declare interface User extends mongoose.InferSchemaType<typeof UserSchema> {
//   hashPassword(password: string): void;
//   verifyPassword(candidatePassword: string): boolean;
// }

export default mongoose.model<User>('User', UserSchema);
