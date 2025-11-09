import express from "express";
import NudgeCategory from "../models/NudgeCategory.js";
import QuizScore from "../models/QuizScore.js";

const router = express.Router();

// 📌 Get Pie Chart Data
router.get("/categories", async (req, res) => {
  const data = await NudgeCategory.find();
  res.json(data);
});

// 📌 Get Bar Chart Data
router.get("/quizscores", async (req, res) => {
  const data = await QuizScore.find();
  res.json(data);
});

// 📌 Seed Data (Run ONLY once)
router.get("/seed", async (req, res) => {
  await NudgeCategory.deleteMany();
  await QuizScore.deleteMany();

  await NudgeCategory.insertMany([
    { name: "Phishing", value: 50 },
    { name: "App", value: 20 },
  ]);

  await QuizScore.insertMany([
    { range: "0-20", score: 20 },
    { range: "21-40", score: 50 },
    { range: "41-60", score: 100 },
    { range: "61-80", score: 150 },
    { range: "81-100", score: 200 },
  ]);

  res.json({ message: "✅ Risk Report Data Seeded Successfully" });
});

export default router;
