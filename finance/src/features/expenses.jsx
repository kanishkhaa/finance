// features/expenses.jsx
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Droplet, 
  ShoppingBag, 
  Home, 
  Baby, 
  CreditCard, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Download,
  Bell,
  Menu,
  Calendar,
  ArrowUp,
  ArrowDown,
  PieChart as PieChartIcon
} from 'lucide-react';

const Expenses = ({ setIsMobileOpen }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    merchant: ''
  });

  const expenseData = [
    { category: 'Groceries', amount: 180, date: 'Dec 5, 2025', description: 'Weekly shopping', merchant: 'Local Market', icon: <ShoppingCart className="w-5 h-5" />, color: 'from-orange-500 to-amber-600' },
    { category: 'Skincare', amount: 75, date: 'Dec 8, 2025', description: 'Monthly routine', merchant: 'Sephora', icon: <Droplet className="w-5 h-5" />, color: 'from-pink-500 to-rose-600' },
    { category: 'Clothing', amount: 120, date: 'Dec 10, 2025', description: 'Winter coat', merchant: 'Zara', icon: <ShoppingBag className="w-5 h-5" />, color: 'from-purple-500 to-fuchsia-600' },
    { category: 'Bills', amount: 250, date: 'Dec 1, 2025', description: 'Utilities', merchant: 'Utility Co.', icon: <Home className="w-5 h-5" />, color: 'from-blue-500 to-cyan-600' },
    { category: 'Baby Expenses', amount: 90, date: 'Dec 7, 2025', description: 'Diapers', merchant: 'Amazon', icon: <Baby className="w-5 h-5" />, color: 'from-teal-500 to-emerald-600' },
  ];

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);

  const summaryCards = [
    { title: 'Groceries', amount: 180, icon: <ShoppingCart className="w-6 h-6" />, color: 'from-orange-400 to-amber-500', bg: 'from-orange-50 to-amber-50' },
    { title: 'Skincare', amount: 75, icon: <Droplet className="w-6 h-6" />, color: 'from-pink-400 to-rose-500', bg: 'from-pink-50 to-rose-50' },
    { title: 'Clothing', amount: 120, icon: <ShoppingBag className="w-6 h-6" />, color: 'from-purple-400 to-fuchsia-500', bg: 'from-purple-50 to-fuchsia-50' },
    { title: 'Bills', amount: 250, icon: <Home className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
    { title: 'Baby Expenses', amount: 90, icon: <Baby className="w-6 h-6" />, color: 'from-teal-400 to-emerald-500', bg: 'from-teal-50 to-emerald-50' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Groceries': 'bg-orange-100 text-orange-700 border-orange-200',
      'Skincare': 'bg-pink-100 text-pink-700 border-pink-200',
      'Clothing': 'bg-purple-100 text-purple-700 border-purple-200',
      'Bills': 'bg-blue-100 text-blue-700 border-blue-200',
      'Baby Expenses': 'bg-teal-100 text-teal-700 border-teal-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense added:', formData);
    setFormData({ category: '', amount: '', date: '', description: '', merchant: '' });
  };

  return (
    <div className="h-full bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
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
        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-6">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
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
          <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl p-6 border border-rose-700 shadow-lg text-white col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1">${totalExpenses}</div>
            <div className="text-sm text-rose-100">Total Expenses</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Table & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expenses Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-rose-50 to-pink-50">
                <h2 className="text-2xl font-bold text-gray-900">Recent Expenses</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Merchant</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {expenseData.map((entry, idx) => (
                      <tr 
                        key={idx}
                        className={`hover:bg-rose-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                            {entry.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-rose-600">${entry.amount}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{entry.merchant}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{entry.description}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Expense Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Add New Expense</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Skincare">Skincare</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Bills">Bills</option>
                      <option value="Baby Expenses">Baby Expenses</option>
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amount ($)</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>

                  {/* Merchant */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Merchant</label>
                    <input
                      type="text"
                      name="merchant"
                      value={formData.merchant}
                      onChange={handleInputChange}
                      placeholder="e.g., Amazon"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Details of the expense"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Expense
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Insights */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                    <PieChartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Spending Insights</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">Groceries up 5% this month. Consider meal prepping to save $20/week.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-pink-600" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">Skincare spending on track. Reward yourself with a small treat under $10.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ArrowDown className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">Bills alert: Utility bill due in 2 days. Set up auto-pay to avoid late fees.</p>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                  <div className="text-sm font-semibold text-gray-700 mb-3">This Month Summary</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Entries</span>
                      <span className="font-bold text-gray-900">{expenseData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. per Entry</span>
                      <span className="font-bold text-gray-900">${(totalExpenses / expenseData.length).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trend</span>
                      <span className={`font-bold ${totalExpenses > 700 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {totalExpenses > 700 ? <ArrowUp className="w-3 h-3 inline" /> : <ArrowDown className="w-3 h-3 inline" />}
                        {totalExpenses > 700 ? '+8%' : '-3%'}
                      </span>
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

export default Expenses;