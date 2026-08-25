// Fase 2-a: esquema de la coleccion Users.
// Guarda los datos basicos del usuario y su contraseña ya encriptada.
// password_hash tiene select:false para que nunca salga en una consulta normal,
// hay que pedirlo a proposito con .select('+password_hash') (lo hace el login en Fase 2-c).
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nombre_completo: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true, select: false },
    fecha_nacimiento: { type: Date, required: true },
    fecha_registro: { type: Date, default: Date.now },
  },
  { collection: 'Users' }
);

module.exports = mongoose.model('User', UserSchema);
