import image_4181731f1825e464f60d30194016a6b9994ed07a from 'figma:asset/4181731f1825e464f60d30194016a6b9994ed07a.png';

interface AmaraNavButtonProps {
  onClick: () => void;
}

export function AmaraNavButton({ onClick }: AmaraNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative -mt-8"
    >
      <div 
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-105 transition-transform"
        style={{
          boxShadow: '0 8px 16px rgba(147, 51, 234, 0.3), 0 4px 8px rgba(236, 72, 153, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        }}
      >
        <img 
          src={image_4181731f1825e464f60d30194016a6b9994ed07a} 
          alt="Amara AI"
          className="w-10 h-10 object-contain"
        />
      </div>
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-purple-600 whitespace-nowrap">
        Amara AI
      </span>
    </button>
  );
}
