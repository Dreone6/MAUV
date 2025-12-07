import { ArrowLeft, Lock, Delete } from 'lucide-react@0.487.0';
import { useState, useEffect, useRef } from 'react';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function OTPVerificationScreen({ onBack, onNext }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumberClick = (num: string) => {
    const emptyIndex = otp.findIndex((digit) => digit === '');
    if (emptyIndex !== -1) {
      const newOtp = [...otp];
      newOtp[emptyIndex] = num;
      setOtp(newOtp);
      
      // Auto submit when all 4 digits entered
      if (emptyIndex === 3) {
        setTimeout(() => {
          handleVerify();
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    const lastFilledIndex = otp.map((digit, i) => digit !== '' ? i : -1).filter(i => i !== -1).pop();
    if (lastFilledIndex !== undefined) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      alert('OTP code resent!');
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      alert(`Verifying OTP: ${otpCode}`);
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-4 flex items-center gap-2">
            Enter OTP Code <Lock className="w-6 h-6 text-yellow-500" />
          </h1>
          <p className="text-gray-600">
            We&apos;ve sent a OTP code to your email. Please enter it below to verify your account.
          </p>
        </div>

        {/* OTP Input Display */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <div
              key={index}
              className={`w-16 h-20 rounded-2xl flex items-center justify-center text-3xl transition-all ${
                digit
                  ? 'bg-pink-50 border-2 border-pink-400 text-gray-900'
                  : 'bg-gray-50 border-2 border-gray-200 text-gray-400'
              }`}
            >
              {digit || ''}
            </div>
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">
            You can resend the code in <span className="text-pink-500">{countdown}</span> seconds
          </p>
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className={`transition-colors ${
              countdown === 0
                ? 'text-pink-500 hover:text-pink-600'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Resend code
          </button>
        </div>

        {/* Number Pad */}
        <div className="mt-auto pb-8">
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {/* Numbers 1-9 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-2xl text-gray-900 transition-colors"
              >
                {num}
              </button>
            ))}
            
            {/* Bottom Row: *, 0, Delete */}
            <button
              onClick={() => handleNumberClick('*')}
              className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-2xl text-gray-900 transition-colors"
            >
              *
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-2xl text-gray-900 transition-colors"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="h-16 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-900 transition-colors"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
