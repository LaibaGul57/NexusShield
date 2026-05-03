import mongoose from "mongoose";

const nudgeCategorySchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default mongoose.model("NudgeCategory", nudgeCategorySchema);
