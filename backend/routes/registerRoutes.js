const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); 


const router = express.Router();
router.post("/", async (req, res) => {
    try {
      console.log("Request body:", req.body);
  
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "user",
      });
  
      const savedUser = await newUser.save();
      console.log("Saved user:", savedUser);
  
      res.status(201).json({ message: "User registered successfully", userId: savedUser._id });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  module.exports = router;