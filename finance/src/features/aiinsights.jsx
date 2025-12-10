// features/ai.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Lightbulb, 
  Filter,
  Download,
  Bell,
  Menu,
  Brain,
  Send,
  Bot,
  User as UserIcon,
  Loader2,
  Database,
  Zap as ZapIcon,
  BarChart3,
  AlertTriangle,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const AIInsights = ({ setIsMobileOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: "Welcome, Aisha! I'm Grok, your AI Financial Agent. I can analyze your data, run simulations, fetch market insights, and even predict trends. What's your first quest? (Try: 'Analyze my budget' or 'Simulate investment growth')",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'welcome',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [healthScore, setHealthScore] = useState(8.5);
  const [activeAgent, setActiveAgent] = useState('general'); // general, budget, investment, goals
  const [conversationHistory, setConversationHistory] = useState([]); // For persistence
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const messagesEndRef = useRef(null);

  const agents = [
    { id: 'general', name: 'Grok Advisor', icon: <Brain className="w-5 h-5" />, description: 'All-purpose financial wisdom' },
    { id: 'budget', name: 'Budget Bot', icon: <TrendingDown className="w-5 h-5" />, description: 'Spending optimization expert' },
    { id: 'investment', name: 'InvestAI', icon: <TrendingUp className="w-5 h-5" />, description: 'Market trends & portfolios' },
    { id: 'goals', name: 'Goal Guardian', icon: <Target className="w-5 h-5" />, description: 'Milestone tracker & simulator' },
  ];

  // Enhanced insights data for visualizations
  const spendingBreakdownData = [
    { name: 'Groceries', value: 180, fill: '#ef4444' },
    { name: 'Skincare', value: 75, fill: '#f59e0b' },
    { name: 'Clothing', value: 120, fill: '#3b82f6' },
    { name: 'Bills', value: 250, fill: '#10b981' },
    { name: 'Baby Expenses', value: 90, fill: '#8b5cf6' },
  ];

  const incomeTrendData = [
    { month: 'Jan', income: 890 },
    { month: 'Feb', income: 920 },
    { month: 'Mar', income: 1050 },
    { month: 'Apr', income: 1060 },
    { month: 'May', income: 1100 },
    { month: 'Jun', income: 1150 },
  ];

  const riskAssessmentData = [
    { category: 'Savings', score: 9, color: '#10b981' },
    { category: 'Investments', score: 6, color: '#f59e0b' },
    { category: 'Debt', score: 8, color: '#3b82f6' },
    { category: 'Emergency Fund', score: 7, color: '#ef4444' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI responses with agent-specific logic and "tool" simulation
  const getAIResponse = (userMessage, agent) => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let toolUsed = false;

    // Simulate tool calls for realism
    if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
      toolUsed = true;
      response = `🔍 *Budget Analyzer Tool Activated*\n\n**Spending Breakdown:**\n• Groceries: $180 (25% ↓5% MoM)\n• Skincare: $75 (stable)\n• Clothing: $120 (18% ↓, $45 saved!)\n• Bills: $250 (up 3%)\n• Baby: $90 (rising 12%)\n\n**Insight:** Redirect $45 savings to high-yield (4.2% APY). Projected annual gain: $189. Full pie chart?`;
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('vacation')) {
      toolUsed = true;
      response = `🎯 *Goal Simulator Running...*\n\n**Vacation Fund Projection:**\n• Current: 42% ($420/$1,000)\n• At $140/mo: Complete Jun 2026 (9 months left)\n• Boost to $180/mo: May 2026 (8 months, +15% faster)\n• With 5% interest: $1,050 total (extra $50 bonus!)\n\n**Tip:** Auto-transfer from side hustle. Run scenario?`;
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('market')) {
      toolUsed = true;
      response = `📈 *Market Intelligence Tool Engaged*\n\n**Portfolio Snapshot:**\n• S&P 500: +2.1% (YTD +15.3%)\n• Your Allocation: 60% Stocks / 40% Bonds\n• VTI Performance: +18.2% (recommended add $50)\n• Risk Score: 7.2/10 (Moderate)\n\n**Alert:** Tech sector hot—diversify with VOO? Live feed?`;
    } else if (lowerMessage.includes('side hustle') || lowerMessage.includes('income')) {
      toolUsed = true;
      response = `💼 *Income Stream Optimizer*\n\n**Hustle Analysis:**\n• Home Food: +12% ($450 → $504 projected)\n• Freelance: Stable $320 (raise rates 10%? +$32/mo)\n• Total Income Trend: ↑8% QoQ\n\n**Tax Tip:** Deduct $120 expenses for $36 refund. Scale ideas: Online courses?`;
    } else if (lowerMessage.includes('health score')) {
      toolUsed = false;
      response = `Your matrix: ${healthScore}/10.\n**Breakdown:** Savings 9/10 | Investments 6/10 | Debt 8/10 | Emergency 7/10.\n**Quick Wins:** +$20 auto-invest (boosts score +0.3). Recalibrate?`;
    } else if (lowerMessage.includes('risk') || lowerMessage.includes('portfolio')) {
      toolUsed = true;
      response = `⚠️ *Risk Engine Analysis*\n\n**Portfolio Health:**\n• Volatility: 8/10 (High)\n• Diversification: 72% (Good)\n• Sharpe Ratio: 1.2 (Above avg)\n\n**Recommendations:** Shift 10% to bonds (-2% vol). Stress test passed 85%. Report?`;
    } else {
      response = "🤖 Deep dive mode... Key insight: Your net worth trajectory +11% YoY. Focus area? (Budget/Goals/Invest/Risk)";
    }

    return { response, toolUsed, agent };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate enhanced delay with tool simulation
    setTimeout(() => {
      const { response, toolUsed, agent } = getAIResponse(userMsg.content, activeAgent);
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: toolUsed ? 'tool-response' : 'text',
        agent: agent,
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Save to history
      setConversationHistory(prev => [...prev, { user: userMsg.content, ai: response }]);

      // Dynamic health score update
      const lowerMessage = userMsg.content.toLowerCase();
      if (lowerMessage.includes('improve') || lowerMessage.includes('fix') || lowerMessage.includes('optimize')) {
        setHealthScore(prev => Math.min(10, prev + 0.2));
      }
    }, 2000 + Math.random() * 1500); // Longer delay for "processing"
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchAgent = (agentId) => {
    setActiveAgent(agentId);
    const agentName = agents.find(a => a.id === agentId).name;
    const switchMsg = {
      id: Date.now(),
      role: 'system',
      content: `🔄 Switched to ${agentName} mode. Specialized toolkit loaded! Ask away.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system',
    };
    setMessages(prev => [...prev, switchMsg]);
  };

  const clearConversation = () => {
    setMessages([messages[0]]); // Keep welcome message
    setConversationHistory([]);
  };

  const exportConversation = () => {
    const exportData = conversationHistory.map((conv, idx) => `Q${idx + 1}: ${conv.user}\nA${idx + 1}: ${conv.ai}\n\n`).join('');
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-insights-chat.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 flex flex-col">
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
                <Bot className="w-6 h-6 text-purple-600 animate-pulse" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI Advisor Hub</h1>
                  <p className="text-sm text-gray-600">Multi-agent financial intelligence</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Database className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={exportConversation}>
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Health Score - Dynamic with Breakdown */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl p-6 mb-6 shadow-2xl border border-purple-400/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-12 h-12 animate-pulse" />
              <h2 className="text-2xl font-bold">Financial Health Matrix</h2>
            </div>
            <div className="text-5xl font-black mb-2 drop-shadow-lg">{healthScore.toFixed(1)}</div>
            <div className="text-purple-100 text-lg">out of 10</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <div className="text-center p-2 bg-white/10 rounded-lg">
                <div className="text-sm font-semibold">Savings</div>
                <div className="text-lg font-bold">9.2</div>
              </div>
              <div className="text-center p-2 bg-white/10 rounded-lg">
                <div className="text-sm font-semibold">Investments</div>
                <div className="text-lg font-bold">6.8</div>
              </div>
              <div className="text-center p-2 bg-white/10 rounded-lg">
                <div className="text-sm font-semibold">Debt</div>
                <div className="text-lg font-bold">8.1</div>
              </div>
              <div className="text-center p-2 bg-white/10 rounded-lg">
                <div className="text-sm font-semibold">Emergency</div>
                <div className="text-lg font-bold">7.5</div>
              </div>
            </div>
            <p className="text-purple-100 mt-3 opacity-90 flex items-center justify-center gap-2">
              <ZapIcon className="w-4 h-4" /> Real-time insights • Last sync: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col mb-6 overflow-hidden">
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                    } ${message.type === 'tool-response' ? 'ring-2 ring-purple-200' : ''}`}
                  >
                    <div className="flex items-start gap-3 mb-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' ? 'bg-white/20' : 'bg-purple-600'
                      }`}>
                        {message.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                          {message.content}
                        </p>
                        {message.type === 'tool-response' && (
                          <div className="mt-2 p-2 bg-white/20 rounded-lg text-xs text-white/90 flex items-center gap-1">
                            <Database className="w-3 h-3" /> Tool activated: {message.agent}
                          </div>
                        )}
                        {message.type === 'system' && (
                          <div className="mt-1 p-1 bg-white/30 rounded text-xs font-semibold text-white">
                            {message.content}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs opacity-75 ${message.role === 'user' ? 'text-white/80 ml-10' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 max-w-xs lg:max-w-md border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Chat with ${agents.find(a => a.id === activeAgent).name}... (e.g., 'How's my budget?')`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Switcher Sidebar */}
        <div className={`w-64 bg-white rounded-2xl border border-gray-200 shadow-lg ml-4 ${showAdvancedPanel ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">AI Agents</h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => switchAgent(agent.id)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                    activeAgent === agent.id
                      ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {agent.icon}
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{agent.name}</div>
                    <div className="text-xs opacity-75">{agent.description}</div>
                  </div>
                  {activeAgent === agent.id && <Sparkles className="w-4 h-4 text-white animate-pulse" />}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-4">Session Controls</h3>
            <button
              onClick={clearConversation}
              className="w-full p-2 text-xs text-red-600 hover:bg-red-50 rounded transition-colors mb-2"
            >
              Clear Chat
            </button>
            <button
              onClick={exportConversation}
              className="w-full p-2 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              Export Session
            </button>
          </div>
        </div>
      </div>

      {/* Insights Dashboard - Expanded with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Spending Breakdown Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-pink-600" />
            Spending Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={spendingBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {spendingBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2 text-center">Total: $715 | Insight: Clothing savings opportunity</p>
        </div>

        {/* Income Trend Line Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Income Trends (6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={incomeTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2 text-center">Avg Growth: +8% | Projection: $1,200 next month</p>
        </div>
      </div>

      {/* Risk Assessment Bar Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Risk Assessment Scores
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={riskAssessmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2 text-center">Overall Risk: Moderate | Action: Diversify investments</p>
      </div>

      {/* Quick Actions - Simulator Teaser */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-900">Agent Simulations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left shadow-sm hover:shadow-md">
            <Target className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900 mb-1">Goal Simulator</p>
            <p className="text-xs text-gray-600">Project future milestones</p>
          </button>
          <button className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left shadow-sm hover:shadow-md">
            <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900 mb-1">Income Forecast</p>
            <p className="text-xs text-gray-600">Predict earnings trends</p>
          </button>
          <button className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left shadow-sm hover:shadow-md">
            <TrendingDown className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-900 mb-1">Risk Analyzer</p>
            <p className="text-xs text-gray-600">Identify financial pitfalls</p>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        .typing-indicator {
          overflow: hidden;
          border-right: 2px solid transparent;
          white-space: nowrap;
          animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: currentColor; }
        }
      `}</style>
    </div>
  );
};

export default AIInsights;