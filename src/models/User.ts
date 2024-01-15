import { SALT_WORK_FACTOR } from '@constants/encryptValues';
import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';

interface User {
  email: string;
  displayName?: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserMethods {
  // hashPassword(password: string): void;
  arePasswordsTheSame(password: string): boolean;
}

type UserModel = Model<User, object, UserMethods>;

const UserSchema = new Schema<User, UserModel, UserMethods>(
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
    password: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/,
        'Please fill a valid password',
      ],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  // generate salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // hash the password using our new salt
  const hashPassword = await bcrypt.hash(this.password, salt);

  this.password = hashPassword;
});

UserSchema.method(
  'arePasswordsTheSame',
  async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },
);

export default model<User, UserModel>('User', UserSchema);
