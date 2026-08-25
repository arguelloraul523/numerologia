// Fase 5: reglas de validacion para /api/v1/compatibility/check.
const { body } = require('express-validator');

const checkValidators = [
  body('otro_usuario_id')
    .notEmpty()
    .withMessage('otro_usuario_id es obligatorio')
    .isMongoId()
    .withMessage('otro_usuario_id debe ser un ObjectId válido'),
];

module.exports = { checkValidators };
