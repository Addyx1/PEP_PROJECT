const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    formId: {
        type: String,
        required: true,
        index: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    validationState: {
        isValid: Boolean,
        errors: [String],
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'failed'],
        default: 'pending',
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

SubmissionSchema.index({ formId: 1, userId: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);
