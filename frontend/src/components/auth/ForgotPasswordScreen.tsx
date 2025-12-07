import { ArrowLeft, Mail, Key } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ForgotPasswordScreen({ onBack, onNext }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  const handleSendOTP = () => {
    if (email) {
      alert('OTP code sent to your email!');
      onNext();
    } else {
      alert('Please enter your email address');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-4 flex items-center gap-2">
            Forgot Password? <Key className="w-8 h-8 text-yellow-500" />
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Don&apos;t worry, we&apos;ve got you covered. Enter your registered email address, and we&apos;ll send you an OTP code to reset your password.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-auto">
          <label className="block text-gray-900 mb-2">Registered email address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Send OTP Button */}
        <div className="pb-8">
          <button
            onClick={handleSendOTP}
            disabled={!email}
            className={`w-full py-4 px-6 rounded-full transition-all duration-300 shadow-lg ${
              email
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send OTP Code
          </button>
        </div>
      </div>
    </div>
  );
}
