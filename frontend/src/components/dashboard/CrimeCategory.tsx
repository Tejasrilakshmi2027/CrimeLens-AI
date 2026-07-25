import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import Card from '../common/Card';
import Loader from '../common/Loader';

export default function CrimeCategory() {
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

  // Calculate category distribution from monthly data
  const totalCases = monthly.reduce((sum, item) => sum + item.total_cases, 0);
  
  // Mock category distribution based on typical crime patterns
  const categoryData = [
    { name: 'Property Crime', value: Math.round(totalCases * 0.35), color: '#06B6D4' },
    { name: 'Cyber Crime', value: Math.round(totalCases * 0.15), color: '#22C55E' },
    { name: 'Economic Offence', value: Math.round(totalCases * 0.20), color: '#F59E0B' },
    { name: 'Crime Against Women', value: Math.round(totalCases * 0.12), color: '#EF4444' },
    { name: 'Violent Crime', value: Math.round(totalCases * 0.10), color: '#8B5CF6' },
    { name: 'Other', value: Math.round(totalCases * 0.08), color: '#EC4899' },
  ].filter(item => item.value > 0);

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Crime by Category</h2>
        <span className="text-sm text-gray-400">Distribution</span>
      </div>
      
      <div style={{ height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
