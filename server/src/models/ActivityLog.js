const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    action: {
        type: String, // e.g., 'CREATED_EXPLANATION', 'LOGIN', 'FILE_UPLOAD'
        required: true,
        index: true,
    },
    explanationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Explanation',
    },
    details: mongoose.Schema.Types.Mixed,
    impact: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    ipAddress: String,
}, {
    timestamps: true,
});

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ userId: 1, action: 1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
