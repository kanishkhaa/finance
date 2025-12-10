// features/community.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Search, 
  Plus, 
  Filter,
  Download,
  Bell,
  Menu,
  Heart,
  Share2,
  Bookmark,
  TrendingUp,
  Tag,
  X,
  Send
} from 'lucide-react';

const Community = ({ setIsMobileOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, budgeting, investing, sidehustles, parenting
  const [sort, setSort] = useState('newest'); // newest, popular
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('budgeting');
  const [notifications, setNotifications] = useState(3);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [user, setUser] = useState({ name: 'Aisha R.', avatar: 'A' }); // Simulated logged-in user

  // Enhanced mock data with more posts and categories
  // Using ISO dates for better sorting/parsing
  const allPosts = [
    { 
      id: 1, 
      author: 'Sarah K.', 
      avatar: 'S', 
      title: 'Best side hustle for moms?', 
      content: 'Sharing my experience with home baking business. Started with $50 investment and now earning $800/mo! What are your top tips?', 
      likes: 45, 
      comments: 12, 
      date: '2025-12-09', 
      displayDate: 'Dec 9, 2025',
      category: 'sidehustles',
      isBookmarked: false,
      tags: ['baking', 'moms', 'passive']
    },
    { 
      id: 2, 
      author: 'Aisha R.', 
      avatar: 'A', 
      title: 'Investing as a beginner', 
      content: 'Finally dipped my toes into mutual funds. Started with Vanguard index funds. Any recommendations for low-risk options under $100/mo?', 
      likes: 32, 
      comments: 8, 
      date: '2025-12-08', 
      displayDate: 'Dec 8, 2025',
      category: 'investing',
      isBookmarked: true,
      tags: ['beginner', 'funds', 'vanguard']
    },
    { 
      id: 3, 
      author: 'Lena M.', 
      title: 'Budgeting with baby expenses', 
      content: 'New mom here—diapers and formula are killing my budget! How do you prioritize baby costs without sacrificing savings?', 
      likes: 28, 
      comments: 15, 
      date: '2025-12-07', 
      displayDate: 'Dec 7, 2025',
      category: 'budgeting',
      isBookmarked: false,
      tags: ['parenting', 'baby', 'savings']
    },
    { 
      id: 4, 
      author: 'Jasmine L.', 
      avatar: 'J', 
      title: 'Crypto for women: Worth the hype?', 
      content: 'Heard so much about Bitcoin but scared of volatility. Anyone with a balanced portfolio including crypto? Share your wins/losses.', 
      likes: 67, 
      comments: 22, 
      date: '2025-12-06', 
      displayDate: 'Dec 6, 2025',
      category: 'investing',
      isBookmarked: false,
      tags: ['crypto', 'bitcoin', 'risk']
    },
    { 
      id: 5, 
      author: 'Tara B.', 
      avatar: 'T', 
      title: 'Freelance writing side gig success', 
      content: 'From zero to $500/mo in 3 months. Platforms like Upwork changed my life. Whats your freelance story?', 
      likes: 51, 
      comments: 9, 
      date: '2025-12-05', 
      displayDate: 'Dec 5, 2025',
      category: 'sidehustles',
      isBookmarked: false,
      tags: ['freelance', 'writing', 'upwork']
    },
    { 
      id: 6, 
      author: 'Mia S.', 
      avatar: 'M', 
      title: 'Emergency fund goals as a single parent', 
      content: 'Aiming for 6 months\' expenses. Hit 3 months—celebrating small wins! Apps or tips for automation?', 
      likes: 39, 
      comments: 11, 
      date: '2025-12-04', 
      displayDate: 'Dec 4, 2025',
      category: 'budgeting',
      isBookmarked: false,
      tags: ['emergency', 'parenting', 'automation']
    },
  ];

  // Dynamic filtering and sorting
  const filteredPosts = allPosts
    .filter(post => 
      (filter === 'all' || post.category === filter) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sort === 'newest') {
        return dateB - dateA;
      } else {
        return b.likes - a.likes;
      }
    });

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId) => {
    // Simulate bookmark toggle (in real app, update state/db)
    console.log(`Bookmark toggled for post ${postId}`);
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      // Simulate posting
      console.log('New post:', { content: newPostContent, category: newPostCategory });
      setShowNewPostModal(false);
      setNewPostContent('');
      setNewPostCategory('budgeting');
      // In real app, add to posts and refresh
    }
  };

  const categories = [
    { id: 'all', label: 'All Topics', icon: <Users className="w-4 h-4" /> },
    { id: 'budgeting', label: 'Budgeting', icon: <TrendingUp className="w-4 h-4" /> }, // Note: Icon adjusted for variety
    { id: 'investing', label: 'Investing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'sidehustles', label: 'Side Hustles', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'parenting', label: 'Parenting', icon: <Users className="w-4 h-4" /> },
  ];

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                  <p className="text-sm text-gray-600">Connect and share with like-minded women</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">1.2K</div>
            <div className="text-sm text-gray-600">Members</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">456</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts, authors, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['#budgeting', '#investing', '#sidehustle', '#momsfinance', '#crypto'].map(tag => (
              <button 
                key={tag} 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                onClick={() => setSearchTerm(tag.slice(1))}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6 mb-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {post.avatar || post.author.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{post.author}</h3>
                      <span className="text-sm text-gray-500">• {getTimeAgo(post.date)}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 capitalize">{post.category}</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 break-words">{post.title}</h4>
                    <p className="text-gray-600 mb-4 break-words">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{likedPosts.has(post.id) ? post.likes + 1 : post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                      <button 
                        onClick={() => toggleBookmark(post.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No posts found. Start the conversation!</p>
            </div>
          )}
        </div>

        {/* Add Post Button */}
        <div className="fixed bottom-6 right-6 lg:static lg:mt-8 text-center">
          <button 
            onClick={() => setShowNewPostModal(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 lg:px-8 lg:py-4 lg:rounded-xl"
          >
            <Plus className="w-5 h-5 inline mr-2 lg:mr-2" />
            <span className="hidden lg:inline">Share Your Story</span>
          </button>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-gray-900">Share Your Story</h3>
              <button onClick={() => setShowNewPostModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <select 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="text-sm text-gray-500 mt-1"
                >
                  {categories.slice(1).map(cat => ( // Exclude 'all'
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind? Share your financial journey, tips, or questions..."
              className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none mb-4"
            />
            <div className="flex gap-2">
              <button 
                onClick={handlePostSubmit}
                disabled={!newPostContent.trim()}
                className="flex-1 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Post
              </button>
              <button 
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .break-words {
          word-break: break-word;
          overflow-wrap: break-word;
        }
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default Community;