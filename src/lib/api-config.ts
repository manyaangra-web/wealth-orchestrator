// src/lib/api-config.ts
const API_BASE_URL = 'http://16.171.34.205:8002/api';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup/`,
    LOGIN: `${API_BASE_URL}/auth/login/`,
    LOGOUT: `${API_BASE_URL}/auth/logout/`,
    REFRESH: `${API_BASE_URL}/auth/refresh/`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email/`,
  },
} as const;

export { API_BASE_URL };