import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
});

export default mongoose.model("User", userSchema);
