import { ArrowLeft, ChevronRight, Info, CheckCircle2, Apple, Activity, Watch, Circle } from 'lucide-react@0.487.0';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

interface DeviceIntegrationsScreenProps {
  onBack: () => void;
  onAppleHealthClick: () => void;
  onNext: () => void;
}

export function DeviceIntegrationsScreen({ onBack, onAppleHealthClick, onNext }: DeviceIntegrationsScreenProps) {
  const integrations: Integration[] = [
    { id: 'apple-health', name: 'Apple Health', icon: <Apple className="w-5 h-5" />, connected: true, color: 'bg-teal-600' },
    { id: 'google-fit', name: 'Google Fit', icon: <Activity className="w-5 h-5" />, connected: false, color: 'bg-gray-600' },
    { id: 'fitbit', name: 'Fitbit', icon: <Circle className="w-5 h-5" />, connected: false, color: 'bg-gray-600' },
    { id: 'garmin', name: 'Garmin', icon: <Watch className="w-5 h-5" />, connected: false, color: 'bg-teal-700' },
    { id: 'oura-ring', name: 'Oura Ring', icon: <Circle className="w-5 h-5" />, connected: false, color: 'bg-gray-600' },
  ];

  const handleIntegrationClick = (id: string) => {
    if (id === 'apple-health') {
      onAppleHealthClick();
    } else {
      alert(`Connect to ${integrations.find(i => i.id === id)?.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Device & App Integrations</h1>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-8">
          Automatically import activity, sleep, and body metric data for more accurate predictions.
        </p>

        {/* Integrations List */}
        <div className="space-y-3 mb-8">
          {integrations.map((integration) => (
            <button
              key={integration.id}
              onClick={() => handleIntegrationClick(integration.id)}
              className="w-full bg-purple-950/30 border border-purple-800/30 rounded-2xl p-4 flex items-center justify-between hover:border-purple-600/50 hover:bg-purple-950/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${integration.color} flex items-center justify-center text-2xl`}>
                  {integration.icon}
                </div>
                <span className="text-white">{integration.name}</span>
              </div>
              
              {integration.connected ? (
                <div className="flex items-center gap-2 text-teal-400">
                  <span className="text-sm">Connected</span>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
          ))}
        </div>

        {/* Manage Permissions */}
        <button className="w-full bg-purple-950/30 border border-purple-800/30 rounded-2xl p-4 mb-6 hover:border-purple-600/50 hover:bg-purple-950/40 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="text-left">
              <h3 className="text-white mb-1">Manage Permissions for Linked Devices</h3>
              <p className="text-sm text-gray-400">Review and control data shared from connected apps.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
          </div>
        </button>

        {/* Privacy Info */}
        <button className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors">
          <Info className="w-4 h-4" />
          <span>Learn about data syncing & privacy</span>
        </button>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="w-full mt-8 py-4 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-[#1a0f2e] transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}