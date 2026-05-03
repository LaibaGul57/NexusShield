import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 📝 Paths mein spaces nahi hone chahiyen, isliye "riskreport" use karein
  const navLinks = [
    "users",
    "Status",
    "reports",
    "riskreport", // "Training Analytics" ki jagah ye likhein
    "nudge-report",
    "messages",
    "quizzes", 
  ];

  // ✨ Ye function UI mein dikhnay wala naam control karta hai
  const formatLink = (link) => {
    
    if (link === "riskreport") return "Training Analytics"; // UI mein ab ye show hoga
    if (link === "nudge-report") return "Nudge Analytics";
    if (link === "quizzes") return "Quizzes";
    if (link === "homeScreen") return "Home";
    return link.charAt(0).toUpperCase() + link.slice(1);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="top-navbar">
        <div className="logo">
          <img src={logo} alt="Nexus Shield Logo" />
        </div>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link}
              to={`/${link}`} // URL banega: /riskreport
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {formatLink(link)} {/* Display hoga: Training Analytics */}
            </NavLink>
          ))}
        </nav>

        <div className="profile-section" ref={dropdownRef}>
          <FaUserCircle
            className="profile-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="profile-dropdown">
              <NavLink to="/profile" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
              <NavLink to="/logout" onClick={() => setDropdownOpen(false)}>Logout</NavLink>
            </div>
          )}
        </div>

        <button className="menu-icon" onClick={() => setDrawerOpen(true)}>☰</button>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setDrawerOpen(false)}>×</button>
        <ul>
          {navLinks.concat("logout").map((link) => (
            <li key={link}>
              <NavLink
                to={`/${link}`}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setDrawerOpen(false)}
              >
                {formatLink(link)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}