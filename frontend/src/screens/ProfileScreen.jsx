import React from "react";
import "../styles/profile.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProfileScreen() {
  // ✅ Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // ✅ If not logged in, show message
  if (!user) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-container">
          <p>Please login first.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-container">
        <div className="profile-card">
          
          {/* 👤 Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                alt="Profile Avatar"
              />
            </div>

            {/* 🧾 Profile Info */}
            <h2 className="profile-name">{user.fullName}</h2>
          
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{user.fullName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>
          </div>

          {/* ✏️ Buttons */}
          <div className="profile-actions">
            <button className="edit-btn">Edit Profile</button>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("currentUser"); // ✅ Clear session
                window.location.href = "/login"; // ✅ Redirect to login
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}