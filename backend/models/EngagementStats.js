import mongoose from "mongoose";

const engagementSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

export default mongoose.model("EngagementStats", engagementSchema);
