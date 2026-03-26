import mongoose from "mongoose";

const clauseSchema = new mongoose.Schema({
  type: String,
  text: String,
  severity: Number,
  financialImpact: Number,
  fairness: Number,
  durationMonths: Number,
  penaltyAmount: Number,
  manipulationFlag: Boolean,
  riskScore: Number,
  riskLevel: String,
  explanation: String,
});

export default clauseSchema;