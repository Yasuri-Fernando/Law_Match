// Backend - models/Lawyer.js
import mongoose from "mongoose";

const LawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: false },
});

export default mongoose.model("Lawyer", LawyerSchema);

// Backend - routes/lawyerRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Lawyer from "../models/Lawyer.js";

const router = express.Router();

// Register Lawyer
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newLawyer = new Lawyer({
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      image,
    });

    await newLawyer.save();
    res.status(201).json({ success: true, message: "Lawyer registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Lawyer
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) return res.status(400).json({ message: "Lawyer not found" });

    const isMatch = await bcrypt.compare(password, lawyer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: lawyer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, lawyer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// Frontend - src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddLawyer from "./pages/AddLawyer";
import LawyerList from "./pages/LawyerList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-lawyer" element={<AddLawyer />} />
        <Route path="/lawyers" element={<LawyerList />} />
      </Routes>
    </Router>
  );
}

export default App;
