import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const chatWithContract = async (contractText, question) => {

  try {

    const prompt = `
You are an AI legal assistant.

Use the contract text below to answer the user's question.

Contract:
${contractText}

Question:
${question}

Answer clearly.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log("OpenAI Chat Error:", error.message);

    // fallback if quota finished
    return "AI service temporarily unavailable. Based on the contract clauses, please review the termination and penalty terms carefully.";

  }

};