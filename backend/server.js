import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import lawyerRouter from './routes/lawyerRoute.js';

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewearess
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-lawyer

app.use('/api/lawyer',lawyerRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING ')
})

app.listen(port, ()=> console.log("Server Started",port))