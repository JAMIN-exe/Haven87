const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
    },
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    message: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate applications
ApplicationSchema.index({ opportunityId: 1, volunteerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);