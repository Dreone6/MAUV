import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react@0.487.0';

interface PinpointFertileDaysScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function PinpointFertileDaysScreen({ onNext, onSkip }: PinpointFertileDaysScreenProps) {
  const [selectedDates, setSelectedDates] = useState<number[]>([9, 10, 11, 12]);
  const [ovulationDay, setOvulationDay] = useState(11);

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    if (selectedDates.includes(day)) {
      setSelectedDates(selectedDates.filter(d => d !== day));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-purple-400 tracking-widest mb-6">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>

          <h2 className="text-3xl text-gray-900 mb-4">
            Pinpoint Your Most Fertile Days
          </h2>
          <p className="text-gray-600 px-4 leading-relaxed">
            Knowing this date helps in planning for conception or understanding your cycle better.
          </p>
        </div>

        {/* Calendar */}
        <div className="mb-auto">
          {/* Month Selector */}
          <div className="flex items-center justify-between mb-6">
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl text-gray-900">October</h3>
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-8">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center text-gray-500 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => {
                const isSelected = selectedDates.includes(day);
                const isOvulation = day === ovulationDay;
                
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm transition-all duration-200 relative ${
                      isOvulation
                        ? 'bg-purple-400 text-white'
                        : isSelected
                        ? 'bg-pink-200/60 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                    {isOvulation && (
                      <Star className="w-4 h-4 absolute fill-white text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-6">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-300 text-white text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-sm mb-4"
          >
            Next
          </button>

          <button
            onClick={onSkip}
            className="w-full text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}