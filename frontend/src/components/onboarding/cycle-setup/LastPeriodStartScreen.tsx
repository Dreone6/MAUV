import { ChevronLeft, ChevronRight, Droplet } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface LastPeriodStartScreenProps {
  onNext: () => void;
  onNotSure: () => void;
}

export function LastPeriodStartScreen({ onNext, onNotSure }: LastPeriodStartScreenProps) {
  const [selectedDate, setSelectedDate] = useState(9);
  const [currentMonth] = useState('October 2024');

  const handleNext = () => {
    // Just navigate forward - data will be saved after authentication
    onNext();
  };

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // October 2024 calendar (starts on Tuesday)
  const calendarDays = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-6 tracking-wider">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="w-10 h-1 rounded-full bg-purple-800" />
            <div className="w-10 h-1 rounded-full bg-purple-400" />
            <div className="w-10 h-1 rounded-full bg-purple-800" />
            <div className="w-10 h-1 rounded-full bg-purple-800" />
            <div className="w-10 h-1 rounded-full bg-purple-800" />
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center">
            <Droplet className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-center mb-12 leading-tight">
          When did your last period start?
        </h2>

        {/* Calendar */}
        <div className="mb-auto">
          {/* Month Selector */}
          <div className="flex items-center justify-between mb-6">
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-900/30 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h3 className="text-xl text-white">{currentMonth}</h3>
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-purple-900/30 rounded-full transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center text-gray-400 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  className={`aspect-square flex items-center justify-center rounded-full text-lg transition-all duration-200 ${
                    !day
                      ? 'invisible'
                      : day === selectedDate
                      ? 'bg-gradient-to-br from-purple-400 to-fuchsia-500 text-white scale-110'
                      : 'text-white hover:bg-purple-900/30'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={onNotSure}
            className="flex-1 py-4 px-6 rounded-full bg-transparent border-2 border-purple-800 text-white transition-all duration-300 hover:border-purple-600"
          >
            Not sure
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}