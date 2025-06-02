import api from './api';

const authService = {
  async sendVerificationEmail(userData) {
    try {
      const response = await api.post('/user/send-verification', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send verification email');
    }
  },

  async verifyOTP(email, otp) {
    try {
      const response = await api.post('/user/verify-otp', { email, otp });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Invalid verification code');
    }
  },

  async registerServiceAgent(agentData) {
    try {
      const response = await api.post('/user/signup/agent', agentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register service agent');
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/user/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async logout() {
    try {
      await api.post('/user/logout');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear token from local storage
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
  },

  async getUserById(userId) {
    try {
      const response = await api.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user');
    }
  },

  async handleOAuthCallback(code, state) {
    try {
      const response = await api.post('/auth/oauth/callback', { code, state });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'OAuth authentication failed');
    }
  },

  async completeOAuthSignup(userData) {
    try {
      const response = await api.post('/auth/oauth/complete-signup', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to complete OAuth signup');
    }
  }
};

export default authService;