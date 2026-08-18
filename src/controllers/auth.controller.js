const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generarToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  try {
    const { nombre_completo, email, password, fecha_nacimiento } = req.body;

    if (!nombre_completo || !email || !password || !fecha_nacimiento) {
      return res.status(400).json({
        success: false,
        message: 'nombre_completo, email, password y fecha_nacimiento son obligatorios',
      });
    }

    const existente = await User.findOne({ email: email.toLowerCase() });
    if (existente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario registrado con ese email',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const usuario = await User.create({
      nombre_completo,
      email,
      password_hash,
      fecha_nacimiento,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: usuario._id,
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
        fecha_nacimiento: usuario.fecha_nacimiento,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'email y password son obligatorios',
      });
    }

    const usuario = await User.findOne({ email: email.toLowerCase() }).select('+password_hash');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);

    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const token = generarToken(usuario._id);

    return res.json({
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { register, login };
