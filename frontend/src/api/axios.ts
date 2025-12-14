import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/api/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login', data),
};

// Sweets API
export const sweetsAPI = {
  getAll: () => api.get('/api/sweets'),
  search: (params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) =>
    api.get('/api/sweets', { params }),
  create: (data: { name: string; category: string; price: number; quantity: number; description?: string }) =>
    api.post('/api/sweets', data),
  update: (id: string, data: { name?: string; category?: string; price?: number; quantity?: number; description?: string }) =>
    api.put(`/api/sweets/${id}`, data),
  delete: (id: string) => api.delete(`/api/sweets/${id}`),
  purchase: (id: string) =>
    api.post(`/api/sweets/${id}/purchase`),
  restock: (id: string, amount: number) =>
    api.post(`/api/sweets/${id}/restock`, { amount }),
};

export default api;
