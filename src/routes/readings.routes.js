// Fase 2-b: rutas base de readings.
// Fase 2-c: protect (requieren JWT).
// Fase 5: generateValidators + validate antes del controlador.
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { generateReading, getHistory } = require('../controllers/readings.controller');
const { generateValidators } = require('../validators/readings.validators');
const validate = require('../middlewares/validate');

router.post('/generate', protect, generateValidators, validate, generateReading);
router.get('/history', protect, getHistory);

module.exports = router;
