interface CongratulationsScreenProps {
  onUnlock: () => void;
}

export function CongratulationsScreen({ onUnlock }: CongratulationsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1a3e] via-[#1a0f2e] to-[#3a2a4e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center pt-8">
          <h1 className="text-3xl tracking-[0.3em] mb-8">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center text-center px-4">
          <h2 className="text-5xl mb-8">Congratulations!</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-sm mx-auto">
            Your personalized MAUV dashboard is now ready. Based on your inputs, your cycle predictions have been tailored specifically for you.
          </p>
        </div>

        {/* Bottom Button */}
        <button
          onClick={onUnlock}
          className="w-full py-6 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-purple-900 text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mb-8"
        >
          Unlock My MAUV
        </button>
      </div>
    </div>
  );
}
