
import React, { useState } from 'react';

const PartnerShare: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://mauv.ai/share/amara-8921";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Amara Cycle Update",
          text: "Check out my cycle status today.",
          url: shareLink,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full min-h-screen pb-24 animate-in fade-in duration-500 p-4">
      <header className="flex items-center justify-between mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">Partner Sync</h1>
          <p className="text-sm text-text-light/60 dark:text-text-dark/60">Keep your partner in the loop</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-secondary-lavender/20 flex items-center justify-center text-secondary-lavender">
          <span className="material-symbols-outlined filled">favorite</span>
        </div>
      </header>

      {/* Preview Card */}
      <div className="bg-white dark:bg-background-dark rounded-2xl p-6 shadow-lg border border-primary/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary-lavender flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="font-bold text-text-light dark:text-text-dark">Amara's Status</p>
            <p className="text-xs text-text-light/60 dark:text-text-dark/60">Updated just now</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background-light dark:bg-gray-900 rounded-xl">
             <span className="text-sm font-medium">Cycle Day</span>
             <span className="text-lg font-bold text-primary">Day 14</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 bg-background-light dark:bg-gray-900 rounded-xl">
                <p className="text-xs text-text-light/60 mb-1">Phase</p>
                <div className="flex items-center gap-1 text-purple-500 font-bold">
                  <span className="material-symbols-outlined text-sm">egg_alt</span>
                  <span>Ovulation</span>
                </div>
             </div>
             <div className="p-3 bg-background-light dark:bg-gray-900 rounded-xl">
                <p className="text-xs text-text-light/60 mb-1">Chance of Pregnancy</p>
                <div className="flex items-center gap-1 text-accent-coral font-bold">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>High</span>
                </div>
             </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary-lavender/10 rounded-xl border border-primary/10">
            <p className="text-xs font-bold text-primary mb-1 uppercase">Daily Note</p>
            <p className="text-sm italic text-text-light/80 dark:text-text-dark/80">
              "Feeling energetic and social today! Great day for a date night."
            </p>
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="space-y-4">
        <div className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
           <p className="text-xs font-medium text-center text-gray-500 mb-2">PRIVATE SHARE LINK</p>
           <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
             <span className="material-symbols-outlined text-gray-400">link</span>
             <input 
               readOnly 
               value={shareLink} 
               className="flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none"
             />
           </div>
        </div>

        <button 
          onClick={handleShare}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary-lavender text-white font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">ios_share</span>
          Share Status
        </button>

        <button 
          onClick={handleCopy}
          className="w-full py-4 rounded-xl bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-text-light dark:text-text-dark font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
          {copied ? 'Link Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default PartnerShare;
