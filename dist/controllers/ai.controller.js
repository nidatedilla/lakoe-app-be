"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAiResponse = void 0;
const generative_ai_1 = require("@google/generative-ai");
const product_repository_1 = require("../repositories/product.repository");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const isProductRelatedMessage = (message) => {
    const productKeywords = /jual|harga|cocok|produk|harga pasar/i;
    return productKeywords.test(message);
};
const extractProductName = (message) => {
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
const getAiResponse = async (req, res) => {
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
            }
            catch (error) {
                res.json({ error: 'Error processing request', details: error });
                return;
            }
        }
        if (!productName) {
            res.json({ reply: "Mohon berikan nama produk yang valid untuk mendapatkan rekomendasi harga." });
            return;
        }
        const products = await (0, product_repository_1.findProductByName)(productName);
        if (products.length > 0) {
            const productList = products.map(p => `- ${p.name}: Rp${p.price}`).join("\n");
            const prompt = `
        Berikut adalah daftar produk yang ditemukan dalam database kami:
        ${productList}

        Berdasarkan produk yang ditemukan, apakah ada saran harga atau rekomendasi lain?
        jika tidak tolong sebutkan harga untuk barang tersebut
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.json({ reply: text });
            return;
        }
        const prompt = `
      Saya ingin menjual produk yang disebutkan dalam pesan ini: "${message}". 
      Jika produk ini tidak ada dalam database, cari harga pasar saat ini di Tokopedia.
      Cari produk di Tokopedia dengan link pencarian: https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(productName)}.
    `;
        console.log("prompt", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.json({ reply: text });
    }
    catch (error) {
        res.status(500).json({ error: 'Error processing request', details: error });
    }
};
exports.getAiResponse = getAiResponse;
