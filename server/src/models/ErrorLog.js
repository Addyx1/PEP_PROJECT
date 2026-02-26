const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    message: {
        type: String,
        required: true,
    },
    stack: String,
    context: mongoose.Schema.Types.Mixed,
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium',
    },
    url: String,
    ipAddress: String,
}, {
    timestamps: true,
});

ErrorLogSchema.index({ severity: 1, createdAt: -1 });

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
