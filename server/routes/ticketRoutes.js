const express = require('express');
const router = express.Router();
const { createTicket, updateTicket, deleteTicket, getTicketDetails, getUserTickets, getAllTickets } = require('../controllers/ticketController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


router.get('/all', auth, getAllTickets);
router.get('/list', auth, getUserTickets);
router.post('/create', auth, upload.array('attachments', 5), createTicket);
router.patch('/ticket/:ticketId', auth, upload.array('attachments', 5), updateTicket);
router.delete('/ticket/:ticketId', auth, deleteTicket);
router.get('/ticket/:ticketId', auth, getTicketDetails);

module.exports = router;