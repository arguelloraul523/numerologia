const CompatibilityMatch = require('../models/CompatibilityMatch');
const NumerologyProfile = require('../models/NumerologyProfile');

const checkCompatibility = async (req, res) => {
  // TODO Fase 4: comparar perfiles numerológicos y pedir análisis a Gemini
  res.status(501).json({ message: 'Pendiente: análisis de compatibilidad (Fase 4)' });
};

const getHistory = async (req, res) => {
  try {
    const matches = await CompatibilityMatch.find({
      $or: [
        { usuario_a_id: req.userId },
        { usuario_b_id: req.userId }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de compatibilidad', detalle: error.message });
  }
};

module.exports = { checkCompatibility, getHistory };