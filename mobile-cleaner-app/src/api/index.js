import axios from 'axios';
import { Alert } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.cleanpro-enterprise.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - attach auth token
api.interceptors.request.use(
  (config) => {
    const token = api.defaults.headers.common['Authorization'];
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token expired or invalid
          api.defaults.headers.common['Authorization'] = null;
          break;
        case 403:
          Alert.alert('Access Denied', 'You do not have permission to perform this action.');
          break;
        case 404:
          Alert.alert('Not Found', 'The requested resource was not found.');
          break;
        case 422:
          Alert.alert('Validation Error', data?.message || 'Please check your input and try again.');
          break;
        case 429:
          Alert.alert('Too Many Requests', 'Please wait a moment before trying again.');
          break;
        case 500:
          Alert.alert('Server Error', 'Something went wrong on our end. Please try again later.');
          break;
        default:
          Alert.alert('Error', data?.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      Alert.alert('Network Error', 'Please check your internet connection and try again.');
    } else {
      Alert.alert('Error', error.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

// Helper to set auth token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken }),
  logout: () => api.post('/auth/logout'),
};

// Booking endpoints
export const bookingsAPI = {
  getMyBookings: (params = {}) => api.get('/bookings/my', { params }),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id, status, data = {}) => api.patch(`/bookings/${id}/status`, { status, ...data }),
  checkIn: (id, location) => api.post(`/bookings/${id}/check-in`, location),
  checkOut: (id, location) => api.post(`/bookings/${id}/check-out`, location),
  getTodayBookings: () => api.get('/bookings/today'),
  getWeekBookings: (startDate, endDate) => api.get('/bookings/week', { params: { startDate, endDate } }),
};

// Photo endpoints
export const photosAPI = {
  uploadPhotos: (bookingId, formData) => {
    return api.post(`/bookings/${bookingId}/photos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    });
  },
  getBookingPhotos: (bookingId) => api.get(`/bookings/${bookingId}/photos`),
};

// Profile endpoints
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.patch('/profile', data),
  updateAvailability: (availability) => api.patch('/profile/availability', { availability }),
  getRating: () => api.get('/profile/rating'),
  getCertifications: () => api.get('/profile/certifications'),
  uploadAvatar: (formData) => api.post('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Earnings endpoints
export const earningsAPI = {
  getEarnings: (params = {}) => api.get('/earnings', { params }),
  getWeeklyEarnings: (weekStart) => api.get('/earnings/weekly', { params: { weekStart } }),
  getMonthlyEarnings: (month) => api.get('/earnings/monthly', { params: { month } }),
  getPayoutHistory: (params = {}) => api.get('/earnings/payouts', { params }),
  getEarningsBreakdown: (bookingId) => api.get(`/earnings/booking/${bookingId}`),
};

// Notification endpoints
export const notificationsAPI = {
  getNotifications: (params = {}) => api.get('/notifications', { params }),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  registerDeviceToken: (token) => api.post('/notifications/device-token', { token, platform: 'mobile' }),
};

export default api;
