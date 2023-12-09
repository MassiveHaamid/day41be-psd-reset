const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Register a new user
router.post('/register', AuthController.registerUser);

module.exports = router;
