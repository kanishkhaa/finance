import React, { useState } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  Target, 
  Briefcase, 
  Sparkles, 
  Baby, 
  Heart,
  DollarSign,
  ShoppingBag,
  Home,
  Droplet,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Bell,
  Menu,
  Calendar,
  TrendingDown,
  MoreVertical,
  Download,
  Filter
} from 'lucide-react';

// Horizontal Bar Chart Component
const HorizontalBarChart = ({ data, maxValue }) => {
  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx} className="group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">Monthly average</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">${item.amount}</div>
              <div className={`text-xs flex items-center gap-1 justify-end ${
                item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-rose-600' : 'text-gray-500'
              }`}>
                {item.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                {item.trend === 'down' && <ArrowDown className="w-3 h-3" />}
                {item.change > 0 ? `+${item.change}%` : item.change < 0 ? `${item.change}%` : 'Stable'}
              </div>
            </div>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`absolute h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out group-hover:opacity-90`}
              style={{ width: `${(item.amount / maxValue) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Time Series Line Chart Component
const TimeSeriesChart = ({ data, labels, color, height = 140 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const padding = 20;
  const width = 600;
  
  const points = data.map((value, idx) => {
    const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return { x, y, value };
  });

  const pathD = points.reduce((path, point, idx) => {
    if (idx === 0) return `M ${point.x} ${point.y}`;
    const prevPoint = points[idx - 1];
    const cpX1 = prevPoint.x + (point.x - prevPoint.x) / 3;
    const cpX2 = point.x - (point.x - prevPoint.x) / 3;
    return `${path} C ${cpX1} ${prevPoint.y}, ${cpX2} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        <path
          d={areaD}
          fill="url(#area-gradient)"
          className="transition-all duration-1000"
        />

        <path
          d={pathD}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000"
        />

        {points.map((point, idx) => (
          <g key={idx}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke="url(#line-gradient)"
              strokeWidth="3"
              className="transition-all duration-300 hover:r-7 cursor-pointer"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="20"
              fill="transparent"
              className="cursor-pointer"
            >
              <title>${point.value}</title>
            </circle>
          </g>
        ))}
      </svg>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
        {labels.map((label, idx) => (
          <span key={idx}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// Pie Chart Component
const PieChart = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  let currentAngle = 0;
  
  const slices = data.map((item, idx) => {
    const percentage = (item.amount / total) * 100;
    const sliceAngle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += sliceAngle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle
    };
  });

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const center = size / 2;
  const radius = size / 2 - 10;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {slices.map((slice, idx) => (
          <g key={idx}>
            <path
              d={describeArc(center, center, radius, slice.startAngle, slice.endAngle)}
              className={`transition-all duration-500 hover:opacity-80 cursor-pointer`}
              style={{
                fill: `url(#gradient-${idx})`,
              }}
            />
            <defs>
              <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: slice.color.split(' ')[0].replace('from-', '#') === '#orange-500' ? '#f97316' : slice.color.split(' ')[0].replace('from-', '#') === '#pink-500' ? '#ec4899' : slice.color.split(' ')[0].replace('from-', '#') === '#purple-500' ? '#a855f7' : slice.color.split(' ')[0].replace('from-', '#') === '#blue-500' ? '#3b82f6' : '#14b8a6' }} />
                <stop offset="100%" style={{ stopColor: slice.color.split(' ')[1].replace('to-', '#') === '#amber-600' ? '#d97706' : slice.color.split(' ')[1].replace('to-', '#') === '#rose-600' ? '#e11d48' : slice.color.split(' ')[1].replace('to-', '#') === '#fuchsia-600' ? '#c026d3' : slice.color.split(' ')[1].replace('to-', '#') === '#cyan-600' ? '#0891b2' : '#059669' }} />
              </linearGradient>
            </defs>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ setIsMobileOpen }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const incomeData = [
    { label: 'Side Hustle', amount: 450, change: 12, trend: 'up', color: 'from-emerald-500 to-teal-600', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Freelance', amount: 320, change: 8, trend: 'up', color: 'from-blue-500 to-indigo-600', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Partner Contribution', amount: 200, change: 0, trend: 'stable', color: 'from-violet-500 to-purple-600', icon: <Heart className="w-5 h-5" /> },
    { label: 'Gifts/Allowance', amount: 90, change: 5, trend: 'down', color: 'from-pink-500 to-rose-600', icon: <Sparkles className="w-5 h-5" /> },
  ];

  const expenseData = [
    { label: 'Groceries', amount: 180, percent: 25, color: 'from-orange-500 to-amber-600', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Skincare', amount: 75, percent: 10, color: 'from-pink-500 to-rose-600', icon: <Droplet className="w-5 h-5" /> },
    { label: 'Clothing', amount: 120, percent: 17, color: 'from-purple-500 to-fuchsia-600', icon: <ShoppingBag className="w-5 h-5" /> },
    { label: 'Bills', amount: 250, percent: 35, color: 'from-blue-500 to-cyan-600', icon: <Home className="w-5 h-5" /> },
    { label: 'Baby Expenses', amount: 90, percent: 13, color: 'from-teal-500 to-emerald-600', icon: <Baby className="w-5 h-5" /> },
  ];

  const monthlyTrend = [890, 920, 1050, 1060];

  const goals = [
    { name: 'Vacation Fund', saved: 420, target: 1000, color: 'from-cyan-500 to-blue-600', monthly: 140 },
    { name: 'Emergency Fund', saved: 850, target: 3000, color: 'from-violet-500 to-purple-600', monthly: 283 },
  ];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);

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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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

      {/* Dashboard Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-6">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                8.5%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${totalIncome}</div>
            <div className="text-sm text-gray-600">Total Income</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-rose-600 text-sm font-semibold">
                <ArrowDown className="w-4 h-4" />
                3.2%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${totalExpenses}</div>
            <div className="text-sm text-gray-600">Total Expenses</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-indigo-600 text-sm font-semibold">
                <ArrowUp className="w-4 h-4" />
                12.4%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">${totalIncome - totalExpenses}</div>
            <div className="text-sm text-gray-600">Net Savings</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-semibold text-purple-600">Excellent</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{savingsRate}%</div>
            <div className="text-sm text-gray-600">Savings Rate</div>
          </div>
        </div>

        {/* Income & Expenses Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income Breakdown with Time Series */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Income Streams</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-3">Monthly Income Trend</div>
              <TimeSeriesChart 
                data={monthlyTrend} 
                labels={['Jan', 'Feb', 'Mar', 'Apr']}
                color="from-indigo-500 to-violet-600"
              />
            </div>

            <HorizontalBarChart data={incomeData} maxValue={500} />
          </div>

          {/* Expense Breakdown with Pie Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Expense Distribution</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <PieChart data={expenseData} size={220} />
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">Total Expenses</div>
                <div className="text-3xl font-bold text-gray-900">${totalExpenses}</div>
              </div>
            </div>

            <div className="space-y-3">
              {expenseData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.percent}% of total</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">${item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals & Side Hustle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Goals */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Financial Goals</h2>
              <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700">View All</button>
            </div>
            <div className="space-y-6">
              {goals.map((goal, idx) => {
                const percentage = (goal.saved / goal.target) * 100;
                const remaining = goal.target - goal.saved;
                const monthsToGoal = Math.ceil(remaining / goal.monthly);
                
                return (
                  <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-purple-50 border border-purple-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{goal.name}</div>
                        <div className="text-sm text-gray-600">${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</div>
                        <div className="text-xs text-gray-500">{monthsToGoal} months left</div>
                      </div>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Monthly contribution</span>
                      <span className="font-semibold text-gray-900">${goal.monthly}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Hustle Performance */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-2xl p-6 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Side Hustle Performance</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="text-sm text-gray-600 mb-1">Revenue</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">$680</div>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  +15% vs last month
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="text-sm text-gray-600 mb-1">Expenses</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">$220</div>
                <div className="flex items-center gap-1 text-rose-600 text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" />
                  +8% vs last month
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-5 text-white mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-emerald-100">Net Profit (30 days)</div>
                <div className="flex items-center gap-1 text-emerald-100 text-sm font-semibold">
                  <ArrowUp className="w-4 h-4" />
                  +12%
                </div>
              </div>
              <div className="text-4xl font-bold mb-1">$460</div>
              <div className="text-sm text-emerald-100">Profit margin: 67.6%</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-100">
              <div className="text-sm text-gray-600 mb-3">Monthly Profit Trend</div>
              <TimeSeriesChart 
                data={[360, 390, 420, 460]} 
                labels={['Jan', 'Feb', 'Mar', 'Apr']}
                color="from-amber-500 to-orange-600"
              />
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">AI-Powered Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Smart Spending</div>
                  <p className="text-sm text-gray-700 leading-relaxed">You spent 18% less on clothing this month. Great job staying within budget!</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Goal Acceleration</div>
                  <p className="text-sm text-gray-700 leading-relaxed">You can reach your vacation goal 1 month early if you add $40/week.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Growth Opportunity</div>
                  <p className="text-sm text-gray-700 leading-relaxed">Side hustle profits increased this month — consider allocating an extra $50 to savings.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Financial Health Score</div>
                  <div className="text-sm text-gray-600">Based on your income, expenses, and goals</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">8.5</div>
                <div className="text-xs text-gray-600">out of 10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;