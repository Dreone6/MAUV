import { ArrowLeft, Star } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface TestimonialScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function TestimonialScreen({ onBack, onNext }: TestimonialScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-40 left-10 w-24 h-24 rounded-full bg-purple-900/20 blur-2xl" />
      <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-pink-900/20 blur-2xl" />
      <div className="absolute top-60 right-20 w-20 h-20 rounded-full bg-purple-900/10 blur-xl" />

      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Header */}
        <div className="text-center pt-8">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-16">
            <img src={mauvLogo} alt="MAUV Logo" className="h-20 w-auto" />
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-800/30 rounded-3xl p-8 mb-12">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg text-white mb-4">
            "Finally, an app that respects my privacy and helps me feel in control."
          </p>
          <p className="text-gray-400">Jessica L.</p>
        </div>

        {/* Bottom Section */}
        <div className="mb-8">
          <h2 className="text-2xl text-center text-white mb-8">
            Understand your body better by tracking with us.
          </h2>

          <button
            onClick={onNext}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-[#1a0f2e] transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105 active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}