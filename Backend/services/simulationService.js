export const simulateFinancialImpact = (
  clauses,
  monthlyIncome,
  emergencySavings,
  overallRiskScore
) => {
  const yearlyIncome = monthlyIncome * 12;

  let highestPenalty = 0;

  clauses.forEach((clause) => {
    if (clause.penaltyAmount && clause.penaltyAmount > highestPenalty) {
      highestPenalty = clause.penaltyAmount;
    }
  });

  // If no penalty detected → derive from risk score
  if (highestPenalty === 0) {
    highestPenalty = (monthlyIncome * overallRiskScore) / 50;
  }

  const incomeImpactPercent = (highestPenalty / yearlyIncome) * 100;
  const savingsImpactPercent = (highestPenalty / emergencySavings) * 100;
  const recoveryMonths = highestPenalty / monthlyIncome;

  let personalRiskLevel = "Low";
  if (incomeImpactPercent > 40) personalRiskLevel = "High";
  else if (incomeImpactPercent > 20) personalRiskLevel = "Medium";

  return {
    penaltyAmount: Number(highestPenalty.toFixed(2)),
    incomeImpactPercent: Number(incomeImpactPercent.toFixed(2)),
    savingsImpactPercent: Number(savingsImpactPercent.toFixed(2)),
    recoveryMonths: Number(recoveryMonths.toFixed(1)),
    personalRiskLevel,
  };
};