import { Heart, Moon, Star, Sparkles, Flower2, Circle } from 'lucide-react@0.487.0';

export function FloatingBackground() {
  const floatingElements = [
    { Icon: Heart, delay: 0, duration: 15, x: 10 },
    { Icon: Moon, delay: 2, duration: 18, x: 80 },
    { Icon: Star, delay: 1, duration: 16, x: 20 },
    { Icon: Sparkles, delay: 3, duration: 14, x: 70 },
    { Icon: Flower2, delay: 1.5, duration: 17, x: 50 },
    { Icon: Circle, delay: 2.5, duration: 19, x: 40 },
    { Icon: Heart, delay: 4, duration: 15, x: 90 },
    { Icon: Star, delay: 0.5, duration: 16, x: 30 },
    { Icon: Sparkles, delay: 3.5, duration: 17, x: 60 },
    { Icon: Moon, delay: 1.2, duration: 18, x: 15 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {floatingElements.map((elem, index) => (
        <div
          key={index}
          className="absolute animate-float-up"
          style={{
            left: `${elem.x}%`,
            bottom: '-10%',
            animationDuration: `${elem.duration}s`,
            animationDelay: `${elem.delay}s`,
          }}
        >
          <elem.Icon className="w-8 h-8 text-purple-300/20" />
        </div>
      ))}
      
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  );
}