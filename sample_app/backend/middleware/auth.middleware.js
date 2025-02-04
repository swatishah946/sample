const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        console.log("🔹 JWT_SECRET from .env:", process.env.JWT_SECRET);

        const authHeader = req.header('Authorization');
        console.log("🔹 Authorization Header:", authHeader);

        const token = authHeader?.split(' ')[1]; // Extract Bearer Token
        console.log("🔹 Extracted Token:", token);

        if (!token) {
            console.log("❌ No token provided.");
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        // Check if user exists in the database
        req.user = await User.findById(decoded.userId || decoded.id).select('-password');

        console.log("🔹 User Found in DB:", req.user);

        if (!req.user) {
            console.log("❌ User not found in the database.");
            return res.status(401).json({ error: 'Invalid token. User not found.' });
        }

        next();
    } catch (error) {
        console.log("❌ Error in authMiddleware:", error.message);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
