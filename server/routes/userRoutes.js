const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.post('/send-verification', userController.sendVerification);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;