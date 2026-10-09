const express = require('express');
const router = express.Router();
const {
    createOpportunity,
    getOpportunities,
    getOpportunity,
    updateOpportunity,
    deleteOpportunity,
    getOpportunityApplicants
} = require('../controllers/opportunityController');
const { protect, isOrganizer } = require('../middleware/auth');

// Public
router.get('/', getOpportunities);
router.get('/:id', getOpportunity);

// Organizer only
router.post('/', protect, isOrganizer, createOpportunity);
router.put('/:id', protect, isOrganizer, updateOpportunity);
router.delete('/:id', protect, isOrganizer, deleteOpportunity);
router.get('/:id/applications', protect, isOrganizer, getOpportunityApplicants);

module.exports = router;