import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const simulateNegotiation = async (clauseText, proposal) => {

  try {

    const prompt = `
You are a legal AI assistant.

Original Clause:
${clauseText}

User Negotiation Proposal:
${proposal}

Analyze and respond in JSON format:

{
  "riskReduction": "Explain risk change",
  "financialImpact": "Explain financial change",
  "successProbability": "Low / Medium / High"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    });

    const text = completion.choices[0].message.content;

    return JSON.parse(text);

  } catch (error) {

  console.log("🔴 OpenAI Error:", error.message);

  return {
    riskReduction: "Negotiation could reduce risk exposure.",
    financialImpact: "Financial liability may decrease.",
    successProbability: "Medium"
  };

}

};