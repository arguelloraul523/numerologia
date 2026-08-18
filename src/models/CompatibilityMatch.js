const mongoose = require('mongoose');

const CompatibilityMatchSchema = new mongoose.Schema(
  {
    user_a: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user_b: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    puntaje: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    interpretacion_ia: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'CompatibilityMatches',
  }
);

module.exports = mongoose.model('CompatibilityMatch', CompatibilityMatchSchema);
