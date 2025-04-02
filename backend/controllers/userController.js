import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
import lawyerModel from '../models/lawyerModel.js'
import appointmentModel from "../models/appointmentmodel.js";


import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();



// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    })
    if (imageFile) {
       // upload image to cloudinary
       const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resources_type:'image'})
        const imageURL = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true,message:"Profile Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const bookAppointment = async (req, res) => {
  try {
    const { userId, lawId, slotDate, slotTime } = req.body;

    // Fetch lawyer data
    const lawData = await lawyerModel.findById(lawId);
    if (!lawData) {
      return res.json({ success: false, message: 'Lawyer not found' });
    }

    // Check if lawyer is available
    if (!lawData.available) {
      return res.json({ success: false, message: 'Lawyer not available' });
    }

    // Get booked slots
    let slots_booked = lawData.slots_booked || {};

    // Check slot availability
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: 'Slot not available' });
    }

    // Add slot to booked list
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }
    slots_booked[slotDate].push(slotTime);

    // Fetch user data
    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Create appointment data
    const appointmentData = {
      userId,
      lawId,
      userData,
      lawData,
      amount: lawData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update lawyer's booked slots
    await lawyerModel.findByIdAndUpdate(lawId, { slots_booked });

    res.json({ success: true, message: 'Appointment Booked' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
try {
  const {userId} = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID missing" });
  }
  const appointments = await appointmentModel.find({userId})

  res.json({success:true,appointments})

} catch (error) {
  console.log(error);
  res.json({ success: false, message: error.message })
}
};

//API to cancel appointment
const cancelAppointment = async (req,res) =>{
  try {
    const {userId, appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({success:false,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    //releasing lawyer slot
    const {lawId, slotDate, slotTime} = appointmentData

    const lawyerData = await lawyerModel.findById(lawId)
    let slots_booked = lawyerData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await lawyerModel.findByIdAndUpdate(lawId,{slots_booked})
    res.json({success:true,message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}



// Set up PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// API to make payment for an appointment using PayPal
const paymentpaypal = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment Cancelled or not found" });
    }

    // Creating a PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: process.env.CURRENCY, // Ensure this is a valid currency code
            value: appointmentData.amount.toFixed(2), // Ensure this is a string
          },
          description: `Appointment Payment for ${appointmentData._id}`,
        },
      ],
    });

    // Execute PayPal order creation
    const order = await paypalClient.execute(request);
    
    console.log("PayPal Response:", order.result); // Log PayPal response

    // Ensure the order object is correctly returned
    if (!order.result.id || !order.result.purchase_units[0].amount.value) {
      return res.json({ success: false, message: "Invalid payment data received." });
    }

    res.json({ success: true, order: order.result });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentpaypal};
