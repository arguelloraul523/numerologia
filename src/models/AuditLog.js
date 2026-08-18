const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    metodo: {
      type: String,
      required: true,
    },
    status_code: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'AuditLogs',
  }
);

module.exports = mongoose.model('AuditLog', AuditLogSchema);
