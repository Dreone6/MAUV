import { Heart, LogIn, HelpCircle } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerLoginScreenProps {
  onLogin: () => void;
  onHelp: () => void;
}

export function PartnerLoginScreen({ onLogin, onHelp }: PartnerLoginScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter a partner code');
      return;
    }

    if (!code.includes('-') || code.length < 8) {
      setError('Invalid code format. Code should be like MAUV-XXXX');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In real app, validate code with backend
      if (code.toUpperCase().startsWith('MAUV-')) {
        onLogin();
      } else {
        setError('Invalid partner code. Please check and try again.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src={mauvLogo} alt="MAUV Logo" className="h-16" />
          </div>
          
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shadow-xl animate-pulse">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>

          <h1 className="text-4xl text-gray-900 mb-3">
            Partner Access
          </h1>
          <p className="text-gray-600">
            Enter the code your partner shared with you
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Partner Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="MAUV-XXXX"
              className={`w-full px-6 py-4 rounded-2xl border-2 text-center text-2xl tracking-widest transition-all duration-300 shadow-md ${
                error 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-fuchsia-200 bg-white focus:border-fuchsia-400 focus:shadow-lg'
              } outline-none`}
              maxLength={12}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Access Dashboard
              </>
            )}
          </button>
        </div>

        {/* Help Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-fuchsia-500" />
            Don't have a code?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Ask your partner to generate a partner code from their MAUV app settings. They can find it under "Partner Access" in their profile.
          </p>
          <button
            onClick={onHelp}
            className="text-fuchsia-600 hover:text-fuchsia-700 transition-colors"
          >
            Learn More →
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By accessing, you agree to respect your partner's privacy and the shared information
        </p>
      </div>
    </div>
  );
}
