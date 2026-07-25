export interface DashboardSummary {
  total_cases: number;
  pending_cases: number;
  solved_cases: number;
  arrests: number;
  completed_cases?: number;
}

export interface RecentCrime {
  crime_number: string;
  case_number: string;
  crime_type: string;
  district: string;
  officer: string;
  status: string;
  date: string;
}

export interface CrimeHead {
  category: string;
  count: number;
  percentage: number;
}

export interface DistrictCrime {
  district: string;
  total_crimes: number;
  solved: number;
  pending: number;
}

export interface CrimeCategory {
  category: string;
  count: number;
  trend: number;
}

export interface AnalyticsCategory {
  category: string;
  count: number;
  solved: number;
  pending: number;
  arrest_rate: number;
}

export interface AnalyticsDistrict {
  district: string;
  total: number;
}

export interface AnalyticsStation {
  station: string;
  total: number;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  total_cases: number;
  solved_cases: number;
  pending_cases: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  sql_query?: string;
  data?: unknown[];
  suggestions?: string[];
}

export interface Case {
  id: string;
  crime_number: string;
  case_number: string;
  crime_type: string;
  district: string;
  station: string;
  officer: string;
  status: 'Pending' | 'In Progress' | 'Solved' | 'Closed';
  date: string;
  description?: string;
  location?: string;
  arrests?: number;
}

export interface Officer {
  id: string;
  name: string;
  badge_number: string;
  rank: string;
  department: string;
  district: string;
  station: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface CrimeLocation {
  id: string;
  crime_number: string;
  crime_type: string;
  latitude: number;
  longitude: number;
  district: string;
  status: string;
  date: string;
  isImportant?: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Theme {
  mode: 'dark' | 'light';
  primaryColor: string;
}

export interface Settings {
  theme: Theme;
  notifications: boolean;
  language: string;
  aiSettings: {
    model: string;
    temperature: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TableFilter {
  column: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  value: unknown;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
