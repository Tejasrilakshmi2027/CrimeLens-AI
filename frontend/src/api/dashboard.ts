import api from './axios';
import type { DashboardSummary, RecentCrime, CrimeHead, DistrictCrime } from '../types';

export const getSummary = async (): Promise<DashboardSummary> => {
  const { data } = await api.get<DashboardSummary>('/api/dashboard/summary');
  return data;
};

export const getRecentCases = async (): Promise<RecentCrime[]> => {
  const { data } = await api.get<RecentCrime[]>('/api/dashboard/recent');
  return data;
};

export const getCrimeHead = async (): Promise<CrimeHead[]> => {
  const { data } = await api.get<CrimeHead[]>('/api/dashboard/crime-head');
  return data;
};

export const getDistrictCrime = async (): Promise<DistrictCrime[]> => {
  const { data } = await api.get<DistrictCrime[]>('/api/dashboard/district');
  return data;
};