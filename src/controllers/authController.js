const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/response');

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, role, cacNumber } = req.body;

        if (!fullName || !email || !password || !role)
            return sendError(res, 'Please fill in all required fields.', 400);

        if (!['organizer', 'volunteer', 'admin'].includes(role))
            return sendError(res, 'Role must be organizer, volunteer, or admin.', 400);

        if (role === 'organizer' && !cacNumber)
            return sendError(res, 'CAC number is required for organizers.', 400);

        const existing = await User.findOne({ email });
        if (existing) return sendError(res, 'Email already registered.', 400);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            cacNumber: role === 'organizer' ? cacNumber : null
        });

        const token = generateToken(user._id);

        sendSuccess(res, {
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                cacNumber: user.cacNumber,
                cacVerified: user.cacVerified
            }
        }, 'Registration successful!', 201);
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return sendError(res, 'Please provide email and password.', 400);

        const user = await User.findOne({ email });
        if (!user) return sendError(res, 'Invalid email or password.', 400);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return sendError(res, 'Invalid email or password.', 400);

        const token = generateToken(user._id);

        sendSuccess(res, {
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                cacNumber: user.cacNumber,
                cacVerified: user.cacVerified
            }
        }, 'Login successful!');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getMe = async (req, res) => {
    try {
        sendSuccess(res, { user: req.user }, 'Profile retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};