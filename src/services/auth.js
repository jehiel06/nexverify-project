// Simple authentication service
const AUTH_TOKEN_KEY = 'nexverify_admin_token';
const USER_DATA_KEY = 'nexverify_admin_user';

const MOCK_ADMIN = {
  email: 'admin@nexverify.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'super_admin',
  id: 'admin-001'
};

export const authService = {
  login: async (email, password) => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Date.now()}`;
      const user = {
        ...MOCK_ADMIN,
        token,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      
      return user;
    }
    
    throw new Error('Invalid email or password');
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
};

export default authService;