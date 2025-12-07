import { LayoutDashboard, Calendar, MessageCircle, Users, Send, Settings } from 'lucide-react@0.487.0';
import { useState } from 'react';
import { FloatingBackground } from '../shared/FloatingBackground';
import { BottomNav } from '../shared/BottomNav';
import { AmaraAvatar } from '../shared/AmaraAvatar';
import amaraLogo from "figma:asset/amara-logo.png";

interface AmaraAIChatProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function AmaraAIChat({ onBack, onNavigate }: AmaraAIChatProps) {
  const [selectedNav, setSelectedNav] = useState('amara');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'amara' as const,
      text: 'Hi! I\'m Amara. How are you feeling today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate Amara response after a delay
    setTimeout(() => {
      const amaraResponse = {
        id: messages.length + 2,
        type: 'amara' as const,
        text: getAmaraResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, amaraResponse]);
    }, 1000);
  };

  const getAmaraResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('period') || input.includes('menstruation')) {
      return 'Based on your cycle data, your next period is expected in about 14 days. I\'ll send you a reminder a few days before! Would you like to track any symptoms today?';
    } else if (input.includes('ovulation') || input.includes('fertile')) {
      return 'You\'re currently in your ovulation phase (Day 14)! This is your most fertile window. Your body might feel more energetic and you may notice changes in your discharge. Stay hydrated! 💧';
    } else if (input.includes('symptom') || input.includes('pain') || input.includes('cramp')) {
      return 'I\'m here to help you track that. Would you like to log your symptoms now? I can help identify patterns over time to better understand your cycle.';
    } else if (input.includes('mood') || input.includes('feeling')) {
      return 'Your emotional well-being matters! Hormonal changes during your cycle can affect mood. Based on your data, you typically feel most positive during days 8-14. How are you feeling right now?';
    } else if (input.includes('sleep') || input.includes('tired') || input.includes('fatigue')) {
      return 'Sleep is crucial for hormone regulation! Your data shows you average 7.5 hours. During the luteal phase, you might need more rest. Try maintaining a consistent sleep schedule. 💤';
    } else if (input.includes('exercise') || input.includes('workout')) {
      return 'Great question! During ovulation (like today), your energy levels are typically higher - perfect for high-intensity workouts! During menstruation, gentle yoga or walking might feel better. Listen to your body! 💪';
    } else if (input.includes('thank') || input.includes('thanks')) {
      return 'You\'re so welcome! I\'m always here to support your health journey. Feel free to ask me anything, anytime! 💜';
    } else if (input.includes('help') || input.includes('how')) {
      return 'I can help you with:\n• Tracking your cycle and symptoms\n• Understanding your fertility window\n• Predicting your next period\n• Identifying patterns in your health data\n• Providing personalized wellness tips\n\nWhat would you like to know more about?';
    }
    
    return 'I\'m here to support your health journey! I can help you understand your cycle, track symptoms, and provide personalized insights. What would you like to know?';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex flex-col">
      {/* Floating Background */}
      <FloatingBackground />
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-md">
              <span>O</span>
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MAUV - Amara AI Assistant
            </h1>

            {/* Settings Button */}
            <button 
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Amara Profile Header */}
      <div className="bg-white/70 border-b border-purple-200/30 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <AmaraAvatar />
            <div>
              <h2 className="text-gray-800">Amara AI</h2>
              <p className="text-sm text-gray-500">Always here for you</p>
            </div>
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-6 py-6 overflow-y-auto pb-32">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {message.type === 'amara' && (
                  <AmaraAvatar size="small" />
                )}

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-md ${
                    message.type === 'amara'
                      ? 'bg-white/90 text-gray-800 rounded-tl-sm'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'amara' ? 'text-gray-400' : 'text-purple-100'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-200/50 shadow-lg">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Amara anything..."
              className="flex-1 bg-gray-100 rounded-full px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="amara-chat"
      />
    </div>
  );
}