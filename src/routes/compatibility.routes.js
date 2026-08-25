// Fase 2-b: ruta base de compatibility.
// Fase 2-c: protect (requiere JWT).
// Fase 5: checkValidators + validate antes del controlador.
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { checkCompatibility } = require('../controllers/compatibility.controller');
const { checkValidators } = require('../validators/compatibility.validators');
const validate = require('../middlewares/validate');

router.post('/check', protect, checkValidators, validate, checkCompatibility);

module.exports = router;
