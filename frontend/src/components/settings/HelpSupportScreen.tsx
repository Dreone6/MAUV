import { ArrowLeft, ChevronRight } from 'lucide-react@0.487.0';

interface HelpSupportScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
}

export function HelpSupportScreen({ onBack, onNavigate }: HelpSupportScreenProps) {
  const menuItems = [
    { id: 'faq', label: 'FAQ', screen: 'faq' },
    { id: 'contact', label: 'Contact Support', screen: 'contact-support' },
    { id: 'privacy', label: 'Privacy Policy', screen: 'privacy-policy' },
    { id: 'terms', label: 'Terms of Service', screen: 'terms-of-service' },
    { id: 'partner', label: 'Partner', screen: 'partner' },
    { id: 'jobs', label: 'Job Vacancy', screen: 'job-vacancy' },
    { id: 'accessibility', label: 'Accessibility', screen: 'accessibility' },
    { id: 'feedback', label: 'Feedback', screen: 'feedback' },
    { id: 'about', label: 'About us', screen: 'about-us' },
    { id: 'rate', label: 'Rate us', screen: 'rate-us' },
    { id: 'website', label: 'Visit Our Website', screen: 'website' },
    { id: 'social', label: 'Follow us on Social Media', screen: 'social-media' },
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
          <h1 className="text-xl text-gray-900">Help & Support</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.screen, item.label)}
            className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <span className="text-gray-900">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
