import { useState, useRef } from 'react';
import { LayoutDashboard, Calendar, MessageCircle, Users, Heart, Settings, Gem } from 'lucide-react@0.487.0';
import { FloatingBackground } from '../shared/FloatingBackground';
import { BottomNav } from '../shared/BottomNav';

interface TribalChatProps {
  onBack: () => void;
  onNavigate?: (screen: 'calendar' | 'amara-chat' | 'partner-link') => void;
}

interface Post {
  id: number;
  category: string;
  categoryColor: string;
  timestamp: string;
  title: string;
  preview: string;
  author: string;
  authorInitial: string;
  authorColor: string;
  likes: number;
  comments: number;
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  hasNew: boolean;
}

export function TribalChatDark({ onBack, onNavigate }: TribalChatProps) {
  const [selectedNav, setSelectedNav] = useState('chat');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    { id: 'all', name: 'All Posts', hasNew: true },
    { id: 'period-cycle', name: 'Period and Cycle', hasNew: true },
    { id: 'mental-health', name: 'Mental Health', hasNew: false },
    { id: 'health-wellbeing', name: 'Health & Wellbeing', hasNew: true },
    { id: 'sex-life', name: 'Sex Life', hasNew: false },
    { id: 'my-body', name: 'My Body', hasNew: false },
    { id: 'relationships', name: 'Relationships', hasNew: true },
    { id: 'self-society', name: 'Self & Society', hasNew: false },
    { id: 'lgbtq', name: 'LGBTQ+', hasNew: false },
    { id: 'trying-conceive', name: 'Trying to Conceive', hasNew: true },
    { id: 'pregnancy', name: 'Pregnancy', hasNew: false },
    { id: 'pregnancy-loss', name: 'Pregnancy Loss', hasNew: false },
    { id: 'parenting', name: 'Parenting', hasNew: false },
    { id: 'female-health', name: 'Female Health', hasNew: true },
    { id: 'just-fun', name: 'Just for Fun', hasNew: false },
  ];

  const allPosts: Post[] = [
    {
      id: 1,
      category: 'Period and Cycle',
      categoryColor: 'text-purple-400',
      timestamp: '5h ago',
      title: 'Irregular cycle after coming off the pill?',
      preview: 'Hi sisters, I stopped taking the pill about 3 months ago and my cycle is still all over the place. Sometimes 25 days, sometimes 40. Is this...',
      author: 'Moon Child',
      authorInitial: 'M',
      authorColor: 'bg-purple-500',
      likes: 12,
      comments: 2,
      isNew: true,
    },
    {
      id: 2,
      category: 'Mental Health',
      categoryColor: 'text-pink-400',
      timestamp: '12/1/2025',
      title: 'Anxiety spiking during ovulation',
      preview: 'Does anyone else get super anxious right around ovulation? I thought PMS was supposed to be the bad time, but I feel like I\'m...',
      author: 'AnxiousBee',
      authorInitial: 'A',
      authorColor: 'bg-yellow-500',
      likes: 34,
      comments: 1,
    },
    {
      id: 3,
      category: 'Health & Wellbeing',
      categoryColor: 'text-green-400',
      timestamp: '8h ago',
      title: 'Best sustainable period products?',
      preview: 'Looking to switch from tampons to something more eco-friendly. Cup vs Disc? Any recommendations for beginners?',
      author: 'EcoWarrior',
      authorInitial: 'E',
      authorColor: 'bg-green-500',
      likes: 8,
      comments: 0,
      isNew: true,
    },
    {
      id: 4,
      category: 'Relationships',
      categoryColor: 'text-red-400',
      timestamp: '2h ago',
      title: 'How to talk to partner about PMS symptoms?',
      preview: 'My partner doesn\'t really understand how bad my PMS gets. Any tips on how to communicate this better? I don\'t want to...',
      author: 'SarahLoves',
      authorInitial: 'S',
      authorColor: 'bg-red-500',
      likes: 22,
      comments: 5,
      isNew: true,
    },
    {
      id: 5,
      category: 'Trying to Conceive',
      categoryColor: 'text-orange-400',
      timestamp: '1h ago',
      title: 'Positive OPK but no temp spike yet?',
      preview: 'Got my first positive ovulation test yesterday but my BBT hasn\'t risen yet. Is this normal? Should I keep testing?',
      author: 'BabyHopes',
      authorInitial: 'B',
      authorColor: 'bg-orange-500',
      likes: 15,
      comments: 3,
      isNew: true,
    },
    {
      id: 6,
      category: 'Female Health',
      categoryColor: 'text-teal-400',
      timestamp: '3h ago',
      title: 'Anyone else dealing with PCOS?',
      preview: 'Just got diagnosed with PCOS and feeling a bit overwhelmed. Would love to hear from others managing this condition...',
      author: 'WarriorQueen',
      authorInitial: 'W',
      authorColor: 'bg-teal-500',
      likes: 45,
      comments: 12,
      isNew: true,
    },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => {
        const categoryMap: Record<string, string> = {
          'period-cycle': 'Period and Cycle',
          'mental-health': 'Mental Health',
          'health-wellbeing': 'Health & Wellbeing',
          'relationships': 'Relationships',
          'trying-conceive': 'Trying to Conceive',
          'female-health': 'Female Health',
        };
        return post.category === categoryMap[selectedCategory];
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-20 shadow-xl">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <span>O</span>
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MAUV Tribal Chat
            </h1>

            {/* Settings Button */}
            <button 
              className="w-10 h-10 rounded-full bg-gray-700/80 flex items-center justify-center hover:bg-gray-600/80 transition-colors shadow-md"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Category Slider */}
        <div className="max-w-md mx-auto px-6 pb-3">
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70 shadow-md'
                }`}
              >
                <span className="whitespace-nowrap">{category.name}</span>
                {category.hasNew && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md">
                    <Gem className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        {/* Posts Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-400">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              className="relative w-full bg-gray-800/80 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 text-left border border-gray-700/50"
            >
              {/* New Post Badge */}
              {post.isNew && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Gem className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Category and Timestamp */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${post.categoryColor}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>

              {/* Title */}
              <h3 className="text-gray-200 mb-2">{post.title}</h3>

              {/* Preview Text */}
              <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                {post.preview}
              </p>

              {/* Author and Engagement */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${post.authorColor} flex items-center justify-center text-white text-xs shadow-md`}>
                    {post.authorInitial}
                  </div>
                  <span className="text-sm text-gray-300">{post.author}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">{post.comments}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-gray-200 mb-2">No posts yet</h3>
            <p className="text-sm text-gray-400">
              Be the first to start a conversation in this category!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate || (() => {})}
        currentScreen="tribal-chat"
        darkMode={true}
      />
    </div>
  );
}