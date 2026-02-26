const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    metricName: {
        type: String,
        required: true,
        index: true,
    },
    value: {
        type: Number,
        required: true,
    },
    tags: [String],
    metadata: mongoose.Schema.Types.Mixed,
}, {
    timestamps: true,
});

// Optimized for dashboard aggregation
AnalyticsSchema.index({ metricName: 1, createdAt: -1 });
AnalyticsSchema.index({ userId: 1, metricName: 1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
