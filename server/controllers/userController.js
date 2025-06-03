const User = require('../models/user');
// const Ticket = require('../models/ticket');
const { userSendMail } = require('./otpController');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs');

// Store OTPs in memory (in production, use Redis or similar)
const otpStore = new Map();

const signUp = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user already exists and is verified
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP with expiration
        otpStore.set(email, {
            otp,
            expiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
            userData: req.body // Store the user data temporarily
        });

        // Send OTP email
        await userSendMail(
            email,
            otp,
            "Verify Your Email",
            "Verify Email",
            res
        );

        res.status(200).json({
            message: `Verification code sent to ${email}`
        });
    } catch (error) {
        console.error("Error during signup initiation:", error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const sendVerification = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user exists and is verified
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'Email is already registered and verified' });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP with expiration
        otpStore.set(email, {
            otp,
            expiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
            userData: req.body // Store the user data temporarily
        });

        await userSendMail(
            email,
            otp,
            "Verify Your Email",
            "Verify Email",
            res
        );

    } catch (error) {
        console.error("Error sending verification:", error);
        res.status(500).json({ message: error.message || 'Failed to send verification email' });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Get stored OTP data
        const storedData = otpStore.get(email);
        
        if (!storedData || !storedData.otp) {
            return res.status(400).json({ message: 'No verification code found. Please request a new one.' });
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
        }

        if (storedData.otp !== otp) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        // Create and save the verified user
        const userData = storedData.userData;
        const newUser = new User({
            ...userData,
            isVerified: true
        });

        await newUser.save();
        const token = await newUser.generateAuthToken();

        // Clear OTP data
        otpStore.delete(email);

        res.json({
            user: {
                _id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            },
            token,
            message: 'Email verified and account created successfully'
        });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(400).json({ message: error.message || 'Verification failed' });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Pass email and password as separate parameters, not as an object
    const user = await User.findByCredentials(email, password);    
    const token = await user.generateAuthToken();
    res.json({ 
      user, 
      token,
      message: `Welcome back ${user.firstName}! Login successful.`
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  verifyOTP,
  sendVerification,
};