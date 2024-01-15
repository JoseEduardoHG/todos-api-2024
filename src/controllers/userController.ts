import User from '@models/User';
import type { Request, Response } from 'express';

const userController = {
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const users = await User.find({});

      res.send({
        status: 'success',
        data: users,
      });
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        res.status(500).send({
          status: 'error',
          message: err.message,
        });
      }
    }
  },
  postNewUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password }, '-email -password');
      const userSaved = await user.save();
      //   const result = User.create({ email, password });
      console.log(userSaved);

      res.send({
        status: 'success',
        data: user,
      });
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        res.status(500).send({
          status: 'error',
          message: err.message,
        });
      }
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      res.send({
        status: 'success',
        data: user,
      });
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        res.status(500).send({
          status: 'error',
          message: error.message,
        });
      }
    }
  },
};

export default userController;
