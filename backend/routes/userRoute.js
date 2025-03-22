import express from 'express';
import { registerUser,loginUser, getProfile, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router()  // Creating a new router
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)  // Defining POST /register route

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

export default userRouter;  // Exporting the router
