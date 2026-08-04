import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api', headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => { const token = localStorage.getItem('bookmark_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export const errorMessage = (error) => error.response?.data?.message ?? 'Something went wrong. Please try again.';
export default api;
