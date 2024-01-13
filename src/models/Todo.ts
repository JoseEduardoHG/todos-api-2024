import modelOptions from '@config/modelOptions';
import { InferSchemaType, Schema, model } from 'mongoose';

const TodoSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  modelOptions,
);

type Todo = InferSchemaType<typeof TodoSchema>;

export default model<Todo>('Todo', TodoSchema);
