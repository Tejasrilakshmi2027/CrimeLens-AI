import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Clock, CheckCircle, Shield, TrendingUp } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import Card from '../common/Card';
import Loader from '../common/Loader';

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}> = ({ title, value, icon, color, trend }) => (
  <Card>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-3xl font-bold text-white"
        >
          {value.toLocaleString()}
        </motion.h2>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`${color} text-white rounded-xl p-4 shadow-lg`}
      >
        {icon}
      </motion.div>
    </div>
  </Card>
);

export default function DashboardCards() {
  const { summary, loading } = useDashboard();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <Loader size="lg" />
          </Card>
        ))}
      </div>
    );
  }

  if (!summary) {
    return (
      <Card className="col-span-full">
        <p className="text-center text-gray-400">No data available</p>
      </Card>
    );
  }

  const cards = [
    {
      title: 'Total Cases',
      value: summary.total_cases,
      icon: <FolderOpen size={28} />,
      color: 'bg-gradient-to-br from-[#06B6D4] to-[#0891b2]',
      trend: 12.5,
    },
    {
      title: 'Pending Cases',
      value: summary.pending_cases,
      icon: <Clock size={28} />,
      color: 'bg-gradient-to-br from-[#F59E0B] to-[#d97706]',
      trend: -5.2,
    },
    {
      title: 'Solved Cases',
      value: summary.completed_cases || 0,
      icon: <CheckCircle size={28} />,
      color: 'bg-gradient-to-br from-[#22C55E] to-[#16a34a]',
      trend: 8.7,
    },
    {
      title: 'Arrests Made',
      value: summary.arrests,
      icon: <Shield size={28} />,
      color: 'bg-gradient-to-br from-[#EF4444] to-[#dc2626]',
      trend: 15.3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatCard {...card} />
        </motion.div>
      ))}
    </motion.div>
  );
}