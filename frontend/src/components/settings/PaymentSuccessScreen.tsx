import { Crown, Check } from 'lucide-react@0.487.0';
import { useEffect, useState } from 'react';

interface PaymentSuccessScreenProps {
  onContinue: () => void;
  planType?: 'monthly' | 'yearly';
}

// Confetti pieces
const ConfettiPiece = ({ delay, left, rotation }: { delay: number; left: string; rotation: number }) => (
  <div
    className="absolute w-2 h-4 animate-confetti"
    style={{
      left,
      top: '-20px',
      animationDelay: `${delay}s`,
      transform: `rotate(${rotation}deg)`,
      animationDuration: '3s',
    }}
  >
    <div className="w-full h-full rounded-sm" style={{ backgroundColor: ['#FF6B9D', '#C084FC', '#FFA500', '#4ADE80', '#60A5FA'][Math.floor(Math.random() * 5)] }} />
  </div>
);

export function PaymentSuccessScreen({ onContinue, planType = 'yearly' }: PaymentSuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    'Ad-free experience',
    'Advanced period and cycle tracking',
    'Detailed data and insights',
    'Unlock exclusive contents',
    'Priority customer support',
    'Early access to new features',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 0.1}
              left={`${Math.random() * 100}%`}
              rotation={Math.random() * 360}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-6 pt-16 pb-24">
        {/* Crown Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-xl animate-bounce-slow">
              <Crown className="w-12 h-12 text-white" fill="white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-orange-400 opacity-30 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Congratulations Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-900 mb-3">Congratulations!</h1>
          <p className="text-gray-600">
            You&apos;ve Unlocked One Year Pro Subscriptions
          </p>
        </div>

        {/* Benefits List */}
        <div className="mb-8">
          <h2 className="text-xl text-gray-900 mb-4 text-center">Benefits Unlocked:</h2>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Notice */}
        <div className="text-center text-sm text-gray-500 mb-8 px-4">
          Your subscription will automatically renew annually unless canceled. Manage your subscription anytime in settings.
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 px-6 py-6 safe-area-bottom">
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          Start Exploring Premium Features
        </button>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-confetti {
          animation: confetti linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
