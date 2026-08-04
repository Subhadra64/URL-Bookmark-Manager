import api from './api';
export const login = (data) => api.post('/auth/login', data).then((response) => response.data);
export const register = (data) => api.post('/auth/register', data).then((response) => response.data);
export const fetchMe = () => api.get('/auth/me').then((response) => response.data.user);
