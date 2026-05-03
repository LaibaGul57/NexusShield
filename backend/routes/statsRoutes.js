import express from "express";
import Stats from "../models/Stats.js";

const router = express.Router();

// ✅ Insert Default Weekly Data (Run Only Once)
router.get("/seed", async (req, res) => {
  const defaultData = [
    { name: "Mon", value: 60 },
    { name: "Tue", value: 90 },
    { name: "Wed", value: 75 },
    { name: "Thu", value: 100 },
    { name: "Fri", value: 85 },
    { name: "Sat", value: 110 },
    { name: "Sun", value: 95 },
  ];

  await Stats.deleteMany({});
  await Stats.insertMany(defaultData);

  res.send("✅ Default weekly statistics inserted!");
});

// ✅ Get Data For Frontend
router.get("/", async (req, res) => {
  const data = await Stats.find();
  res.json(data);
});

export default router;
