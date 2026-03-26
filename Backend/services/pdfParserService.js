import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const extractTextFromPDF = async (filePath) => {

  try {

    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    return data.text;

  } catch (error) {

    console.error("PDF Parse Error:", error);

    throw error;

  }

};