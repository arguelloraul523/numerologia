// Fase 2-c: middleware que protege rutas verificando el JWT del header
// Authorization: Bearer <token>. Si es valido, deja el payload en req.user
// (req.user.id), que despues usan los controladores de numerology,
// readings y compatibility para saber de que usuario se trata.
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'No se proporcionó un token de autenticación'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    // jwt.verify lanza JsonWebTokenError o TokenExpiredError,
    // que el errorHandler de Fase 5 ya sabe traducir a 401.
    next(error);
  }
}

module.exports = { protect };
