import { Sparkles, Shield } from 'lucide-react@0.487.0';

interface CreateAvatarScreenProps {
  onCreateAvatar: () => void;
}

export function CreateAvatarScreen({ onCreateAvatar }: CreateAvatarScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center pt-8">
          <h1 className="text-2xl mb-8 tracking-wider">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl text-center mb-16 leading-tight px-4">
          One last step: Create your avatar!
        </h2>

        {/* Features */}
        <div className="space-y-8 mb-auto">
          {/* Personal Touch */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-900/60 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl mb-2">A Personal Touch</h3>
              <p className="text-gray-400 leading-relaxed">
                Add a personal touch to your profile and make your journey unique.
              </p>
            </div>
          </div>

          {/* Stay Anonymous */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-900/60 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl mb-2">Stay Anonymous</h3>
              <p className="text-gray-400 leading-relaxed">
                Distinguish yourself from other users without ever revealing any personally identifiable information.
              </p>
            </div>
          </div>
        </div>

        {/* Create Avatar Button */}
        <button
          onClick={onCreateAvatar}
          className="w-full py-5 px-6 rounded-full bg-purple-500 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mt-12 mb-8"
        >
          Create My Avatar
        </button>
      </div>
    </div>
  );
}