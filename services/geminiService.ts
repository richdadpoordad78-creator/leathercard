
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function refineSlogan(brandInfo: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 extremely premium, luxury slogans for a high-end leather brand called "${brandInfo}". The slogans should evoke timelessness, craftsmanship, and exclusivity. Return as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
    });

    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error refining slogan:", error);
    return [
      "The Art of Timeless Craft",
      "Elegance Bound in Leather",
      "Crafted for Generations",
      "Where Heritage Meets Modern Luxury",
      "Defined by Excellence"
    ];
  }
}
