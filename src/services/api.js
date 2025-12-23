import axios from 'axios';

// API Base URL - Change to your Spring Boot URL
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// QR Code API
export const qrCodeAPI = {
  // Generate batch of QR codes
  generateBatch: async (count, clientId) => {
    const response = await api.post('/admin/qrcodes/generate-batch', {
      count,
      clientId,
    });
    return response.data;
  },

  // Export batch as PDF
  exportBatchPDF: async (batchId) => {
    const response = await api.get(`/admin/qrcodes/export/pdf/${batchId}`, {
      responseType: 'blob', // Important for file download
    });
    return response.data;
  },

  // Get QR code statistics
  getStats: async () => {
    const response = await api.get('/admin/qrcodes/stats');
    return response.data;
  },

  // Get all batches
  getBatches: async () => {
    const response = await api.get('/admin/qrcodes/batches');
    return response.data;
  },
};

// Scan API
export const scanAPI = {
  // Get scan history
  getScanHistory: async (page = 0, size = 20) => {
    const response = await api.get('/admin/scans', {
      params: { page, size }
    });
    return response.data;
  },

  // Get fraud logs
  getFraudLogs: async () => {
    const response = await api.get('/admin/scans/fraud');
    return response.data;
  },

  // Get scan locations for map
  getScanLocations: async () => {
    const response = await api.get('/admin/scans/locations');
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getOverview: async () => {
    const response = await api.get('/admin/dashboard/overview');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get('/admin/dashboard/activity');
    return response.data;
  },
};

export default api;