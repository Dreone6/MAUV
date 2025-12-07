import { ArrowLeft, Check, Plus } from 'lucide-react@0.487.0';
import { useState } from 'react';

// PayPal Logo
const PayPalLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#003087"/>
    <path d="M8.5 7h4.5c2 0 3 1 3 2.5s-1 2.5-3 2.5H11l-.5 2.5H9L10 7h-1.5zm5.5 3.5c0-.8-.5-1.2-1.5-1.2h-1.2l-.5 2.4h1.2c1 0 2-.4 2-1.2z" fill="white"/>
    <path d="M13 12h1.5c1 0 1.5.5 1.5 1.2 0 .8-1 1.2-2 1.2H13l.5-2.4z" fill="#009CDE"/>
  </svg>
);

// Google Logo
const GoogleLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Apple Logo
const AppleLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <rect width="24" height="24" rx="4" fill="#000000"/>
    <path d="M15.05 16.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C.79 11.25 1.51 3.59 7.05 3.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM10.03 3.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white" transform="translate(2, 4) scale(0.8)"/>
  </svg>
);

// Mastercard Logo
const MastercardLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1">
    <svg viewBox="0 0 48 32" className="w-full h-full">
      <circle cx="15" cy="16" r="12" fill="#EB001B"/>
      <circle cx="33" cy="16" r="12" fill="#F79E1B"/>
      <path d="M24 6.5c-2.5 2-4 5.1-4 8.5s1.5 6.5 4 8.5c2.5-2 4-5.1 4-8.5s-1.5-6.5-4-8.5z" fill="#FF5F00"/>
    </svg>
  </div>
);

// Visa Logo
const VisaLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
    <span className="text-white text-sm">VISA</span>
  </div>
);

// American Express Logo
const AmexLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
    <span className="text-white text-xs">AMEX</span>
  </div>
);

interface ChoosePaymentMethodScreenProps {
  onBack: () => void;
  onContinue: (method: string) => void;
  onAddPayment: () => void;
}

export function ChoosePaymentMethodScreen({ onBack, onContinue, onAddPayment }: ChoosePaymentMethodScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState('mastercard-4678');

  const digitalWallets = [
    { id: 'paypal', name: 'PayPal', email: 'iandrus.ainsley@yourdomai.com', logo: <PayPalLogo /> },
    { id: 'googlepay', name: 'Google Pay', email: 'iandrus.ainsley@yourdomai.com', logo: <GoogleLogo /> },
    { id: 'applepay', name: 'Apple Pay', email: 'iandrus.ainsley@yourdomai.com', logo: <AppleLogo /> },
  ];

  const cards = [
    { id: 'mastercard-4678', name: 'Mastercard', last4: '4678', logo: <MastercardLogo /> },
    { id: 'visa-5567', name: 'Visa', last4: '5567', logo: <VisaLogo /> },
    { id: 'amex-8456', name: 'American Express', last4: '8456', logo: <AmexLogo /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Choose Payment Methods</h1>
          <button
            onClick={onAddPayment}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="px-6 py-6 space-y-3">
        {/* Digital Wallets */}
        {digitalWallets.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => setSelectedMethod(wallet.id)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-200 transition-colors"
          >
            {wallet.logo}
            <div className="flex-1 text-left">
              <h3 className="text-gray-900">{wallet.name}</h3>
              <p className="text-gray-500 text-sm">{wallet.email}</p>
            </div>
          </button>
        ))}

        {/* Credit/Debit Cards */}
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedMethod(card.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-colors ${
              selectedMethod === card.id
                ? 'border-pink-400 bg-pink-50'
                : 'border-gray-100 hover:border-pink-200'
            }`}
          >
            {card.logo}
            <div className="flex-1 text-left">
              <h3 className="text-gray-900">{card.name}</h3>
              <p className="text-gray-500 text-sm">**** **** **** {card.last4}</p>
            </div>
            {selectedMethod === card.id && (
              <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 safe-area-bottom">
        <button
          onClick={() => onContinue(selectedMethod)}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
