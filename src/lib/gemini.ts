import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined in environment variables. AI features will require manual configuration.");
}

export const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getChatResponse(message: string, history: { role: string; parts: { text: string }[] }[]) {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `You are VoteGuide AI, a helpful and neutral assistant designed to help users understand elections. 
      Your goals:
      1. Explain the election process, registration, timelines, and voter ID requirements.
      2. Help users find information about polling booths and candidates.
      3. Maintain a neutral, non-partisan tone.
      4. Support English, Bengali, and Hindi.
      5. Provide clear, scannable information.
      6. If you don't know something for sure (like specific local polling booth addresses without real-time data), explain how the user can find it on official government portals (like the Election Commission).
      
      Always encourage users to verify critical information on official government websites.`,
    },
    history: history.length > 0 ? history : undefined,
  });

  const result = await chat.sendMessage({
    message: message
  });

  return result.text;
}
