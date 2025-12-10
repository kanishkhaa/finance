// features/family.jsx
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  User, 
  Calendar, 
  DollarSign, 
  Plus,
  Filter,
  Download,
  Bell,
  Menu,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const FamilyPlanning = ({ setIsMobileOpen }) => {
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Aisha Rahman', role: 'You', avatar: 'AR', color: 'from-indigo-500 to-violet-600', active: true },
    { id: 2, name: 'Ahmed Khan', role: 'Partner', avatar: 'AK', color: 'from-emerald-500 to-teal-600', active: true },
    { id: 3, name: 'Baby Noor', role: 'Child', avatar: 'BN', color: 'from-pink-500 to-rose-600', active: true },
  ]);

  const [sharedGoals, setSharedGoals] = useState([
    { 
      id: 1, 
      name: 'Family Vacation', 
      target: 2000, 
      contributed: 600, 
      contributions: [
        { member: 'Aisha Rahman', amount: 300, date: '2025-12-05' },
        { member: 'Ahmed Khan', amount: 300, date: '2025-12-03' }
      ],
      deadline: '2026-07-01',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Home Down Payment', 
      target: 50000, 
      contributed: 8500, 
      contributions: [
        { member: 'Aisha Rahman', amount: 5000, date: '2025-11-15' },
        { member: 'Ahmed Khan', amount: 3500, date: '2025-11-10' }
      ],
      deadline: '2028-12-01',
      status: 'active'
    },
  ]);

  // Form states
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
    shareWith: []
  });
  const [contributeAmount, setContributeAmount] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'Aisha contributed $50 to Family Vacation', date: 'Dec 10, 2025', icon: <DollarSign className="w-4 h-4 text-green-600" /> },
    { id: 2, action: 'Ahmed joined Home Down Payment goal', date: 'Dec 9, 2025', icon: <User className="w-4 h-4 text-blue-600" /> },
  ]);
  const [stats, setStats] = useState({ totalContributed: 9100, goalsCompleted: 0, upcomingDeadlines: 1 });

  // Simulate loading and updates
  useEffect(() => {
    const totalContributed = sharedGoals.reduce((sum, goal) => sum + goal.contributed, 0);
    setStats(prev => ({ ...prev, totalContributed }));
  }, [sharedGoals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShareWithChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, shareWith: options }));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (formData.name && formData.target && formData.deadline) {
      const newGoal = {
        id: Date.now(),
        name: formData.name,
        target: parseFloat(formData.target),
        contributed: 0,
        contributions: [],
        deadline: formData.deadline,
        status: 'active'
      };
      setSharedGoals(prev => [...prev, newGoal]);
      setFormData({ name: '', target: '', deadline: '', shareWith: [] });
      setShowAddGoal(false);
      // Simulate activity
      setRecentActivity(prev => [...prev, {
        id: Date.now(),
        action: `New goal "${formData.name}" created`,
        date: new Date().toLocaleDateString(),
        icon: <Plus className="w-4 h-4 text-purple-600" />
      }]);
    }
  };

  const handleEditGoal = (goal) => {
    setEditGoal(goal);
    setFormData({
      name: goal.name,
      target: goal.target.toString(),
      deadline: goal.deadline,
      shareWith: familyMembers.filter(m => m.role !== 'You').map(m => m.name)
    });
    setShowAddGoal(true);
  };

  const updateGoal = (e) => {
    e.preventDefault();
    if (formData.name && formData.target && formData.deadline) {
      setSharedGoals(prev => prev.map(g => 
        g.id === editGoal.id ? { ...g, name: formData.name, target: parseFloat(formData.target), deadline: formData.deadline } : g
      ));
      setEditGoal(null);
      setFormData({ name: '', target: '', deadline: '', shareWith: [] });
      setShowAddGoal(false);
    }
  };

  const deleteGoal = (id) => {
    setSharedGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleContribute = (goalId) => {
    const goal = sharedGoals.find(g => g.id === goalId);
    setSelectedGoal(goal);
    setContributeAmount('');
    setShowContributeModal(true);
  };

  const submitContribution = () => {
    if (contributeAmount && parseFloat(contributeAmount) > 0) {
      setSharedGoals(prev => prev.map(g => 
        g.id === selectedGoal.id 
          ? { 
              ...g, 
              contributed: g.contributed + parseFloat(contributeAmount),
              contributions: [...g.contributions, { member: 'Aisha Rahman', amount: parseFloat(contributeAmount), date: new Date().toISOString().split('T')[0] }]
            } 
          : g
      ));
      setRecentActivity(prev => [...prev, {
        id: Date.now(),
        action: `You contributed $${contributeAmount} to ${selectedGoal.name}`,
        date: new Date().toLocaleDateString(),
        icon: <DollarSign className="w-4 h-4 text-green-600" />
      }]);
      setShowContributeModal(false);
      setContributeAmount('');
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-green-500 to-emerald-600';
    if (progress >= 50) return 'from-yellow-500 to-amber-600';
    return 'from-pink-500 to-rose-600';
  };

  const contributionChartData = sharedGoals.map(goal => ({
    name: goal.name,
    contributed: goal.contributed,
    target: goal.target
  }));

  return (
    <div className="h-full bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
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
                <Heart className="w-6 h-6 text-pink-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Family Planning</h1>
                  <p className="text-sm text-gray-600">Collaborate on shared financial goals</p>
                </div>
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">${stats.totalContributed.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Contributed</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.goalsCompleted}</div>
            <div className="text-sm text-gray-600">Goals Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.upcomingDeadlines}</div>
            <div className="text-sm text-gray-600">Upcoming Deadlines</div>
          </div>
        </div>

        {/* Family Members */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" /> Family Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl p-4 border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white font-semibold text-lg`}>
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                {member.role !== 'You' && (
                  <button className="mt-2 text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors">
                    {member.active ? 'Active' : 'Invite'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" /> Recent Activity
          </h2>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3 max-h-48 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 text-sm">
                <div className="p-1 rounded-full bg-gray-100">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Goals */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Shared Goals
          </h2>
          {sharedGoals.map((goal) => {
            const progress = (goal.contributed / goal.target) * 100;
            return (
              <div key={goal.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(goal.deadline).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    {goal.status === 'active' ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Active</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Contributed: ${goal.contributed.toLocaleString()} / ${goal.target.toLocaleString()}
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(progress)} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% Complete</p>
                </div>
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={() => handleContribute(goal.id)}
                    className="flex-1 bg-pink-50 text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" /> Contribute
                  </button>
                  <button 
                    onClick={() => handleEditGoal(goal)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {goal.contributions.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Recent Contributions</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {goal.contributions.slice(-3).map((contrib, idx) => (
                        <li key={idx}>{contrib.member}: +${contrib.amount} on {new Date(contrib.date).toLocaleDateString()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contributions Overview Chart */}
        {sharedGoals.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Contributions Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={contributionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar dataKey="contributed" fill="#ef4444" name="Contributed" />
                <Bar dataKey="target" fill="#10b981" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Add Shared Goal Button */}
        {!showAddGoal && (
          <div className="text-center mb-8">
            <button 
              onClick={() => setShowAddGoal(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" /> Add Shared Goal
            </button>
          </div>
        )}

        {/* Add/Edit Goal Form */}
        {showAddGoal && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editGoal ? 'Edit Goal' : 'Add Shared Goal'}
                </h2>
              </div>
              <button onClick={() => { setShowAddGoal(false); setEditGoal(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={editGoal ? updateGoal : handleAddGoal} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Family Vacation"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Target Amount ($)</label>
                  <input
                    type="number"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Share With</label>
                  <select 
                    multiple 
                    value={formData.shareWith}
                    onChange={handleShareWithChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all h-32"
                  >
                    {familyMembers.filter(m => m.role !== 'You').map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold py-4 rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all"
                >
                  {editGoal ? 'Update Goal' : 'Create Shared Goal'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contribute Modal */}
        {showContributeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Contribute to {selectedGoal?.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Current: ${selectedGoal?.contributed.toLocaleString()} / ${selectedGoal?.target.toLocaleString()}</p>
              <input
                type="number"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                placeholder="Amount ($)"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none mb-4"
              />
              <div className="flex gap-2">
                <button 
                  onClick={submitContribution}
                  disabled={!contributeAmount || parseFloat(contributeAmount) <= 0}
                  className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 disabled:opacity-50 transition-colors"
                >
                  Contribute
                </button>
                <button 
                  onClick={() => setShowContributeModal(false)}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyPlanning;