import image_6ef1ddd1de4618a9d43c80d42ea305e9848fbf52 from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';
import image_c9e241a3fa1cc3d3cb93a457985667ea8e43a8c8 from 'figma:asset/c9e241a3fa1cc3d3cb93a457985667ea8e43a8c8.png';
import image_1220b64962bcd5a1383832e53b5beb7c82ac51ef from 'figma:asset/1220b64962bcd5a1383832e53b5beb7c82ac51ef.png';
import { ArrowLeft, Shield, Mail } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

// Apple Logo SVG Component
const AppleLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Facebook Logo SVG Component
const FacebookLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// X (Twitter) Logo SVG Component
const XLogo = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface SocialLoginScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function SocialLoginScreen({ onBack, onNext }: SocialLoginScreenProps) {
  const { signInWithOAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAppleLogin = async () => {
    // Temporarily disabled until OAuth is configured in Supabase
    alert('Social login coming soon! Please use email signup for now.');
    return;
  };

  const handleGoogleLogin = async () => {
    // Temporarily disabled until OAuth is configured in Supabase
    alert('Social login coming soon! Please use email signup for now.');
    return;
  };

  const handleFacebookLogin = async () => {
    // Temporarily disabled until OAuth is configured in Supabase
    alert('Social login coming soon! Please use email signup for now.');
    return;
  };

  const handleXLogin = async () => {
    // Temporarily disabled until OAuth is configured in Supabase
    alert('Social login coming soon! Please use email signup for now.');
    return;
  };

  const handleEmailLogin = () => {
    // Go to email signup - this works!
    onNext();
  };

  const handleLogin = () => {
    // For existing users - could navigate to email sign in
    alert('Login to existing account - Will navigate to sign in');
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-2 border-purple-500" />
        <div className="absolute top-40 right-10 w-40 h-40 rounded-full border-2 border-purple-500" />
        <div className="absolute bottom-40 left-20 w-36 h-36 rounded-full border-2 border-purple-500" />
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full border-2 border-purple-500" />
      </div>

      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-md mx-auto">
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
        </div>

        {/* MAUV Logo below slider */}
        <div className="flex justify-center mb-12">
          <img src={image_6ef1ddd1de4618a9d43c80d42ea305e9848fbf52} alt="MAUV Logo" className="h-24 w-auto" />
        </div>

        {/* Stats */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 tracking-widest mb-4">TRUSTED BY</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl">MILLIONS</h1>
            <Shield className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-sm text-gray-400 tracking-widest">Around the World</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-8">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm mb-4">
              {error}
            </div>
          )}
          
          <button
            onClick={handleAppleLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-white text-gray-900 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AppleLogo />
            <span>Continue with Apple</span>
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-purple-950/50 border border-purple-800/30 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-purple-950/70 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleFacebookLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-purple-950/50 border border-purple-800/30 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-purple-950/70 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <FacebookLogo />
            <span>Continue with Facebook</span>
          </button>

          <button
            onClick={handleXLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-purple-950/50 border border-purple-800/30 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-purple-950/70 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <XLogo />
            <span>Continue with X</span>
          </button>

          <button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-purple-950/50 border border-purple-800/30 text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-purple-950/70 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Mail className="w-5 h-5" />
            <span>Continue with Email</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <button
            onClick={handleLogin}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Have an account? <span className="text-white">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}