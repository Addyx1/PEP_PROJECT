const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
    dayRange: {
        type: String,
        required: true,
    },
    activities: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'pending'],
        default: 'pending',
    },
    order: {
        type: Number,
        index: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
