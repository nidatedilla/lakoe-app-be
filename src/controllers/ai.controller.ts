import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { findProductByName } from '../repositories/product.repository';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const isProductRelatedMessage = (message: string) => {
  const productKeywords = /jual|harga|cocok|produk|harga pasar/i;
  return productKeywords.test(message);
};

const extractProductName = (message: string): string | null => {
  const commonWords = [
    'jika',
    'saya',
    'ingin',
    'menjual',
    'berapa',
    'kira',
    'harga',
    'yang',
    'cocok',
  ];
  const words = message
    .split(' ')
    .filter((word) => !commonWords.includes(word.toLowerCase()));
  return words.length > 0 ? words.join(' ') : null;
};

export const getAiResponse = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { message } = req.body;

  const productName = extractProductName(message);

  console.log('nama product : ', productName);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    if (!isProductRelatedMessage(message)) {
      try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = await response.text();
        res.json({ reply: text });
        return;
      } catch (error) {
        res.json({ error: 'Error processing request', details: error });
        return;
      }
    }

    if (!productName) {
      res.json({
        reply:
          'Mohon berikan nama produk yang valid untuk mendapatkan rekomendasi harga.',
      });
      return;
    }

    const products = await findProductByName(productName);

    if (products.length > 0) {
      const product = products[0];
      res.json({
        reply: `Produk '${product.name}' sudah ada dalam database. Harga yang sesuai adalah Rp${product.price}.`,
      });
    }

    const prompt = `
      Saya ingin menjual produk yang disebutkan dalam pesan ini: "${message}". 
      Jika produk ini tidak ada dalam database, cari harga pasar saat ini di Tokopedia.
      Cari produk di Tokopedia dengan link pencarian: https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(productName)}.
    `;

    console.log(prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.json({ reply: text });
  } catch (error) {
    res.status(500).json({ error: 'Error processing request', details: error });
  }
};
