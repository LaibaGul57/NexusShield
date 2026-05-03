import mongoose from "mongoose";

const riskCategorySchema = new mongoose.Schema({
  name: String,
  value: Number, // % value
});

export default mongoose.model("RiskCategory", riskCategorySchema);
