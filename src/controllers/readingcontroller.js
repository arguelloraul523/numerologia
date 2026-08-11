const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.post('/generate', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Pendiente: integración con Gemini (Fase 4)' });
});

router.get('/history', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Pendiente: historial de lecturas' });
});

module.exports = router;