import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import lawyerModel from "../models/lawyerModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


// API for adding lawyer
export const addlawyer = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing lawyer password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        } else {
            return res.json({ success: false, message: "Image is required" });
        }

        // Ensure address is parsed correctly
        const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

        // Create new lawyer
        const lawyerData = {
            name,
            email,
            image: imageUrl,
            password: hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        };

        const newLawyer = new lawyerModel(lawyerData);
        await newLawyer.save();

        res.json({ success: true, message: "Lawyer Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API For admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all lawyers list for admin panel
 export const allLawyers = async (req,res) => {
    try{
        const lawyers = await lawyerModel.find({}).select('-password')
        res.json({success:true,lawyers})

    } catch {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}

// API to get all appointments list
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }) 
    }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
      const { userId, appointmentId } = req.body; // Ensure userId is received from the request
  
      // Fetch appointment details
      const appointmentData = await appointmentModel.findById(appointmentId);
      if (!appointmentData) {
        return res.json({ success: false, message: "Appointment not found" });
      }
  
      // Verify appointment user
      if (appointmentData.userId.toString() !== userId) {
        return res.json({ success: false, message: "Unauthorized action" });
      }
  
      // Cancel the appointment
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      // Release the lawyer slot
      const { lawId, slotDate, slotTime } = appointmentData;
      const lawyerData = await lawyerModel.findById(lawId);
  
      if (lawyerData) {
        let slots_booked = lawyerData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
        await lawyerModel.findByIdAndUpdate(lawId, { slots_booked });
      }
  
      res.json({ success: true, message: "Appointment Cancelled" });
  
    } catch (error) {
      console.error("Error in appointmentCancel:", error);
      res.json({ success: false, message: error.message });
    }
  };
  
// API to get dashboard data for admin panel
const adminDashboard = async (req,res) => {

    try {
        const lawyers = await lawyerModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            lawyers: lawyers.length,
            appointments:appointments.length,
            clients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {appointmentsAdmin, appointmentCancel,adminDashboard}
