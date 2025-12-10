import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Heart, 
  Gift, 
  DollarSign,
  Plus,
  Calendar,
  Sparkles,
  ArrowUp,
  PieChart as PieChartIcon,
  Target,
  Menu,
  Filter,
  Download,
  Bell
} from 'lucide-react';

const IncomeTracker = ({ setIsMobileOpen }) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: '',
    category: '',
    purpose: '',
    frequency: ''
  });

  const incomeData = [
    { source: 'Home Food Business', amount: 150, date: 'Jan 2, 2025', frequency: 'Daily', purpose: 'Reinvestment', category: 'Side Hustle' },
    { source: 'Freelancing – Logo Design', amount: 120, date: 'Jan 5, 2025', frequency: 'One-time', purpose: 'Savings', category: 'Freelance' },
    { source: 'Partner Contribution', amount: 200, date: 'Jan 1, 2025', frequency: 'Monthly', purpose: 'Household', category: 'Partner Contribution' },
    { source: 'Gifts', amount: 40, date: 'Jan 10, 2025', frequency: 'Occasional', purpose: 'Personal Care', category: 'Gifts' },
    { source: 'Home Food Business', amount: 300, date: 'Jan 15, 2025', frequency: 'Daily', purpose: 'Baby Expenses', category: 'Side Hustle' },
    { source: 'Freelancing – Website Fix', amount: 200, date: 'Jan 18, 2025', frequency: 'One-time', purpose: 'Emergency Fund', category: 'Freelance' },
    { source: 'Allowance', amount: 50, date: 'Jan 20, 2025', frequency: 'Monthly', purpose: 'Personal Care', category: 'Allowance' },
  ];

  const summaryCards = [
    { title: 'Side Hustle', amount: 450, icon: <Briefcase className="w-6 h-6" />, color: 'from-pink-400 to-rose-500', bg: 'from-pink-50 to-rose-50' },
    { title: 'Freelance', amount: 320, icon: <TrendingUp className="w-6 h-6" />, color: 'from-purple-400 to-violet-500', bg: 'from-purple-50 to-violet-50' },
    { title: 'Partner Contribution', amount: 200, icon: <Heart className="w-6 h-6" />, color: 'from-indigo-400 to-blue-500', bg: 'from-indigo-50 to-blue-50' },
    { title: 'Gifts & Allowance', amount: 90, icon: <Gift className="w-6 h-6" />, color: 'from-fuchsia-400 to-pink-500', bg: 'from-fuchsia-50 to-pink-50' },
  ];

  const totalIncome = summaryCards.reduce((sum, card) => sum + card.amount, 0);

  const insights = [
    { 
      text: "You earned 12% more from your side hustle this month compared to last month.",
      icon: <ArrowUp className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    { 
      text: "Your freelance income patterns suggest peak work days are Fridays and Saturdays.",
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      text: "Partner contributions cover 28% of your mandatory expenses.",
      icon: <PieChartIcon className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      text: "Reinvesting 20% of your home business income could increase growth by 8%.",
      icon: <Target className="w-5 h-5" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Side Hustle': 'bg-pink-100 text-pink-700 border-pink-200',
      'Freelance': 'bg-purple-100 text-purple-700 border-purple-200',
      'Partner Contribution': 'bg-blue-100 text-blue-700 border-blue-200',
      'Gifts': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
      'Allowance': 'bg-rose-100 text-rose-700 border-rose-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      source: '',
      amount: '',
      date: '',
      category: '',
      purpose: '',
      frequency: ''
    });
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Top Bar - Added for consistency with Dashboard */}
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
                <h1 className="text-2xl font-bold text-gray-900">Income Tracker</h1>
                <p className="text-sm text-gray-600">Track and manage all your income sources</p>
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {summaryCards.map((card, idx) => (
            <div 
              key={idx}
              className={`bg-gradient-to-br ${card.bg} rounded-2xl p-6 border border-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}>
                {card.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">${card.amount}</div>
              <div className="text-sm text-gray-600">{card.title}</div>
            </div>
          ))}

          {/* Total Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 border border-indigo-700 shadow-lg text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">${totalIncome}</div>
            <div className="text-sm text-indigo-100">Total Income</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Table & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Income Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-2xl font-bold text-gray-900">Recent Income Entries</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Frequency</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {incomeData.map((entry, idx) => (
                      <tr 
                        key={idx}
                        className={`hover:bg-purple-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{entry.source}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-600">${entry.amount}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                            {entry.frequency}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{entry.purpose}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                            {entry.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Income Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-fuchsia-50 to-pink-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Add New Income</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Source */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Income Source
                    </label>
                    <input
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      placeholder="e.g., Freelancing Project"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Side Hustle">Side Hustle</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Partner Contribution">Partner Contribution</option>
                      <option value="Gifts">Gifts</option>
                      <option value="Allowance">Allowance</option>
                    </select>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    >
                      <option value="">Select Purpose</option>
                      <option value="Savings">Savings</option>
                      <option value="Baby Expenses">Baby Expenses</option>
                      <option value="Reinvestment">Reinvestment</option>
                      <option value="Personal Care">Personal Care</option>
                      <option value="Household">Household</option>
                      <option value="Emergency Fund">Emergency Fund</option>
                    </select>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    >
                      <option value="">Select Frequency</option>
                      <option value="One-time">One-time</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-fuchsia-600 hover:to-pink-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Income Entry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Insights */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {insights.map((insight, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl ${insight.bgColor} border border-gray-200 hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-white shadow-sm ${insight.color}`}>
                        {insight.icon}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">
                        {insight.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Summary Stats */}
                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <div className="text-sm font-semibold text-gray-700 mb-3">This Month Summary</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Entries</span>
                      <span className="font-bold text-gray-900">{incomeData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. per Entry</span>
                      <span className="font-bold text-gray-900">${(totalIncome / incomeData.length).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth</span>
                      <span className="font-bold text-emerald-600">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTracker;