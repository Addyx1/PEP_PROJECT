const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    path: String,
    fileType: String,
    size: Number,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['active', 'deleted', 'archived'],
        default: 'active',
    },
}, {
    timestamps: true,
});

FileSchema.index({ uploadedBy: 1, createdAt: -1 });

module.exports = mongoose.model('File', FileSchema);
