const ResetRequest = require('../models/resetRequest');

// Get recent password reset requests
exports.getRecentResetRequests = async (req, res) => {
    try {
        const resetRequests = await ResetRequest.find().sort({ createdAt: -1 }).limit(5);
        res.json(resetRequests);
    } catch (error) {
        console.error('Error fetching reset requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
