import express from 'express';
import { addlawyer, loginAdmin, allLawyers } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/lawyerController.js';

const adminRouter = express.Router();

adminRouter.post('/add-lawyer', authAdmin, upload.single('image'), addlawyer);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-lawyers', authAdmin, allLawyers);
adminRouter.post('/change-availability', authAdmin, changeAvailability); // Ensure this route is correctly defined

export default adminRouter;
