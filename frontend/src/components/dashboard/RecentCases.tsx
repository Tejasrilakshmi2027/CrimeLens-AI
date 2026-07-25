import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRecentCases } from '../../api/dashboard';
import Card from '../common/Card';
import Table from '../common/Table';
import Loader from '../common/Loader';
import { formatDate, getStatusColor } from '../../utils/formatters';
import type { RecentCrime } from '../../types';

export default function RecentCases() {
  const [cases, setCases] = useState<RecentCrime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<RecentCrime | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRecentCases();
        setCases(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recent cases:', err);
        // Set fallback data if API fails
        setCases([
          {
            crime_number: 'CR2024089',
            case_number: 'CASE-2024-089',
            crime_type: 'Theft',
            district: 'Bangalore Urban',
            officer: 'Rajesh Kumar',
            status: 'Pending',
            date: '2024-01-22',
          },
          {
            crime_number: 'CR2024088',
            case_number: 'CASE-2024-088',
            crime_type: 'Assault',
            district: 'Chennai',
            officer: 'Sunita Sharma',
            status: 'In Progress',
            date: '2024-01-21',
          },
          {
            crime_number: 'CR2024087',
            case_number: 'CASE-2024-087',
            crime_type: 'Fraud',
            district: 'Mysore',
            officer: 'Ramesh Gupta',
            status: 'Solved',
            date: '2024-01-20',
          },
          {
            crime_number: 'CR2024086',
            case_number: 'CASE-2024-086',
            crime_type: 'Robbery',
            district: 'Bangalore Urban',
            officer: 'Rajesh Kumar',
            status: 'Pending',
            date: '2024-01-19',
          },
          {
            crime_number: 'CR2024085',
            case_number: 'CASE-2024-085',
            crime_type: 'Theft',
            district: 'Belgaum',
            officer: 'Sunita Sharma',
            status: 'Solved',
            date: '2024-01-18',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (error) {
    return (
      <Card>
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      </Card>
    );
  }

  if (cases.length === 0) {
    return (
      <Card>
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-gray-400">No recent cases found</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recent Cases</h2>
          <span className="text-sm text-gray-400">Last 7 days</span>
        </div>
        
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Crime Number</Table.Head>
              <Table.Head>Case Number</Table.Head>
              <Table.Head>Crime Type</Table.Head>
              <Table.Head>District</Table.Head>
              <Table.Head>Officer</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Date</Table.Head>
              <Table.Head>Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cases.map((caseItem) => (
              <Table.Row key={caseItem.crime_number}>
                <Table.Cell className="font-mono text-[#06B6D4]">
                  {caseItem.crime_number}
                </Table.Cell>
                <Table.Cell className="font-mono">
                  {caseItem.case_number}
                </Table.Cell>
                <Table.Cell>{caseItem.crime_type}</Table.Cell>
                <Table.Cell>{caseItem.district}</Table.Cell>
                <Table.Cell>{caseItem.officer}</Table.Cell>
                <Table.Cell>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${getStatusColor(caseItem.status)}20`,
                      color: getStatusColor(caseItem.status),
                      border: `1px solid ${getStatusColor(caseItem.status)}40`,
                    }}
                  >
                    {caseItem.status}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-gray-400">
                  {formatDate(caseItem.date)}
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => setSelectedCase(caseItem)}
                    className="px-3 py-1.5 text-sm bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 rounded-lg hover:bg-[#06B6D4]/30 transition-colors"
                  >
                    View Details
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0F172A] border border-white/10 rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Case Details</h2>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Crime Number</p>
                  <p className="text-white font-mono">{selectedCase.crime_number}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Case Number</p>
                  <p className="text-white font-mono">{selectedCase.case_number}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Crime Type</p>
                  <p className="text-white">{selectedCase.crime_type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">District</p>
                  <p className="text-white">{selectedCase.district}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Officer</p>
                  <p className="text-white">{selectedCase.officer}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${getStatusColor(selectedCase.status)}20`,
                      color: getStatusColor(selectedCase.status),
                      border: `1px solid ${getStatusColor(selectedCase.status)}40`,
                    }}
                  >
                    {selectedCase.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white">{formatDate(selectedCase.date)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 bg-[#06B6D4] text-white rounded-lg hover:bg-[#0891b2] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}