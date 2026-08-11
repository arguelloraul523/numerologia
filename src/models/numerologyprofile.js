const mongoose = require('mongoose');

const numerologyProfileSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // un perfil por usuario
  },
  numero_vida: { type: Number, required: true },
  numero_expresion: { type: Number, required: true },
  numero_alma: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('NumerologyProfile', numerologyProfileSchema);