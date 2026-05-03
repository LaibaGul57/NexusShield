import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingScreen.css";
import logo from "../assets/logo.png";

const LandingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Nexus Shield Logo" className="logo" />
      </div>
   
    </div>
  );
};

export default LandingScreen;
