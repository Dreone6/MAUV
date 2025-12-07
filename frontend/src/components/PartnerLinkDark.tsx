import { useState } from 'react';
import { LayoutDashboard, Calendar, MessageCircle, Users, Link2, Copy, Share2, Heart, Settings } from 'lucide-react@0.487.0';
import { BottomNav } from './BottomNav';

interface PartnerLinkProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function PartnerLinkDark({ onBack, onNavigate }: PartnerLinkProps) {
  const [selectedNav, setSelectedNav] = useState('partner');
  const [shareLink] = useState('https://mauv.ai/share/amara-8921');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10 shadow-xl">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <span>O</span>
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Partner Link
            </h1>

            {/* Settings Button */}
            <button 
              onClick={() => onNavigate('settings')}
              className="w-10 h-10 rounded-full bg-gray-700/80 flex items-center justify-center hover:bg-gray-600/80 transition-colors shadow-md"
            >
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 pb-24">
        {/* Partner Sync Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl text-gray-200">Partner Sync</h2>
              <p className="text-sm text-gray-400">Keep your partner in the loop</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-pink-900/40 flex items-center justify-center border border-pink-700/50">
              <Heart className="w-5 h-5 text-pink-400" />
            </button>
          </div>
        </div>

        {/* Amara's Status Card */}
        <div className="bg-gray-800/80 rounded-3xl p-6 shadow-xl border border-gray-700/50 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg">
              <span className="text-lg">A</span>
            </div>
            <div>
              <h3 className="text-gray-200">Amara's Status</h3>
              <p className="text-xs text-gray-400">Updated just now</p>
            </div>
          </div>

          {/* Cycle Day */}
          <div className="bg-purple-900/30 rounded-2xl p-4 mb-4 border border-purple-700/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Cycle Day</span>
              <span className="text-xl text-purple-400">Day 14</span>
            </div>
          </div>

          {/* Phase and Pregnancy Chance */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-900/30 rounded-2xl p-4 border border-purple-700/30">
              <p className="text-xs text-gray-400 mb-1">Phase</p>
              <p className="text-purple-400 flex items-center gap-1">
                <span className="text-lg">◉</span>
                Ovulation
              </p>
            </div>
            <div className="bg-orange-900/30 rounded-2xl p-4 border border-orange-700/30">
              <p className="text-xs text-gray-400 mb-1">Chance of Pregnancy</p>
              <p className="text-orange-400 flex items-center gap-1">
                <span className="text-lg">↗</span>
                High
              </p>
            </div>
          </div>

          {/* Daily Note */}
          <div className="bg-pink-900/30 rounded-2xl p-4 border border-pink-700/30">
            <p className="text-xs text-pink-400 mb-1">DAILY NOTE</p>
            <p className="text-sm text-gray-300 italic">
              "Feeling energetic and social today! Great day for a date night."
            </p>
          </div>
        </div>

        {/* Private Share Link */}
        <div className="bg-gray-800/80 rounded-3xl p-6 shadow-xl border border-gray-700/50 mb-4">
          <p className="text-xs text-gray-400 text-center mb-3 tracking-wide">PRIVATE SHARE LINK</p>
          <div className="flex items-center gap-3 bg-gray-700/50 rounded-2xl px-4 py-3 mb-4 border border-gray-600/30">
            <Link2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
            />
          </div>

          {/* Share Status Button */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mb-3">
            <Share2 className="w-5 h-5" />
            <span>Share Status</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full bg-gray-700/80 hover:bg-gray-600/80 text-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 transition-all border border-gray-600/50 shadow-md hover:shadow-lg"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Privacy Settings Link */}
        <button
          onClick={() => onNavigate('partner-settings')}
          className="w-full text-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Manage sharing settings →
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="partner-link"
        darkMode={true}
      />
    </div>
  );
}