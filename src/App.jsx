import React from "react";
import { Routes, Route } from "react-router-dom";

// 🏠 Screens Imports
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import LoginScreen from "./screens/LoginScreen";
import UsersScreen from "./screens/Users";
import UserInfo from "./screens/UserInfo";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import OTPScreen from "./screens/OTPScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

// 📊 Functional & Analytics Screens
import Messages from "./screens/Messages";
import NudgesWarnings from "./screens/NudgesWarnings"; 
import StatisticsReports from "./screens/StatisticsReports"; 
import RiskReport from "./screens/RiskReport"; 
import ProfileScreen from "./screens/ProfileScreen";
import LogoutScreen from "./screens/LogoutScreen";

// 🛠️ Fix: Path ko "./pages/" se badal kar "./screens/" kar diya gaya hai
import NUDGEScreen from "./screens/NUDGEScreen"; 

function App() {
  return (
    <Routes>
      {/* Basic Routes */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Navigation & Dashboard Routes */}
      <Route path="/users" element={<UsersScreen />} />
      <Route path="/Status" element={<NudgesWarnings />} />
      <Route path="/reports" element={<StatisticsReports />} />

<Route path="/riskreport" element={<RiskReport />} />
      <Route path="/quizzes" element={<UserInfo />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/nudge-report" element={<NUDGEScreen />} />
      
      {/* Authentication Flow */}
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/verify-otp" element={<OTPScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      
      {/* Profile & Settings */}
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/logout" element={<LogoutScreen />} />
    </Routes>
  );
}

export default App;