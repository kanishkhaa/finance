// features/settings.jsx
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  LogOut,
  Save,
  Filter,
  Download,
  Menu
} from 'lucide-react';

const Settings = ({ setIsMobileOpen }) => {
  const [formData, setFormData] = useState({
    email: 'aisha@example.com',
    notifications: true,
    currency: 'USD'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gray-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <label className="text-sm font-semibold text-gray-700">Enable Notifications</label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="darkmode"
                  className="rounded"
                />
                <label htmlFor="darkmode" className="text-sm font-semibold text-gray-700">Dark Mode</label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Change Password</span>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Linked Accounts</span>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-4 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;