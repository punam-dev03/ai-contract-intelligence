import mongoose from "mongoose";

const clauseSchema = new mongoose.Schema({
  category: String,
  description: String,
  severity: Number,
  penaltyAmount: Number,
  explanation: String,
  negotiationTip: String,
});

const contractSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: String,
    filePath:{
      type:String,
      required:true
    },
    industry: String,
    clauses: [clauseSchema],
    overallRiskScore: Number,
    overallRiskLevel: String,
    confidenceScore: Number,
    executiveSummary: String,
  },
  { timestamps: true }
);

export default mongoose.model("Contract", contractSchema);