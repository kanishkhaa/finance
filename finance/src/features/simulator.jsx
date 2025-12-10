// features/simulator.jsx
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Zap, 
  Filter,
  Download,
  Bell,
  Menu,
  Activity,
  AlertTriangle,
  Shield,
  Flame,
  Percent,
  Target,
  BarChart3,
  FileText
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  ReferenceLine
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion'; // Assuming framer-motion is installed for animations

const FinancialSimulator = ({ setIsMobileOpen }) => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [years, setYears] = useState(10);
  const [riskLevel, setRiskLevel] = useState('medium'); // low, medium, high
  const [simulationType, setSimulationType] = useState('investment'); // savings, investment, retirement
  const [targetGoal, setTargetGoal] = useState(50000);
  const [showComparison, setShowComparison] = useState(true);

  const riskRates = {
    low: 4, // Conservative (bonds/CDs)
    medium: 7, // Balanced (60/40 portfolio)
    high: 10 // Aggressive (stocks)
  };

  const annualRate = riskRates[riskLevel];

  const simulateGrowth = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const monthlyInflation = inflationRate / 100 / 12;
    const months = years * 12;
    const data = [];
    let balance = initialAmount;
    let realBalance = initialAmount;

    // Precompute no-contribution line for comparison
    const noContribData = [];
    let noContribBalance = initialAmount;
    let noContribReal = initialAmount;
    for (let m = 0; m <= months; m += 12) {
      noContribData.push({
        year: m / 12,
        noContrib: Math.round(noContribBalance),
        noContribReal: Math.round(noContribReal)
      });
      if (m < months) {
        noContribBalance *= Math.pow(1 + monthlyRate, 12);
        noContribReal *= Math.pow(1 + monthlyInflation, 12);
      }
    }

    for (let month = 0; month <= months; month += 12) {
      const year = month / 12;
      data.push({
        year,
        balance: Math.round(balance),
        realBalance: Math.round(realBalance),
        ...noContribData[month / 12]
      });

      if (month < months) {
        // Compound with contributions (future value of annuity)
        const fvInitial = balance * Math.pow(1 + monthlyRate, 12);
        const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate);
        balance = fvInitial + fvContributions;

        const fvInitialReal = realBalance * Math.pow(1 + monthlyInflation, 12);
        const fvContributionsReal = monthlyContribution * ((Math.pow(1 + monthlyInflation, 12) - 1) / monthlyInflation);
        realBalance = fvInitialReal + fvContributionsReal;
      }
    }

    return { data, noContribData };
  }, [initialAmount, monthlyContribution, annualRate, inflationRate, years, riskLevel]);

  const { data } = simulateGrowth;
  const totalContributions = initialAmount + monthlyContribution * years * 12;
  const totalGrowth = parseInt(data[data.length - 1]?.balance) - totalContributions;
  const isGoalAchieved = parseInt(data[data.length - 1]?.balance) >= targetGoal;
  const gapToGoal = targetGoal - parseInt(data[data.length - 1]?.balance);

  const getSimulationLabel = () => {
    switch (simulationType) {
      case 'savings': return 'High-Yield Savings Growth';
      case 'investment': return 'Portfolio Projection';
      case 'retirement': return 'Retirement Accumulator';
      default: return 'Financial Projection';
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Activity className="w-6 h-6 text-emerald-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Financial Simulator</h1>
                  <p className="text-sm text-gray-600">{getSimulationLabel()}</p>
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
                <motion.span 
                  className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Simulator Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Customize Your Scenario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> Initial Amount ($)
              </label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                placeholder="e.g., 1000"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Zap className="w-4 h-4" /> Monthly Contribution ($)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                placeholder="e.g., 100"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Flame className="w-4 h-4" /> Risk Level
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              >
                <option value="low">Low (4% return)</option>
                <option value="medium">Medium (7% return)</option>
                <option value="high">High (10% return)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Percent className="w-4 h-4" /> Inflation (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                placeholder="e.g., 2.5"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Time Horizon (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                placeholder="e.g., 10"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setSimulationType('savings')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex-1 ${simulationType === 'savings' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Shield className="w-4 h-4 mr-2" /> Savings
              </button>
              <button
                onClick={() => setSimulationType('investment')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex-1 ${simulationType === 'investment' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <TrendingUp className="w-4 h-4 mr-2" /> Investments
              </button>
              <button
                onClick={() => setSimulationType('retirement')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex-1 ${simulationType === 'retirement' ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Target className="w-4 h-4 mr-2" /> Retirement
              </button>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Target Goal ($)</label>
                <input
                  type="number"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="e.g., 50000"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowComparison(!showComparison)}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Compare Scenarios</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Simulation Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              Projected Growth Trajectory
            </h3>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span>Expected Return: {annualRate}%</span>
              <span>•</span>
              <span>Inflation: {inflationRate}%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af" 
                tickFormatter={(value) => `${value}y`}
                label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="#9ca3af" 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} 
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#10b981" 
                strokeWidth={3} 
                name="Nominal Growth"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="realBalance" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                name="Real Growth (Inflation-Adj.)"
                strokeDasharray="5 5"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
              />
              {showComparison && (
                <Line 
                  type="monotone" 
                  dataKey="noContrib" 
                  stroke="#6b7280" 
                  strokeWidth={2} 
                  name="No Contributions"
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
              {isGoalAchieved ? (
                <ReferenceLine y={targetGoal} stroke="green" strokeDasharray="3 3" label="Target Goal" />
              ) : (
                <ReferenceLine y={targetGoal} stroke="#ef4444" strokeDasharray="3 3" label="Target Goal" />
              )}
            </LineChart>
          </ResponsiveContainer>
          <AnimatePresence>
            {gapToGoal !== 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`mt-4 p-4 rounded-xl text-center ${isGoalAchieved ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
              >
                <AlertTriangle className={`w-5 h-5 mx-auto mb-2 ${isGoalAchieved ? 'text-green-600' : 'text-red-600'}`} />
                <p className="font-semibold text-gray-900">
                  {isGoalAchieved ? 'Goal Achieved!' : 'Shortfall to Goal:'} 
                  <span className={`ml-1 ${isGoalAchieved ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(gapToGoal).toLocaleString()}
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-4 text-center text-xs text-gray-500 italic">
            Projections are estimates. Past performance doesn't guarantee future results. Consider consulting a financial advisor.
          </p>
        </motion.div>

        {/* Quick Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg text-center">
            <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">${totalContributions.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Invested</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className={`text-2xl font-bold mb-1 ${totalGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totalGrowth.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Projected Growth</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg text-center">
            <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">{annualRate}%</div>
            <div className="text-sm text-gray-600">Avg. Annual Return</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">{years} yrs</div>
            <div className="text-sm text-gray-600">Projection Period</div>
          </div>
        </motion.div>

        {/* Type-Specific Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h4 className="font-bold text-gray-900 mb-4">Pro Tips for {getSimulationLabel()}</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {simulationType === 'savings' && (
              <>
                <li>• Shop for FDIC-insured high-yield accounts (currently ~4-5% APY).</li>
                <li>• Automate transfers to build the habit without thinking.</li>
                <li>• Reassess rates annually as they fluctuate with Fed policy.</li>
              </>
            )}
            {simulationType === 'investment' && (
              <>
                <li>• Diversify across stocks, bonds, and ETFs to match your risk level.</li>
                <li>• Use tax-advantaged accounts like Roth IRA for efficiency.</li>
                <li>• Review portfolio yearly; rebalance if allocations drift 5%.</li>
              </>
            )}
            {simulationType === 'retirement' && (
              <>
                <li>• Aim for 15-25x annual expenses saved (4% safe withdrawal rule).</li>
                <li>• Factor Social Security (~$20k avg/year) into your final needs.</li>
                <li>• Consider healthcare costs: ~$300k/couple post-65 (2025 est.).</li>
              </>
            )}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-x-4 pt-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg inline-flex items-center gap-2"
            onClick={() => {/* Save logic */ alert('Simulation saved!'); }}
          >
            <FileText className="w-5 h-5" /> Save & Export PDF
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all inline-flex items-center gap-2"
            onClick={() => {/* Share logic */ alert('Report shared!'); }}
          >
            <TrendingUp className="w-5 h-5" /> Share Projection
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FinancialSimulator;