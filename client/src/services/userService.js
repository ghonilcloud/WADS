import api from './api';

const userService = {
  // User profile operations
  async updateProfile(userData) {
    try {
      const response = await api.patch('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async uploadProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await api.post('/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload profile picture');
    }
  },

  // Admin-specific operations
  async getServiceAgents() {
    try {
      const response = await api.get('/user/role/agents');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get service agents');
    }
  },

  async getCustomers() {
    try {
      const response = await api.get('/user/role/customers');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get customers');
    }
  },

  async createServiceAgent(agentData) {
    try {
      const response = await api.post('/user/admin/agent', agentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create service agent');
    }
  },
  
  async updateUserRole(userId, role) {
    try {
      const response = await api.patch(`/user/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
  },
  
  async removeUser(userId) {
    try {
      const response = await api.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove user');
    }
  }
};

export default userService;
