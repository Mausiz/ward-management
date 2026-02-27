import axios from 'axios';

// In production, API is served from same origin. In dev, proxy handles it.
const api = axios.create({ 
  baseURL: import.meta.env.PROD ? '/api' : '/api' 
});

export const getDashboard = () => api.get('/dashboard').then(r => r.data);
export const getPatients = (params) => api.get('/patients', { params }).then(r => r.data);
export const getPatient = (id) => api.get(`/patients/${id}`).then(r => r.data);
export const createPatient = (data) => api.post('/patients', data).then(r => r.data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data).then(r => r.data);
export const deletePatient = (id) => api.delete(`/patients/${id}`).then(r => r.data);
export const getWards = () => api.get('/wards').then(r => r.data);
export const getWard = (id) => api.get(`/wards/${id}`).then(r => r.data);
export const getStaff = (params) => api.get('/staff', { params }).then(r => r.data);
