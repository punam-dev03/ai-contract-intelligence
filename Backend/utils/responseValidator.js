export const validateAIResponse = (content) => {
  try {
    const parsed = JSON.parse(content);

    if (!parsed.clauses || !Array.isArray(parsed.clauses)) {
      throw new Error("Invalid AI structure");
    }

    return parsed;
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }
};