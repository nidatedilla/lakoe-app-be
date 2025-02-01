import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getAiResponse = async (req: Request, res: Response) => {
  const { message } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with Gemini AI' });
  }
};
