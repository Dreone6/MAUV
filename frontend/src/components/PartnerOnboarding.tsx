import { useState } from 'react';
import { Heart } from 'lucide-react@0.487.0';

interface PartnerOnboardingProps {
  onComplete: () => void;
}

export function PartnerOnboarding({ onComplete }: PartnerOnboardingProps) {
  const [step, setStep] = useState<'welcome' | 'code-entry' | 'name-entry'>('welcome');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [partnerName, setPartnerName] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase().slice(0, 6);
    const newCode = pastedData.split('');
    while (newCode.length < 6) newCode.push('');
    setCode(newCode);
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join('');
    // Mock validation - in real app, verify with backend
    if (enteredCode === 'AMARA' || enteredCode.length === 6) {
      setStep('name-entry');
    } else {
      setError('Invalid code. Please check and try again.');
    }
  };

  const handleComplete = () => {
    if (partnerName.trim()) {
      onComplete();
    }
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/90 rounded-3xl p-8 shadow-xl border border-purple-200/50 text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-2xl text-gray-800 mb-3">Welcome to MAUV</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your partner has invited you to stay connected with their cycle and health journey. 
              This helps you both communicate better and support each other.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600">✓</span>
                </div>
                <div>
                  <h3 className="text-gray-800 text-sm mb-1">Stay Informed</h3>
                  <p className="text-xs text-gray-500">Get real-time updates on cycle phases and moods</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600">✓</span>
                </div>
                <div>
                  <h3 className="text-gray-800 text-sm mb-1">Better Support</h3>
                  <p className="text-xs text-gray-500">Understand what they're going through</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600">✓</span>
                </div>
                <div>
                  <h3 className="text-gray-800 text-sm mb-1">Privacy Focused</h3>
                  <p className="text-xs text-gray-500">Only see what they choose to share</p>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => setStep('code-entry')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'code-entry') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/90 rounded-3xl p-8 shadow-xl border border-purple-200/50">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl text-white">🔗</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl text-gray-800 text-center mb-2">Enter Partner Code</h2>
            <p className="text-gray-600 text-center mb-8 text-sm">
              Enter the 6-character code your partner shared with you
            </p>

            {/* Code Input */}
            <div className="flex gap-2 justify-center mb-6" onPaste={handleCodePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl bg-gray-50 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerifyCode}
              disabled={code.join('').length < 6}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify Code
            </button>

            {/* Help Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Don't have a code? Ask your partner to share their link from the Partner Sync screen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Name Entry Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/90 rounded-3xl p-8 shadow-xl border border-purple-200/50">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl text-white">👋</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl text-gray-800 text-center mb-2">What's your name?</h2>
          <p className="text-gray-600 text-center mb-8 text-sm">
            This will be displayed on your partner's dashboard
          </p>

          {/* Name Input */}
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-gray-50 border-2 border-purple-200 rounded-2xl px-5 py-4 text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all mb-6"
          />

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            disabled={!partnerName.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl py-4 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}