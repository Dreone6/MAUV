import { Bell } from 'lucide-react@0.487.0';

interface NotificationPermissionScreenProps {
  onEnable: () => void;
  onNotNow: () => void;
}

export function NotificationPermissionScreen({ onEnable, onNotNow }: NotificationPermissionScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center pt-8">
          <h1 className="text-3xl mb-8 tracking-wider">MAUV</h1>

          {/* Progress Bars */}
          <div className="flex gap-3 mb-12">
            <div className="flex-1 h-2 rounded-full bg-purple-300" />
            <div className="flex-1 h-2 rounded-full bg-gray-700" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {/* Bell Icon */}
          <div className="w-32 h-32 rounded-full bg-purple-900/40 flex items-center justify-center mb-12">
            <Bell className="w-16 h-16 text-purple-300" />
          </div>

          {/* Title */}
          <h2 className="text-4xl mb-6 leading-tight">
            Never Miss an Important Update
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Allowing notifications helps us send you timely reminders for your cycle predictions and fertility windows. Your privacy is our priority.
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="pb-8 space-y-4">
          <button
            onClick={onEnable}
            className="w-full py-5 px-6 rounded-full bg-purple-300 text-purple-900 text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Enable Notifications
          </button>

          <button
            onClick={onNotNow}
            className="w-full text-gray-400 hover:text-white transition-colors text-lg"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}