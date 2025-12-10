import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bot, Send, X } from 'lucide-react';

import Landing from "./features/landing";
import Dashboard from "./features/dashboard";
import IncomeTracker from "./features/tracker";
import Expenses from "./features/expenses";
import Goals from "./features/goals";
import SideHustle from "./features/sidehustle";
import AIInsights from "./features/aiinsights";
import Community from "./features/community";
import FamilyPlanning from "./features/familyplanning";
import BabyTracker from "./features/babytracker";
import Settings from "./features/settings";
import FinancialSimulator from "./features/simulator";
import InvestmentEducation from "./features/education";
import Sidebar from "./features/sidebar";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Mock AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: 'This is a mock response to: ' + input + '. For full AI features, visit the AI Insights page!' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 md:bottom-6 md:right-6"
      >
        <Bot className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden md:w-96 md:h-[500px] md:bottom-6 md:right-6">
          <div className="p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white flex justify-between items-center">
            <h3 className="font-bold">Chat Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Hi! I'm here to help with your financial questions. Ask away!</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="Type your message..."
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim()}
                className="bg-purple-500 text-white p-2 rounded-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Wrapper component for pages with sidebar
  const PageWithSidebar = ({ children, setIsMobileOpen: passSetIsMobileOpen }) => (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ease-in-out ml-0 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        {React.cloneElement(children, { setIsMobileOpen: passSetIsMobileOpen })}
        <ChatBot />
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Landing page WITHOUT sidebar */}
        <Route path="/" element={<Landing />} />

        {/* Pages WITH sidebar */}
        <Route
          path="/dashboard"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <Dashboard />
            </PageWithSidebar>
          }
        />

        <Route
          path="/income"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <IncomeTracker />
            </PageWithSidebar>
          }
        />

        <Route
          path="/expenses"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <Expenses />
            </PageWithSidebar>
          }
        />

        <Route
          path="/goals"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <Goals />
            </PageWithSidebar>
          }
        />

        <Route
          path="/sidehustle"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <SideHustle />
            </PageWithSidebar>
          }
        />

        <Route
          path="/ai"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <AIInsights />
            </PageWithSidebar>
          }
        />

        <Route
          path="/community"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <Community />
            </PageWithSidebar>
          }
        />

        <Route
          path="/family"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <FamilyPlanning />
            </PageWithSidebar>
          }
        />

        <Route
          path="/baby"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <BabyTracker />
            </PageWithSidebar>
          }
        />

        <Route
          path="/simulator"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <FinancialSimulator />
            </PageWithSidebar>
          }
        />

        <Route
          path="/education"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <InvestmentEducation />
            </PageWithSidebar>
          }
        />

        <Route
          path="/settings"
          element={
            <PageWithSidebar setIsMobileOpen={setIsMobileOpen}>
              <Settings />
            </PageWithSidebar>
          }
        />

        {/* Redirect logout to landing */}
        <Route path="/login" element={<Landing />} />
      </Routes>
    </Router>
  );
}