import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import CrimeTrend from '../components/dashboard/CrimeTrend';
import CrimeCategory from '../components/dashboard/CrimeCategory';
import DistrictCrime from '../components/dashboard/DistrictCrime';
import RecentCases from '../components/dashboard/RecentCases';
import Card from '../components/common/Card';
import { Badge, Briefcase, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();

  const successRate = user?.cases_handled && user?.cases_handled > 0 
    ? ((user.solved_cases / user.cases_handled) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.full_name || user?.username}
          </h1>
          {user?.rank && (
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
              {user.rank}
            </span>
          )}
        </div>
        <p className="text-gray-400">
          {user?.department} • {user?.assigned_station}
        </p>
      </motion.div>

      {/* Officer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Cases Handled</p>
              <p className="text-2xl font-bold text-white">{user?.cases_handled || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Solved Cases</p>
              <p className="text-2xl font-bold text-white">{user?.solved_cases || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pending Cases</p>
              <p className="text-2xl font-bold text-white">
                {(user?.cases_handled || 0) - (user?.solved_cases || 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-white">{successRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Officer Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Badge className="w-5 h-5" />
            Officer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Badge Number</p>
              <p className="text-white font-medium">{user?.badge_number || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Rank</p>
              <p className="text-white font-medium">{user?.rank || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Department</p>
              <p className="text-white font-medium">{user?.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white font-medium">{user?.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Assigned Station</p>
              <p className="text-white font-medium">{user?.assigned_station || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{user?.email || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </motion.div>

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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all text-left">
              <AlertCircle className="w-6 h-6 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Report New Case</h3>
              <p className="text-gray-400 text-sm">File a new crime report</p>
            </button>
            <button className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all text-left">
              <Clock className="w-6 h-6 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">View Pending</h3>
              <p className="text-gray-400 text-sm">Check pending cases</p>
            </button>
            <button className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all text-left">
              <CheckCircle className="w-6 h-6 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Update Status</h3>
              <p className="text-gray-400 text-sm">Update case status</p>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default OfficerDashboard;
