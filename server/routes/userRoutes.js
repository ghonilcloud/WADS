const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 10000000 // 10MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'));
    }
    cb(undefined, true);
  }
});

router.post('/signup', userController.signUp);
router.post('/signup/agent', auth, userController.createServiceAgent);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.post('/send-verification', userController.sendVerification);
router.post('/verify-otp', userController.verifyOTP);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.patch('/profile', auth, userController.updateProfile);
router.get('/role/agents', auth, userController.getAgents);
router.get('/role/customers', auth, userController.getCustomers);
router.post('/profile-picture', auth, upload.single('profilePicture'), userController.uploadProfilePicture);
router.get('/id/:userId', auth, userController.getUserById);

module.exports = router;