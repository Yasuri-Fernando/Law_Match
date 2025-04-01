import express from 'express';
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, cancelAppointment} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { listAppointment } from '../controllers/userController.js';


const userRouter = express.Router()  // Creating a new router
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)  // Defining POST /register route

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter;  // Exporting the router
