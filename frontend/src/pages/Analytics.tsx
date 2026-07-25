import { motion } from 'framer-motion';
import CriminalNetwork from '../components/analytics/CriminalNetwork';
import PredictiveAnalytics from '../components/analytics/PredictiveAnalytics';
import CaseSimilaritySearch from '../components/analytics/CaseSimilaritySearch';
import ReportGenerator from '../components/analytics/ReportGenerator';
import CrimeCategoryChart from '../components/analytics/CrimeCategoryChart';
import DistrictChart from '../components/analytics/DistrictChart';
import StationChart from '../components/analytics/StationChart';
import MonthlyChart from '../components/analytics/MonthlyChart';
import { exportCrimeData } from '../api/crime';

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crime Analytics</h1>
          <p className="text-gray-400">Comprehensive crime statistics and trends</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportCrimeData}
            className="px-4 py-2 rounded-lg bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 hover:bg-[#06B6D4]/30 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Case Similarity Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CaseSimilaritySearch />
      </motion.div>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <PredictiveAnalytics />
      </motion.div>

      {/* Criminal Network Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CriminalNetwork />
      </motion.div>

      {/* Report Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <ReportGenerator />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CrimeCategoryChart />
        <DistrictChart />
      </div>

      <MonthlyChart />

      <StationChart />
    </motion.div>
  );
}