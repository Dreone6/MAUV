import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ImageEditor from './components/ImageEditor';
import CalendarView from './components/CalendarView';
import ChatInterface from './components/ChatInterface';
import TribalChat from './components/TribalChat';
import PartnerShare from './components/PartnerShare';
import FloatingSymbols from './components/FloatingSymbols';
import SplashScreen from './components/SplashScreen';
import OnboardingFlow from './components/OnboardingFlow';
import { checkOnboardingStatus } from './services/dataService';
import { Toaster } from './components/ui/sonner';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor' | 'calendar' | 'chat' | 'tribal' | 'partner'>('dashboard');

  React.useEffect(() => {
    checkOnboardingStatus().then(status => {
      setIsOnboarded(status);
    }).catch(() => {
      setIsOnboarded(false);
    });
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isOnboarded === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <p className="text-gray-600">Loading MAUV...</p>
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <BrowserRouter>
        <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
      </BrowserRouter>
    );
  }

  return (
    <div className="App min-h-screen bg-background-light dark:bg-background-dark relative overflow-hidden">
      <FloatingSymbols />
      
      <BrowserRouter>
        {currentView === 'dashboard' && <Dashboard onOpenEditor={() => setCurrentView('editor')} />}
        {currentView === 'editor' && <ImageEditor onClose={() => setCurrentView('dashboard')} />}
        {currentView === 'calendar' && <CalendarView onClose={() => setCurrentView('dashboard')} />}
        {currentView === 'chat' && <ChatInterface onClose={() => setCurrentView('dashboard')} />}
        {currentView === 'tribal' && <TribalChat onClose={() => setCurrentView('dashboard')} />}
        {currentView === 'partner' && <PartnerShare onClose={() => setCurrentView('dashboard')} />}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-around items-center">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`flex flex-col items-center space-y-1 transition-colors ${currentView === 'dashboard' ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="text-xs">Home</span>
              </button>
              <button 
                onClick={() => setCurrentView('calendar')}
                className={`flex flex-col items-center space-y-1 transition-colors ${currentView === 'calendar' ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="text-xs">Calendar</span>
              </button>
              <button 
                onClick={() => setCurrentView('chat')}
                className={`flex flex-col items-center space-y-1 transition-colors ${currentView === 'chat' ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className="material-symbols-outlined">chat</span>
                <span className="text-xs">AMARA</span>
              </button>
              <button 
                onClick={() => setCurrentView('tribal')}
                className={`flex flex-col items-center space-y-1 transition-colors ${currentView === 'tribal' ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className="material-symbols-outlined">groups</span>
                <span className="text-xs">Tribal</span>
              </button>
            </div>
          </div>
        </nav>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
