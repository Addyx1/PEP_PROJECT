const Explanation = require('../models/Explanation');
const ActivityLog = require('../models/ActivityLog');
const { generateCodeExplanation } = require('../services/aiService');
const mockStore = require('../mockStore');

// @desc    Create new explanation
// @route   POST /api/explanations
// @access  Private
exports.createExplanation = async (req, res) => {
    try {
        console.log('Create Explanation Request:', req.body);
        const { title, language, code } = req.body;

        if (!code || !language) {
            console.log('Missing code or language');
            return res.status(400).json({ success: false, message: 'Please provide code and language' });
        }

        // Call AI Service
        console.log('Calling AI Service...');
        const aiResponse = await generateCodeExplanation(code, language);
        console.log('AI Service Response received');

        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            console.log('Skip MongoDB is TRUE - saving to in-memory store');
            const mockExplanation = {
                _id: 'mock-explanation-' + Date.now(),
                userId: req.user.id,
                title: title || `Explanation for ${language} Snippet`,
                language,
                originalCode: code,
                explanationSummary: aiResponse.summary || aiResponse.explanation,
                detailedExplanation: aiResponse.lineByLine,
                complexityAnalysis: aiResponse.complexity,
                issues: aiResponse.issues || [],
                improvements: aiResponse.improvements,
                optimizedCode: aiResponse.optimizedCode,
                createdAt: new Date(),
                updatedAt: new Date(),
            };


            // Save to in-memory store so History page can show it
            mockStore.explanations.unshift(mockExplanation);
            mockStore.activityLogs.unshift({
                _id: 'mock-log-' + Date.now(),
                userId: req.user.id,
                explanationId: mockExplanation,
                action: 'CREATED_EXPLANATION',
                timestamp: new Date(),
            });

            return res.status(201).json({
                success: true,
                data: mockExplanation,
            });
        }

        console.log('Creating Explanation in MongoDB...');
        const explanation = await Explanation.create({
            userId: req.user.id,
            title: title || `Explanation for ${language} Snippet`,
            language,
            originalCode: code,
            explanationSummary: aiResponse.summary || aiResponse.explanation,
            detailedExplanation: aiResponse.lineByLine,
            complexityAnalysis: aiResponse.complexity,
            issues: aiResponse.issues || [],
            improvements: aiResponse.improvements,
            optimizedCode: aiResponse.optimizedCode,
        });
        console.log('Explanation created in DB:', explanation._id);

        // Log Activity
        console.log('Logging Activity...');
        await ActivityLog.create({
            userId: req.user.id,
            explanationId: explanation._id,
            action: 'CREATED_EXPLANATION',
        });
        console.log('Activity logged');

        res.status(201).json({
            success: true,
            data: explanation,
        });
    } catch (error) {
        console.error('Explanation Controller Error:', error);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

// @desc    Get all explanations
// @route   GET /api/explanations
// @access  Private
exports.getExplanations = async (req, res) => {
    try {
        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            let results = mockStore.explanations.filter(e => e.userId === req.user.id);
            const { search, language, sort } = req.query;
            if (search) results = results.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
            if (language) results = results.filter(e => e.language === language);
            if (sort === 'oldest') results = results.reverse();
            return res.status(200).json({
                success: true,
                count: results.length,
                data: results,
            });
        }

        const { search, language, sort } = req.query;
        let query = { userId: req.user.id };

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (language) {
            query.language = language;
        }

        let sortOption = { createdAt: -1 }; // Default desc
        if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        }

        const explanations = await Explanation.find(query).sort(sortOption);

        res.status(200).json({
            success: true,
            count: explanations.length,
            data: explanations,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single explanation
// @route   GET /api/explanations/:id
// @access  Private
exports.getExplanation = async (req, res) => {
    try {
        const explanation = await Explanation.findById(req.params.id);

        if (!explanation) {
            return res.status(404).json({ success: false, message: 'Explanation not found' });
        }

        // Make sure user owns the explanation
        if (explanation.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        res.status(200).json({
            success: true,
            data: explanation,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete explanation
// @route   DELETE /api/explanations/:id
// @access  Private
exports.deleteExplanation = async (req, res) => {
    try {
        const explanation = await Explanation.findById(req.params.id);

        if (!explanation) {
            return res.status(404).json({ success: false, message: 'Explanation not found' });
        }

        // Make sure user owns the explanation
        if (explanation.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await explanation.deleteOne();

        // Log Activity
        await ActivityLog.create({
            userId: req.user.id,
            explanationId: req.params.id,
            action: 'DELETED_EXPLANATION',
        });

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
