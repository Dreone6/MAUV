import { useState } from 'react';
import { LayoutDashboard, Calendar, MessageCircle, Users, Link2, Copy, Share2, Heart, Settings } from 'lucide-react@0.487.0';
import { BottomNav } from './shared/BottomNav';

interface PartnerLinkProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function PartnerLink({ onBack, onNavigate }: PartnerLinkProps) {
  const [selectedNav, setSelectedNav] = useState('partner');
  const [shareLink] = useState('https://mauv.ai/share/amara-8921');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-md">
              <span>O</span>
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Partner Link
            </h1>

            {/* Settings Button */}
            <button 
              onClick={() => onNavigate('settings')}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 pb-24">
        {/* Partner Sync Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xl text-gray-800">Partner Sync</h2>
              <p className="text-sm text-gray-500">Keep your partner in the loop</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </button>
          </div>
        </div>

        {/* Amara's Status Card */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-white shadow-md">
              <span className="text-lg">A</span>
            </div>
            <div>
              <h3 className="text-gray-800">Amara's Status</h3>
              <p className="text-xs text-gray-500">Updated just now</p>
            </div>
          </div>

          {/* Cycle Day */}
          <div className="bg-purple-50/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cycle Day</span>
              <span className="text-xl text-purple-600">Day 14</span>
            </div>
          </div>

          {/* Phase and Pregnancy Chance */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-purple-50/50 rounded-2xl p-4">
              <p className="text-xs text-gray-500 mb-1">Phase</p>
              <p className="text-purple-600 flex items-center gap-1">
                <span className="text-lg">◉</span>
                Ovulation
              </p>
            </div>
            <div className="bg-orange-50/50 rounded-2xl p-4">
              <p className="text-xs text-gray-500 mb-1">Chance of Pregnancy</p>
              <p className="text-orange-500 flex items-center gap-1">
                <span className="text-lg">↗</span>
                High
              </p>
            </div>
          </div>

          {/* Daily Note */}
          <div className="bg-pink-50/50 rounded-2xl p-4">
            <p className="text-xs text-pink-400 mb-1">DAILY NOTE</p>
            <p className="text-sm text-gray-700 italic">
              "Feeling energetic and social today! Great day for a date night."
            </p>
          </div>
        </div>

        {/* Private Share Link */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-lg border border-purple-200/50 mb-4">
          <p className="text-xs text-gray-500 text-center mb-3 tracking-wide">PRIVATE SHARE LINK</p>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-4">
            <Link2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            />
          </div>

          {/* Share Status Button */}
          <button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg mb-3">
            <Share2 className="w-5 h-5" />
            <span>Share Status</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 rounded-2xl py-4 flex items-center justify-center gap-2 transition-all border border-gray-200 shadow-sm hover:shadow-md"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Privacy Settings Link */}
        <button
          onClick={() => onNavigate('partner-settings')}
          className="w-full text-center text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          Manage sharing settings →
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="partner-link"
      />
    </div>
  );
}