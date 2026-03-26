import Contract from "../models/Contract.js";

export const getAnalyticsData = async () => {

  const totalContracts = await Contract.countDocuments();

  const avgRiskByIndustry = await Contract.aggregate([
    {
      $group: {
        _id: "$industry",
        averageRisk: { $avg: "$overallRiskScore" },
        count: { $sum: 1 }
      }
    }
  ]);

  const clauseFrequency = await Contract.aggregate([
    { $unwind: "$clauses" },
    {
      $group: {
        _id: "$clauses.type",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const highestPenalty = await Contract.aggregate([
    { $unwind: "$clauses" },
    {
      $group: {
        _id: "$industry",
        totalPenalty: { $sum: "$clauses.penaltyAmount" }
      }
    },
    { $sort: { totalPenalty: -1 } }
  ]);

  return {
    totalContracts,
    avgRiskByIndustry,
    clauseFrequency,
    highestPenalty
  };
};