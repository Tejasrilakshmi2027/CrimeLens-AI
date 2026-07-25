import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import Card from '../common/Card';
import Loader from '../common/Loader';

export default function DistrictCrime() {
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

  // Calculate district data based on monthly totals
  const totalCases = monthly.reduce((sum, item) => sum + item.total_cases, 0);
  const totalSolved = monthly.reduce((sum, item) => sum + item.solved_cases, 0);
  const totalPending = monthly.reduce((sum, item) => sum + item.pending_cases, 0);

  // Mock district distribution based on typical patterns
  const districtData = [
    { district: 'Bengaluru Urban', total: Math.round(totalCases * 0.40), solved: Math.round(totalSolved * 0.35), pending: Math.round(totalPending * 0.45) },
    { district: 'Mysuru', total: Math.round(totalCases * 0.20), solved: Math.round(totalSolved * 0.25), pending: Math.round(totalPending * 0.15) },
    { district: 'Belagavi', total: Math.round(totalCases * 0.15), solved: Math.round(totalSolved * 0.15), pending: Math.round(totalPending * 0.15) },
    { district: 'Dharwad', total: Math.round(totalCases * 0.12), solved: Math.round(totalSolved * 0.12), pending: Math.round(totalPending * 0.12) },
    { district: 'Shivamogga', total: Math.round(totalCases * 0.08), solved: Math.round(totalSolved * 0.08), pending: Math.round(totalPending * 0.08) },
    { district: 'Others', total: Math.round(totalCases * 0.05), solved: Math.round(totalSolved * 0.05), pending: Math.round(totalPending * 0.05) },
  ].filter(item => item.total > 0);

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Crime by District</h2>
        <span className="text-sm text-gray-400">Regional Distribution</span>
      </div>
      
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={districtData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="district" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
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
            <Legend />
            <Bar dataKey="total" fill="#06B6D4" name="Total Cases" radius={[4, 4, 0, 0]} />
            <Bar dataKey="solved" fill="#22C55E" name="Solved" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
