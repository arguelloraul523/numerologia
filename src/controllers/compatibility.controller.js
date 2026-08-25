// Fase 2-b: la ruta /check existía solo como placeholder.
// Fase 4: se implementa de verdad: trae los dos perfiles, calcula el puntaje
// (numerology.service.js) y le pide a Gemini una interpretación de la relación.
const NumerologyProfile = require('../models/NumerologyProfile');
const CompatibilityMatch = require('../models/CompatibilityMatch');
const { generarTexto } = require('../config/gemini');
const { calcularPuntajeCompatibilidad } = require('../services/numerology.service');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

function construirPrompt(perfilA, perfilB, puntaje) {
  return 'Eres un numerólogo profesional. Analiza la compatibilidad entre dos personas. '
    + `Persona A: Camino de Vida ${perfilA.numero_vida}, Expresión ${perfilA.numero_expresion}, Alma ${perfilA.numero_alma}. `
    + `Persona B: Camino de Vida ${perfilB.numero_vida}, Expresión ${perfilB.numero_expresion}, Alma ${perfilB.numero_alma}. `
    + `El puntaje de compatibilidad calculado es ${puntaje} sobre 100. `
    + 'Explica en español, en no más de 3 párrafos, las fortalezas y los posibles retos de esta relación.';
}

const checkCompatibility = asyncHandler(async (req, res) => {
  const { otro_usuario_id } = req.body;

  if (otro_usuario_id === req.user.id) {
    throw new ApiError(400, 'No puedes comparar tu perfil contigo mismo');
  }

  // req.user.id es quien hace la petición (user_a), otro_usuario_id es user_b
  const [perfilA, perfilB] = await Promise.all([
    NumerologyProfile.findOne({ user: req.user.id }),
    NumerologyProfile.findOne({ user: otro_usuario_id }),
  ]);

  if (!perfilA) {
    throw new ApiError(400, 'Primero debes calcular tu perfil numerológico');
  }
  if (!perfilB) {
    throw new ApiError(404, 'El otro usuario no tiene un perfil numerológico calculado');
  }

  const puntaje = calcularPuntajeCompatibilidad(perfilA, perfilB);
  const prompt = construirPrompt(perfilA, perfilB, puntaje);
  const interpretacion_ia = await generarTexto(prompt);

  const match = await CompatibilityMatch.create({
    user_a: req.user.id,
    user_b: otro_usuario_id,
    puntaje,
    interpretacion_ia,
  });

  res.status(201).json({ success: true, data: match });
});

module.exports = { checkCompatibility };
