import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      details: error.response?.data?.details,
    };

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      apiError.message = 'You do not have permission to perform this action';
    }

    if (error.response?.status === 404) {
      apiError.message = 'The requested resource was not found';
    }

    if (error.response?.status === 500) {
      apiError.message = 'Internal server error. Please try again later';
    }

    return Promise.reject(apiError);
  }
);

export default api;