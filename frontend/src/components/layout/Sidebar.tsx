import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Folder,
  Bot,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Map,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/cases', icon: Folder, label: 'Cases' },
    { path: '/map', icon: Map, label: 'Crime Map' },
    { path: '/chatbot', icon: Bot, label: 'AI Assistant' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass border-r border-white/10 flex flex-col h-full overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#06B6D4] to-white bg-clip-text text-transparent">
                  Crime Lens AI
                </h1>
                <p className="text-xs text-gray-400">Karnataka State Police</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-6 py-3 mx-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#06B6D4]/20 to-[#1E3A8A]/20 border border-[#06B6D4]/30 text-[#06B6D4]'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-[#06B6D4]' : ''}`} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;