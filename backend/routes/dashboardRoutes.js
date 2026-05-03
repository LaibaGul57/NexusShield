import express from "express";
import EngagementStats from "../models/EngagementStats.js";
import WeeklyNudges from "../models/WeeklyNudges.js";

const router = express.Router();

// 📌 Get Pie Chart Data (Engagement)
router.get("/engagement", async (req, res) => {
  const stats = await EngagementStats.find();
  res.json(stats);
});

// 📌 Get Line Chart Data (Weekly Nudges)
router.get("/weeklynudges", async (req, res) => {
  const nudges = await WeeklyNudges.find();
  res.json(nudges);
});

// 📌 Seed Default Data in DB (only run once)
router.get("/seed", async (req, res) => {
  await EngagementStats.deleteMany();
  await WeeklyNudges.deleteMany();

  await EngagementStats.insertMany([
    { name: "Mannings", value: 60 },
    { name: "Followed", value: 40 },
  ]);

  await WeeklyNudges.insertMany([
    { name: "Mon", value: 20 },
    { name: "Tue", value: 60 },
    { name: "Wed", value: 70 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 60 },
    { name: "Sat", value: 65 },
    { name: "Sun", value: 80 },
  ]);

  res.json({ message: "✅ Data Seeded Successfully" });
});

export default router;
