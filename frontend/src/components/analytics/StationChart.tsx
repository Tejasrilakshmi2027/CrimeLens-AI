import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getStation } from '../../api/analytics';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { useEffect, useState } from 'react';
import type { AnalyticsStation } from '../../types';

export default function StationChart() {
  const [data, setData] = useState<AnalyticsStation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStation().then((response) => {
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
      <h2 className="text-xl font-bold text-white mb-6">Crime by Police Station</h2>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 10)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis dataKey="station" type="category" width={150} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="total" fill="#06B6D4" name="Total Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}