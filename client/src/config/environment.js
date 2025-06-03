const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  apiBaseUrl: isDevelopment 
    ? 'http://localhost:5000/api' // Your local server URL
    : 'https://e2425-wads-l4bcg2-server.csbihub.id/api', // Production server URL
  clientBaseUrl: isDevelopment
    ? 'http://localhost:3000' // Local client URL
    : 'https://e2425-wads-l4bcg2-client.csbihub.id' // Production client URL
};

export default config;