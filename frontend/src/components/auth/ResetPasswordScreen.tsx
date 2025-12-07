import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ResetPasswordScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function ResetPasswordScreen({ onBack, onNext }: ResetPasswordScreenProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    alert('Password updated successfully!');
    onNext();
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-4 flex items-center gap-2">
            Secure Your Account <Lock className="w-6 h-6 text-gray-500" />
          </h1>
          <p className="text-gray-600">
            Enter a new password for your account. Ensure it&apos;s strong and unique for enhanced security.
          </p>
        </div>

        {/* Create New Password */}
        <div className="mb-6">
          <label className="block text-gray-900 mb-2">Create new password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
            />
            <button
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-auto">
          <label className="block text-gray-900 mb-2">Confirm new password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full py-4 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white transition-all"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pb-8">
          <button
            onClick={handleSavePassword}
            disabled={!newPassword || !confirmPassword}
            className={`w-full py-4 px-6 rounded-full transition-all duration-300 shadow-lg ${
              newPassword && confirmPassword
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:scale-105 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save New Password
          </button>
        </div>
      </div>
    </div>
  );
}
