import { X, RotateCw } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface AddNewPaymentScreenProps {
  onClose: () => void;
  onSave?: (paymentData: PaymentData) => void;
}

interface PaymentData {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
}

export function AddNewPaymentScreen({ onClose, onSave }: AddNewPaymentScreenProps) {
  const [cardNumber, setCardNumber] = useState('2456 4763 7569 8456');
  const [holderName, setHolderName] = useState('Andrew Ainsley');
  const [expiryMonth, setExpiryMonth] = useState('06');
  const [expiryYear, setExpiryYear] = useState('28');
  const [cvv, setCvv] = useState('475');

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        cardNumber,
        holderName,
        expiryDate: `${expiryMonth}/${expiryYear}`,
        cvv,
      });
    }
    onClose();
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return month;
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => {
    const year = (currentYear + i).toString().substring(2);
    return year;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up-modal">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>
            <h1 className="text-xl text-gray-900">Add New Payment</h1>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <RotateCw className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-gray-900 mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-gray-900 mb-2">Account Holder Name</label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Enter holder name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-gray-900 mb-2">Expiry Date</label>
              <div className="flex gap-2">
                <select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '32px',
                  }}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span className="flex items-center text-gray-400">/</span>
                <select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '32px',
                  }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="block text-gray-900 mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="000"
                maxLength={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
            </div>
          </div>

          {/* Supported Payments */}
          <div>
            <label className="block text-gray-900 mb-3">Supported Payments</label>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Mastercard */}
              <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <circle cx="9" cy="12" r="6" fill="#EB001B" />
                  <circle cx="15" cy="12" r="6" fill="#F79E1B" fillOpacity="0.8" />
                </svg>
              </div>
              {/* Visa */}
              <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white">
                <svg className="h-5" viewBox="0 0 48 16" fill="none">
                  <path
                    d="M16.58 3.34h-3.18l-1.99 9.32h3.18l1.99-9.32zm11.24 6.02l1.68-4.62.96 4.62h-2.64zm3.54 3.3h2.95l-2.57-9.32h-2.73c-.61 0-1.13.35-1.36.89l-4.8 8.43h3.35l.67-1.84h4.1l.39 1.84zm-7.04-3.05c.01-2.46-3.4-2.6-3.38-3.69.01-.33.32-.68 1.01-.77.34-.04 1.28-.07 2.34.41l.42-1.94c-.57-.21-1.3-.4-2.21-.4-3.15 0-5.37 1.68-5.39 4.08-.02 1.77 1.58 2.76 2.79 3.35 1.24.6 1.66.99 1.65 1.53-.01.82-1 1.19-1.92 1.2-1.61.03-2.54-.43-3.29-.78l-.58 2.71c.75.34 2.13.64 3.56.66 3.35 0 5.54-1.66 5.56-4.22l-.01-.14zm-13.28-6.27l-5.21 9.32h-3.37l-2.55-9.89c-.15-.6-.29-.82-.76-1.07-.77-.41-2.04-.79-3.16-1.03l.08-.37h5.46c.7 0 1.32.46 1.48 1.26l1.35 7.17 3.33-8.43h3.35v.04z"
                    fill="#1434CB"
                  />
                </svg>
              </div>
              {/* Amazon */}
              <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white">
                <svg className="h-5" viewBox="0 0 48 20" fill="none">
                  <path
                    d="M29.95 14.5c-5.33 3.93-13.07 6.02-19.73 6.02-9.33 0-17.74-3.45-24.1-9.19-.5-.45-.05-1.06.55-.71 6.89 4.01 15.41 6.42 24.21 6.42 5.94 0 12.47-1.23 18.48-3.78.9-.38 1.66.59.79 1.24z"
                    fill="#FF9900"
                  />
                  <path
                    d="M32.23 11.84c-.68-.87-4.51-.41-6.23-.21-.52.06-.6-.39-.13-.72 3.05-2.15 8.06-1.53 8.64-.81.58.73-.15 5.77-3.04 8.18-.45.37-.87.17-.67-.32.64-1.6 2.08-5.19 1.4-6.12z"
                    fill="#FF9900"
                  />
                </svg>
              </div>
              {/* American Express */}
              <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white">
                <svg className="h-5" viewBox="0 0 48 16" fill="#006FCF">
                  <rect width="48" height="16" rx="2" fill="#006FCF" />
                  <path
                    d="M8.5 5.5h2.8l.6 1.4.6-1.4h2.8v4.3l1.9-4.3h2.4l1.9 4.3V5.5h2.8l.5 1.2.5-1.2h10.6l-.8 1.9h.8c.8 0 1.3.5 1.3 1.3 0 .8-.5 1.3-1.3 1.3h-2.7l-.5-1.2v1.2H26l-.4-1-.4 1h-4.7l-.5-1.2v1.2h-4.7V6.7l-.6 1.3h-1.5l-.6-1.3v3.3H8.5V5.5z"
                    fill="white"
                  />
                </svg>
              </div>
              {/* JCB */}
              <div className="w-12 h-8 rounded border border-gray-200 flex items-center justify-center bg-white">
                <svg className="h-5" viewBox="0 0 48 16" fill="none">
                  <rect width="16" height="16" rx="2" fill="#0E4C96" />
                  <rect x="16" width="16" height="16" rx="2" fill="#D32011" />
                  <rect x="32" width="16" height="16" rx="2" fill="#009540" />
                  <path d="M4 4h8v8H4z" fill="white" fillOpacity="0.3" />
                  <path d="M20 4h8v8h-8z" fill="white" fillOpacity="0.3" />
                  <path d="M36 4h8v8h-8z" fill="white" fillOpacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:shadow-lg transition-all"
          >
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up-modal {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up-modal {
          animation: slide-up-modal 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
