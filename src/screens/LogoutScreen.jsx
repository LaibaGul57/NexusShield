import React from "react";
import "../styles/logout.css";
import { useNavigate } from "react-router-dom";

export default function LogoutScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🧹 Clear stored user data (Key ko "currentUser" kar diya taake login se match ho)
    localStorage.removeItem("currentUser");
    
    // Home screen par redirect karein
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1 className="logout-title">Logout</h1>
        <p className="logout-subtext">
          Are you sure you want to sign out from your account?
        </p>

        <div className="logout-actions">
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}