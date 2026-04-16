import api from './api';

export const bookingService = {
  getSlots:      (stylistId, date) => api.get(`/appointments/slots?stylistId=${stylistId}&date=${date}`),
  create:        (data)            => api.post('/appointments', data),
  getMyBookings: ()                => api.get('/appointments/my'),
  cancel:        (id, reason)      => api.put(`/appointments/${id}/cancel`, { reason }),

  // admin
  getAll:        (params)          => api.get('/appointments/admin/all', { params }),
  updateStatus:  (id, data)        => api.put(`/appointments/admin/${id}/status`, data),
  getStats:      ()                => api.get('/appointments/admin/stats'),
};