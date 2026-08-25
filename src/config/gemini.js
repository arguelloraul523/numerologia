// Fase 4: cliente del SDK de Google Gemini.
// generarTexto(prompt) es la funcion que usan los controladores de
// readings y compatibility para pedirle una interpretacion a la IA.
const { GoogleGenerativeAI } = require('@google/generative-ai');

let cliente = null;

function getGeminiModel() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY no está definida en el archivo .env');
  }

  if (!cliente) {
    cliente = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  return cliente.getGenerativeModel({ model: modelName });
}

async function generarTexto(prompt) {
  const model = getGeminiModel();
  const resultado = await model.generateContent(prompt);
  return resultado.response.text();
}

module.exports = { getGeminiModel, generarTexto };
