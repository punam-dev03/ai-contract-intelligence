export const calculateClauseRisk = (clause) => {
  const durationFactor = clause.durationMonths
    ? clause.durationMonths / 12
    : 1;

  const penaltyRatio = clause.penaltyAmount
    ? clause.penaltyAmount / 100000
    : 0;

  const manipulationPenalty = clause.manipulationFlag ? 1 : 0;

  const risk =
    clause.severity * 0.35 +
    clause.financialImpact * 0.25 +
    clause.fairness * 0.2 +
    durationFactor * 0.1 +
    penaltyRatio * 0.05 +
    manipulationPenalty * 0.05;

  return Number(risk.toFixed(2));
};