import modelOptions from '@config/modelOptions';
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
