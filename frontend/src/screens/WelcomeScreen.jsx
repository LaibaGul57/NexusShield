import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomeScreen.css";
import logo from "../assets/logo.png";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleGetStart = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <div className="split-container">
        {/* Left Side: Text */}
        <div className="text-side">
          <h3 className="welcome-text">WELCOME TO</h3>
          <h1 className="main-title">Nexus Shield</h1>
          <button className="start-btn" onClick={handleGetStart}>
            Get Start
          </button>
        </div>

        {/* Right Side: Logo */}
        <div className="logo-side">
          <div className="logo-container">
            <img src={logo} alt="Nexus Shield Logo" className="logo-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
