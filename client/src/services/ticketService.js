import api from './api';

const ticketService = {
    async getTicketsByUser() {
        try {
            const response = await api.get('/tickets/list');
            return response.data.tickets;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch tickets');
        }
    },

    async getTicketById(ticketId) {
        try {
            const response = await api.get(`/tickets/ticket/${ticketId}`);
            if (!response.data.ticket) {
                throw new Error('Ticket not found');
            }
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch ticket details');
        }
    },

    async submitSurvey(ticketId, { rating, feedback }) {
        try {
            const response = await api.patch(`/tickets/ticket/${ticketId}`, {
                rating,
                ratingFeedback: feedback
            });
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to submit survey');
        }
    },

    async getAllTickets() {
        try {
            const response = await api.get('/tickets/all');
            return response.data.tickets;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch tickets');
        }
    },

    async updateTicketStatus(ticketId, status) {
        try {
            const response = await api.patch(`/tickets/ticket/${ticketId}`, { status });
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update ticket status');
        }
    },

    async updateTicketPriority(ticketId, priority) {
        try {
            const response = await api.patch(`/tickets/ticket//${ticketId}`, { priority });
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update ticket priority');
        }
    },

    async assignTicket(ticketId, handlerId) {
        try {
            const response = await api.patch(`/tickets/ticket/${ticketId}`, { handlerId });
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to assign ticket');
        }
    },    async updateTicket(ticketId, updateData) {
        try {
            const response = await api.patch(`/tickets/ticket/${ticketId}`, updateData);
            return response.data.ticket;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update ticket');
        }
    },
    async createTicket(ticketData, files) {
        try {
            const formData = new FormData();
            
            // Add all ticket data to form
            Object.keys(ticketData).forEach(key => {
                formData.append(key, ticketData[key]);
            });
            
            // Add all files
            if (files && files.length) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('attachments', files[i]);
                }
            }
            
            const response = await api.post('/tickets/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create ticket');
        }
    }
};

export default ticketService;