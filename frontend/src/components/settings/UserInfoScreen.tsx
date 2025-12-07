import { X, Instagram, Facebook, MessageCircle } from 'lucide-react@0.487.0';
import { useState } from 'react';
import { FairyAvatarCustomizationScreen } from './FairyAvatarCustomizationScreen';

// Twitter/X Logo
const TwitterXLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// TikTok Logo
const TikTokLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface UserInfoScreenProps {
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  fairyAvatarUrl?: string;
  fairyAvatarId?: string;
  onAvatarChange?: (avatarId: string) => void;
}

export function UserInfoScreen({ 
  onClose, 
  userName = 'Isabella Ainsley',
  userEmail = 'isabella.ainsley@yourdomain.com',
  fairyAvatarUrl,
  fairyAvatarId = 'fairy-1',
  onAvatarChange
}: UserInfoScreenProps) {
  const [copied, setCopied] = useState(false);
  const [showAvatarCustomization, setShowAvatarCustomization] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarSelect = (avatarId: string) => {
    if (onAvatarChange) {
      onAvatarChange(avatarId);
    }
    setShowAvatarCustomization(false);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      handle: '@mauv.health',
      url: 'https://instagram.com/mauv.health',
      bgColor: 'from-pink-500 to-purple-500'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      handle: '@MAUVHealth',
      url: 'https://facebook.com/mauvhealth',
      bgColor: 'from-blue-500 to-blue-600'
    },
    {
      name: 'X (Twitter)',
      icon: <TwitterXLogo />,
      handle: '@MAUVHealth',
      url: 'https://twitter.com/mauvhealth',
      bgColor: 'from-gray-800 to-gray-900'
    },
    {
      name: 'TikTok',
      icon: <TikTokLogo />,
      handle: '@mauv.health',
      url: 'https://tiktok.com/@mauv.health',
      bgColor: 'from-gray-900 to-black'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-400 to-purple-500 px-6 pt-12 pb-20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {/* Fairy Avatar */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowAvatarCustomization(true)}
              className="relative group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-white p-2 shadow-xl group-hover:shadow-2xl transition-shadow">
                {fairyAvatarUrl ? (
                  <img
                    src={fairyAvatarUrl}
                    alt="Fairy Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                    <span className="text-3xl">🧚</span>
                  </div>
                )}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-white opacity-30 blur-xl animate-pulse" />
              
              {/* Edit Indicator */}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="px-6 -mt-12 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl text-gray-900 text-center mb-1">{userName}</h2>
            <button
              onClick={handleCopyEmail}
              className="w-full text-center text-gray-500 text-sm hover:text-pink-500 transition-colors mb-4"
            >
              {copied ? '✓ Copied!' : userEmail}
            </button>
            
            <div className="flex gap-2">
              <div className="flex-1 text-center py-2 rounded-lg bg-pink-50">
                <p className="text-xs text-gray-500 mb-1">Member Since</p>
                <p className="text-gray-900">Jan 2024</p>
              </div>
              <div className="flex-1 text-center py-2 rounded-lg bg-purple-50">
                <p className="text-xs text-gray-500 mb-1">Plan</p>
                <p className="text-gray-900">MAUV Pro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="px-6 pb-6">
          <h3 className="text-gray-900 mb-4 text-center">Follow MAUV</h3>
          <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r hover:shadow-lg transition-all group"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would open the link
                  console.log(`Opening ${social.name}: ${social.url}`);
                }}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.bgColor} flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:scale-110 transition-transform`}>
                  {social.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-gray-900">{social.name}</h4>
                  <p className="text-gray-500 text-sm">{social.handle}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-xs text-gray-400 pb-6">
          MAUV Version 1.0.0
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>

      {/* Avatar Customization Modal */}
      {showAvatarCustomization && (
        <FairyAvatarCustomizationScreen
          onClose={() => setShowAvatarCustomization(false)}
          onAvatarSelect={handleAvatarSelect}
          selectedAvatarId={fairyAvatarId}
        />
      )}
    </div>
  );
}