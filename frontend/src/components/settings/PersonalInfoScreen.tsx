import { ArrowLeft, ChevronDown, Calendar, Mail } from 'lucide-react@0.487.0';
import { useState } from 'react';
import exampleImage from 'figma:asset/58c8d0591d3df9daaf1a8b7008db4fa10088a8e7.png';

interface PersonalInfoScreenProps {
  onBack: () => void;
  onSave?: () => void;
}

export function PersonalInfoScreen({ onBack, onSave }: PersonalInfoScreenProps) {
  const [fullName, setFullName] = useState('Isabella Ainsley');
  const [email, setEmail] = useState('isabella.ainsley@yourdomain.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (646) 555-4099');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState('12-25-1995');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say', 'Other'];

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
          <h1 className="text-xl text-gray-900">Personal Info</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Profile Picture */}
      <div className="px-6 py-8 flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-100">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="px-6 pb-24 space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-16 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="relative">
          <label className="block text-gray-700 mb-2">Gender</label>
          <button
            onClick={() => setShowGenderDropdown(!showGenderDropdown)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between hover:border-pink-300 transition-colors"
          >
            <span className="text-gray-900">{gender}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showGenderDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showGenderDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-10 overflow-hidden">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setGender(option);
                    setShowGenderDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors ${
                    gender === option ? 'bg-pink-50 text-pink-500' : 'text-gray-900'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 mb-2">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="MM-DD-YYYY"
              className="w-full px-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 safe-area-bottom">
        <button
          onClick={onSave}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
