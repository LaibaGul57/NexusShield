import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();
const SALT_ROUNDS = 10;

// 🟢 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Full name, email, and password are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: "Signup successful",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// 🟢 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    return res.json({
      message: "Login successful",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;
