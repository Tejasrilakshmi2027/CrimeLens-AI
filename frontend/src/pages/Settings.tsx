import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Bell, Shield, Globe, Database, Save, RotateCcw, Check } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    aiModel: 'gpt-4',
    aiTemperature: 0.7,
    dataRefresh: 5,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleReset = () => {
    const defaultSettings = {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      aiModel: 'gpt-4',
      aiTemperature: 0.7,
      dataRefresh: 5,
    };
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    setLanguage('en');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Customize your application preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={RotateCcw} iconPosition="left" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button 
            variant={saveSuccess ? 'primary' : 'primary'} 
            icon={saveSuccess ? Check : Save} 
            iconPosition="left" 
            onClick={handleSave}
          >
            {saveSuccess ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Appearance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-gray-400">Toggle between light and dark theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors ${
                  theme.mode === 'dark' ? 'bg-[#06B6D4]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    theme.mode === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#d97706] flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-sm text-gray-400">Receive in-app notifications</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.notifications ? 'bg-[#06B6D4]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-medium">Email Alerts</p>
                <p className="text-sm text-gray-400">Receive email notifications for important updates</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.emailAlerts ? 'bg-[#06B6D4]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.emailAlerts ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white font-medium">SMS Alerts</p>
                <p className="text-sm text-gray-400">Receive SMS for urgent notifications</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, smsAlerts: !settings.smsAlerts })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.smsAlerts ? 'bg-[#06B6D4]' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.smsAlerts ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16a34a] flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Language & Region</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none text-white"
              >
                <option value="en">English</option>
                <option value="kn">Kannada</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Timezone</label>
              <select
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none text-white"
              >
                <option value="IST">Indian Standard Time (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#7c3aed] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">AI Model</label>
              <select
                value={settings.aiModel}
                onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none text-white"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5">GPT-3.5</option>
                <option value="claude">Claude</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Temperature: {settings.aiTemperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.aiTemperature}
                onChange={(e) => setSettings({ ...settings, aiTemperature: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EF4444] to-[#dc2626] flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Data Management</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Auto-refresh Interval: {settings.dataRefresh} minutes
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={settings.dataRefresh}
                onChange={(e) => setSettings({ ...settings, dataRefresh: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 min</span>
                <span>30 min</span>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <Button variant="secondary" className="flex-1">
                Export All Data
              </Button>
              <Button variant="danger" className="flex-1">
                Clear Cache
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Settings;
