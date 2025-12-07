import { useEffect, useState } from 'react';

interface CyclePhaseRingProps {
  cycleDay: number;
  cycleLength?: number;
}

interface Phase {
  name: string;
  description: string;
  startDay: number;
  endDay: number;
  color: string;
  gradient: string;
}

export function CyclePhaseRing({ cycleDay, cycleLength = 28 }: CyclePhaseRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Define the 4 cycle phases
  const phases: Phase[] = [
    {
      name: 'Menstruation',
      description: 'Your period - time to rest',
      startDay: 1,
      endDay: 5,
      color: '#ef4444',
      gradient: 'from-red-400 to-red-500',
    },
    {
      name: 'Follicular',
      description: 'Rising energy & creativity',
      startDay: 6,
      endDay: 13,
      color: '#ec4899',
      gradient: 'from-pink-400 to-pink-500',
    },
    {
      name: 'Ovulation',
      description: 'Peak fertility & confidence',
      startDay: 14,
      endDay: 16,
      color: '#a855f7',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Luteal',
      description: 'Winding down - self-care time',
      startDay: 17,
      endDay: cycleLength,
      color: '#3b82f6',
      gradient: 'from-blue-400 to-blue-500',
    },
  ];

  // Determine current phase
  const currentPhase = phases.find(
    (phase) => cycleDay >= phase.startDay && cycleDay <= phase.endDay
  ) || phases[0];

  // Calculate progress through the entire cycle
  const overallProgress = (cycleDay / cycleLength) * 100;

  // Animate progress on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(overallProgress);
    }, 300);
    return () => clearTimeout(timeout);
  }, [overallProgress]);

  // SVG circle calculations
  const size = 260;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate segment sizes based on phase durations
  const getPhaseSegment = (phase: Phase) => {
    const phaseDuration = phase.endDay - phase.startDay + 1;
    const phasePercentage = (phaseDuration / cycleLength) * 100;
    return {
      percentage: phasePercentage,
      offset: ((phase.startDay - 1) / cycleLength) * 100,
      duration: phaseDuration,
    };
  };

  // Calculate position for current day marker
  const getCurrentDayPosition = () => {
    const angle = ((cycleDay - 1) / cycleLength) * 360;
    const markerRadius = radius;
    const x = centerX + markerRadius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + markerRadius * Math.sin((angle * Math.PI) / 180);
    return { x, y, angle };
  };

  const currentDayPos = getCurrentDayPosition();

  return (
    <div className="flex justify-center py-4">
      <div className="relative" style={{ width: size + 100, height: size + 100 }}>
        {/* Outer glow */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentPhase.color}20, transparent)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Main container */}
        <div 
          className="absolute"
          style={{
            left: '50px',
            top: '50px',
            width: size,
            height: size,
          }}
        >
          {/* SVG Ring */}
          <svg
            width={size}
            height={size}
            className="absolute inset-0 transform -rotate-90"
            style={{ 
              overflow: 'visible',
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="depth">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.2"/>
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15"/>
              </filter>
            </defs>

            {/* Background track */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              stroke="#f3e8ff"
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.3}
            />

            {/* Phase segments */}
            {phases.map((phase, idx) => {
              const segment = getPhaseSegment(phase);
              const segmentLength = (segment.percentage / 100) * circumference;
              const segmentOffset = circumference - (segment.offset / 100) * circumference;
              
              // Calculate how much of this segment to fill
              let fillPercentage = 0;
              if (cycleDay > phase.endDay) {
                fillPercentage = 100;
              } else if (cycleDay >= phase.startDay && cycleDay <= phase.endDay) {
                const daysIntoPhase = cycleDay - phase.startDay + 1;
                const phaseDuration = phase.endDay - phase.startDay + 1;
                fillPercentage = (daysIntoPhase / phaseDuration) * 100;
              }

              const filledLength = (fillPercentage / 100) * segmentLength;
              const dashArray = `${filledLength} ${circumference - filledLength}`;

              return (
                <g key={idx}>
                  {/* Base segment (unfilled) */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    stroke={phase.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${segmentLength} ${circumference}`}
                    strokeDashoffset={segmentOffset}
                    opacity={0.25}
                    strokeLinecap="round"
                  />
                  
                  {/* Filled portion (progress) */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    stroke={phase.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={dashArray}
                    strokeDashoffset={segmentOffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    filter="url(#depth)"
                    style={{
                      opacity: animatedProgress > 0 ? 0.95 : 0,
                    }}
                  />
                </g>
              );
            })}

            {/* Current day marker */}
            <g>
              {/* Solid marker with subtle glow */}
              <circle
                cx={currentDayPos.x}
                cy={currentDayPos.y}
                r={8}
                fill={currentPhase.color}
                opacity={0.2}
              />
              <circle
                cx={currentDayPos.x}
                cy={currentDayPos.y}
                r={7}
                fill="white"
                stroke={currentPhase.color}
                strokeWidth={3}
                filter="url(#glow)"
              />
              {/* Inner dot */}
              <circle
                cx={currentDayPos.x}
                cy={currentDayPos.y}
                r={3}
                fill={currentPhase.color}
              />
            </g>
          </svg>

          {/* Day markers around the circle */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: cycleLength }, (_, i) => {
              const day = i + 1;
              const angle = (i / cycleLength) * 360 - 90;
              const dayMarkerRadius = radius + 28;
              const x = centerX + dayMarkerRadius * Math.cos((angle * Math.PI) / 180);
              const y = centerY + dayMarkerRadius * Math.sin((angle * Math.PI) / 180);
              
              // Determine if this day is in a completed phase
              const isPast = day < cycleDay;
              const isToday = day === cycleDay;
              const dayPhase = phases.find(p => day >= p.startDay && day <= p.endDay);

              // Show every 7th day number for cleaner look
              const showNumber = day % 7 === 0 || day === 1 || day === cycleLength || isToday;

              return (
                <div
                  key={day}
                  className="absolute text-xs transition-all duration-300"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {showNumber ? (
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isToday
                          ? 'scale-125'
                          : 'scale-100'
                      }`}
                      style={{
                        color: isToday 
                          ? currentPhase.color
                          : isPast
                          ? dayPhase?.color
                          : '#9ca3af',
                        fontWeight: isToday ? 700 : 500,
                        fontSize: isToday ? '13px' : '11px',
                      }}
                    >
                      {day}
                    </div>
                  ) : (
                    <div
                      className="w-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isPast ? dayPhase?.color : '#d1d5db',
                        opacity: isPast ? 0.5 : 0.25,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center px-6 relative">
              {/* Background glow */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${currentPhase.color}12, transparent)`,
                  filter: 'blur(20px)',
                  transform: 'scale(2)',
                }}
              />
              
              <p 
                className="text-xs tracking-widest uppercase mb-1 relative z-10"
                style={{ 
                  color: currentPhase.color,
                  fontWeight: 600,
                }}
              >
                {currentPhase.name}
              </p>
              <div 
                className="mb-2 transition-all duration-500 relative z-10"
                style={{
                  color: currentPhase.color,
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: '1',
                }}
              >
                {cycleDay}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed relative z-10 max-w-[130px]">
                {currentPhase.description}
              </p>
            </div>
          </div>

          {/* Phase labels */}
          <div className="absolute inset-0 pointer-events-none">
            {phases.map((phase, idx) => {
              const midDay = (phase.startDay + phase.endDay) / 2;
              const angle = ((midDay - 1) / cycleLength) * 360 - 90;
              const labelRadius = radius + 50;
              const x = centerX + labelRadius * Math.cos((angle * Math.PI) / 180);
              const y = centerY + labelRadius * Math.sin((angle * Math.PI) / 180);

              const isCurrentPhase = phase.name === currentPhase.name;

              return (
                <div
                  key={idx}
                  className="absolute transition-all duration-300"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`px-2.5 py-1 rounded-full text-white text-center whitespace-nowrap transition-all duration-300 shadow-md ${
                      isCurrentPhase
                        ? 'scale-100 ring-2 ring-white ring-opacity-40'
                        : 'scale-90 opacity-60'
                    }`}
                    style={{
                      backgroundColor: phase.color,
                      fontWeight: isCurrentPhase ? 600 : 500,
                      fontSize: '10px',
                    }}
                  >
                    {phase.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}