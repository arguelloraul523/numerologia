// Fase 2-a: esquema de la coleccion NumerologyProfiles.
// Un documento por usuario (por eso "user" es unique), con los 3 numeros centrales.
// Fase 3 es la que llena estos campos calculandolos de verdad.
const mongoose = require('mongoose');

const NumerologyProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    numero_vida: { type: Number, required: true },
    numero_expresion: { type: Number, required: true },
    numero_alma: { type: Number, required: true },
    fecha_calculo: { type: Date, default: Date.now },
  },
  { collection: 'NumerologyProfiles' }
);

module.exports = mongoose.model('NumerologyProfile', NumerologyProfileSchema);
