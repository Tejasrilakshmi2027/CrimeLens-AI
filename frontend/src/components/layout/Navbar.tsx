import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Sun, Moon, Calendar, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass border-b border-white/10 h-16 px-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-6 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases, officers, districts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 text-white placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <Calendar className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-sm text-gray-300">{currentDate}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          {theme.mode === 'dark' ? <Sun className="w-5 h-5 text-[#06B6D4]" /> : <Moon className="w-5 h-5 text-[#06B6D4]" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors relative"
        >
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
        </motion.button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10 relative">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-white">{user?.full_name || user?.username || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.email || ''}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 transition-colors ml-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-300 hover:text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;