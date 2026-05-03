import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import "../styles/SignupScreen.css";

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // ✅ Email Format Check
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Strong Password Check
  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!isValidEmail(email)) {
      alert("Invalid email format!");
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        "Weak password! Use at least 8 characters with uppercase, lowercase, number, and symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await signupUser({ fullName, email, password });
      alert(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>

      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* Password Strength Message */}
        {formData.password.length > 0 && (
          <p style={{ color: isStrongPassword(formData.password) ? "green" : "red", fontSize: "14px" }}>
            {isStrongPassword(formData.password)
              ? "Strong Password ✓"
              : "Weak Password ✗ (Use A-Z, a-z, 0-9 & symbol)"}
          </p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

     <p className="login-text">
        Already have an account?
        <span className="login-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupScreen;
