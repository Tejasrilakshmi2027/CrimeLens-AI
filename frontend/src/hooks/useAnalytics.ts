import { useEffect, useState } from 'react';
import { getMonthly } from '../api/analytics';
import type { MonthlyTrend } from '../types';

export function useAnalytics() {
  const [monthly, setMonthly] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMonthly();
      setMonthly(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error(err);
      // Set fallback data if API fails
      setMonthly([
        { month: 'Jan', year: 2024, total_cases: 1245, solved_cases: 987, pending_cases: 258 },
        { month: 'Feb', year: 2024, total_cases: 1132, solved_cases: 945, pending_cases: 187 },
        { month: 'Mar', year: 2024, total_cases: 1089, solved_cases: 912, pending_cases: 177 },
        { month: 'Apr', year: 2024, total_cases: 1156, solved_cases: 1023, pending_cases: 133 },
        { month: 'May', year: 2024, total_cases: 1234, solved_cases: 1089, pending_cases: 145 },
        { month: 'Jun', year: 2024, total_cases: 1189, solved_cases: 1056, pending_cases: 133 },
        { month: 'Jul', year: 2024, total_cases: 1267, solved_cases: 1123, pending_cases: 144 },
        { month: 'Aug', year: 2024, total_cases: 1312, solved_cases: 1178, pending_cases: 134 },
        { month: 'Sep', year: 2024, total_cases: 1289, solved_cases: 1156, pending_cases: 133 },
        { month: 'Oct', year: 2024, total_cases: 1345, solved_cases: 1212, pending_cases: 133 },
        { month: 'Nov', year: 2024, total_cases: 1298, solved_cases: 1167, pending_cases: 131 },
        { month: 'Dec', year: 2024, total_cases: 1378, solved_cases: 1234, pending_cases: 144 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh every 60 seconds for real-time analytics data
    const interval = setInterval(() => {
      fetchData();
      setLastUpdated(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    monthly,
    loading,
    error,
    lastUpdated,
  };
}