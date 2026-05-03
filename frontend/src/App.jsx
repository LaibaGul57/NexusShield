import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Screens
import LandingScreen from "./screens/LandingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/homeScreen";

import AboutScreen from "./screens/AboutScreen";
import OverviewScreen from "./screens/OverviewScreen";
import NudgesWarnings from "./screens/NudgesWarnings";
import UsersScreen from "./screens/Users";
import StatisticsReports from "./screens/StatisticsReports";
import RiskReport from "./screens/RiskReport";

import ProfileScreen from "./screens/ProfileScreen";
import LogoutScreen from "./screens/LogoutScreen";

import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import OTPScreen from "./screens/OTPScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />

        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/verify-otp" element={<OTPScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />

        <Route path="/home" element={<HomeScreen />} />
                <Route path="/about" element={<AboutScreen />} />
        <Route path="/overview" element={<OverviewScreen />} />
        <Route path="/nudges" element={<NudgesWarnings />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/reports" element={<StatisticsReports />} />
        <Route path="/riskreport" element={<RiskReport />} />
       
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/logout" element={<LogoutScreen />} />

      </Routes>
    </>
  );
}
