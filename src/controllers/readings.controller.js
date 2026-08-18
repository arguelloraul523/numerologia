const Reading = require('../models/Reading');

async function generateReading(req, res) {
  return res.status(501).json({
    success: false,
    message: 'Endpoint generate pendiente de integración con Gemini (Fase 4)',
  });
}

async function getHistory(req, res) {
  try {
    const lecturas = await Reading.find({ user: req.user.id }).sort({ fecha: -1 });

    return res.status(200).json({
      success: true,
      data: lecturas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { generateReading, getHistory };
