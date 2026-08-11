const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  metodo: { type: String, required: true },
  status_code: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // puede haber peticiones sin usuario autenticado (ej. login fallido)
  }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);