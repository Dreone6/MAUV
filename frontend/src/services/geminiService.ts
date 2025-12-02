import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateEditedImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const client = getClient();
  
  // Remove data URL prefix if present for the API call
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
  const mimeType = base64Image.match(/^data:image\/(png|jpeg|jpg|webp);base64,/)?.[1] || 'image/png';

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: `image/${mimeType}`,
              data: cleanBase64,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return only the edited image.`
          },
        ],
      },
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};

export const createChatSession = () => {
  const client = getClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are Amara, a warm, empathetic, and knowledgeable women's health companion. You help users track their cycles, understand their symptoms, and provide wellness tips. Your tone is supportive, gentle, and like a wise friend. You use emojis occasionally to keep the conversation light. Keep your responses concise and easy to read on a mobile device. If asked about medical advice, gently remind the user to consult a doctor.",
    },
  });
};
