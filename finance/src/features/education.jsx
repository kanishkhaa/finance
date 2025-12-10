// features/education.jsx
import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Zap, 
  TrendingUp,
  Calendar,
  Play,
  Newspaper,
  Video,
  Filter,
  Download,
  Bell,
  Menu,
  Users,
  CheckCircle,
  Award,
  Brain,
  Target,
  Sparkles
} from 'lucide-react';

const InvestmentEducation = ({ setIsMobileOpen }) => {
  const [activeTab, setActiveTab] = useState('resources'); // Changed default to 'resources' to show added content on load
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const tabs = [
    { id: 'basics', label: 'Basics', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'strategies', label: 'Strategies', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  const content = {
    basics: {
      title: 'Investment Basics for Women',
      sections: [
        {
          heading: 'What is Investing?',
          description: 'Investing is putting your money to work so it can grow over time. Unlike saving, which keeps your money safe but earns little interest, investing aims for higher returns but comes with risk.',
          icon: <BookOpen className="w-8 h-8 text-blue-500" />
        },
        {
          heading: 'Why Invest as a Woman?',
          description: 'Women often face unique financial challenges like the gender pay gap and career breaks for family. Investing helps bridge these gaps and build long-term wealth.',
          icon: <Users className="w-8 h-8 text-purple-500" />
        },
        {
          heading: 'Risk vs. Reward',
          description: 'Higher potential returns usually mean higher risk. Start with low-risk options like index funds while learning.',
          icon: <Zap className="w-8 h-8 text-emerald-500" />
        }
      ]
    },
    strategies: {
      title: 'Investment Strategies',
      sections: [
        {
          heading: 'Dollar-Cost Averaging',
          description: 'Invest a fixed amount regularly, regardless of market price. This reduces the impact of volatility.',
          icon: <TrendingUp className="w-8 h-8 text-green-500" />
        },
        {
          heading: 'Diversification',
          description: 'Spread investments across stocks, bonds, and real estate to minimize risk.',
          icon: <CheckCircle className="w-8 h-8 text-blue-500" />
        },
        {
          heading: 'Long-Term Holding',
          description: 'Time in the market beats timing the market. Hold investments for years, not days.',
          icon: <Calendar className="w-8 h-8 text-purple-500" />
        }
      ]
    },
    resources: {
      title: 'Learning Resources',
      sections: [
        {
          heading: 'Books',
          description: 'Read "Rich Dad Poor Dad" by Robert Kiyosaki or "The Simple Path to Wealth" by JL Collins.',
          icon: <BookOpen className="w-8 h-8 text-indigo-500" />
        },
        {
          heading: 'Podcasts',
          description: 'Listen to "HerMoney" with Jean Chatzky or "Afford Anything".',
          icon: <Zap className="w-8 h-8 text-orange-500" />
        },
        {
          heading: 'Online Courses',
          description: 'Take free courses on Khan Academy or Coursera about personal finance.',
          icon: <GraduationCap className="w-8 h-8 text-emerald-500" />
        }
      ],
      blogs: [
        {
          title: 'Meet Grace Zhang, our Inaugural Kamla R. Hingorani Fellow',
          excerpt: 'I am honored to touch on my experience as the inaugural recipient of the Kamla R. Hingorani Fellowship, a fund that was created in memory of Kamla R. Hingorani, the mother of Girls Who Invest Founder and Board Chair, Seema R. Hingorani.',
          author: 'Gina Aronstein',
          date: 'Dec 5, 2025',
          readTime: '6 min',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
          link: 'https://www.girlswhoinvest.org/gwi-blog'
        },
        {
          title: 'Doubling AUM From Under $300M To Over $600M In 3.5 Years By Making Investments To Systematize For Scale',
          excerpt: 'Doubling AUM From Under $300M To Over $600M In 3.5 Years By Making Investments To Systematize For Scale: #FASuccess Ep 466 With Morgan Nichols.',
          author: 'Michael Kitces',
          date: 'Dec 2, 2025',
          readTime: '8 min',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
          link: 'https://www.kitces.com/blog/doubling-aum-from-under-300m-to-over-600m-in-3-5-years-by-making-investments-to-systematize-for-scale-fasuccess-ep-466-with-morgan-nichols/'
        },
        {
          title: 'The Best US-Based Personal Finance Bloggers Helping You Build Wealth in 2025',
          excerpt: 'Ramit Sethi, Humphrey Yang, and Dasha Kennedy are some of the best US-based personal finance bloggers. Ramit uses humor, Humphrey uses videos...',
          author: 'FindCollab Team',
          date: 'Dec 9, 2025',
          readTime: '7 min',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
          link: 'https://www.findcollab.com/blog/the-best-us-based-personal-finance-bloggers-helping-you-build-wealth-in-2025'
        }
      ],
      videos: [
        {
          title: 'How To Invest In 2025 As A Woman',
          description: 'A guide to investing options tailored for women in 2025. Subscribe for weekly tips on money, mindset, and making moves.',
          duration: '10:15',
          thumbnail: 'https://img.youtube.com/vi/mcz8PKNkwVQ/maxresdefault.jpg',
          channel: 'Financially Fit Female',
          link: 'https://www.youtube.com/watch?v=mcz8PKNkwVQ'
        },
        {
          title: 'The 7 Investments Every Smart Woman Should Have in 2025',
          description: 'This is How to Level Up as a Woman! Join the upcoming Wealth Builders Academy...',
          duration: '12:34',
          thumbnail: 'https://img.youtube.com/vi/wWHdA3NUVgc/maxresdefault.jpg',
          channel: 'Wealthy Woman Network',
          link: 'https://www.youtube.com/watch?v=wWHdA3NUVgc'
        },
        {
          title: 'Women and Investing Masterclass 2025',
          description: 'How to understand your financial self · Build investing confidence · AI-powered investing · Getting advice on investments.',
          duration: '45:12',
          thumbnail: 'https://img.youtube.com/vi/lceiv7UnF6Y/maxresdefault.jpg',
          channel: 'BC Securities Commission',
          link: 'https://www.youtube.com/watch?v=lceiv7UnF6Y'
        }
      ],
      tutorials: [
        {
          title: 'Free Financial Literacy Educational Courses for Women',
          description: 'Sign up for our best-in-class free financial education courses created by industry experts to help you along your personal financial journey.',
          link: 'https://www.savvyladies.org/financial-literacy-classes/',
          provider: 'Savvy Ladies'
        },
        {
          title: 'Free Financial Courses for Women | Clever Girl Finance',
          description: 'Clever Girl Finance is a free money course platform for women. Learn how to budget, pay off debt, save, and start investing with step-by-step financial courses.',
          link: 'https://www.clevergirlfinance.com/course-packages/',
          provider: 'Clever Girl Finance'
        },
        {
          title: 'Financial Literacy | Life skills - Khan Academy',
          description: 'Take your finances to the next level with the practical tips and step-by-step guidance in our new course! You’ll learn everything you need to know to manage your finances like a pro.',
          link: 'https://www.khanacademy.org/college-careers-more/financial-literacy',
          provider: 'Khan Academy'
        }
      ]
    }
  };

  const handleQuizAnswer = (question, answer) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const submitQuiz = () => {
    const score = Object.values(quizAnswers).filter(ans => ans === 'correct').length;
    setShowResults(true);
    // Mock badge or something
  };

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does diversification mean?',
      icon: <Target className="w-6 h-6 text-indigo-500" />,
      options: [
        { text: 'Spreading investments', correct: true },
        { text: 'Buying one stock', correct: false },
        { text: 'Selling quickly', correct: false }
      ]
    },
    {
      id: 'q2',
      question: 'Compound interest is...',
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      options: [
        { text: 'Interest on interest', correct: true },
        { text: 'Simple interest', correct: false },
        { text: 'No interest', correct: false }
      ]
    }
  ];

  const progress = (Object.keys(quizAnswers).length / quizQuestions.length) * 100;

  return (
    <div className="h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
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
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Investment Education</h1>
                  <p className="text-sm text-gray-600">Learn to invest with confidence</p>
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{content[activeTab].title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content[activeTab].sections.map((section, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 p-3 bg-gray-100 rounded-full flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{section.heading}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quiz Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 relative z-10">
            <Brain className="w-5 h-5 text-indigo-600" />
            Quick Quiz: Test Your Knowledge
            <span className="ml-auto text-sm text-gray-500">Progress: {Object.keys(quizAnswers).length}/{quizQuestions.length}</span>
          </h3>
          <div className="space-y-6">
            {quizQuestions.map((q, qIdx) => (
              <div key={q.id} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  {q.icon}
                  <p className="font-semibold text-gray-900 text-lg">{qIdx + 1}. {q.question}</p>
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(q.id, opt.correct ? 'correct' : 'incorrect')}
                      className={`w-full p-4 text-left rounded-xl transition-all duration-200 transform hover:scale-105 ${
                        quizAnswers[q.id] === 'correct' && opt.correct
                          ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 border-2 border-emerald-400 text-emerald-800 shadow-md'
                          : quizAnswers[q.id] === 'incorrect' && !opt.correct
                          ? 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-400 text-red-800 shadow-md'
                          : quizAnswers[q.id]
                          ? 'opacity-50 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                      disabled={!!quizAnswers[q.id] || showResults}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          quizAnswers[q.id] === 'correct' && opt.correct
                            ? 'bg-emerald-500 text-white'
                            : quizAnswers[q.id] === 'incorrect' && !opt.correct
                            ? 'bg-red-500 text-white'
                            : 'bg-transparent border-2 border-gray-300'
                        }`}>
                          {quizAnswers[q.id] && (opt.correct ? <CheckCircle className="w-3 h-3" /> : optIdx === 0 ? <CheckCircle className="w-3 h-3 text-red-500" /> : '')}
                        </div>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {!showResults ? (
            <div className="text-center mt-8 pt-4 border-t border-gray-200">
              <button 
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                Submit & See Your Score
              </button>
            </div>
          ) : (
            <div className="text-center mt-8 pt-4 border-t border-gray-200 p-6 bg-white rounded-xl shadow-md">
              <Award className="w-16 h-16 text-emerald-600 mx-auto mb-4 animate-bounce" />
              <h4 className="font-bold text-2xl text-emerald-800 mb-2">Fantastic!</h4>
              <p className="text-emerald-700 text-lg mb-4">You scored {Object.values(quizAnswers).filter(ans => ans === 'correct').length}/{quizQuestions.length} – You're on your way to investment mastery!</p>
              <div className="flex justify-center space-x-4 mb-4">
                <div className="text-sm text-gray-600">Keep learning to boost your score! 💪</div>
              </div>
              <button 
                onClick={() => { setQuizAnswers({}); setShowResults(false); }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>

        {/* Resources Tab Extra Content */}
        {activeTab === 'resources' && (
          <div className="space-y-8 mb-8">
            {/* Blogs Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-gray-600" />
                Latest Blogs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.resources.blogs.map((blog, idx) => (
                  <div key={idx} className="group cursor-pointer hover:shadow-lg transition-all">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-32 object-cover rounded-xl mb-3 group-hover:opacity-90 transition-opacity"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{blog.author} • {blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <a href={blog.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-indigo-600 text-sm font-medium hover:underline">Read More →</a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-all">
                  Read More Blogs
                </button>
              </div>
            </div>

            {/* Videos Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-600" />
                Recommended Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.resources.videos.map((video, idx) => (
                  <div key={idx} className="group cursor-pointer hover:shadow-lg transition-all">
                    <div className="relative mb-3">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-32 object-cover rounded-xl group-hover:opacity-90 transition-opacity"
                      />
                      <Play className="w-8 h-8 text-white absolute inset-0 m-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.channel}</span>
                      <span>{video.duration}</span>
                    </div>
                    <a href={video.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-red-600 text-sm font-medium hover:underline">Watch Now →</a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all">
                  Watch More Videos
                </button>
              </div>
            </div>

            {/* Tutorials Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                Free Tutorials & Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.resources.tutorials.map((tutorial, idx) => (
                  <div key={idx} className="group cursor-pointer hover:shadow-lg transition-all p-4 border rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{tutorial.provider}</span>
                    </div>
                    <a href={tutorial.link} target="_blank" rel="noopener noreferrer" className="block text-emerald-600 text-sm font-medium hover:underline">Start Tutorial →</a>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-all">
                  Explore More Courses
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Next Steps */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Recommended Next Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-xl hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold mb-2">Start Small</h4>
              <p className="text-sm text-gray-600">Open a low-cost index fund account.</p>
            </div>
            <div className="text-center p-4 border rounded-xl hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold mb-2">Learn More</h4>
              <p className="text-sm text-gray-600">Join our investment webinar series.</p>
            </div>
            <div className="text-center p-4 border rounded-xl hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold mb-2">Track Progress</h4>
              <p className="text-sm text-gray-600">Use the simulator to set goals.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default InvestmentEducation;