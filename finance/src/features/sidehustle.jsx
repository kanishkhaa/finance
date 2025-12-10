import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Plus, 
  Calendar,
  Filter,
  Download,
  Bell,
  Menu,
  ArrowUp,
  ArrowDown,
  BarChart3
} from 'lucide-react';

const SideHustle = ({ setIsMobileOpen }) => {
  const [activeMenu] = useState('sidehustle');
  const [formData, setFormData] = useState({
    type: '',
    revenue: '',
    date: '',
    expenses: '',
    description: ''
  });

  const hustleData = [
    { type: 'Home Food Business', revenue: 450, expenses: 120, date: 'Dec 2025', net: 330, trend: 'up', icon: <ShoppingCart className="w-5 h-5" />, color: 'from-amber-500 to-orange-600' },
    { type: 'Freelance Design', revenue: 320, expenses: 50, date: 'Dec 2025', net: 270, trend: 'stable', icon: <TrendingUp className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600' },
  ];

  // Profit trend data for chart
  const profitTrendData = [
    { month: 'Jan', foodBusiness: 280, freelance: 250, total: 530 },
    { month: 'Feb', foodBusiness: 290, freelance: 260, total: 550 },
    { month: 'Mar', foodBusiness: 310, freelance: 255, total: 565 },
    { month: 'Apr', foodBusiness: 300, freelance: 265, total: 565 },
    { month: 'May', foodBusiness: 320, freelance: 268, total: 588 },
    { month: 'Jun', foodBusiness: 315, freelance: 270, total: 585 },
    { month: 'Jul', foodBusiness: 325, freelance: 265, total: 590 },
    { month: 'Aug', foodBusiness: 330, freelance: 275, total: 605 },
    { month: 'Sep', foodBusiness: 335, freelance: 268, total: 603 },
    { month: 'Oct', foodBusiness: 340, freelance: 272, total: 612 },
    { month: 'Nov', foodBusiness: 335, freelance: 270, total: 605 },
    { month: 'Dec', foodBusiness: 330, freelance: 270, total: 600 },
  ];

  const totalRevenue = hustleData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = hustleData.reduce((sum, item) => sum + item.expenses, 0);
  const totalNet = totalRevenue - totalExpenses;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Side hustle entry added:', formData);
    setFormData({ type: '', revenue: '', date: '', expenses: '', description: '' });
  };

  return (
    <div className="h-full bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Side Hustle</h1>
                <p className="text-sm text-gray-600">Track your entrepreneurial journey</p>
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
            <div className="text-3xl font-bold text-amber-600 mb-1">${totalRevenue}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs mt-2">
              <ArrowUp className="w-3 h-3" /> +15%
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
            <div className="text-3xl font-bold text-rose-600 mb-1">${totalExpenses}</div>
            <div className="text-sm text-gray-600">Total Expenses</div>
            <div className="flex items-center justify-center gap-1 text-amber-600 text-xs mt-2">
              <ArrowUp className="w-3 h-3" /> +8%
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">${totalNet}</div>
            <div className="text-sm text-gray-600">Net Profit</div>
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs mt-2">
              <ArrowUp className="w-3 h-3" /> +12%
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Analytics */}
          <div className="space-y-6">
            {/* Profit Trend Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                Profit Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="foodBusiness" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Food Business"
                    dot={{ fill: '#f59e0b', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="freelance" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Freelance"
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Total Profit"
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Add Entry Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Add Side Hustle Entry</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hustle Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="Home Food Business">Home Food Business</option>
                      <option value="Freelance Design">Freelance Design</option>
                    </select>
                  </div>

                  {/* Revenue */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Revenue ($)</label>
                    <input
                      type="number"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>

                  {/* Expenses */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expenses ($)</label>
                    <input
                      type="number"
                      name="expenses"
                      value={formData.expenses}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Details of this entry"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Entry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Entries Table */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
                <h2 className="text-xl font-bold text-gray-900">Recent Entries</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expenses</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Net</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {hustleData.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-amber-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{entry.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-600">${entry.revenue}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-rose-600">${entry.expenses}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`font-bold flex items-center gap-1 ${entry.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            ${entry.net}
                            {entry.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">AI Suggestions</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-sm text-gray-700">Reinvest 20% of your food business profits ($66) into marketing to boost sales by 15% next month.</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <p className="text-sm text-gray-700">Your freelance net profit is stable—consider raising rates by 10% for new clients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideHustle;