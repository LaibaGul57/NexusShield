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
    await verifyOTP({ email, otp });
    navigate("/reset-password");
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
