import 'dotenv/config'; // Must be first
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// Import routes
import authRoutes from "./routes/auth.js"; // ✅ Signup & Login
import statsRoutes from "./routes/statsRoutes.js";
import nudgesRoutes from "./routes/nudges.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import riskReportRoutes from "./routes/riskReportRoutes.js";
import advisoriesRoutes from "./routes/advisoriesRoutes.js";
import advisoriesLiveRoute from "./routes/advisoriesLive.js";
import cyberNewsRouter from "./routes/cyberNews.js";



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes); // ⭐ NEW LOGIN/SIGNUP ROUTE
app.use("/api/stats", statsRoutes);
app.use("/api/nudges", nudgesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/riskreport", riskReportRoutes);
app.use("/api/advisories", advisoriesRoutes);
app.use("/api/advisories-live", advisoriesLiveRoute);
app.use("/cyber", cyberNewsRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
