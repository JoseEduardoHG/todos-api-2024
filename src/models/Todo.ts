import modelOptions from '@config/modelOptions';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: [100, 'Content must be at most 100 characters.'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  modelOptions,
);

type Todo = mongoose.InferSchemaType<typeof TodoSchema>;

export default mongoose.model<Todo>('Todo', TodoSchema);
