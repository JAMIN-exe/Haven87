const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const { sendSuccess, sendError } = require('../utils/response');

exports.createOpportunity = async (req, res) => {
    try {
        const { title, description, category, location, date, slots } = req.body;

        if (!title || !description || !category || !location || !date || !slots)
            return sendError(res, 'Please fill in all required fields.', 400);

        const opportunity = await Opportunity.create({
            title, description, category, location, date, slots,
            organizerId: req.user._id
        });

        sendSuccess(res, { opportunity }, 'Opportunity created successfully.', 201);
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getOpportunities = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;
        const query = { status: 'open' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) query.category = category;

        const skip = (Number(page) - 1) * Number(limit);

        const opportunities = await Opportunity.find(query)
            .populate('organizerId', 'fullName email cacVerified')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Opportunity.countDocuments(query);

        sendSuccess(res, {
            opportunities,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        }, 'Opportunities retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id)
            .populate('organizerId', 'fullName email cacNumber cacVerified');

        if (!opportunity) return sendError(res, 'Opportunity not found.', 404);

        sendSuccess(res, { opportunity }, 'Opportunity retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.updateOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return sendError(res, 'Opportunity not found.', 404);

        if (opportunity.organizerId.toString() !== req.user._id.toString())
            return sendError(res, 'You can only update your own opportunities.', 403);

        const updated = await Opportunity.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );

        sendSuccess(res, { opportunity: updated }, 'Opportunity updated');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return sendError(res, 'Opportunity not found.', 404);

        if (opportunity.organizerId.toString() !== req.user._id.toString())
            return sendError(res, 'You can only delete your own opportunities.', 403);

        await Opportunity.findByIdAndDelete(req.params.id);
        await Application.deleteMany({ opportunityId: req.params.id });

        sendSuccess(res, null, 'Opportunity deleted');
    } catch (error) {
        sendError(res, error.message);
    }
};

exports.getOpportunityApplicants = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) return sendError(res, 'Opportunity not found.', 404);

        if (opportunity.organizerId.toString() !== req.user._id.toString())
            return sendError(res, 'You can only view applicants for your own opportunities.', 403);

        const applications = await Application.find({ opportunityId: req.params.id })
            .populate('volunteerId', 'fullName email')
            .sort({ createdAt: -1 });

        sendSuccess(res, { applications }, 'Applicants retrieved');
    } catch (error) {
        sendError(res, error.message);
    }
};