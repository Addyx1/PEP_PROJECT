const Explanation = require('../models/Explanation');
const ActivityLog = require('../models/ActivityLog');
const mongoose = require('mongoose');

// @desc    Get user analytics
// @route   GET /api/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
    try {
        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            return res.status(200).json({
                success: true,
                data: {
                    totalExplanations: 0,
                    languageStats: [],
                    recentActivity: []
                }
            });
        }

        const userId = req.user.id;

        const totalExplanations = await Explanation.countDocuments({ userId });

        // Aggregation for languages
        let userObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(userId);
        } catch {
            userObjectId = userId;
        }
        const languageStats = await Explanation.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: '$language', count: { $sum: 1 } } }
        ]);

        const recentActivity = await ActivityLog.find({ userId })
            .sort({ timestamp: -1 })
            .limit(10)
            .populate('explanationId', 'title');

        res.status(200).json({
            success: true,
            data: {
                totalExplanations,
                languageStats,
                recentActivity
            }
        });
    } catch (error) {
        console.error("Analytics Error", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
