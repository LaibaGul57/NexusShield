import express from "express";
import Nudges from "../models/Nudges.js";

const router = express.Router();

// Get all nudges
router.get("/", async (req, res) => {
  const data = await Nudges.find();
  res.json(data);
});

// Seed data
router.get("/seed", async (req, res) => {
  await Nudges.deleteMany();
  await Nudges.insertMany([
    { id: "#001", user: "John Doe", nudges: 5, warnings: 2, lastActivity: "2024-04-15" },
    { id: "#002", user: "Jane Doe", nudges: 3, warnings: 1, lastActivity: "2024-04-14" },
    { id: "#003", user: "Max Smith", nudges: 8, warnings: 4, lastActivity: "2024-04-13" },
    { id: "#004", user: "Emily Clark", nudges: 6, warnings: 3, lastActivity: "2024-04-12" },
  ]);

  res.send("✅ Nudge Seed Data Added Successfully");
});

export default router;
