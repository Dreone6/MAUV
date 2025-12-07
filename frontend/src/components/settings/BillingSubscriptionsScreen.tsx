import { ArrowLeft, Check } from 'lucide-react@0.487.0';

interface BillingSubscriptionsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
  planName?: string;
  planPrice?: string;
  planInterval?: string;
  expiryDate?: string;
}

export function BillingSubscriptionsScreen({ 
  onBack,
  onNavigate,
  planName = 'Lunari Pro',
  planPrice = '$49.99',
  planInterval = 'year',
  expiryDate = 'Aug 19, 2025'
}: BillingSubscriptionsScreenProps) {
  const benefits = [
    'Ad-free experience',
    'Advanced period and cycle tracking',
    'Detailed data and insights',
    'Unlock exclusive contents',
    'Priority customer support',
    'Early access to new features',
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
          <h1 className="text-xl text-gray-900">Billing & Subscriptions</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Plan Badge */}
        <div className="flex justify-end mb-2">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm">
            Save 16%
          </div>
        </div>

        {/* Plan Name */}
        <div className="text-center mb-2">
          <h2 className="text-2xl text-gray-900">{planName}</h2>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl text-gray-900">{planPrice}</span>
            <span className="text-gray-500">/{planInterval}</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-4 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-pink-600" strokeWidth={3} />
              </div>
              <span className="text-gray-700 flex-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Current Plan Label */}
        <div className="text-center mb-6">
          <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm inline-block">
            Your current plan
          </span>
        </div>

        {/* Expiry Notice */}
        <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700">
            Your subscription will expire on{' '}
            <span className="text-gray-900">{expiryDate}</span>.
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Renew or cancel your subscription{' '}
            <button
              onClick={() => onNavigate('manage-subscription', 'Manage Subscription')}
              className="text-pink-600 hover:text-pink-700 underline"
            >
              here
            </button>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => onNavigate('upgrade-plan', 'Upgrade Plan')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:shadow-lg transition-all"
          >
            Change Plan
          </button>
          <button
            onClick={() => onNavigate('payment-method', 'Payment Method')}
            className="w-full py-4 rounded-xl border-2 border-pink-400 text-pink-600 hover:bg-pink-50 transition-colors"
          >
            Update Payment Method
          </button>
          <button
            onClick={() => onNavigate('billing-history', 'Billing History')}
            className="w-full py-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Billing History
          </button>
        </div>
      </div>
    </div>
  );
}
