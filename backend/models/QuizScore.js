import mongoose from "mongoose";

const quizScoreSchema = new mongoose.Schema({
  range: String,
  score: Number,
});

export default mongoose.model("QuizScore", quizScoreSchema);
