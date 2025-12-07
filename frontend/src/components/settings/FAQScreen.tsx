import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface FAQScreenProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FAQScreen({ onBack }: FAQScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');
  const [expandedId, setExpandedId] = useState<string | null>('what-is-lunari');

  const categories = ['General', 'Account', 'Services', 'Tracking'];

  const faqs: FAQItem[] = [
    {
      id: 'what-is-lunari',
      question: 'What is Lunari?',
      answer: 'Lunari is a period tracker app that helps you monitor your menstrual cycle, ovulation, and overall health.',
      category: 'General',
    },
    {
      id: 'how-does-work',
      question: 'How does Lunari work?',
      answer: 'Lunari uses your cycle data to predict your next period, fertile window, and ovulation. Simply log your period start dates and other symptoms to get accurate predictions.',
      category: 'General',
    },
    {
      id: 'is-free',
      question: 'Is Lunari free to use?',
      answer: 'Yes! Lunari offers a free version with essential tracking features. We also have a premium subscription that unlocks advanced insights and exclusive content.',
      category: 'General',
    },
    {
      id: 'offline',
      question: 'Can I use Lunari offline?',
      answer: 'Yes, you can track your data offline. Your data will sync automatically when you reconnect to the internet.',
      category: 'General',
    },
    {
      id: 'data-secure',
      question: 'Is my data secure with Lunari?',
      answer: 'Absolutely! We use industry-standard encryption to protect your data. Your personal health information is private and secure.',
      category: 'General',
    },
    {
      id: 'export-data',
      question: 'Can I export my Lunari data?',
      answer: 'Yes, premium users can download their complete health data in CSV format from the Data & Analytics settings.',
      category: 'General',
    },
    {
      id: 'contact-support',
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact Support section in Help & Support, or email us directly at support@lunari.app.',
      category: 'General',
    },
    {
      id: 'create-account',
      question: 'How do I create an account?',
      answer: 'Tap "Sign Up" on the login screen and choose your preferred method: email, Google, Apple, Facebook, or X (Twitter).',
      category: 'Account',
    },
    {
      id: 'reset-password',
      question: 'How do I reset my password?',
      answer: 'Go to Account & Security in Settings, then tap "Change Password". You can also use "Forgot Password" on the login screen.',
      category: 'Account',
    },
    {
      id: 'delete-account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can permanently delete your account from Account & Security settings. Please note this action cannot be undone.',
      category: 'Account',
    },
    {
      id: 'premium-benefits',
      question: 'What are the premium benefits?',
      answer: 'Premium includes: ad-free experience, advanced insights, detailed analytics, exclusive content, priority support, and early access to new features.',
      category: 'Services',
    },
    {
      id: 'cancel-subscription',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Billing & Subscriptions in Settings and tap "Manage Subscription". You can cancel anytime before your next billing date.',
      category: 'Services',
    },
    {
      id: 'track-period',
      question: 'How do I track my period?',
      answer: 'Tap the calendar icon and mark the days of your period. The app will learn your cycle and predict your next period automatically.',
      category: 'Tracking',
    },
    {
      id: 'log-symptoms',
      question: 'Can I log symptoms?',
      answer: 'Yes! You can log symptoms, moods, flow intensity, and other health data from the daily log screen.',
      category: 'Tracking',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === activeCategory &&
      (searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">FAQ</h1>
          <div className="w-10" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-pink-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="px-6 py-6 space-y-3">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md"
          >
            <button
              onClick={() => toggleExpand(faq.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900 pr-4">{faq.question}</span>
              {expandedId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {expandedId === faq.id && (
              <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No FAQs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
