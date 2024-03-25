import { GoogleGenerativeAI } from "@google/generative-ai";

const lokaAI = import.meta.env.VITE_LOKA_AI
const genAI = new GoogleGenerativeAI(lokaAI);

export function useAiServices() {
  const runAiService = async (prompt) => {
    const generationConfig = {
        maxOutputTokens: 200,
        temperature: 0.1,
        topP: 0.9,
        topK: 50
      };
    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text()
    return text
  }
  return {
    runAiService
  }
}