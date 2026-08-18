const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nombre_completo: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
      select: false,
    },
    fecha_nacimiento: {
      type: Date,
      required: true,
    },
    fecha_registro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'Users',
  }
);

module.exports = mongoose.model('User', UserSchema);
