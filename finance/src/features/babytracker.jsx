// features/baby.jsx
import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  ShoppingCart, 
  HeartPulse, 
  Calendar, 
  DollarSign, 
  Plus,
  Filter,
  Download,
  Bell,
  Menu,
  TrendingUp,
  AlertCircle,
  Edit3,
  Trash2,
  Sparkles,
  Lightbulb,
  Share2,
  CheckCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const BabyTracker = ({ setIsMobileOpen }) => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Diapers', amount: 50, date: '2025-12-10', description: 'Monthly supply - Pampers size 3', icon: <ShoppingCart className="w-5 h-5 text-blue-500" /> },
    { id: 2, category: 'Healthcare', amount: 40, date: '2025-12-05', description: 'Pediatric check-up and vaccines', icon: <HeartPulse className="w-5 h-5 text-red-500" /> },
    { id: 3, category: 'Clothing', amount: 30, date: '2025-12-08', description: 'Winter onesies and booties', icon: <Baby className="w-5 h-5 text-pink-500" /> },
    { id: 4, category: 'Toys & Books', amount: 25, date: '2025-12-03', description: 'Rattles and board books', icon: <Sparkles className="w-5 h-5 text-yellow-500" /> },
    { id: 5, category: 'Feeding', amount: 35, date: '2025-12-01', description: 'Formula and bottles', icon: <ShoppingCart className="w-5 h-5 text-green-500" /> },
  ]);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [budget, setBudget] = useState(200); // Monthly budget
  const [showTips, setShowTips] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const categories = [
    { name: 'Diapers', color: '#3B82F6' },
    { name: 'Healthcare', color: '#EF4444' },
    { name: 'Clothing', color: '#EC4899' },
    { name: 'Toys & Books', color: '#F59E0B' },
    { name: 'Feeding', color: '#10B981' },
    { name: 'Other', color: '#6B7280' },
  ];

  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat.name] = expenses
      .filter(exp => exp.category === cat.name)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return acc;
  }, {});

  const chartData = categories.map(cat => ({
    name: cat.name,
    value: categoryTotals[cat.name],
    fill: cat.color
  })).filter(item => item.value > 0);

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const budgetProgress = (totalExpenses / budget) * 100;
  const isOverBudget = budgetProgress > 100;

  useEffect(() => {
    // Simulate monthly comparison
    const lastMonthTotal = totalExpenses * 0.95; // 5% increase
  }, [totalExpenses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.description) return;

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingId || Date.now(),
      icon: getCategoryIcon(formData.category)
    };

    if (editingId) {
      setExpenses(prev => prev.map(exp => exp.id === editingId ? expenseData : exp));
      setEditingId(null);
    } else {
      setExpenses(prev => [...prev, expenseData]);
    }

    setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
    
    // Celebratory feedback
    if (!editingId) {
      setTimeout(() => alert('Expense added! 🎉 Great job tracking your baby\'s needs.'), 100);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description
    });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this expense?')) {
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Diapers': <ShoppingCart className="w-5 h-5 text-blue-500" />,
      'Healthcare': <HeartPulse className="w-5 h-5 text-red-500" />,
      'Clothing': <Baby className="w-5 h-5 text-pink-500" />,
      'Toys & Books': <Sparkles className="w-5 h-5 text-yellow-500" />,
      'Feeding': <ShoppingCart className="w-5 h-5 text-green-500" />,
      'Other': <DollarSign className="w-5 h-5 text-gray-500" />
    };
    return icons[category] || icons['Other'];
  };

  const handleShare = () => {
    const shareText = `Baby expenses this month: $${totalExpenses}. Budget: $${budget}. ${isOverBudget ? 'Time to adjust!' : 'On track!'} #BabyTracker`;
    if (navigator.share) {
      navigator.share({ title: 'Baby Tracker Update', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard! Share away! 📱');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
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
              <div className="flex items-center gap-2">
                <Baby className="w-6 h-6 text-teal-600 animate-bounce" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Baby Tracker</h1>
                  <p className="text-sm text-gray-600">Nurturing finances for your little star ✨</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={handleShare}>
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`bg-white rounded-2xl p-6 border ${isOverBudget ? 'border-red-200' : 'border-teal-200'} shadow-sm text-center col-span-2 md:col-span-2 relative overflow-hidden`}>
            {isOverBudget && (
              <div className="absolute top-2 right-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            )}
            <div className="text-3xl font-bold mb-1">${totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mb-2">Total This Month</div>
            <div className={`h-3 bg-gray-200 rounded-full overflow-hidden mb-2`}>
              <div 
                className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-gradient-to-r from-teal-500 to-emerald-600'} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              Budget: ${budget} | {budgetProgress.toFixed(1)}% used {isOverBudget && <span className="text-red-500">— Over budget!</span>}
            </div>
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs mt-2">
              <TrendingUp className="w-4 h-4" /> +5% from last month
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold mb-1">{expenses.length}</div>
            <div className="text-sm opacity-90">Expenses Tracked</div>
          </div>
        </div>

        {/* Expenses Breakdown Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-600" /> Expenses Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2 text-center">Total: ${totalExpenses.toLocaleString()} | Tip: Bulk buy diapers to save 20%!</p>
        </div>

        {/* Quick Tips */}
        <div className="mb-8">
          <button 
            onClick={() => setShowTips(!showTips)}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all mb-4"
          >
            <Lightbulb className="w-5 h-5" /> {showTips ? 'Hide' : 'Show'} Quick Tips
          </button>
          {showTips && (
            <div className="space-y-3 bg-white rounded-2xl p-6 border border-amber-200 shadow-sm">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800">Save on Diapers</h4>
                  <p className="text-sm text-amber-700">Subscribe & save: 15% off on Amazon. Stock up monthly!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800">Healthcare Hacks</h4>
                  <p className="text-sm text-blue-700">Use FSA for check-ups. Free vaccines via insurance!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800">Thrift Clothing</h4>
                  <p className="text-sm text-green-700">Apps like Facebook Marketplace: 70% cheaper!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Expense Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg animate-pulse">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Expense' : 'Add Baby Expense'}</h2>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
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
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
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
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Pampers size 3 pack..."
                  rows={3}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-teal-600 hover:to-emerald-700 transition-all shadow-md"
              >
                {editingId ? 'Update' : 'Add'} Expense
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' }); }}
                  className="px-6 py-4 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-teal-50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Recent Expenses ({expenses.length})
            </h2>
            <button 
              onClick={() => setExpenses([])}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {expenses.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-teal-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-gray-100 rounded-full">{expense.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{expense.category}</h4>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                    <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-teal-600">${expense.amount}</div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleEdit(expense)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(expense.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {expenses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Baby className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No expenses yet. Add your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BabyTracker;