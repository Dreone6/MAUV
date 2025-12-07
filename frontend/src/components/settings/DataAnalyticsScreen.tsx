import { ArrowLeft, ChevronRight } from 'lucide-react@0.487.0';

interface DataAnalyticsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
}

export function DataAnalyticsScreen({ onBack, onNavigate }: DataAnalyticsScreenProps) {
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
          <h1 className="text-xl text-gray-900">Data & Analytics</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Options List */}
      <div className="px-6 py-6 space-y-1">
        {/* Data Usage */}
        <button
          onClick={() => onNavigate('data-usage', 'Data Usage')}
          className="w-full py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Data Usage</h3>
              <p className="text-gray-500 text-sm">
                Control how your data is used for analytics. Customize your preferences.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 ml-3" />
          </div>
        </button>

        {/* Ad Preferences */}
        <button
          onClick={() => onNavigate('ad-preferences', 'Ad Preferences')}
          className="w-full py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Ad Preferences</h3>
              <p className="text-gray-500 text-sm">
                Manage ad personalization settings. Tailor your ad experience.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 ml-3" />
          </div>
        </button>

        {/* Download My Data */}
        <button
          onClick={() => onNavigate('download-data', 'Download My Data')}
          className="w-full py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Download My Data</h3>
              <p className="text-gray-500 text-sm">
                Request a copy of your data. Your information, your control.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 ml-3" />
          </div>
        </button>
      </div>
    </div>
  );
}
