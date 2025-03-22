import express from 'express';
import { registerUser,loginUser } from '../controllers/userController.js';

const userRouter = express.Router()  // Creating a new router
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)  // Defining POST /register route

export default userRouter;  // Exporting the router
