import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCategory } from '../../api/analytics';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { useEffect, useState } from 'react';
import type { AnalyticsCategory } from '../../types';

const COLORS = ['#06B6D4', '#1E3A8A', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function CrimeCategoryChart() {
  const [data, setData] = useState<AnalyticsCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategory().then((response) => {
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
      <h2 className="text-xl font-bold text-white mb-6">Crime by Category</h2>
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label
              outerRadius={120}
              fill="#8884d8"
              dataKey="total"
              nameKey="category"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}