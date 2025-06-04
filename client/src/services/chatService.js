import api from './api';

const chatService = {
    async getMessages(ticketId) {
        try {
            const response = await api.get(`/chats/ticket/${ticketId}/messages`);
            return response.data.messages;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch messages');
        }
    },

    async sendMessage(ticketId, message) {
        try {
            const response = await api.post(`/chats/ticket/${ticketId}/messages`, { message });
            return response.data; // The server returns the chat message directly
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to send message');
        }
    },
};

export default chatService;