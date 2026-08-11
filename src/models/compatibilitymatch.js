const mongoose = require('mongoose');

const compatibilityMatchSchema = new mongoose.Schema({
    usuario_a_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    usuario_b_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    puntaje: { type: Number, required: true },
    interpretacion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CompatibilityMatch', compatibilityMatchSchema);