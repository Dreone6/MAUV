import { X, User, Mail, Calendar, Save, Camera } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ManageProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: ProfileData) => void;
}

interface ProfileData {
  name: string;
  email: string;
  dateOfBirth: string;
  cycleLength: string;
  periodLength: string;
}

export function ManageProfileModal({ isOpen, onClose, onSave }: ManageProfileModalProps) {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Olivia',
    email: 'olivia@example.com',
    dateOfBirth: '1995-06-15',
    cycleLength: '28',
    periodLength: '5',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<ProfileData>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profile.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    
    const cycleLen = parseInt(profile.cycleLength);
    if (cycleLen < 21 || cycleLen > 45) {
      newErrors.cycleLength = 'Cycle length should be 21-45 days';
    }
    
    const periodLen = parseInt(profile.periodLength);
    if (periodLen < 2 || periodLen > 10) {
      newErrors.periodLength = 'Period length should be 2-10 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(profile);
    setIsSaving(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-800">Manage Profile</h2>
            <p className="text-sm text-gray-500">Update your personal information</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg">
              <span className="text-3xl">O</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-purple-200 hover:bg-purple-50 transition-colors">
              <Camera className="w-4 h-4 text-purple-600" />
            </button>
          </div>
          <button className="mt-3 text-sm text-purple-600 hover:text-purple-700">
            Change Avatar
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Full Name</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="Enter your name"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email Address</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Date of Birth</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Cycle Information */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h3 className="text-sm text-gray-700 mb-3">Cycle Information</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Average Cycle Length */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">Cycle Length (days)</label>
                <input
                  type="number"
                  min="21"
                  max="45"
                  value={profile.cycleLength}
                  onChange={(e) => setProfile({ ...profile, cycleLength: e.target.value })}
                  className="w-full p-2 bg-white rounded-lg border border-gray-200 outline-none text-gray-800 text-center"
                />
                {errors.cycleLength && <p className="text-xs text-red-500 mt-1">{errors.cycleLength}</p>}
              </div>

              {/* Average Period Length */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">Period Length (days)</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={profile.periodLength}
                  onChange={(e) => setProfile({ ...profile, periodLength: e.target.value })}
                  className="w-full p-2 bg-white rounded-lg border border-gray-200 outline-none text-gray-800 text-center"
                />
                {errors.periodLength && <p className="text-xs text-red-500 mt-1">{errors.periodLength}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
