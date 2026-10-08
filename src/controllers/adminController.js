const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

exports.getPendingOrganizers = async (req, res) => {
    try {
        const organizers = await User.find({
            role: 'organizer',
            cacVerified: false
        }).select('-password');

        sendSuccess(res, { organizers }, 'Pending organizers retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getAllOrganizers = async (req, res) => {
    try {
        const organizers = await User.find({ role: 'organizer' }).select('-password');
        sendSuccess(res, { organizers }, 'Organizers retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.verifyOrganizer = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return sendError(res, 'User not found.', 404);
        if (user.role !== 'organizer') return sendError(res, 'User is not an organizer.', 400);

        user.cacVerified = true;
        await user.save();

        sendSuccess(res, {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                cacNumber: user.cacNumber,
                cacVerified: user.cacVerified
            }
        }, 'Organizer verified successfully');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.rejectOrganizer = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return sendError(res, 'User not found.', 404);

        user.cacVerified = false;
        await user.save();

        sendSuccess(res, { user }, 'Organizer rejected');
    } catch (error) {
        sendError(res, error.message);
    }
};