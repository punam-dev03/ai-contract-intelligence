export const extractClausesAI = async (text) => {

  const clauses = [];

  if (text.toLowerCase().includes("termination")) {
    clauses.push({
      type: "Termination",
      text: "Termination clause detected",
      severity: 7,
      financialImpact: 6,
      fairness: 5,
      durationMonths: 12,
      penaltyAmount: 150000,
      manipulationFlag: false,
      explanation: "Long notice period detected"
    });
  }

  if (text.toLowerCase().includes("penalty")) {
    clauses.push({
      type: "Penalty",
      text: "Penalty clause detected",
      severity: 8,
      financialImpact: 8,
      fairness: 4,
      durationMonths: 6,
      penaltyAmount: 200000,
      manipulationFlag: true,
      explanation: "High financial penalty"
    });
  }

  return {
    industry: "IT",
    confidenceScore: 75,
    clauses
  };
};