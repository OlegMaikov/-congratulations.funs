
import { GoogleGenAI, Type } from "@google/genai";
import { Book, Chapter } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found via process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateBookOutline = async (title: string, description: string, lang: 'ru' | 'en'): Promise<string[]> => {
  const ai = getAI();
  
  const promptRu = `Я пишу книгу под названием "${title}". Описание: "${description}".
  Пожалуйста, создай список названий глав (только названия) для этой книги. Книга должна содержать от 5 до 10 глав.
  Верни ответ в формате JSON (массив строк).`;

  const promptEn = `I am writing a book titled "${title}". Description: "${description}".
  Please create a list of chapter titles (titles only) for this book. The book should contain between 5 and 10 chapters.
  Return the response in JSON format (array of strings).`;

  const prompt = lang === 'ru' ? promptRu : promptEn;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
};

export const continueWriting = async (book: Book, chapter: Chapter, currentText: string, lang: 'ru' | 'en'): Promise<string> => {
  const ai = getAI();
  
  // Clean HTML tags for context if necessary, but Gemini handles simple HTML well.
  const cleanText = currentText.replace(/<[^>]*>/g, '');

  const promptRu = `Ты соавтор книги "${book.title}".
  Сейчас мы пишем главу "${chapter.title}".
  Вот текущий текст главы:
  "${cleanText}"
  
  Пожалуйста, продолжи текст, написав еще 2-3 абзаца в том же стиле. Не повторяй уже написанный текст. Верни только новый текст (можно использовать HTML теги для форматирования, например <p>, <i>, <b>).`;

  const promptEn = `You are the co-author of the book "${book.title}".
  We are currently writing the chapter "${chapter.title}".
  Here is the current text of the chapter:
  "${cleanText}"
  
  Please continue the text by writing 2-3 more paragraphs in the same style. Do not repeat text already written. Return only the new text (you may use HTML tags for formatting, e.g., <p>, <i>, <b>).`;

  const prompt = lang === 'ru' ? promptRu : promptEn;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || '';
  } catch (error) {
    console.error("Error continuing text:", error);
    throw error;
  }
};

export const improveStyle = async (text: string, lang: 'ru' | 'en'): Promise<string> => {
  const ai = getAI();
  
  const promptRu = `Улучши литературный стиль следующего текста, исправив грамматику и сделав его более выразительным, но сохранив смысл. Верни результат с HTML форматированием (абзацы):
  
  "${text}"`;

  const promptEn = `Improve the literary style of the following text, correcting grammar and making it more expressive, but preserving the meaning. Return the result with HTML formatting (paragraphs):
  
  "${text}"`;

  const prompt = lang === 'ru' ? promptRu : promptEn;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || text;
  } catch (error) {
    console.error("Error improving style:", error);
    throw error;
  }
};

export const generateCoverImage = async (book: Book, style?: string): Promise<string | null> => {
  const ai = getAI();
  
  let prompt = `A high quality book cover art for a book titled "${book.title}" by author "${book.author}". 
  Description of the book: ${book.description || 'A fascinating story'}.
  Aspect ratio vertical 2:3. Cinematic lighting, 4k resolution, no text on image except title if possible.`;

  if (style) {
    prompt += ` Art Style: ${style}.`;
  } else {
    prompt += ` Please analyze the book description and choose the most appropriate art style (e.g. Minimalist, Cyberpunk, Watercolor, Noir, Fantasy Oil Painting) that fits the genre and mood.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating cover:", error);
    throw error;
  }
};
