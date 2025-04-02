import express from 'express';
import { addlawyer, loginAdmin, allLawyers, appointmentsAdmin, appointmentCancel,adminDashboard } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/lawyerController.js';

const adminRouter = express.Router();

adminRouter.post('/add-lawyer', authAdmin, upload.single('image'), addlawyer);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-lawyers', authAdmin, allLawyers);
adminRouter.post('/change-availability', authAdmin, changeAvailability); // Ensure this route is correctly defined
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;
