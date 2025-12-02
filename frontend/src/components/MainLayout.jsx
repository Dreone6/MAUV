import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Activity, User, Bell } from 'lucide-react';
import { Button } from './ui/button';
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';
import InsightsPage from '../pages/InsightsPage';
import ProfilePage from '../pages/ProfilePage';
import AmaraChat from './AmaraChat';
import OnboardingFlow from './OnboardingFlow';
import { checkOnboardingStatus } from '../services/dataService';

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAmaraChat, setShowAmaraChat] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(null); // null = checking, true/false = status

  useEffect(() => {
    // Check if user has completed onboarding
    checkOnboardingStatus().then(status => {
      setIsOnboarded(status);
    }).catch(err => {
      console.error('Error checking onboarding:', err);
      setIsOnboarded(false);
    });
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  // Show loading or onboarding
  if (isOnboarded === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center animate-pulse">
            <img src="/mauv_logo.png" alt="MAUV" className="w-10 h-10" />
          </div>
          <p className="text-gray-600">Loading MAUV...</p>
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'calendar':
        return <CalendarPage />;
      case 'insights':
        return <InsightsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/mauv_logo.png" alt="MAUV" className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                MAUV
              </h1>
              <p className="text-xs text-gray-600">Personal Tracker</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-purple-50"
              onClick={() => setShowAmaraChat(true)}
            >
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">AI</span>
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-pink-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {renderContent()}
      </main>

      {/* AMARA Chat Modal */}
      {showAmaraChat && (
        <AmaraChat onClose={() => setShowAmaraChat(false)} />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-100 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeTab === 'home' ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeTab === 'calendar' ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
              }`}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Calendar</span>
            </button>
            <button 
              onClick={() => setShowAmaraChat(true)}
              className="flex flex-col items-center space-y-1 text-purple-600 hover:text-purple-700 transition-colors relative"
            >
              <div className="relative">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></span>
              </div>
              <span className="text-xs font-medium">AMARA</span>
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeTab === 'insights' ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
              }`}
            >
              <Activity className="w-6 h-6" />
              <span className="text-xs">Insights</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeTab === 'profile' ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
