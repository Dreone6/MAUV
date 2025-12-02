import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getCycleSettings, getAllSymptomLogs } from '../services/dataService';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [cycleSettings, setCycleSettings] = useState(null);
  const [symptomLogs, setSymptomLogs] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const settings = await getCycleSettings();
    setCycleSettings(settings);

    const logs = await getAllSymptomLogs();
    // Convert array to object keyed by date for easy lookup
    const logsMap = {};
    logs.forEach(log => {
      logsMap[log.date] = log;
    });
    setSymptomLogs(logsMap);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getDayType = (date) => {
    if (!cycleSettings || !cycleSettings.lastPeriodStart) {
      return { type: 'normal', color: 'bg-gray-100', label: '' };
    }

    const lastPeriod = new Date(cycleSettings.lastPeriodStart);
    const daysDiff = Math.floor((date - lastPeriod) / (1000 * 60 * 60 * 24));
    const cycleDay = ((daysDiff % cycleSettings.cycleLength) + cycleSettings.cycleLength) % cycleSettings.cycleLength;

    if (cycleDay >= 0 && cycleDay < cycleSettings.periodLength) {
      return { type: 'period', color: 'bg-red-400', label: 'Period' };
    } else if (cycleDay >= 10 && cycleDay <= 16) {
      return { type: 'fertile', color: 'bg-purple-300', label: 'Fertile' };
    } else if (cycleDay === 14) {
      return { type: 'ovulation', color: 'bg-purple-500', label: 'Ovulation' };
    }
    return { type: 'normal', color: 'bg-gray-100', label: '' };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const calendarDays = useMemo(() => {
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, [daysInMonth, startingDayOfWeek]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!cycleSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading calendar...</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {monthNames[month]} {year}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth} className="hover:bg-pink-50">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth} className="hover:bg-pink-50">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-400"></div>
            <span className="text-sm text-gray-600">Period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Ovulation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-300"></div>
            <span className="text-sm text-gray-600">Fertile Window</span>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const dayInfo = getDayType(date);
            const hasSymptoms = symptomLogs[dateStr];
            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all hover:scale-105 relative ${
                  dayInfo.color
                } ${
                  isToday ? 'ring-2 ring-pink-500 ring-offset-2' : ''
                } hover:shadow-md`}
              >
                <span>{day}</span>
                {hasSymptoms && (
                  <div className="absolute bottom-1 flex space-x-0.5">
                    {hasSymptoms.mood && <div className="w-1 h-1 rounded-full bg-yellow-600"></div>}
                    {hasSymptoms.symptoms && hasSymptoms.symptoms.length > 0 && <div className="w-1 h-1 rounded-full bg-blue-600"></div>}
                    {hasSymptoms.flow && <div className="w-1 h-1 rounded-full bg-red-600"></div>}
                  </div>
                )}
                {dayInfo.type === 'ovulation' && (
                  <Circle className="w-3 h-3 text-white absolute top-1 fill-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-pink-500 text-white">{getDayType(selectedDate).label || 'Normal Day'}</Badge>
              {symptomLogs[selectedDate.toISOString().split('T')[0]] && (
                <>
                  {symptomLogs[selectedDate.toISOString().split('T')[0]].mood && (
                    <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                      Mood: {symptomLogs[selectedDate.toISOString().split('T')[0]].mood}
                    </Badge>
                  )}
                  {symptomLogs[selectedDate.toISOString().split('T')[0]].flow && (
                    <Badge variant="outline" className="border-red-400 text-red-700">
                      Flow: {symptomLogs[selectedDate.toISOString().split('T')[0]].flow}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarView;
