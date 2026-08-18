const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tipo_lectura: {
      type: String,
      enum: ['diaria', 'general', 'anual'],
      required: true,
    },
    prompt_enviado: {
      type: String,
      required: true,
    },
    respuesta_generada: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'Readings',
  }
);

module.exports = mongoose.model('Reading', ReadingSchema);
