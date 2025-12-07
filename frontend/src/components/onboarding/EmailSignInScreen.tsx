import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react@0.487.0';
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

interface EmailSignInScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export function EmailSignInScreen({ onBack, onNext, onSignUp, onForgotPassword }: EmailSignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      alert('Sign in successful!');
      onNext();
    } else {
      alert('Please fill all fields');
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Continue with ${provider}`);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-2 flex items-center gap-2">
            Welcome Back <Sparkles className="w-6 h-6 text-yellow-400" />
          </h1>
          <p className="text-gray-600">
            Sign in to continue tracking your health journey.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-900 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-4 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-900 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="mb-6 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only peer"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                rememberMe 
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 border-pink-400' 
                  : 'bg-white border-gray-300'
              }`}>
                {rememberMe && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-gray-700">Remember me</span>
          </label>
          <button
            onClick={onForgotPassword}
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mb-4">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <button
            onClick={onSignUp}
            className="text-pink-500 hover:text-pink-600 transition-colors"
          >
            Sign up
          </button>
        </div>

        {/* Divider */}
        <div className="text-center text-gray-500 mb-6">
          or continue with
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-14 h-14 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center"
          >
            <GoogleLogo />
          </button>
          <button
            onClick={() => handleSocialLogin('Apple')}
            className="w-14 h-14 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center"
          >
            <AppleLogo />
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="w-14 h-14 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center"
          >
            <FacebookLogo />
          </button>
          <button
            onClick={() => handleSocialLogin('X')}
            className="w-14 h-14 rounded-full bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-center"
          >
            <XLogo />
          </button>
        </div>

        {/* Sign In Button */}
        <div className="mt-auto pb-8">
          <button
            onClick={handleSignIn}
            disabled={!email || !password}
            className={`w-full py-4 px-6 rounded-full transition-all duration-300 shadow-lg ${
              email && password
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}