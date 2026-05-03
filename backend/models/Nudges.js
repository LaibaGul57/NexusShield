import mongoose from "mongoose";

const nudgesSchema = new mongoose.Schema({
  id: String,
  user: String,
  nudges: Number,
  warnings: Number,
  lastActivity: String,
});

export default mongoose.model("Nudges", nudgesSchema);
