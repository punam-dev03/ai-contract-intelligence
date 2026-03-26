import Contract from "../models/Contract.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const totalContracts = await Contract.countDocuments();

    const highRiskCount = await Contract.countDocuments({
      overallRiskScore: { $gte: 70 },
    });

    const avgRiskByIndustry = await Contract.aggregate([
      {
        $group: {
          _id: "$industry",
          avgRisk: { $avg: "$overallRiskScore" },
        },
      },
    ]);

    const clauseFrequency = await Contract.aggregate([
      { $unwind: "$clauses" },
      {
        $group: {
          _id: "$clauses.category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalContracts,
      highRiskCount,
      avgRiskByIndustry,
      clauseFrequency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};