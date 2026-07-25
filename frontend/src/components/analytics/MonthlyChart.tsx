import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMonthly } from '../../api/analytics';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { useEffect, useState } from 'react';
import type { MonthlyTrend } from '../../types';

export default function MonthlyChart() {
  const [data, setData] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonthly().then((response) => {
      setData(response);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <div className="h-[400px] flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-6">Monthly Crime Trend</h2>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="total_cases" stroke="#06B6D4" strokeWidth={2} name="Total Cases" />
            <Line type="monotone" dataKey="solved_cases" stroke="#22C55E" strokeWidth={2} name="Solved Cases" />
            <Line type="monotone" dataKey="pending_cases" stroke="#F59E0B" strokeWidth={2} name="Pending Cases" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}