
import React, { useState } from 'react';
import { TribalPost, TribalComment } from '../types';

const CATEGORIES = [
  "All Topics",
  "Period and Cycle",
  "Mental Health",
  "Health & Wellbeing",
  "Sex Life",
  "My Body",
  "Relationships",
  "Self & Society",
  "LGBTQ+",
  "Trying to Conceive",
  "Pregnancy",
  "Pregnancy Lost",
  "Parenting",
  "Female Health",
  "Just for Fun"
];

const MOCK_POSTS: TribalPost[] = [
  {
    id: '1',
    title: "Irregular cycle after coming off the pill?",
    content: "Hi sisters, I stopped taking the pill about 3 months ago and my cycle is still all over the place. Sometimes 25 days, sometimes 40. Is this normal? How long did it take for yours to regulate?",
    category: "Period and Cycle",
    author: "Moon Child",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 12,
    avatarColor: "bg-purple-200",
    comments: [
      { id: 'c1', text: "Totally normal! Took me about 6 months.", author: "Sister_88", timestamp: new Date(), avatarColor: "bg-blue-200" },
      { id: 'c2', text: "Try seed cycling, it helped me a lot.", author: "Herbalist", timestamp: new Date(), avatarColor: "bg-green-200" }
    ]
  },
  {
    id: '2',
    title: "Anxiety spiking during ovulation",
    content: "Does anyone else get super anxious right around ovulation? I thought PMS was supposed to be the bad time, but I feel like I'm vibrating with anxiety mid-cycle.",
    category: "Mental Health",
    author: "AnxiousBee",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 34,
    avatarColor: "bg-yellow-200",
    comments: [
      { id: 'c3', text: "Yes! High estrogen can actually be stimulating for some.", author: "NurseJoy", timestamp: new Date(), avatarColor: "bg-red-200" }
    ]
  },
  {
    id: '3',
    title: "Best sustainable period products?",
    content: "Looking to switch from tampons to something more eco-friendly. Cup vs Disc? Any recommendations for beginners?",
    category: "Health & Wellbeing",
    author: "EcoWarrior",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 8,
    avatarColor: "bg-green-200",
    comments: []
  }
];

const TribalChat: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [posts, setPosts] = useState<TribalPost[]>(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<TribalPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categoriesWithNewPosts, setCategoriesWithNewPosts] = useState<Set<string>>(new Set());

  // New Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[1]);

  // Comment Form State
  const [newComment, setNewComment] = useState("");

  const filteredPosts = activeCategory === "All Topics" 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // Clear the notification when user views the category
    if (categoriesWithNewPosts.has(cat)) {
      const next = new Set(categoriesWithNewPosts);
      next.delete(cat);
      setCategoriesWithNewPosts(next);
    }
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: TribalPost = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      author: "Anonymous Sister", // Default anonymous name
      timestamp: new Date(),
      likes: 0,
      comments: [],
      avatarColor: "bg-pink-200" // Randomize in real app
    };

    setPosts([newPost, ...posts]);
    
    // Add "new" indicator to the category
    setCategoriesWithNewPosts(prev => new Set(prev).add(newCategory));

    setIsCreating(false);
    setNewTitle("");
    setNewContent("");
    setNewCategory(CATEGORIES[1]);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: TribalComment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Anonymous",
      timestamp: new Date(),
      avatarColor: "bg-indigo-200"
    };

    const updatedPost = {
      ...selectedPost,
      comments: [...selectedPost.comments, comment]
    };

    // Update in list
    setPosts(posts.map(p => p.id === selectedPost.id ? updatedPost : p));
    // Update active view
    setSelectedPost(updatedPost);
    setNewComment("");
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? ({ ...prev, likes: prev.likes + 1 }) : null);
    }
  };

  // --- RENDER HELPERS ---

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  // --- VIEWS ---

  if (isCreating) {
    return (
      <div className="w-full min-h-screen bg-background-light dark:bg-background-dark pb-24 animate-in slide-in-from-bottom duration-300">
        <header className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0 z-20">
          <button onClick={() => setIsCreating(false)} className="text-sm font-medium text-gray-500">Cancel</button>
          <h2 className="font-bold text-lg">New Post</h2>
          <button onClick={handleCreatePost} disabled={!newTitle.trim()} className="text-sm font-bold text-primary disabled:opacity-50">Post</button>
        </header>

        <div className="p-4 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Topic</label>
            <select 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary text-sm"
            >
              {CATEGORIES.filter(c => c !== "All Topics").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Title</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary font-bold text-lg placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Content</label>
            <textarea 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share your story or ask a question..."
              className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary min-h-[200px] text-sm leading-relaxed placeholder-gray-300 resize-none"
            />
          </div>
          
          <div className="p-4 bg-primary/10 rounded-xl flex gap-3">
             <span className="material-symbols-outlined text-primary">visibility_off</span>
             <p className="text-xs text-primary/80">Your post will be anonymous. We'll assign you a random nickname.</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="w-full min-h-screen bg-background-light dark:bg-background-dark pb-24 animate-in slide-in-from-right duration-300 flex flex-col">
        <header className="p-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setSelectedPost(null)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/10 text-primary truncate max-w-[200px]">{selectedPost.category}</span>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Main Post */}
          <div className="p-5 bg-white dark:bg-background-dark mb-2">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${selectedPost.avatarColor} flex items-center justify-center text-gray-700 font-bold text-lg shadow-sm`}>
                {selectedPost.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-text-light dark:text-text-dark">{selectedPost.author}</p>
                <p className="text-xs text-gray-400">{formatDate(selectedPost.timestamp)}</p>
              </div>
            </div>
            
            <h1 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">{selectedPost.title}</h1>
            <p className="text-sm leading-relaxed text-text-light/90 dark:text-text-dark/90 mb-4 whitespace-pre-wrap">
              {selectedPost.content}
            </p>

            <div className="flex items-center gap-4 text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-3">
              <button 
                onClick={() => toggleLike(selectedPost.id)}
                className="flex items-center gap-1.5 hover:text-accent-coral transition-colors"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
                <span className="text-sm font-medium">{selectedPost.likes}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="text-sm font-medium">{selectedPost.comments.length}</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Discussion</h3>
            <div className="space-y-4">
              {selectedPost.comments.map(comment => (
                <div key={comment.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className={`w-8 h-8 rounded-full ${comment.avatarColor} flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm text-gray-700`}>
                    {comment.author.charAt(0)}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{comment.author}</span>
                      <span className="text-[10px] text-gray-400">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-text-light dark:text-text-dark">{comment.text}</p>
                  </div>
                </div>
              ))}
              {selectedPost.comments.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No comments yet. Be the first to support!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="p-4 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-20">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a supportive comment..."
              className="flex-1 bg-background-light dark:bg-gray-900 border-none rounded-full px-4 text-sm focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="p-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:bg-gray-300"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT FEED VIEW
  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark pb-28 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Tribal Chat</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Safe, anonymous community support</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Post
          </button>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {CATEGORIES.map(cat => {
            const isNew = categoriesWithNewPosts.has(cat);
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                  activeCategory === cat 
                    ? 'bg-text-light dark:bg-white text-white dark:text-text-light shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
                {isNew && activeCategory !== cat && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse border-2 border-background-light dark:border-background-dark">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Feed */}
      <div className="p-4 space-y-4">
        {filteredPosts.map(post => (
          <div 
            key={post.id} 
            onClick={() => setSelectedPost(post)}
            className="bg-white dark:bg-background-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary-lavender/20 text-purple-600 truncate max-w-[150px]">
                {post.category}
              </span>
              <span className="text-[10px] text-gray-400">{formatDate(post.timestamp)}</span>
            </div>
            
            <h3 className="font-bold text-text-light dark:text-text-dark mb-1 leading-tight">{post.title}</h3>
            <p className="text-xs text-text-light/70 dark:text-text-dark/70 line-clamp-2 mb-3">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
               <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full ${post.avatarColor} flex items-center justify-center text-[10px] font-bold text-gray-700`}>
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{post.author}</span>
               </div>
               
               <div className="flex items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1 text-xs">
                    <span className="material-symbols-outlined text-base">favorite</span> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <span className="material-symbols-outlined text-base">chat_bubble</span> {post.comments.length}
                  </span>
               </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <span className="material-symbols-outlined text-4xl mb-2">forum</span>
            <p className="text-sm font-medium">No posts in this topic yet.</p>
            <p className="text-xs">Be the first to start a discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TribalChat;
