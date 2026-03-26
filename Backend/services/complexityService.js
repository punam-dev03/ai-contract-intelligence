export const calculateComplexity = (clauses) => {

let score = 0

const highRisk = clauses.filter(c => c.severity >= 70).length
const penaltyClauses = clauses.filter(c => c.penaltyAmount).length

score += clauses.length * 5
score += highRisk * 10
score += penaltyClauses * 15

if(score > 100) score = 100

return score

}