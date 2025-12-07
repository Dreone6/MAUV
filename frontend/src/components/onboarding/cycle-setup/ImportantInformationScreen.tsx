import { Shield, Ban, Equal, Diamond } from 'lucide-react@0.487.0';

interface ImportantInformationScreenProps {
  onAgree: () => void;
}

export function ImportantInformationScreen({ onAgree }: ImportantInformationScreenProps) {
  const keyPoints = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Not a Substitute for Medical Advice',
      description: 'This app is for informational purposes only and should not replace professional medical advice.',
    },
    {
      icon: <Ban className="w-7 h-7" />,
      title: 'Not a Method of Birth Control',
      description: 'MAUV is not a form of contraception. Please consult your doctor for birth control options.',
    },
    {
      icon: <Equal className="w-7 h-7" />,
      title: 'For Accurate Results',
      description: 'Please input your data as accurately as possible for the best experience and predictions.',
    },
    {
      icon: <Diamond className="w-7 h-7" />,
      title: 'In Case of Emergency',
      description: "If you're experiencing a medical emergency, please contact a healthcare professional immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl mb-6 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 bg-clip-text text-transparent">
            MAUV
          </h1>

          {/* Progress Bars */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="w-8 h-1.5 rounded-full bg-fuchsia-300" />
            <div className="w-8 h-1.5 rounded-full bg-fuchsia-500" />
            <div className="w-8 h-1.5 rounded-full bg-fuchsia-200" />
            <div className="w-8 h-1.5 rounded-full bg-fuchsia-200" />
            <div className="w-8 h-1.5 rounded-full bg-fuchsia-200" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-3">Important Information</h2>
        <p className="text-gray-500 mb-8">
          Before we get started, please review these key points.
        </p>

        {/* Key Points */}
        <div className="space-y-5 mb-auto">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                {point.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{point.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 pb-6">
          <button
            onClick={onAgree}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mb-4"
          >
            I Understand & Agree
          </button>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <button className="text-fuchsia-500 hover:text-fuchsia-600 transition-colors">
              Terms of Service
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
}