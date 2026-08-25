// Fase 2-c: registro y login. register hashea la contraseña con bcrypt antes
// de guardarla, login la compara y devuelve un JWT firmado.
// Fase 5: se reescriben ambas funciones con asyncHandler + ApiError en vez
// de try/catch y res.status().json() manuales.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

function generarToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

const register = asyncHandler(async (req, res) => {
  const { nombre_completo, email, password, fecha_nacimiento } = req.body;

  const existente = await User.findOne({ email: email.toLowerCase() });
  if (existente) {
    throw new ApiError(409, 'Ya existe un usuario registrado con ese email');
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const usuario = await User.create({
    nombre_completo,
    email,
    password_hash,
    fecha_nacimiento,
  });

  res.status(201).json({
    success: true,
    data: {
      id: usuario._id,
      nombre_completo: usuario.nombre_completo,
      email: usuario.email,
      fecha_nacimiento: usuario.fecha_nacimiento,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // select('+password_hash') es necesario porque el modelo lo oculta por defecto
  const usuario = await User.findOne({ email: email.toLowerCase() }).select('+password_hash');
  if (!usuario) {
    throw new ApiError(401, 'Credenciales inválidas');
  }

  const passwordValido = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordValido) {
    throw new ApiError(401, 'Credenciales inválidas');
  }

  const token = generarToken(usuario._id);

  res.json({
    success: true,
    data: {
      token,
      usuario: {
        id: usuario._id,
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
      },
    },
  });
});

module.exports = { register, login };
