import api from './api';

const analyticsService = {
    async getAnalyticsData() {
        try {
            const response = await api.get('/analytics');
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch analytics data');
        }
    },

    async getDashboardSummary() {
        try {
            const response = await api.get('/analytics/dashboard');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch dashboard summary');
        }
    },

    async getTicketStatistics(timeframe = 'month') {
        try {
            const response = await api.get(`/analytics/tickets?timeframe=${timeframe}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch ticket statistics');
        }
    },

    async getUserActivity(timeframe = 'week') {
        try {
            const response = await api.get(`/analytics/user-activity?timeframe=${timeframe}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch user activity data');
        }
    },

    async getSatisfactionMetrics() {
        try {
            const response = await api.get('/analytics/satisfaction');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch satisfaction metrics');
        }
    }
};

export default analyticsService;