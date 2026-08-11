const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  }
}, {
  timestamps: { createdAt: 'fecha_registro', updatedAt: false }
});

module.exports = mongoose.model('User', userSchema);