import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  monthlyIncome: Number,
  emergencySavings: Number,
  riskTolerance: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
});

export default mongoose.model("UserProfile", userProfileSchema);