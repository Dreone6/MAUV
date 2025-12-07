import { Check, Smartphone } from 'lucide-react@0.487.0';

interface PasswordUpdatedSuccessScreenProps {
  onSignIn: () => void;
}

export function PasswordUpdatedSuccessScreen({ onSignIn }: PasswordUpdatedSuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto w-full flex flex-col items-center">
        {/* Success Icon */}
        <div className="mb-8 relative">
          {/* Pink Circle Background */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-2xl">
            {/* Phone Icon */}
            <div className="relative">
              <div className="w-16 h-24 rounded-xl bg-white flex items-center justify-center shadow-lg">
                {/* Checkmark Circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </div>
              {/* Phone notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-auto">
          <h1 className="text-3xl text-gray-900 mb-3">
            You&apos;re All Set!
          </h1>
          <p className="text-gray-600">
            Your password has been updated.
          </p>
        </div>

        {/* Sign In Button */}
        <div className="w-full pb-8">
          <button
            onClick={onSignIn}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
