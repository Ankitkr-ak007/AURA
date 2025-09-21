import { GoogleGenAI, Chat, Content } from "@google/genai";

// The API key is handled by the environment variable `process.env.API_KEY`.
// The guidelines state to assume it's pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat;

const modelConfig = {
    // FIX: Use 'gemini-2.5-flash' as the model for general text tasks.
    model: 'gemini-2.5-flash',
    config: {
      temperature: 0.8,
      topP: 0.95,
      topK: 64,
    }
};

export const initializeChat = (systemInstruction: string, history: Content[]) => {
  // FIX: Use ai.chats.create to start a new chat session with a system instruction and history.
  chat = ai.chats.create({
    model: modelConfig.model,
    config: {
      ...modelConfig.config,
      systemInstruction,
    },
    history,
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chat) {
    throw new Error("Chat is not initialized. Please call initializeChat first.");
  }

  try {
    // FIX: Use chat.sendMessage for subsequent messages in the conversation.
    const result = await chat.sendMessage({ message });
    // FIX: Access the 'text' property directly from the response to get the model's output.
    return result.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    // Return a user-friendly error message.
    return "I'm sorry, I'm having some trouble connecting right now. Could you please try again in a moment?";
  }
};
