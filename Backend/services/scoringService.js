const generateExecutiveSummary = (overallRiskScore, clauses) => {
  if (overallRiskScore >= 70) {
    return "This contract contains high-risk clauses, particularly in termination and financial liability. It may expose you to significant penalties and strict obligations. Careful review and negotiation are strongly recommended.";
  }

  if (overallRiskScore >= 40) {
    return "This contract presents moderate risk. Some clauses may require negotiation, especially around notice periods and financial penalties.";
  }

  return "This contract appears relatively safe with low financial and legal exposure based on the analyzed clauses.";
};
const generateExplanation = (category, severity) => {
  if (category === "Termination") {
    return "This clause may require long notice period or financial penalty if breached.";
  }

  if (category === "Penalty") {
    return "High penalty amount may create serious financial burden.";
  }

  if (category === "Liability") {
    return "Unlimited liability exposes you to major financial risks.";
  }

  return "Review this clause carefully before signing.";
};

const generateNegotiationTip = (category) => {
  if (category === "Termination") {
    return "Try negotiating shorter notice period or reduced penalty.";
  }

  if (category === "Penalty") {
    return "Request penalty cap aligned with your monthly salary.";
  }

  if (category === "Liability") {
    return "Negotiate liability cap based on fixed compensation.";
  }

  return "Seek legal advice if unsure.";
};

export const scoreContract = (clausesFromAI) => {
  const structuredClauses = clausesFromAI.map((clauseObj) => {
    const text =
      typeof clauseObj === "string"
        ? clauseObj
        : clauseObj.text || "";

    const lower = text.toLowerCase();

    let severity = 20;
    let penaltyAmount = 0;
    let category = "General";

    if (lower.includes("termination")) {
      severity = 75;
      penaltyAmount = 50000;
      category = "Termination";
    }

    if (lower.includes("penalty")) {
      severity = 85;
      penaltyAmount = 100000;
      category = "Penalty";
    }

    if (lower.includes("liability")) {
      severity = 65;
      penaltyAmount = 70000;
      category = "Liability";
    }

    return {
      category,
      description: text,
      severity,
      penaltyAmount,
      explanation: generateExplanation(category, severity),
      negotiationTip: generateNegotiationTip(category),
    };
  });

  const totalSeverity = structuredClauses.reduce(
    (sum, clause) => sum + clause.severity,
    0
  );

  const overallRiskScore =
    structuredClauses.length > 0
      ? Number((totalSeverity / structuredClauses.length).toFixed(2))
      : 0;

  let overallRiskLevel = "Low";

  if (overallRiskScore > 70) overallRiskLevel = "High";
  else if (overallRiskScore > 40) overallRiskLevel = "Medium";

return {
  clauses: structuredClauses,
  overallRiskScore,
  overallRiskLevel,
  executiveSummary: generateExecutiveSummary(
    overallRiskScore,
    structuredClauses
  ),
};
};