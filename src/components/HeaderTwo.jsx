import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

export default function HeaderTwo() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Login", path: "/login" },
  ];

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
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* 📱 Mobile Menu Button */}
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
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setDrawerOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}