import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Phone, MapPin, Building, Edit2, Save, Camera, User, Briefcase } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    assigned_station: user?.assigned_station || '',
  });

  const handleSave = () => {
    // TODO: Call API to update profile
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isOfficer = user?.role === 'OFFICER';
  const successRate = user?.cases_handled && user?.cases_handled > 0 
    ? ((user.solved_cases / user.cases_handled) * 100).toFixed(1)
    : '0.0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isOfficer ? 'Officer Profile' : 'My Profile'}
          </h1>
          <p className="text-gray-400">
            {isOfficer ? 'Manage your personal information and credentials' : 'Manage your account settings'}
          </p>
        </div>
        <Button
          variant={isEditing ? 'primary' : 'secondary'}
          icon={isEditing ? Save : Edit2}
          iconPosition="left"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#1E3A8A] flex items-center justify-center">
                {isOfficer ? (
                  <Shield className="w-16 h-16 text-white" />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#06B6D4] flex items-center justify-center border-2 border-[#0F172A]">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">{user?.full_name || user?.username}</h2>
            {isOfficer && user?.rank && (
              <p className="text-[#06B6D4] font-medium mb-4">{user.rank}</p>
            )}
            
            <div className="w-full space-y-3">
              {isOfficer && user?.badge_number && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>{user.badge_number}</span>
                </div>
              )}
              {isOfficer && user?.department && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Building className="w-4 h-4" />
                  <span>{user.department}</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          {isOfficer && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cases Handled</span>
                  <span className="text-xl font-bold text-white">{user?.cases_handled || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Solved Cases</span>
                  <span className="text-xl font-bold text-[#22C55E]">{user?.solved_cases || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-xl font-bold text-[#06B6D4]">{successRate}%</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={user?.username}
                  disabled
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                />
              </div>
              {isOfficer && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Badge Number</label>
                    <input
                      type="text"
                      value={user?.badge_number || ''}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Rank</label>
                    <input
                      type="text"
                      value={user?.rank || ''}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Department</label>
                    <input
                      type="text"
                      value={user?.department || ''}
                      disabled
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>
              {isOfficer && (
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Assigned Station</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="assigned_station"
                      value={formData.assigned_station}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {!isOfficer && (
            <Card>
              <h3 className="text-xl font-bold text-white mb-6">Account Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm">Account Type</p>
                    <p className="text-white font-medium">Citizen Account</p>
                  </div>
                  <User className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-white font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
