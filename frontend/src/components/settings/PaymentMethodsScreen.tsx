import { ArrowLeft, Plus } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  logo: JSX.Element;
  accountInfo?: string;
  status: 'Linked' | 'Active';
  lastFour?: string;
}

interface PaymentMethodsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
  onAddPayment?: () => void;
}

export function PaymentMethodsScreen({ 
  onBack, 
  onNavigate,
  onAddPayment 
}: PaymentMethodsScreenProps) {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'paypal',
      name: 'PayPal',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="#00457C"
            d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 4.745a.77.77 0 0 1 .76-.64h7.944c2.683 0 4.53.58 5.49 1.725.94.979 1.24 2.346 1.04 4.107-.01.096-.02.193-.03.291-.51 3.29-2.43 4.97-5.71 4.97H10.32a.77.77 0 0 0-.76.64l-.5 3.176-.02.125c-.01.084-.04.164-.09.227a.36.36 0 0 1-.25.104h-.01z"
          />
          <path
            fill="#0079C1"
            d="M19.82 7.012c-.09.585-.19 1.14-.32 1.658-1.05 4.48-4.65 6.77-10.09 6.77H7.07l-1.45 9.24c-.05.33.2.63.53.63h3.74c.3 0 .56-.22.61-.52l.02-.12.5-3.17.03-.19c.05-.3.31-.52.61-.52h.39c3.45 0 6.15-1.4 6.94-5.46.33-1.68.16-3.08-.7-4.06-.26-.29-.58-.54-.94-.74z"
          />
          <path
            fill="#00457C"
            d="M18.96 6.56c-.14-.04-.29-.08-.44-.11-.15-.03-.31-.06-.47-.08-1.06-.15-2.25-.22-3.54-.22h-4.68c-.09 0-.18.02-.26.05a.622.622 0 0 0-.39.49l-.74 4.71-.02.13c.05-.3.31-.52.61-.52h1.27c3.44 0 6.14-1.4 6.93-5.45.01-.06.02-.12.03-.18-.16-.08-.34-.16-.52-.23-.09-.03-.18-.07-.27-.1z"
          />
        </svg>
      ),
      accountInfo: 'andrew.ainsley@yourdomain...',
      status: 'Linked',
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="#5F6368"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          />
        </svg>
      ),
      accountInfo: 'andrew.ainsley@yourdomain...',
      status: 'Linked',
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="#000000"
            d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
          />
        </svg>
      ),
      accountInfo: 'andrew.ainsley@yourdomain...',
      status: 'Linked',
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <circle cx="9" cy="12" r="7" fill="#EB001B" />
          <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
        </svg>
      ),
      lastFour: '8629',
      status: 'Linked',
    },
    {
      id: 'visa',
      name: 'Visa',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="#1434CB" />
          <path
            d="M20.58 11.34h-3.18l-1.99 9.32h3.18l1.99-9.32zm11.24 6.02l1.68-4.62.96 4.62h-2.64zm3.54 3.3h2.95l-2.57-9.32h-2.73c-.61 0-1.13.35-1.36.89l-4.8 8.43h3.35l.67-1.84h4.1l.39 1.84zm-7.04-3.05c.01-2.46-3.4-2.6-3.38-3.69.01-.33.32-.68 1.01-.77.34-.04 1.28-.07 2.34.41l.42-1.94c-.57-.21-1.3-.4-2.21-.4-3.15 0-5.37 1.68-5.39 4.08-.02 1.77 1.58 2.76 2.79 3.35 1.24.6 1.66.99 1.65 1.53-.01.82-1 1.19-1.92 1.2-1.61.03-2.54-.43-3.29-.78l-.58 2.71c.75.34 2.13.64 3.56.66 3.35 0 5.54-1.66 5.56-4.22l-.01-.14zm-13.28-6.27l-5.21 9.32h-3.37l-2.55-9.89c-.15-.6-.29-.82-.76-1.07-.77-.41-2.04-.79-3.16-1.03l.08-.37h5.46c.7 0 1.32.46 1.48 1.26l1.35 7.17 3.33-8.43h3.35v.04z"
            fill="#fff"
          />
        </svg>
      ),
      lastFour: '5867',
      status: 'Linked',
    },
  ]);

  const handleAddPayment = () => {
    if (onAddPayment) {
      onAddPayment();
    } else {
      onNavigate('add-payment', 'Add New Payment');
    }
  };

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
          <h1 className="text-xl text-gray-900">Payment Methods</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="px-6 py-6 space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                {method.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-0.5">{method.name}</h3>
                <p className="text-gray-500 text-sm">
                  {method.accountInfo || `•••• •••• •••• ${method.lastFour}`}
                </p>
              </div>
            </div>
            <span className="text-gray-600 text-sm">{method.status}</span>
          </div>
        ))}
      </div>

      {/* Add New Payment Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleAddPayment}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Payment</span>
        </button>
      </div>
    </div>
  );
}
