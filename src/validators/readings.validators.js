// Fase 5: reglas de validacion para /api/v1/readings/generate.
const { body } = require('express-validator');

const generateValidators = [
  body('tipo_lectura')
    .notEmpty()
    .withMessage('tipo_lectura es obligatorio')
    .isIn(['diaria', 'general', 'anual'])
    .withMessage('tipo_lectura debe ser diaria, general o anual'),
];

module.exports = { generateValidators };
