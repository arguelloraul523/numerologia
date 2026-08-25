// Fase 2-b: estructura original de calculateProfile y getProfile (antes eran
// solo un placeholder que respondía "pendiente").
// Fase 3: se conecta con el servicio real de cálculo (numerology.service.js).
// Fase 5: refactor con asyncHandler + ApiError.
const User = require('../models/User');
const NumerologyProfile = require('../models/NumerologyProfile');
const { calcularPerfilCompleto } = require('../services/numerology.service');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const calculateProfile = asyncHandler(async (req, res) => {
  // req.user.id viene del JWT, decodificado por el middleware protect (Fase 2-c)
  const usuario = await User.findById(req.user.id);
  if (!usuario) {
    throw new ApiError(404, 'Usuario no encontrado');
  }

  const { numero_vida, numero_expresion, numero_alma } = calcularPerfilCompleto(
    usuario.nombre_completo,
    usuario.fecha_nacimiento
  );

  // upsert: si ya existe un perfil para este usuario, lo actualiza en vez de duplicarlo
  const perfil = await NumerologyProfile.findOneAndUpdate(
    { user: usuario._id },
    {
      user: usuario._id,
      numero_vida,
      numero_expresion,
      numero_alma,
      fecha_calculo: new Date(),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({ success: true, data: perfil });
});

const getProfile = asyncHandler(async (req, res) => {
  const perfil = await NumerologyProfile.findOne({ user: req.user.id });
  if (!perfil) {
    throw new ApiError(404, 'Aún no has calculado tu perfil numerológico');
  }

  res.status(200).json({ success: true, data: perfil });
});

module.exports = { calculateProfile, getProfile };
