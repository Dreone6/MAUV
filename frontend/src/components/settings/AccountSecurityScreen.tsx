import { ArrowLeft, ChevronRight } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface AccountSecurityScreenProps {
  onBack: () => void;
  onNavigate: (screen: string, title: string) => void;
}

export function AccountSecurityScreen({ onBack, onNavigate }: AccountSecurityScreenProps) {
  const [biometricId, setBiometricId] = useState(false);
  const [faceId, setFaceId] = useState(false);
  const [smsAuth, setSmsAuth] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Account & Security</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Security Settings */}
      <div className="px-6 py-6 space-y-1">
        {/* Biometric ID */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Biometric ID</span>
          <button
            onClick={() => setBiometricId(!biometricId)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              biometricId ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                biometricId ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Face ID */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Face ID</span>
          <button
            onClick={() => setFaceId(!faceId)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              faceId ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                faceId ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* SMS Authenticator */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">SMS Authenticator</span>
          <button
            onClick={() => setSmsAuth(!smsAuth)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              smsAuth ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                smsAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Google Authenticator */}
        <div className="w-full flex items-center justify-between py-4 px-2">
          <span className="text-gray-900">Google Authenticator</span>
          <button
            onClick={() => setGoogleAuth(!googleAuth)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              googleAuth ? 'bg-gradient-to-r from-pink-400 to-pink-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                googleAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Change Password */}
        <button
          onClick={() => onNavigate('change-password', 'Change Password')}
          className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <span className="text-gray-900">Change Password</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* Device Management */}
        <button
          onClick={() => onNavigate('device-management', 'Device Management')}
          className="w-full py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Device Management</h3>
              <p className="text-gray-500 text-sm">
                Manage your account on the various devices you use
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>
        </button>

        {/* Deactivate Account */}
        <button
          onClick={() => onNavigate('deactivate-account', 'Deactivate Account')}
          className="w-full py-4 hover:bg-gray-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">Deactivate Account</h3>
              <p className="text-gray-500 text-sm">
                Temporarily deactivate your account and reactivate when you ready
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>
        </button>

        {/* Delete Account */}
        <button
          onClick={() => onNavigate('delete-account-warning', 'Delete Account')}
          className="w-full py-4 hover:bg-red-50 rounded-xl px-2 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-red-600 mb-1">Delete Account</h3>
              <p className="text-gray-500 text-sm">
                Permanently remove your account and data. Proceed with caution
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>
        </button>
      </div>
    </div>
  );
}
