const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Forget Password
router.post('/forget-password', UserController.forgetPassword);

// Reset Password
router.post('/reset-password/:token', UserController.resetPassword);

module.exports = router;
