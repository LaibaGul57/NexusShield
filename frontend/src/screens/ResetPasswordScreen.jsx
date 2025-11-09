import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import "../styles/ResetPasswordScreen.css";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword(email, { password });
    alert("Password reset successful ✅");
    navigate("/login");
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form className="reset-form" onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="reset-btn">Reset Password</button>
      </form>
    </div>
  );
}
