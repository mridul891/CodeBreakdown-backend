import express  from 'express';
import { signin, signup } from '../controller/user.controller.js';

const userRouter = express.Router();
// Route definitions using the controller actions
userRouter.post('/signin', signin);
userRouter.post('/signup', signup);

export default userRouter;

