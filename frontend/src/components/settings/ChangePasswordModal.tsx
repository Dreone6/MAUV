import { X, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (oldPassword: string, newPassword: string) => void;
}

export function ChangePasswordModal({ isOpen, onClose, onSave }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const passwordRequirements = [
    { id: 'length', text: 'At least 8 characters', met: newPassword.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
    { id: 'lowercase', text: 'One lowercase letter', met: /[a-z]/.test(newPassword) },
    { id: 'number', text: 'One number', met: /\d/.test(newPassword) },
    { id: 'special', text: 'One special character', met: /[!@#$%^&*]/.test(newPassword) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!allRequirementsMet) {
      newErrors.newPassword = 'Password does not meet requirements';
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (oldPassword === newPassword && oldPassword) {
      newErrors.newPassword = 'New password must be different';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(oldPassword, newPassword);
    setIsSaving(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-800">Change Password</h2>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Current Password</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowOld(!showOld)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">New Password</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="Enter new password"
              />
              <button
                onClick={() => setShowNew(!showNew)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Confirm New Password</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="Confirm new password"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Password Requirements */}
        {newPassword && (
          <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
            <h3 className="text-sm text-gray-700 mb-3">Password Requirements</h3>
            <div className="space-y-2">
              {passwordRequirements.map((req) => (
                <div key={req.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {req.met && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-xs ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !allRequirementsMet || !oldPassword || !confirmPassword}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Change Password
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
