import { ArrowLeft, ChevronRight, Info, CheckCircle } from 'lucide-react@0.487.0';

interface DeviceAppIntegrationsScreenProps {
  onBack: () => void;
  onManagePermissions: () => void;
}

export function DeviceAppIntegrationsScreen({ onBack, onManagePermissions }: DeviceAppIntegrationsScreenProps) {
  const devices = [
    {
      id: 'apple-health',
      name: 'Apple Health',
      icon: '🍎',
      connected: true,
      bgColor: 'bg-teal-600',
    },
    {
      id: 'google-fit',
      name: 'Google Fit',
      icon: '🔴',
      connected: false,
      bgColor: 'bg-gray-500',
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: '💎',
      connected: false,
      bgColor: 'bg-gray-400',
    },
    {
      id: 'garmin',
      name: 'Garmin',
      icon: '🔷',
      connected: false,
      bgColor: 'bg-emerald-700',
    },
    {
      id: 'oura-ring',
      name: 'Oura Ring',
      icon: '⭕',
      connected: false,
      bgColor: 'bg-gray-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl">Device & App Integrations</h1>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Automatically import activity, sleep, and body metric data for more accurate predictions.
          </p>
        </div>

        {/* Device List */}
        <div className="space-y-4 mb-8">
          {devices.map((device) => (
            <button
              key={device.id}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className={`w-12 h-12 ${device.bgColor} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                {device.icon === '🍎' && (
                  <svg width="24" height="28" viewBox="0 0 24 28" fill="white">
                    <path d="M19.5 14c0-2.85 2.33-4.28 2.48-4.35-1.35-1.95-3.45-2.25-4.2-2.25-1.8-.15-3.45 1.05-4.35 1.05-.9 0-2.33-1.05-3.83-1-1.95 0-3.75 1.13-4.73 2.85-2.03 3.53-.53 8.7 1.43 11.55.98 1.43 2.1 3 3.6 2.93 1.43-.08 2.03-.9 3.75-.9 1.73 0 2.25.9 3.83.9 1.58 0 2.55-1.43 3.53-2.85 1.13-1.65 1.58-3.23 1.58-3.3-.08 0-3-.08-3.08-3.15zm-2.85-8.4c.83-.98 1.35-2.33 1.2-3.68-1.2.08-2.63.83-3.45 1.8-.75.9-1.43 2.25-1.28 3.6 1.35.08 2.7-.68 3.53-1.73z"/>
                  </svg>
                )}
                {device.icon === '🔴' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                )}
                {device.icon === '💎' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 8l10 6 10-6-10-6zm0 14l-8-4.8v7.6l8 4.8 8-4.8v-7.6l-8 4.8z"/>
                  </svg>
                )}
                {device.icon === '🔷' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 18l-7-3.9V8.9l7 3.9 7-3.9v7.2l-7 3.9z"/>
                  </svg>
                )}
                {device.icon === '⭕' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                )}
              </div>

              <span className="flex-1 text-left text-lg">{device.name}</span>

              {device.connected ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-sm">Connected</span>
                  <CheckCircle className="w-5 h-5" />
                </div>
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-500" />
              )}
            </button>
          ))}
        </div>

        {/* Manage Permissions Section */}
        <button
          onClick={onManagePermissions}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 mb-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-lg mb-2">Manage Permissions for Linked Devices</h3>
              <p className="text-gray-400 text-sm">
                Review and control data shared from connected apps.
              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
          </div>
        </button>

        {/* Privacy Link */}
        <button className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-400 transition-colors mb-8">
          <Info className="w-4 h-4" />
          <span className="text-sm underline">Learn about data syncing & privacy</span>
        </button>
      </div>
    </div>
  );
}