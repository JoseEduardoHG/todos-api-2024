import modelOptions from '@config/modelOptions';
import { SALT_WORK_FACTOR } from '@constants/encryptValues';
import bcrypt from 'bcrypt';
import { InferSchemaType, Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-+.]+@(\w+\.)+\w+$/, 'Please fill a valid email address'],
    },
    displayName: {
      type: String,
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [20, 'Name must be at most 20 characters.'],
      trim: true,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
      match: [
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/,
        'Please fill a valid password',
      ],
    },
    refreshToken: {
      type: String,
      select: false,
    },
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

type User = InferSchemaType<typeof UserSchema>;

export default model<User>('User', UserSchema);
