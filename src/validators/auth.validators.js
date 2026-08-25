// Fase 5: reglas de validacion para /api/v1/auth.
// Se usan en src/routes/auth.routes.js, antes del middleware validate.
const { body } = require('express-validator');

const registerValidators = [
  body('nombre_completo').trim().notEmpty().withMessage('El nombre completo es obligatorio'),
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('fecha_nacimiento').isISO8601().withMessage('La fecha de nacimiento debe tener formato YYYY-MM-DD'),
];

const loginValidators = [
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

module.exports = { registerValidators, loginValidators };
