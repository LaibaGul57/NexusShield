import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const Stats = mongoose.model("Stats", statsSchema);
export default Stats;
