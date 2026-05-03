import React, { useState, useEffect } from "react";
import md5 from "blueimp-md5";
import "../styles/profile.css";
import Header from "../components/Header";
// ❌ Footer ka import yahan se remove kar diya

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (!userData || !userData._id) {
        window.location.href = "/login";
        return;
      }
      setUser(userData);
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || ""
      });
    } catch (error) {
      window.location.href = "/login";
    }
  };

  const getGravatarUrl = (email) => {
    if (!email) return "https://cdn-icons-png.flaticon.com/512/456/456212.png";
    const address = String(email).trim().toLowerCase();
    const hash = md5(address);
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const API_URL = "http://localhost:5000/api/auth/update-profile";
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          fullName: formData.fullName.trim(),
          email: formData.email.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, fullName: formData.fullName, email: formData.email };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ ${data.message || "Failed to update profile"}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ fullName: user.fullName, email: user.email });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-container"><div className="loading">Loading...</div></main>
        {/* ❌ Footer yahan se bhi remove kar diya */}
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-container">
        <div className="profile-card">
          
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src={getGravatarUrl(user.email)} 
                alt="Profile Avatar"
              />
            </div>
            <h2 className="profile-name">{user.fullName}</h2>
          </div>

          {message && (
            <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="profile-details">
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="edit-form">
                <div className="form-group">
                  <label className="detail-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="edit-input"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="detail-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="edit-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="edit-actions">
                  <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "SAVING..." : "SAVE"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={loading}>
                    CANCEL
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user.fullName}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user.email}</span>
                </div>
              </>
            )}
          </div>

          <div className="profile-actions">
            {!isEditing && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("currentUser");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </main>
      {/* ❌ Footer yahan se bhi remove kar diya */}
    </div>
  );
}