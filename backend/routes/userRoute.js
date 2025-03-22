import express from 'express';
import { registerUser } from '../controllers/userController.js';

const userRouter = express.Router();  // Creating a new router
userRouter.post('/register', registerUser);  // Defining POST /register route

export default userRouter;  // Exporting the router
