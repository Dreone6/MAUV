import { Copy, Check, Share2, Shield, Heart } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerCodeScreenProps {
  onBack: () => void;
  onManageSharing: () => void;
}

export function PartnerCodeScreen({ onBack, onManageSharing }: PartnerCodeScreenProps) {
  const [copied, setCopied] = useState(false);
  const partnerCode = "MAUV-7392";

  const handleCopy = () => {
    navigator.clipboard.writeText(partnerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MAUV Partner Access',
        text: `Join me on MAUV! Use code: ${partnerCode} to access our shared health dashboard.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-12" />
          </div>
          <button
            onClick={onBack}
            className="absolute top-6 left-6 text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-3">
            Partner Access Code
          </h1>
          <p className="text-gray-600">
            Share this code with your partner to give them access to your shared health dashboard
          </p>
        </div>

        {/* Code Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="text-center mb-6">
            <p className="text-gray-500 mb-4">Your Partner Code</p>
            <div className="text-5xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 mb-6">
              {partnerCode}
            </div>
            <p className="text-sm text-gray-400">This code doesn't expire</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCopy}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Code
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="w-full py-4 px-6 rounded-full border-2 border-fuchsia-300 text-fuchsia-600 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-fuchsia-50 shadow-md"
            >
              <Share2 className="w-5 h-5" />
              Share Code
            </button>
          </div>
        </div>

        {/* What They'll See */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-fuchsia-500" />
            What your partner will see
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-fuchsia-500 mt-1">•</span>
              <span>Current cycle phase and fertility window</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-fuchsia-500 mt-1">•</span>
              <span>Predicted period dates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-fuchsia-500 mt-1">•</span>
              <span>Mood and symptom insights you choose to share</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-fuchsia-500 mt-1">•</span>
              <span>Tips for supporting you throughout your cycle</span>
            </li>
          </ul>
        </div>

        {/* Manage Sharing Button */}
        <button
          onClick={onManageSharing}
          className="w-full py-4 px-6 rounded-full bg-white text-fuchsia-600 transition-all duration-300 hover:shadow-lg shadow-md mb-6"
        >
          Manage What's Shared
        </button>

        <p className="text-center text-sm text-gray-500">
          You can revoke access at any time from settings
        </p>
      </div>
    </div>
  );
}
