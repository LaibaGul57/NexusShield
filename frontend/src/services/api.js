import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

export const signupUser = (data) => API.post("/signup", data);
export const loginUser = (data) => API.post("/login", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const verifyOTP = (data) => API.post("/verify-otp", data);
export const resetPassword = (email, data) =>
  API.post("/reset-password", { email, ...data });
