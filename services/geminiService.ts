import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const actionItemSchema = {
  type: Type.OBJECT,
  properties: {
    who: {
      type: Type.STRING,
      description: "The person, team, or entity responsible for the action item. If not specified, use 'Unassigned'.",
    },
    what: {
      type: Type.STRING,
      description: "A clear and concise description of the task or action to be completed.",
    },
    when: {
      type: Type.STRING,
      description: "The deadline, timeframe, or specific date for the action item. If not specified, use 'Not specified'.",
    },
    where: {
      type: Type.STRING,
      description: "Optional. The location, platform, or context where the action needs to take place (e.g., 'GitHub', 'Project Board', 'Next Meeting'). If not mentioned, this can be omitted.",
    },
  },
  required: ['who', 'what', 'when'],
};

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.ARRAY,
      description: "A concise, neutral summary of the meeting's key discussions, decisions, and outcomes. Each string in the array should be a short, easy-to-read paragraph focusing on a distinct topic.",
      items: {
        type: Type.STRING,
      },
    },
    actionItems: {
      type: Type.ARRAY,
      description: "A comprehensive list of all actionable tasks identified in the meeting minutes.",
      items: actionItemSchema,
    },
  },
  required: ['summary', 'actionItems'],
};

export const analyzeMinutes = async (minutes: string): Promise<AnalysisResult> => {
  const prompt = `
    Please analyze the following meeting minutes.
    1.  Generate a comprehensive summary of the key discussion points, decisions made, and overall outcomes. The summary should be broken down into short, digestible paragraphs.
    2.  Extract all actionable items, identifying who is responsible, what the task is, and the deadline.
    
    Meeting Minutes:
    ---
    ${minutes}
    ---
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (!Array.isArray(result.summary) || !Array.isArray(result.actionItems)) {
        throw new Error("Invalid data structure received from API.");
    }
    
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze meeting minutes. The API returned an error.");
  }
};