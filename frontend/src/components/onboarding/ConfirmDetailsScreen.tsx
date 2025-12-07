import { RefreshCcw, Calendar, Droplet } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface ConfirmDetailsScreenProps {
  onConfirm: () => void;
  onEdit: () => void;
}

export function ConfirmDetailsScreen({ onConfirm, onEdit }: ConfirmDetailsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-12" />
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-3 text-center">
          Let's confirm your details
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Here is a summary of your first cycle.
        </p>

        {/* Cycle Ring */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64">
            {/* Background Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#f3e8ff"
                strokeWidth="20"
              />
              {/* Progress arc */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="url(#cycleGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 85 * 0.65} ${2 * Math.PI * 85}`}
              />
              <defs>
                <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-1">Cycle Length</p>
              <p className="text-5xl text-gray-900">28</p>
              <p className="text-2xl text-gray-900">Days</p>
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="space-y-4 mb-auto">
          {/* Period Length */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <RefreshCcw className="w-6 h-6 text-fuchsia-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Period Length</p>
              <p className="text-xl text-gray-900">5 Days</p>
            </div>
          </div>

          {/* Last Period Start */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-fuchsia-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Period Start</p>
              <p className="text-xl text-gray-900">Oct 26, 2023</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 pb-6 space-y-4">
          <button
            onClick={onConfirm}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Confirm & Continue
          </button>

          <button
            onClick={onEdit}
            className="w-full text-gray-500 hover:text-gray-700 transition-colors"
          >
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
}