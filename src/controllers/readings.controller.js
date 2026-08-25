// Fase 2-b: getHistory ya existía como CRUD base (leer Readings del usuario).
// Fase 4: generateReading se conecta de verdad con Gemini: arma el prompt con
// el perfil numerológico, le pide una lectura y guarda el resultado.
const NumerologyProfile = require('../models/NumerologyProfile');
const Reading = require('../models/Reading');
const { generarTexto } = require('../config/gemini');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// El prompt le da a Gemini los 3 números del perfil y el tipo de lectura pedido
function construirPrompt(perfil, tipoLectura) {
  return `Eres un numerólogo profesional. Genera una lectura de tipo "${tipoLectura}" `
    + `para una persona con Número de Camino de Vida ${perfil.numero_vida}, `
    + `Número de Expresión ${perfil.numero_expresion} y Número de Alma ${perfil.numero_alma}. `
    + 'Responde en español, en un tono cálido y cercano, en no más de 3 párrafos.';
}

const generateReading = asyncHandler(async (req, res) => {
  const { tipo_lectura } = req.body;

  const perfil = await NumerologyProfile.findOne({ user: req.user.id });
  if (!perfil) {
    throw new ApiError(400, 'Primero debes calcular tu perfil numerológico en /api/v1/numerology/calculate');
  }

  const prompt = construirPrompt(perfil, tipo_lectura);
  const respuestaIA = await generarTexto(prompt);

  const lectura = await Reading.create({
    user: req.user.id,
    tipo_lectura,
    prompt_enviado: prompt,
    respuesta_generada: respuestaIA,
  });

  res.status(201).json({ success: true, data: lectura });
});

const getHistory = asyncHandler(async (req, res) => {
  const lecturas = await Reading.find({ user: req.user.id }).sort({ fecha: -1 });
  res.status(200).json({ success: true, data: lecturas });
});

module.exports = { generateReading, getHistory };
