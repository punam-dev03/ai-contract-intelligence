export const compareContracts = (contractA, contractB) => {

  const riskA = contractA.overallRiskScore;
  const riskB = contractB.overallRiskScore;

  const penaltyA = contractA.clauses.reduce(
    (sum, clause) => sum + (clause.penaltyAmount || 0),
    0
  );

  const penaltyB = contractB.clauses.reduce(
    (sum, clause) => sum + (clause.penaltyAmount || 0),
    0
  );

  const fairnessAvg = (clauses) => {
    if (!clauses.length) return 0;
    const total = clauses.reduce((sum, c) => sum + (c.fairness || 0), 0);
    return total / clauses.length;
  };

  const fairnessA = fairnessAvg(contractA.clauses);
  const fairnessB = fairnessAvg(contractB.clauses);

  const riskDifference = Math.abs(riskA - riskB);

  const saferContract = riskA < riskB ? "Contract A" : "Contract B";

  let recommendation = "";

  if (riskA < riskB) {
    recommendation = "Contract A has lower overall risk and better financial exposure.";
  } else if (riskB < riskA) {
    recommendation = "Contract B has lower overall risk and better financial exposure.";
  } else {
    recommendation = "Both contracts have similar risk levels.";
  }

  return {
    contractA_risk: riskA,
    contractB_risk: riskB,
    penaltyA,
    penaltyB,
    fairnessA: Number(fairnessA.toFixed(2)),
    fairnessB: Number(fairnessB.toFixed(2)),
    riskDifference: Number(riskDifference.toFixed(2)),
    saferContract,
    recommendation,
  };
};