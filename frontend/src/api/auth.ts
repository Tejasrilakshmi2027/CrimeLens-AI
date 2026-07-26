import axios from 'axios';

const API_BASE_URL = 'https://crimelens-ai-wg4k.onrender.com';

export type UserRole = 'USER' | 'OFFICER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: UserRole;
  badge_number?: string;
  rank?: string;
  department?: string;
  phone?: string;
  assigned_station?: string;
  cases_handled: number;
  solved_cases: number;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  role?: UserRole;
  badge_number?: string;
  rank?: string;
  department?: string;
  phone?: string;
  assigned_station?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/api/auth/login`,
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post<User>(
      `${API_BASE_URL}/api/auth/register`,
      data
    );
    return response.data;
  },

  logout: async (token: string): Promise<{ message: string }> => {
    const response = await axios.post<{ message: string }>(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await axios.get<User>(
      `${API_BASE_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
};

export default authApi;
