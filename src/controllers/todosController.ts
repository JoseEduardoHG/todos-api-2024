import Todo from '@models/Todo';
import type { Request, Response } from 'express';

const todosController = {
  getAllTodos: (_req: Request, res: Response) => {
    res.send('Get all todos');
  },
  postNewTodo: async (req: Request, res: Response) => {
    try {
      const { content, completed, owner } = req.body;
      const todo = await Todo.create({ content, completed, owner });

      res.send({
        status: 'success',
        data: todo,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default todosController;
