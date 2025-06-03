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
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      if (!response.data || !response.data.user) {
        console.error('Invalid login response data:', response.data);
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        throw new Error(error.response.data?.message || `Login failed with status ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || 'Login failed');
      }
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
};

export default authService;