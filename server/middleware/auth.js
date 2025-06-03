const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    let user = await User.findOne({ 
      _id: decoded._id,
      'tokens.token': token 
    });

    if (!user) {
      user = await User.findOne({ _id: decoded._id });
      if (user) {
        user.tokens = user.tokens || [];
        user.tokens.push({ token });
        await user.save();
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found or token is invalid' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;
