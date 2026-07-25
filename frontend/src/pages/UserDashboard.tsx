import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import CrimeTrend from '../components/dashboard/CrimeTrend';
import CrimeCategory from '../components/dashboard/CrimeCategory';
import DistrictCrime from '../components/dashboard/DistrictCrime';
import RecentCases from '../components/dashboard/RecentCases';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { Eye, AlertTriangle, FileText, TrendingUp } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { summary, loading } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.full_name || user?.username}!
        </h1>
        <p className="text-gray-400">
          Here's an overview of crime statistics and recent activities in your area.
        </p>
      </motion.div>

      {/* Quick Stats for Citizens */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6">
              <Loader size="sm" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Cases</p>
                <p className="text-2xl font-bold text-white">{summary?.total_cases?.toLocaleString() || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Solved Cases</p>
                <p className="text-2xl font-bold text-white">{summary?.completed_cases?.toLocaleString() || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending Cases</p>
                <p className="text-2xl font-bold text-white">{summary?.pending_cases?.toLocaleString() || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Arrests Made</p>
                <p className="text-2xl font-bold text-white">{summary?.arrests?.toLocaleString() || 0}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Crime Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CrimeTrend />
      </motion.div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <CrimeCategory />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DistrictCrime />
        </motion.div>
      </div>

      {/* Recent Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <RecentCases />
      </motion.div>

      {/* Safety Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Safety Tips for Citizens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold text-cyan-400 mb-2">Report Suspicious Activity</h3>
              <p className="text-gray-400 text-sm">If you see something suspicious, report it immediately to the nearest police station.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold text-cyan-400 mb-2">Stay Informed</h3>
              <p className="text-gray-400 text-sm">Keep yourself updated about crime trends in your area through our analytics dashboard.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold text-cyan-400 mb-2">Emergency Contacts</h3>
              <p className="text-gray-400 text-sm">Save emergency numbers: Police - 100, Women Helpline - 1091, Child Helpline - 1098</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold text-cyan-400 mb-2">Community Watch</h3>
              <p className="text-gray-400 text-sm">Participate in neighborhood watch programs to help keep your community safe.</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
