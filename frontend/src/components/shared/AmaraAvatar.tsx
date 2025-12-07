import image_4181731f1825e464f60d30194016a6b9994ed07a from 'figma:asset/4181731f1825e464f60d30194016a6b9994ed07a.png';

interface AmaraAvatarProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function AmaraAvatar({ size = 'medium', className = '' }: AmaraAvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const imgSizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg flex-shrink-0 ${className}`}
    >
      <img 
        src={image_4181731f1825e464f60d30194016a6b9994ed07a} 
        alt="Amara AI"
        className={`${imgSizeClasses[size]} object-contain`}
      />
    </div>
  );
}
