import mongoose from "mongoose";

const weeklyNudgesSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default mongoose.model("WeeklyNudges", weeklyNudgesSchema);
