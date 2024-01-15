import userController from '@controllers/userController';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.postNewUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
