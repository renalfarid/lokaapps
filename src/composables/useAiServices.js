import { GoogleGenerativeAI } from "@google/generative-ai";

const lokaAI = import.meta.env.VITE_LOKA_AI
const genAI = new GoogleGenerativeAI(lokaAI);

export function useAiServices() {
  const runAiService = async (prompt) => {
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001", generationConfig});
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text()
    return text
  }
  return {
    runAiService
  }
}