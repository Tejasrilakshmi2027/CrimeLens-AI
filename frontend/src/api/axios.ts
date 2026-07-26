import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from '../types';

// Backend API URL - deployed on Render

const api = axios.create({
  baseURL: 'https://crimelens-ai-wg4k.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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