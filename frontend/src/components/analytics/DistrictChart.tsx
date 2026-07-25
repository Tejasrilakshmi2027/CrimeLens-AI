import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDistrict } from '../../api/analytics';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { useEffect, useState } from 'react';
import type { AnalyticsDistrict } from '../../types';

export default function DistrictChart() {
  const [data, setData] = useState<AnalyticsDistrict[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDistrict().then((response) => {
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
      <h2 className="text-xl font-bold text-white mb-6">Crime by District</h2>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="district" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="total" fill="#06B6D4" name="Total Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}