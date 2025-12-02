
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { createChatSession } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm Amara. How are you feeling today?",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    try {
      chatSessionRef.current = createChatSession();
    } catch (error) {
      console.error("Failed to init chat:", error);
    }
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({
        message: userMsg.text
      });

      let fullResponseText = '';
      const responseId = (Date.now() + 1).toString();
      
      // Add placeholder message for stream
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isTyping: true
      }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponseText += text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === responseId 
                ? { ...msg, text: fullResponseText, isTyping: false } 
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having a little trouble connecting right now. Can we try again in a moment?",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Custom Avatar Component for Amara (Pink Lotus Logo)
  const AmaraAvatar = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12"
    };
    
    const textSizes = {
      sm: "text-xs",
      md: "text-lg",
      lg: "text-xl"
    };

    return (
      <div className={`relative flex items-center justify-center bg-white rounded-full shadow-md border border-pink-100 overflow-hidden shrink-0 ${sizeClasses[size]}`}>
        {/* Custom Lotus SVG to match the logo shape */}
        <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-pink-300 absolute" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Center Petal */}
          <path d="M50 15 C50 15 65 35 65 55 C65 75 50 85 50 85 C50 85 35 75 35 55 C35 35 50 15 50 15 Z" />
          {/* Right Petal */}
          <path d="M65 55 C65 55 85 45 85 30 C85 20 75 20 70 25 C65 30 65 55 65 55 Z" transform="rotate(-5 65 55)" />
          {/* Left Petal */}
          <path d="M35 55 C35 55 15 45 15 30 C15 20 25 20 30 25 C35 30 35 55 35 55 Z" transform="rotate(5 35 55)" />
          {/* Bottom curve details */}
          <path d="M50 85 Q 70 95 80 85" strokeWidth="2" className="opacity-50" />
          <path d="M50 85 Q 30 95 20 85" strokeWidth="2" className="opacity-50" />
        </svg>
        <span className={`font-serif ${textSizes[size]} font-medium text-pink-500 relative z-10 pt-1`}>A</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-background-light dark:bg-background-dark animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-primary/10 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md z-10">
        <div className="relative">
          <AmaraAvatar size="lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-background-dark rounded-full shadow-sm"></div>
        </div>
        <div>
          <h2 className="font-bold text-text-light dark:text-text-dark text-lg">Amara AI</h2>
          <p className="text-xs text-text-light/60 dark:text-text-dark/60">Always here for you</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Model Avatar */}
            {msg.role === 'model' && (
              <AmaraAvatar size="sm" />
            )}

            <div
              className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-primary to-secondary-lavender text-white rounded-tr-sm'
                  : 'bg-white dark:bg-gray-800 text-text-light dark:text-text-dark border border-gray-100 dark:border-gray-700 rounded-tl-sm'
              }`}
            >
              {msg.text}
              {msg.isTyping && <span className="inline-block w-1 h-4 ml-1 align-middle bg-current opacity-50 animate-pulse">|</span>}
            </div>

            {/* User Avatar (Initials) */}
            {msg.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-secondary-lavender/30 border border-secondary-lavender/50 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                ME
              </div>
            )}
          </div>
        ))}
        
        {isTyping && !messages.some(m => m.isTyping) && (
          <div className="flex justify-start gap-3">
            <AmaraAvatar size="sm" />
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center h-10">
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background-light dark:bg-background-dark">
        <div className="relative flex items-end gap-2 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-lg shadow-primary/5 border border-primary/10">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask Amara anything..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 p-2.5 text-sm text-text-light dark:text-text-dark resize-none placeholder-gray-400"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-xl bg-primary text-white disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition-all hover:scale-105 active:scale-95 flex-shrink-0 shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined filled text-[20px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
