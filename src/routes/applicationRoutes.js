const express = require('express');
const router = express.Router();
const {
    applyToOpportunity,
    getMyApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, isOrganizer, isVolunteer } = require('../middleware/auth');

router.post('/opportunities/:id/apply', protect, isVolunteer, applyToOpportunity);
router.get('/applications/my', protect, isVolunteer, getMyApplications);
router.put('/applications/:id/status', protect, isOrganizer, updateApplicationStatus);

module.exports = router;