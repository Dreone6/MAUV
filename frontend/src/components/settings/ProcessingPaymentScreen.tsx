import { ArrowLeft } from 'lucide-react@0.487.0';
import { useEffect } from 'react';

// Mastercard Logo
const MastercardLogo = () => (
  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1">
    <svg viewBox="0 0 48 32" className="w-full h-full">
      <circle cx="15" cy="16" r="12" fill="#EB001B"/>
      <circle cx="33" cy="16" r="12" fill="#F79E1B"/>
      <path d="M24 6.5c-2.5 2-4 5.1-4 8.5s1.5 6.5 4 8.5c2.5-2 4-5.1 4-8.5s-1.5-6.5-4-8.5z" fill="#FF5F00"/>
    </svg>
  </div>
);

interface ProcessingPaymentScreenProps {
  onBack: () => void;
  onComplete: () => void;
  planType?: 'monthly' | 'yearly';
}

export function ProcessingPaymentScreen({ 
  onBack, 
  onComplete,
  planType = 'yearly'
}: ProcessingPaymentScreenProps) {
  const isYearly = planType === 'yearly';
  const price = isYearly ? '49.99' : '4.99';
  const period = isYearly ? 'year' : 'month';

  // Simulate payment processing
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds processing time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Background Content (dimmed) */}
      <div className="relative z-0 opacity-50">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              disabled
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
            <h1 className="text-xl text-gray-900">Review Summary</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-gray-900 mb-2">MAUV Pro</h2>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl text-gray-900">${price}</span>
              <span className="text-gray-500">/{period}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      <div className="fixed inset-0 z-20 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
          {/* Animated Spinner */}
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-pink-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
            </div>
          </div>

          {/* Processing Text */}
          <div className="text-center">
            <h3 className="text-xl text-gray-900 mb-2">Processing Payment...</h3>
            <p className="text-gray-500 text-sm">Please wait while we process your payment</p>
          </div>
        </div>
      </div>

      {/* Payment Method at Bottom (dimmed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 z-0 opacity-50">
        <div className="mb-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-100">
            <MastercardLogo />
            <div className="flex-1">
              <h4 className="text-gray-900">Mastercard</h4>
              <p className="text-gray-500 text-sm">**** **** **** 4678</p>
            </div>
            <button className="text-pink-500">Change</button>
          </div>
        </div>

        <button
          disabled
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white"
        >
          Confirm Payment - ${price}
        </button>
      </div>
    </div>
  );
}
