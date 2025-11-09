import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    "Home",
    "about",
    "users",
    "nudges",
    "reports",
    "riskreport",
  ];

  const formatLink = (link) =>
    link === "homeScreen" ? "Home" : link.charAt(0).toUpperCase() + link.slice(1);

  // 🧠 Close dropdown when clicked outside
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
        {/* 🌟 Logo */}
        <div className="logo">
          <img src={logo} alt="Nexus Shield Logo" />
        </div>

        {/* 🧭 Desktop Navigation */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link}
              to={`/${link}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {formatLink(link)}
            </NavLink>
          ))}
        </nav>

        {/* 👤 Profile Dropdown */}
        <div className="profile-section" ref={dropdownRef}>
          <FaUserCircle
            className="profile-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="profile-dropdown">
              <NavLink to="/profile" onClick={() => setDropdownOpen(false)}>
                Profile
              </NavLink>
            
              <NavLink to="/logout" onClick={() => setDropdownOpen(false)}>
                Logout
              </NavLink>
            </div>
          )}
        </div>

        {/* 📱 Mobile Menu */}
        <button
          className="menu-icon"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* 📱 Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
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
