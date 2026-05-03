import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import "../styles/ForgotPasswordScreen.css";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email });
      alert("OTP sent ✅ Check your email");
      localStorage.setItem("resetEmail", email);
      navigate("/verify-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      
      <form className="forgot-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        {/* Main Action Button */}
        <button className="forgot-btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {/* Cancel Button - Navigates back to Login */}
        <button 
          className="cancel-btn" 
          type="button" 
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}