// src/screens/SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="overlay"></div>
      <h1 className="splash-text">Welcome to Cyber Shield</h1>
    </div>
  );
};

export default SplashScreen;
