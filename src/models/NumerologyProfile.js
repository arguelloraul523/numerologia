const mongoose = require('mongoose');

const NumerologyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    numero_vida: {
      type: Number,
      required: true,
    },
    numero_expresion: {
      type: Number,
      required: true,
    },
    numero_alma: {
      type: Number,
      required: true,
    },
    fecha_calculo: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'NumerologyProfiles',
  }
);

module.exports = mongoose.model('NumerologyProfile', NumerologyProfileSchema);
