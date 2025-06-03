const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.get('/ticket/:ticketId/messages', auth, getMessages);
router.post('/ticket/:ticketId/messages', auth, createMessage);

module.exports = router;