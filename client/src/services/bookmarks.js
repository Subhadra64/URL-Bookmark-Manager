import api from './api';
export const listBookmarks = (params) => api.get('/bookmarks', { params }).then((response) => response.data.bookmarks);
export const saveBookmark = (data, id) => id ? api.put(`/bookmarks/${id}`, data).then((response) => response.data.bookmark) : api.post('/bookmarks', data).then((response) => response.data.bookmark);
export const deleteBookmark = (id) => api.delete(`/bookmarks/${id}`);
export const toggleFavorite = (id) => api.patch(`/bookmarks/${id}/favorite`).then((response) => response.data.bookmark);
