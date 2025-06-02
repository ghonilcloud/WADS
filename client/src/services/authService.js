const API_URL = 'https://e2425-wads-l4bcg2-server.csbihub.id/api/user';

const authService = {  async sendVerificationEmail(userData) {
    const response = await fetch(`${API_URL}/send-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send verification email');
    }

    return data;
  },
  async verifyOTP(email, otp) {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Invalid verification code');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  },
  async registerServiceAgent(agentData) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/signup/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(agentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register service agent');
    }

    return data;  },


  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login response error:', response.status, errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || 'Login failed');
        } catch (e) {
          throw new Error(`Login failed with status ${response.status}: ${errorText.substring(0, 100)}`);
        }
      }

      const data = await response.json();
      
      if (!data || !data.user) {
        console.error('Invalid login response data:', data);
        throw new Error('Invalid response from server');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  async logout() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
    }
  },  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      // Get response text first, then try to parse as JSON
      const responseText = await response.text();
      
      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON parse error:', e, 'Response text:', responseText.substring(0, 100));
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user profile');
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },  async getUserById(userId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      if (!userId) {
        throw new Error('User ID is required');
      }

      const userIdStr = typeof userId === 'object' && userId._id ? userId._id.toString() : userId.toString();

      const response = await fetch(`${API_URL}/${userIdStr}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      // Get response text first, then try to parse as JSON
      const responseText = await response.text();
      
      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('JSON parse error:', e, 'Response text:', responseText.substring(0, 100));
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user data');
      }

      if (!data || !data.user) {
        throw new Error('User data not found');
      }

      return data.user;
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }
};

export default authService;