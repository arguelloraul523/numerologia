// Fase 2-b: rutas base de autenticación.
// Fase 5: se agregan registerValidators/loginValidators + validate antes del controlador.
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { registerValidators, loginValidators } = require('../validators/auth.validators');
const validate = require('../middlewares/validate');

router.post('/register', registerValidators, validate, register);
router.post('/login', loginValidators, validate, login);

module.exports = router;
