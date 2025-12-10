// features/goals.jsx
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Download,
  Bell,
  Menu,
  ArrowUp,
  Sparkles,
  Zap,
  Star,
  Award,
  Flame,
  Crown,
  Sword,
  BarChart3,
  LineChart,
  BadgeCheck,
  MapPin
} from 'lucide-react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  LineChart as RechartsLineChart
} from 'recharts';
import Confetti from 'react-confetti';

const Goals = ({ setIsMobileOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
    monthly: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(5); // Calculated based on total saved
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Quest', unlocked: true, icon: <Star className="w-4 h-4" />, badge: '⭐' },
    { id: 2, name: 'Saver Badge', unlocked: false, icon: <Award className="w-4 h-4" />, badge: '🥇' },
    { id: 3, name: 'Epic Saver', unlocked: false, icon: <Crown className="w-4 h-4" />, badge: '👑' },
    { id: 4, name: 'Chart Master', unlocked: true, icon: <BarChart3 className="w-4 h-4" />, badge: '📊' },
    { id: 5, name: 'Trend Spotter', unlocked: false, icon: <LineChart className="w-4 h-4" />, badge: '📈' },
    { id: 6, name: 'Badge Collector', unlocked: true, icon: <BadgeCheck className="w-4 h-4" />, badge: '🏅' },
  ]);
  const [xp, setXp] = useState(1250); // Total XP from savings

  const goalsData = [
    { 
      name: 'Vacation Quest: Tropical Escape', 
      saved: 420, 
      target: 1000, 
      deadline: 'Jun 2026', 
      monthly: 140, 
      progress: 42, 
      color: 'from-cyan-500 to-blue-600', 
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'on-track',
      tip: 'Level up by +$20/month to unlock early completion! 🏝️',
      reward: 'Beach Badge'
    },
    { 
      name: 'Emergency Shield: Safety Net', 
      saved: 850, 
      target: 3000, 
      deadline: 'Dec 2026', 
      monthly: 283, 
      progress: 28, 
      color: 'from-violet-500 to-purple-600', 
      icon: <DollarSign className="w-5 h-5" />,
      status: 'needs-attention',
      tip: 'Automate deposits to gain +50 XP per month! 🛡️',
      reward: 'Guardian Achievement'
    },
    { 
      name: 'Baby Legacy: Future Scholar', 
      saved: 200, 
      target: 5000, 
      deadline: 'Dec 2030', 
      monthly: 100, 
      progress: 4, 
      color: 'from-emerald-500 to-teal-600', 
      icon: <Calendar className="w-5 h-5" />,
      status: 'needs-attention',
      tip: 'Start a 529 plan for 2x XP bonuses! 📚',
      reward: 'Scholar Star'
    },
  ];

  // Sample data for additional charts
  const monthlyContributionsData = [
    { month: 'Jan', contribution: 100 },
    { month: 'Feb', contribution: 120 },
    { month: 'Mar', contribution: 140 },
    { month: 'Apr', contribution: 160 },
    { month: 'May', contribution: 180 },
    { month: 'Jun', contribution: 200 },
  ];

  const progressOverTimeData = [
    { month: 'Jan', progress: 10 },
    { month: 'Feb', progress: 20 },
    { month: 'Mar', progress: 35 },
    { month: 'Apr', progress: 50 },
    { month: 'May', progress: 65 },
    { month: 'Jun', progress: 80 },
  ];

  // Animate progress on mount
  const [animatedProgress, setAnimatedProgress] = useState(goalsData.map(() => 0));

  useEffect(() => {
    const timers = goalsData.map((_, idx) => 
      setTimeout(() => 
        setAnimatedProgress(prev => 
          prev.map((p, i) => i === idx ? goalsData[idx].progress : p)
        ), 
        500 + idx * 300
      )
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Simulate level up on total saved
  useEffect(() => {
    const totalSaved = goalsData.reduce((sum, g) => sum + g.saved, 0);
    setPlayerLevel(Math.floor(totalSaved / 200) + 1);
    setXp(totalSaved * 2);
    
    // Unlock achievements
    if (totalSaved > 1000) {
      setAchievements(prev => prev.map(a => a.id === 2 ? { ...a, unlocked: true } : a));
    }
    if (totalSaved > 3000) {
      setAchievements(prev => prev.map(a => a.id === 3 ? { ...a, unlocked: true } : a));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Goal added:', formData);
    setFormData({ name: '', target: '', deadline: '', monthly: '' });
    setIsSubmitting(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    // Simulate unlocking achievement
    if (Math.random() > 0.5) {
      setAchievements(prev => prev.map(a => a.id === 1 ? { ...a, unlocked: true } : a));
    }
  };

  const overallProgressData = [
    { name: 'Progress', value: goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length, fill: '#10b981' },
  ];

  const estimatedCompletion = (saved, target, monthly) => {
    if (monthly <= 0) return '∞';
    return Math.ceil((target - saved) / monthly);
  };

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Gaming HUD Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-40 shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg">
                  <Sword className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Quest Dashboard</h1>
                  <p className="text-xs text-gray-300">Level {playerLevel} - {xp} XP</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative text-gray-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* XP Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Experience Points</span>
            <span className="text-sm font-bold text-emerald-600">{xp} XP</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500 shadow-inner"
              style={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Next level at {((playerLevel) * 1000)} XP!</p>
        </div>

        {/* Overall Progress Chart - Enhanced Quest Mastery Map */}
        <div className="bg-gradient-to-br from-emerald-100 via-white to-cyan-50 rounded-3xl p-8 border border-emerald-200 shadow-2xl mb-8 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-4 left-4 text-emerald-200">
            <MapPin className="w-8 h-8 opacity-20" />
          </div>
          <div className="absolute bottom-4 right-4 text-cyan-200">
            <Flame className="w-8 h-8 opacity-20 animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-500 animate-bounce" />
              Quest Mastery Map
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </h2>
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-4">
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-600 mb-1">Overall Quest Completion</p>
                <p className="text-4xl font-bold text-gray-900">{goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length}%</p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 text-xs text-emerald-600">
                  <Zap className="w-3 h-3 animate-pulse" />
                  Level Up Alert!
                </div>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-sm text-gray-600 mb-1">Treasure Collected</p>
                <p className="text-3xl font-bold text-emerald-600">${goalsData.reduce((sum, g) => sum + g.saved, 0)}</p>
                <div className="flex items-center justify-center lg:justify-end gap-2 mt-2 text-xs text-cyan-600">
                  <Star className="w-3 h-3 fill-current" />
                  Epic Loot!
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-4 border border-emerald-100">
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="30%" 
                  outerRadius="80%" 
                  barSize={25} 
                  data={overallProgressData}
                >
                  <RadialBar 
                    minAngle={15} 
                    background 
                    clockWise 
                    dataKey="value" 
                    fill="url(#questGradient)" 
                    cornerRadius={15}
                  />
                  <defs>
                    <linearGradient id="questGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="fill-gray-900 text-2xl font-black drop-shadow-md"
                  >
                    {Math.round(goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length)}%
                  </text>
                  <text 
                    x="50%" 
                    y="60%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="fill-emerald-600 text-sm font-semibold"
                  >
                    Mastery Achieved
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Chart: Monthly Contributions Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Mana Flow Tracker (Monthly Contributions)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyContributionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="contribution" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Chart: Progress Over Time Line Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-purple-600" />
            Epic Progress Timeline
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsLineChart data={progressOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Goals List - Themed as Quests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {goalsData.map((goal, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Quest Border Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${goal.color} opacity-5 rounded-2xl`}></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-br ${goal.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse`}>
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {goal.deadline}
                    </p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg shadow-md ${goal.status === 'on-track' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}`}>
                  {goal.status === 'on-track' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
              </div>
              <div className="relative mb-4 z-10">
                <div className="text-sm text-gray-600 mb-2 flex items-center justify-between">
                  <span>Treasure: ${goal.saved} / ${goal.target}</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3 animate-bounce" />
                    {estimatedCompletion(goal.saved, goal.target, goal.monthly)} quests left
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
                  <div 
                    className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-700 ease-out shadow-md relative overflow-hidden`}
                    style={{ width: `${animatedProgress[idx]}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mb-3 relative z-10">
                <span className="text-gray-600">Daily XP Gain</span>
                <span className="font-semibold text-gray-900">${goal.monthly} (+{goal.monthly * 2} XP)</span>
              </div>
              <div className="p-3 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl border border-emerald-100 relative z-10">
                <p className="text-xs text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>{goal.tip}</span>
                </p>
              </div>
              {/* Reward Badge */}
              {goal.progress > 50 && (
                <div className="absolute top-2 right-2">
                  <div className="p-1 bg-yellow-400 rounded-full shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Goal Form - Themed as Quest Creator */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-emerald-50 to-teal-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg animate-bounce">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Forge New Quest</h2>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quest Title</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Dragon Slayer Fund"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Target */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Treasure Target ($)</label>
                  <input
                    type="number"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    placeholder="1000"
                    min="0"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Epic Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Monthly Contribution */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mana per Moon ($)</label>
                  <input
                    type="number"
                    name="monthly"
                    value={formData.monthly}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="0"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <Zap className="w-5 h-5 animate-spin" />
                      Summoning Quest...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Forge Quest
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/20 animate-shimmer -skew-x-12"></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Achievements - Gaming Element with More Badges */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-yellow-200 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Achievement Vault (6/6 Unlocked!)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((ach, idx) => (
              <div key={idx} className={`p-4 rounded-xl border transition-all duration-300 ${ach.unlocked ? 'bg-yellow-100 border-yellow-300 shadow-md transform scale-105 animate-bounce' : 'bg-gray-100 border-gray-300'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${ach.unlocked ? 'bg-yellow-400 text-white shadow-lg' : 'bg-gray-300 text-gray-500'}`}>
                    {ach.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{ach.name}</h4>
                </div>
                {ach.unlocked ? (
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1 animate-pulse">
                    {ach.badge} Unlocked! 🎉
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Quest in progress...</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Insights - Themed as Oracle */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            Oracle of Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-emerald-50 border border-emerald-200 hover:shadow-md transition-shadow group">
              <div className="text-4xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform">{goalsData.filter(g => g.progress >= 50).length}</div>
              <div className="text-sm text-gray-600 font-semibold">Quests Conquered</div>
              <p className="text-xs text-emerald-700 mt-1">Legendary status! 🏆</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-amber-50 border border-amber-200 hover:shadow-md transition-shadow group">
              <div className="text-4xl font-bold text-amber-600 mb-2 group-hover:scale-110 transition-transform">{goalsData.filter(g => g.progress < 50).length}</div>
              <div className="text-sm text-gray-600 font-semibold">Challenges Ahead</div>
              <p className="text-xs text-amber-700 mt-1">Adventure calls! ⚔️</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-cyan-50 border border-cyan-200 hover:shadow-md transition-shadow group">
              <div className="text-4xl font-bold text-cyan-600 mb-2 group-hover:scale-110 transition-transform">${goalsData.reduce((sum, g) => sum + g.monthly, 0)}</div>
              <div className="text-sm text-gray-600 font-semibold">Mana Flow</div>
              <p className="text-xs text-cyan-700 mt-1">Fueling your legend 🔥</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Goals;