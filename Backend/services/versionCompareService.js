export const compareContractVersions = (contractA, contractB) => {

  const differences = [];

  contractA.clauses.forEach((clauseA) => {

    const match = contractB.clauses.find(
      (c) => c.category === clauseA.category
    );

    if (!match) {
      differences.push({
        type: "Removed Clause",
        clause: clauseA.category
      });
    }

    else {

      if (match.severity !== clauseA.severity) {
        differences.push({
          type: "Risk Changed",
          clause: clauseA.category,
          from: clauseA.severity,
          to: match.severity
        });
      }

      if (match.penaltyAmount !== clauseA.penaltyAmount) {
        differences.push({
          type: "Penalty Changed",
          clause: clauseA.category,
          from: clauseA.penaltyAmount,
          to: match.penaltyAmount
        });
      }

    }

  });

  return differences;

};