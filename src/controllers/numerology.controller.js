const User = require('../models/User');
const NumerologyProfile = require('../models/NumerologyProfile');
const { calcularPerfilCompleto } = require('../services/numerology.service');

async function calculateProfile(req, res) {
  try {
    const usuario = await User.findById(req.user.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    const { numero_vida, numero_expresion, numero_alma } = calcularPerfilCompleto(
      usuario.nombre_completo,
      usuario.fecha_nacimiento
    );

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

    return res.status(200).json({
      success: true,
      data: perfil,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProfile(req, res) {
  try {
    const perfil = await NumerologyProfile.findOne({ user: req.user.id });

    if (!perfil) {
      return res.status(404).json({
        success: false,
        message: 'Aún no has calculado tu perfil numerológico',
      });
    }

    return res.status(200).json({
      success: true,
      data: perfil,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { calculateProfile, getProfile };
