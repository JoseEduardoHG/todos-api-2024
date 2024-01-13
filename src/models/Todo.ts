import { Schema, Types, model } from 'mongoose';

interface Todo {
  content: string;
  completed: boolean;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<Todo>(
  {
    content: {
      type: String,
      required: true,
      maxLength: [100, 'Content must be at most 100 characters.'],
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default model<Todo>('Todo', TodoSchema);
