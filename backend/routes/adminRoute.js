import express from 'express'
import { addlawyer,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-lawyer',authAdmin,upload.single('image'),addlawyer)
adminRouter.post('/login',loginAdmin)

export default adminRouter