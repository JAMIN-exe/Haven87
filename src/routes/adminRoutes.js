const express = require('express');
const router = express.Router();
const {
    getPendingOrganizers,
    getAllOrganizers,
    verifyOrganizer,
    rejectOrganizer
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/auth');

router.get('/organizers', protect, isAdmin, getAllOrganizers);
router.get('/organizers/pending', protect, isAdmin, getPendingOrganizers);
router.put('/organizers/:id/verify', protect, isAdmin, verifyOrganizer);
router.put('/organizers/:id/reject', protect, isAdmin, rejectOrganizer);

module.exports = router;