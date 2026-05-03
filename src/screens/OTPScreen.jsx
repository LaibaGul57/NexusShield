import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/api";
import "../styles/OTPScreen.css";

export default function OTPScreen() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

 const handleVerify = async (e) => {
  e.preventDefault();
  if (!email || !otp) return alert("Email ya OTP missing hai!");

  try {
    const res = await verifyOTP({ email, otp });
    console.log("Success:", res.data);
    alert("OTP Verified! ✅");
    navigate("/reset-password");
  } catch (err) {
    // Agar 400 error aaye ga to alert mein msg dikhay ga
    const errorMsg = err.response?.data?.message || "Invalid or Expired OTP ❌";
    alert(errorMsg);
    console.error("Backend Error:", err.response?.data);
  }
};

  return (
    <div className="otp-container">
      <h2 className="otp-title">Verify OTP</h2>
      <form className="otp-form" onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="otp-btn">Verify</button>
      </form>
    </div>
  );
}
