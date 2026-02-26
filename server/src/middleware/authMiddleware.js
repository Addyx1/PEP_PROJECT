const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // SKIP DATABASE QUERY IF MONGODB IS DISABLED
            if (process.env.SKIP_MONGODB === 'true') {
                // Mock user for testing without database
                req.user = {
                    _id: decoded.id,
                    id: decoded.id,
                    name: 'Test User',
                    email: 'test@example.com'
                };
            } else {
                // Get user from the token
                req.user = await User.findById(decoded.id).select('-password');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
