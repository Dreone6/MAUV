import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarView from '../components/CalendarView';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Cycle Calendar
        </h1>
        <p className="text-gray-600">Track your periods, ovulation, and symptoms</p>
      </div>

      {/* Calendar */}
      <CalendarView />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Current Phase</p>
            <p className="text-2xl font-bold text-pink-600">Luteal</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Cycle Day</p>
            <p className="text-2xl font-bold text-purple-600">Day 27</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
