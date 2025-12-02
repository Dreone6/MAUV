import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AmaraChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'amara',
      text: "Hey bestie! I'm AMARA, your personal wellness companion. I'm here to support you with info about your cycle, answer health questions, and just be your supportive friend through it all! ✨\n\nWhat's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session-${Date.now()}`);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat/amara`, {
        message: input,
        session_id: sessionId
      });

      const amaraMessage = {
        id: (Date.now() + 1).toString(),
        type: 'amara',
        text: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, amaraMessage]);
    } catch (error) {
      console.error('Error chatting with AMARA:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'amara',
        text: "Oops! Something went wrong on my end. Can you try that again? 🙊",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] border-0 shadow-2xl flex flex-col bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30">
        <CardHeader className="border-b border-pink-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-purple-400">
                <AvatarImage src="/amara_logo.png" alt="AMARA" />
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">AM</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  AMARA
                </CardTitle>
                <p className="text-xs text-gray-600">Your Wellness Companion</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {message.type === 'amara' && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src="/amara_logo.png" alt="AMARA" />
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-xs">AM</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-white shadow-md border border-pink-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-pink-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-white rounded-2xl p-3 shadow-md border border-pink-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="border-t border-pink-100 p-4 flex-shrink-0">
          <div className="flex space-x-2 mb-2">
            <Textarea
              placeholder="Ask me anything about your health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-12 max-h-24 resize-none border-pink-200 focus:border-pink-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 mb-1">
            <p className="text-[10px] text-gray-600 text-center">
              \ud83d\udc9c AMARA is an AI companion, not a medical professional. For medical concerns, please consult a healthcare provider.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Your privacy matters: AMARA only receives summarized, anonymized context
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AmaraChat;
