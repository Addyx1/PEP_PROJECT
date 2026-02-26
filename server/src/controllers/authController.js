const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, password } = req.body;
        const email = req.body.email ? req.body.email.toLowerCase().trim() : '';

        console.log('Registration attempt:', { name, email, hasPassword: !!password });

        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            console.log('Running in mock mode (SKIP_MONGODB=true)');
            const mockUserId = 'mock-user-' + Date.now();
            return res.status(201).json({
                success: true,
                token: generateToken(mockUserId),
                user: {
                    id: mockUserId,
                    name: name || 'Test User',
                    email: email || 'test@example.com',
                    createdAt: new Date(),
                }
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('Registration failed: User already exists');
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        console.log('User registered successfully:', user._id);

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email ? req.body.email.toLowerCase().trim() : '';

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            const mockUserId = 'mock-user-' + Date.now();
            return res.status(200).json({
                success: true,
                token: generateToken(mockUserId),
                user: {
                    id: mockUserId,
                    name: 'Test User',
                    email: email,
                    createdAt: new Date(),
                }
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        // MOCK RESPONSE IF MONGODB IS DISABLED
        if (process.env.SKIP_MONGODB === 'true') {
            return res.status(200).json({
                success: true,
                data: req.user
            });
        }

        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


