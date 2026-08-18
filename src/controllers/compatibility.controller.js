async function checkCompatibility(req, res) {
  return res.status(501).json({
    success: false,
    message: 'Endpoint check pendiente de integración con Gemini (Fase 4)',
  });
}

module.exports = { checkCompatibility };
