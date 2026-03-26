import OpenAI from "openai";

export const generateSaferClause = async (clauseText) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Rewrite this clause to make it safer and balanced:\n\n${clauseText}`,
        },
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log("🔴 OpenAI Error:", error.message);

    // ✅ PROPER 429 DETECTION
    if (
      error.response?.status === 429 ||
      error.status === 429
    ) {
      return `Safer Version Suggestion:

This clause should be modified to reduce financial burden,
shorten notice period, and balance obligations between parties.

Consider limiting penalties and reducing strict notice requirements.`;
    }

    // ✅ Generic fallback (never crash server)
    return `AI improvement temporarily unavailable.
Suggested manual improvement:
- Reduce financial penalty
- Shorten notice duration
- Ensure balanced liability between parties.`;
  }
};