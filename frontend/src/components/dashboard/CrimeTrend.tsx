import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import Card from '../common/Card';
import Loader from '../common/Loader';

export default function CrimeTrend() {
  const { monthly, loading } = useAnalytics();

  if (loading) {
    return (
      <Card>
        <div className="h-[350px] flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </Card>
    );
  }

  if (!monthly || monthly.length === 0) {
    return (
      <Card>
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-gray-400">No trend data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Monthly Crime Trend</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] text-sm">2024</span>
        </div>
      </div>
      
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly}>
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
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="total_cases"
              stroke="#06B6D4"
              fillOpacity={1}
              fill="url(#colorTotal)"
              name="Total Cases"
            />
            <Area
              type="monotone"
              dataKey="solved_cases"
              stroke="#22C55E"
              fillOpacity={1}
              fill="url(#colorSolved)"
              name="Solved Cases"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}