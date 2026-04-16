import api from './api';

export const serviceService = {
  getAll:    (category) => api.get('/services', { params: category && category !== 'All' ? { category } : {} }),
  getById:   (id)       => api.get(`/services/${id}`),
  create:    (data)     => api.post('/services', data),
  update:    (id, data) => api.put(`/services/${id}`, data),
  remove:    (id)       => api.delete(`/services/${id}`),
};