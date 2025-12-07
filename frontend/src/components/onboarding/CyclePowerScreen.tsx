import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react@0.487.0';

interface CyclePowerScreenProps {
  onBack: () => void;
}

export function CyclePowerScreen({ onBack }: CyclePowerScreenProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 relative overflow-hidden">
      <button
        onClick={onBack}
        className="fixed top-6 left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm z-10"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Female symbol decorations */}
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
          style={{
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 2s ease-in-out',
            opacity: opacity * 0.05
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="35" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="55" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="75" x2="60" y2="75" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 opacity-5"
          style={{
            transform: 'translate(50%, 50%)',
            transition: 'opacity 2s ease-in-out',
            opacity: opacity * 0.05
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="35" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="55" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="75" x2="60" y2="75" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div 
          className="absolute top-2/3 left-1/2 w-48 h-48 opacity-5"
          style={{
            transform: 'translate(-50%, -50%) rotate(15deg)',
            transition: 'opacity 2s ease-in-out',
            opacity: opacity * 0.05
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="35" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="55" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="75" x2="60" y2="75" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div 
          className="text-center transition-opacity duration-2000"
          style={{ opacity }}
        >
          <h1 className="text-3xl md:text-4xl text-gray-600">
            Your cycle, your power.
          </h1>
        </div>
      </div>
    </div>
  );
}