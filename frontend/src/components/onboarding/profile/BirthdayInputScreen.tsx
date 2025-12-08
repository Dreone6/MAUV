import { ArrowLeft } from 'lucide-react@0.487.0';
import { useState, useRef, useEffect } from 'react';
import { useUser } from '../../../hooks/useUser';

interface BirthdayInputScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function BirthdayInputScreen({ onBack, onNext }: BirthdayInputScreenProps) {
  const currentYear = new Date().getFullYear();
  
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedYear, setSelectedYear] = useState(1990);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper function to check if a year is a leap year
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Get the number of days in a specific month and year
  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = months.indexOf(month);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (monthIndex === 1 && isLeapYear(year)) {
      return 29; // February in leap year
    }
    
    return daysInMonth[monthIndex];
  };

  // Generate days based on selected month and year
  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);
  
  // Generate years from 1910 to current year
  const years = Array.from({ length: currentYear - 1910 + 1 }, (_, i) => currentYear - i);

  // Adjust selected day if it's invalid for the new month/year
  useEffect(() => {
    const maxDays = getDaysInMonth(selectedMonth, selectedYear);
    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear, selectedDay]);

  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the selected values
    if (monthRef.current) {
      const monthIndex = months.indexOf(selectedMonth);
      monthRef.current.scrollTop = monthIndex * 80 - 112;
    }
    if (dayRef.current) {
      const dayIndex = days.indexOf(selectedDay);
      dayRef.current.scrollTop = dayIndex * 80 - 112;
    }
    if (yearRef.current) {
      const yearIndex = years.indexOf(selectedYear);
      yearRef.current.scrollTop = yearIndex * 80 - 112;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#2a1f3d] text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center mb-12 relative">
        <button
          onClick={onBack}
          className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl tracking-wider text-purple-300">MAUV</h1>
      </div>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Question */}
        <div className="mb-12">
          <h2 className="text-3xl">When is your birthday?</h2>
        </div>

        {/* Column Labels */}
        <div className="flex gap-4 mb-6 px-4">
          <div className="flex-1 text-center text-gray-400">Month</div>
          <div className="flex-1 text-center text-gray-400">Day</div>
          <div className="flex-1 text-center text-gray-400">Year</div>
        </div>

        {/* Interactive Wheel Picker */}
        <div className="relative mb-auto">
          {/* Top Gradient Fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2a1f3d] to-transparent pointer-events-none z-20" />
          
          {/* Selection Highlight Lines */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 pointer-events-none z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>
          
          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2a1f3d] to-transparent pointer-events-none z-20" />
          
          <div className="flex gap-4 h-64 overflow-hidden px-4">
            {/* Month Picker */}
            <div 
              ref={monthRef}
              className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-24">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`w-full h-16 flex items-center justify-center transition-all duration-200 ${
                      selectedMonth === month 
                        ? 'text-transparent bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text scale-105' 
                        : 'text-gray-600 hover:text-gray-500'
                    }`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <span className="text-2xl">
                      {String(months.indexOf(month) + 1).padStart(2, '0')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Day Picker */}
            <div 
              ref={dayRef}
              className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-24">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-full h-16 flex items-center justify-center transition-all duration-200 ${
                      selectedDay === day 
                        ? 'text-transparent bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text scale-105' 
                        : 'text-gray-600 hover:text-gray-500'
                    }`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <span className="text-2xl">
                      {day}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Year Picker */}
            <div 
              ref={yearRef}
              className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="py-24">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`w-full h-16 flex items-center justify-center transition-all duration-200 ${
                      selectedYear === year 
                        ? 'text-transparent bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text scale-105' 
                        : 'text-gray-600 hover:text-gray-500'
                    }`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <span className="text-2xl">
                      {year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8 mt-8">
          {/* Next Button */}
          <button
            onClick={onNext}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}