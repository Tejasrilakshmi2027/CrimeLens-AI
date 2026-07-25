import api from './axios';
import type { AnalyticsCategory, AnalyticsDistrict, AnalyticsStation, MonthlyTrend } from '../types';

export const getCategory = async (): Promise<AnalyticsCategory[]> => {
  const { data } = await api.get<AnalyticsCategory[]>('/analytics/category');
  return data;
};

export const getDistrict = async (): Promise<AnalyticsDistrict[]> => {
  const { data } = await api.get<AnalyticsDistrict[]>('/analytics/district');
  return data;
};

export const getStation = async (): Promise<AnalyticsStation[]> => {
  const { data } = await api.get<AnalyticsStation[]>('/analytics/station');
  return data;
};

export const getMonthly = async (): Promise<MonthlyTrend[]> => {
  const { data } = await api.get<MonthlyTrend[]>('/analytics/monthly');
  return data;
};