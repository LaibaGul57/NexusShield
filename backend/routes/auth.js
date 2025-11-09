import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import nodemailer from "nodemailer";

const router = express.Router();
const SALT_ROUNDS = 10;

// 🔹 Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP Error:", err);
  else console.log("SMTP Ready ✅");
});

// ------------------ SIGNUP ------------------
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Full name, email, and password are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ fullName, email, password: hashedPassword });

    return res.status(201).json({
      message: "Signup successful ✅",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    return res.json({
      message: "Login successful ✅",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ------------------ FORGOT PASSWORD ------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp} (valid for 10 minutes)`,
    });

    res.json({ message: "OTP sent successfully ✅" });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// ------------------ VERIFY OTP ------------------
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    if (!user.otp || !user.otpExpiry || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP ❌" });

    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired ❌" });

    res.json({ message: "OTP verified ✅" });
  } catch (err) {
    console.error("❌ Verify OTP Error:", err);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
});

// ------------------ RESET PASSWORD ------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful ✅ Login now." });
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    res.status(500).json({ message: "Password reset failed", error: err.message });
  }
});

export default router;
