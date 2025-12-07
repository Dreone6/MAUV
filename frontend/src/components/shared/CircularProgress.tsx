import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor?: string;
  label: string;
  value: string;
  subtext?: string;
  delay?: number;
}

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  color,
  trackColor = '#f3e8ff',
  label,
  value,
  subtext,
  delay = 0,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [percentage, delay]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle with gradient */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${color})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </div>
          {subtext && (
            <div className="text-xs text-gray-500 mt-0.5">
              {subtext}
            </div>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-3 text-center px-2">
        {label}
      </p>
    </div>
  );
}
