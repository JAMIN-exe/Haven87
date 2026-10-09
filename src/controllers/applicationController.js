const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const { sendSuccess, sendError } = require('../utils/response');

exports.applyToOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return sendError(res, 'Opportunity not found.', 404);

        if (opportunity.status !== 'open')
            return sendError(res, 'This opportunity is closed.', 400);

        const existing = await Application.findOne({
            opportunityId: req.params.id,
            volunteerId: req.user._id
        });

        if (existing) return sendError(res, 'You have already applied to this opportunity.', 400);

        const application = await Application.create({
            opportunityId: req.params.id,
            volunteerId: req.user._id,
            message: req.body?.message || ''
        });

        sendSuccess(res, { application }, 'Application submitted successfully.', 201);
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ volunteerId: req.user._id })
            .populate('opportunityId', 'title description date location category')
            .sort({ createdAt: -1 });

        sendSuccess(res, { applications }, 'Your applications retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body || {};

        if (!['approved', 'rejected'].includes(status))
            return sendError(res, 'Status must be approved or rejected.', 400);

        const application = await Application.findById(req.params.id)
            .populate('opportunityId');

        if (!application) return sendError(res, 'Application not found.', 404);

        if (application.opportunityId.organizerId.toString() !== req.user._id.toString())
            return sendError(res, 'You can only manage applications for your own opportunities.', 403);

        application.status = status;
        await application.save();

        sendSuccess(res, { application }, `Application ${status}`);
    } catch (error) {
        sendError(res, error.message);
    }
};