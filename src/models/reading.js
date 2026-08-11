const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    prompt_enviado: { type: String, required: true },
  respuesta_generada: { type: String, required: true },
  tipo_lectura: {
    type: String,
    enum:['diaria','general','anual'],
    required: true
  },
  fecha: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Reading', readingSchema);