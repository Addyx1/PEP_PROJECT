const mongoose = require('mongoose');

const ExplanationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    language: {
        type: String,
        required: [true, 'Please select a language'],
        index: true,
    },
    originalCode: {
        type: String,
        required: [true, 'Please provide code'],
    },
    explanationSummary: String,
    detailedExplanation: [String],
    complexityAnalysis: String,
    issues: [String],
    improvements: [String],
    optimizedCode: String,
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

// Advanced logic for dashboard queries (aggregation friendly)
ExplanationSchema.index({ createdAt: -1, status: 1 });
ExplanationSchema.index({ title: 'text', originalCode: 'text' });

module.exports = mongoose.model('Explanation', ExplanationSchema);
