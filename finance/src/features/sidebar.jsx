import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  Target, 
  Briefcase, 
  Sparkles, 
  Users, 
  Baby, 
  Heart,
  Activity,
  BookOpen,
  Settings, 
  LogOut,
  ChevronRight,
  X,
  ChevronLeft
} from 'lucide-react';

const Sidebar = ({ activeMenu, setActiveMenu, isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Income Tracker', id: 'income', path: '/income' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Expenses', id: 'expenses', path: '/expenses' },
    { icon: <Target className="w-5 h-5" />, label: 'Goals', id: 'goals', path: '/goals' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Side Hustle', id: 'sidehustle', path: '/sidehustle' },
    { icon: <Activity className="w-5 h-5" />, label: 'Financial Simulator', id: 'simulator', path: '/simulator' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Investment Education', id: 'education', path: '/education' },
    { icon: <Sparkles className="w-5 h-5" />, label: 'AI Insights', id: 'ai', path: '/ai' },
    { icon: <Users className="w-5 h-5" />, label: 'Community', id: 'community', path: '/community' },
    { icon: <Heart className="w-5 h-5" />, label: 'Family Planning', id: 'family', path: '/family' },
    { icon: <Baby className="w-5 h-5" />, label: 'Baby Tracker', id: 'baby', path: '/baby' },
  ];

  const bottomItems = [
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', id: 'settings', path: '/settings' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout', id: 'logout', path: '/login' },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    setIsMobileOpen(false);
    navigate(item.path);
  };

  const handleBottomClick = (item) => {
    setActiveMenu(item.id);
    if (item.id === 'logout') {
      console.log('Logout functionality');
    }
    navigate(item.path);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  // Sync activeMenu with current location
  React.useEffect(() => {
    const currentPath = location.pathname;
    const allItems = [...menuItems, ...bottomItems];
    const currentItem = allItems.find(item => item.path === currentPath);
    if (currentItem && activeMenu !== currentItem.id) {
      setActiveMenu(currentItem.id);
    }
  }, [location.pathname, activeMenu, setActiveMenu, menuItems, bottomItems]);

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleMobileClose}
        />
      )}

      <div className={`fixed left-0 top-0 h-full bg-white shadow-sm z-50 transform transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:w-16' : 'lg:w-72'} w-72 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className={`p-6 border-b border-gray-200 ${isCollapsed ? 'lg:p-3' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">HerFinance</div>}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={handleCollapseToggle}
                >
                  <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  className="lg:hidden text-gray-600"
                  onClick={handleMobileClose}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {!isCollapsed && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    AR
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Aisha Rahman</div>
                    <div className="text-sm text-purple-600 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3" />
                      Premium Member
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="hidden lg:flex justify-center mt-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  AR
                </div>
              </div>
            )}
          </div>

          <div className={`flex-1 overflow-y-auto py-6 ${isCollapsed ? 'lg:px-2' : 'px-4'}`}>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 ${isCollapsed ? 'lg:justify-center lg:px-2' : 'px-4'} py-3 rounded-xl transition-all justify-between ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className={`flex items-center gap-3 ${isCollapsed ? 'lg:justify-center' : 'flex-1'}`}>
                    {item.icon}
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && activeMenu === item.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </nav>
          </div>

          <div className={`p-4 border-t border-gray-200 space-y-1 ${isCollapsed ? 'lg:p-2' : ''}`}>
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleBottomClick(item)}
                className={`w-full flex items-center gap-3 ${isCollapsed ? 'lg:justify-center lg:px-2' : 'px-4'} py-3 rounded-xl transition-all justify-between ${
                  activeMenu === item.id
                    ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <div className={`flex items-center gap-3 ${isCollapsed ? 'lg:justify-center' : 'flex-1'}`}>
                  {item.icon}
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!isCollapsed && activeMenu === item.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;