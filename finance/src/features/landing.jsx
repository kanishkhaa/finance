import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Target, PieChart, Sparkles, DollarSign, BarChart3, ArrowRight, Star, CheckCircle, Award, Users, Shield } from 'lucide-react';

const HerFinanceLanding = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [activeFeature, setActiveFeature] = useState(0);
  const [countUp, setCountUp] = useState({ users: 0, tracked: 0, satisfaction: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="animate-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCountUp({
        users: Math.floor(45000 * progress),
        tracked: (12.4 * progress).toFixed(1),
        satisfaction: Math.floor(98 * progress)
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Multi-Source Income Tracking",
      description: "Track your job income, side hustles, partner contributions, and freelance earnings — all in one place.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Smart Expense Categorization",
      description: "Automatically categorize bills, groceries, skincare, travel, and baby expenses with intelligent insights.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Based Planning",
      description: "Create savings goals for vacations, education, home, or self-care with progress tracking.",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Side-Hustle Analytics",
      description: "Monitor profit, expenses, and growth trends of your home business or freelance work.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Financial Simulator",
      description: "Visualize future wealth: see how savings, expenses, and investments grow over time.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Insights for Women",
      description: "Receive personalized suggestions for budgeting, saving, investing, and improving financial health.",
      color: "from-fuchsia-500 to-pink-600"
    }
  ];

  const testimonials = [
    {
      name: "Aisha",
      age: 27,
      role: "Home Baker",
      content: "HerFinance helped me track profits from my baking business and finally start saving.",
      avatar: "A",
      color: "from-emerald-400 to-teal-500"
    },
    {
      name: "Prisha",
      age: 34,
      role: "Freelance Designer",
      content: "The simulator showed me how investing small amounts monthly would grow my future wealth.",
      avatar: "P",
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Maya",
      age: 29,
      role: "New Mom",
      content: "Baby expenses were overwhelming before. Now everything is organized and predictable.",
      avatar: "M",
      color: "from-violet-400 to-purple-500"
    }
  ];

  const stats = [
    { value: countUp.users.toLocaleString(), label: "women using HerFinance", icon: <Users className="w-6 h-6" /> },
    { value: `₹${countUp.tracked}M`, label: "tracked monthly", icon: <TrendingUp className="w-6 h-6" /> },
    { value: `${countUp.satisfaction}%`, label: "satisfaction rate", icon: <Award className="w-6 h-6" /> }
  ];

  const trustBadges = [
    { icon: <Shield className="w-8 h-8" />, text: "Bank-Level Security" },
    { icon: <Award className="w-8 h-8" />, text: "Award Winning" },
    { icon: <Users className="w-8 h-8" />, text: "45K+ Community" }
  ];

  const handleStartJourney = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                HerFinance
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Pricing
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                About
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:block text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-lg font-semibold transition-colors">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ top: '10%', left: '10%', transform: `translateY(${scrollY * 0.2}px)` }}
          ></div>
          <div 
            className="absolute w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ top: '40%', right: '10%', animationDelay: '1s', transform: `translateY(${scrollY * 0.15}px)` }}
          ></div>
          <div 
            className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ bottom: '10%', left: '30%', animationDelay: '2s', transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-8 border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 45,000+ Women</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Take Control of Your Money,<br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Your Goals, Your Future.
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              A financial ecosystem built for women with multiple income streams, 
              personal goals, and real-life responsibilities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button onClick={handleStartJourney} className="group bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-2">
                Start Your Financial Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/80">
                  <div className="text-emerald-300">{badge.icon}</div>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="text-emerald-300 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}+</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F9FAFB" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            POWERFUL FEATURES
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to 
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Thrive Financially</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed specifically for modern women managing complex financial lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              id={`animate-feature-${idx}`}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-200 ${
                isVisible[`animate-feature-${idx}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${activeFeature === idx ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-bl-full opacity-50"></div>
              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="relative text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="relative text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="relative mt-4 text-indigo-600 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Loved by Women 
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Everywhere</span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from real women transforming their finances</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                id={`animate-testimonial-${idx}`}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 ${
                  isVisible[`animate-testimonial-${idx}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-center mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}, {testimonial.age}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"></div>
        
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ top: '20%', left: '10%' }}></div>
          <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ bottom: '20%', right: '10%', animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-400 rounded-2xl mb-6 transform hover:rotate-12 transition-transform shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of women taking control of their financial future today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button onClick={handleStartJourney} className="group bg-white text-indigo-600 px-10 py-5 rounded-xl text-xl font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-2xl inline-flex items-center gap-3">
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>Free forever plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-4">
                HerFinance
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering women to achieve financial freedom through intelligent tools and insights.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Features</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">About</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 HerFinance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerFinanceLanding;