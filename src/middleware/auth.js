const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, 'Not authorized. Please login.', 401);
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return sendError(res, 'User not found.', 401);

        req.user = user;
        next();
    } catch (error) {
        return sendError(res, 'Invalid or expired token.', 401);
    }
};

const isOrganizer = (req, res, next) => {
    if (req.user.role !== 'organizer') {
        return sendError(res, 'Only organizers can do this.', 403);
    }
    next();
};

const isVolunteer = (req, res, next) => {
    if (req.user.role !== 'volunteer') {
        return sendError(res, 'Only volunteers can do this.', 403);
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return sendError(res, 'Only admins can do this.', 403);
    }
    next();
};

module.exports = { protect, isOrganizer, isVolunteer, isAdmin };