import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      alert(res.data.message || "Login successful");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p
        className="forgot-password"
        onClick={() => navigate("/forgot-password")}
        style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
      >
        Forgot Password?
      </p>

      <button
        type="button"
        className="google-btn"
        onClick={() => alert("Google login coming soon")}
      >
        <span className="g-icon">G</span> Sign in with Google
      </button>

      <p className="signup-text">
        Don’t have an account?{" "}
        <a onClick={() => navigate("/signup")}>Sign up</a>
      </p>
    </div>
  );
};

export default LoginScreen;
