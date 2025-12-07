import {
  ChevronLeft,
  Palette,
  Heart,
  Baby,
  Sunrise,
  Bell,
  Link2,
  ShieldCheck,
  User,
  Lock,
  Download,
  HelpCircle,
  MessageSquare,
  BookOpen,
  FileText,
  ShieldAlert,
  Trash2,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Users
} from 'lucide-react@0.487.0';
import { useState } from 'react';
import { FloatingBackground } from './shared/FloatingBackground';
import { BottomNav } from './shared/BottomNav';

interface SettingsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function Settings({ onBack, onNavigate }: SettingsProps) {
  const [selectedNav, setSelectedNav] = useState('settings');
  const [hasChanges, setHasChanges] = useState(false);
  
  // Settings state
  const [appTheme, setAppTheme] = useState('System');
  const [menstrualCycle, setMenstrualCycle] = useState(true);
  const [fertilityWindow, setFertilityWindow] = useState(true);
  const [menopauseTransition, setMenopauseTransition] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState('Daily');
  const [permissions, setPermissions] = useState('Full Access');
  const [exportFormat, setExportFormat] = useState('CSV');
  const [emailBeforeDelete, setEmailBeforeDelete] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (setter: (value: boolean) => void, currentValue: boolean) => {
    setter(!currentValue);
    setHasChanges(true);
  };

  const handleDropdownChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    setHasChanges(false);
    // Show success message or feedback
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // Perform actual deletion
      alert('Account deletion would happen here');
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Floating Background */}
      <FloatingBackground />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-20 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settings
            </h1>

            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-4 py-2 rounded-full transition-all shadow-sm ${
                hasChanges
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24 space-y-6">
        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center">
          Tailor your MAUV experience to your journey
        </p>

        {/* App Theme */}
        <div className="bg-white/90 rounded-3xl p-4 border border-purple-200/50 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-900">App Theme</div>
              </div>
            </div>
            <select
              value={appTheme}
              onChange={(e) => handleDropdownChange(setAppTheme, e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>

        {/* TRACKING OPTIONS */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Tracking Options
          </h3>
          <div className="bg-white/90 rounded-3xl border border-purple-200/50 shadow-md overflow-hidden">
            {/* Menstrual Cycle */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">Menstrual Cycle</div>
                    <div className="text-xs text-gray-500">Track your period and cycle phases</div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(setMenstrualCycle, menstrualCycle)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    menstrualCycle ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                      menstrualCycle ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Fertility Window */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Baby className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">Fertility Window</div>
                    <div className="text-xs text-gray-500">Monitor ovulation and fertile days</div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(setFertilityWindow, fertilityWindow)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    fertilityWindow ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                      fertilityWindow ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Menopause Transition */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sunrise className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">Menopause Transition</div>
                    <div className="text-xs text-gray-500">Adapt insights for perimenopause and menopause</div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(setMenopauseTransition, menopauseTransition)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    menopauseTransition ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                      menopauseTransition ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* REMINDERS */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Reminders
          </h3>
          <div className="bg-white/90 rounded-3xl p-4 border border-purple-200/50 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">Reminders for Logging</div>
                </div>
              </div>
              <select
                value={reminderFrequency}
                onChange={(e) => handleDropdownChange(setReminderFrequency, e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Daily</option>
                <option>Twice Daily</option>
                <option>Weekly</option>
                <option>Off</option>
              </select>
            </div>
          </div>
        </div>

        {/* INTEGRATIONS */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Integrations
          </h3>
          <div className="bg-white/90 rounded-3xl border border-purple-200/50 shadow-md overflow-hidden">
            {/* External Health Apps */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">External Health Apps</div>
                    <div className="text-xs text-gray-500">Connect to Apple Health, Fitbit, etc.</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* Manage Permissions */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">Manage Permissions</div>
                  </div>
                </div>
                <select
                  value={permissions}
                  onChange={(e) => handleDropdownChange(setPermissions, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Full Access</option>
                  <option>Limited Access</option>
                  <option>Read Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT MANAGEMENT */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Account Management
          </h3>
          <div className="bg-white/90 rounded-3xl border border-purple-200/50 shadow-md overflow-hidden">
            {/* Manage Profile */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">Manage Profile</div>
                    <div className="text-xs text-gray-500">Update your personal information</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* Change Password */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">Change Password</div>
                    <div className="text-xs text-gray-500">Ensure your account is secure</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* Export All Data */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">Export All Data</div>
                  </div>
                </div>
                <select
                  value={exportFormat}
                  onChange={(e) => handleDropdownChange(setExportFormat, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>CSV</option>
                  <option>JSON</option>
                  <option>PDF</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* HELP & SUPPORT */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Help & Support
          </h3>
          <div className="bg-white/90 rounded-3xl border border-purple-200/50 shadow-md overflow-hidden">
            {/* FAQs */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">FAQs</div>
                    <div className="text-xs text-gray-500">Find answers to common questions</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* Contact Support */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">Contact Support</div>
                    <div className="text-xs text-gray-500">Get help from our team</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* User Guide */}
            <button className="w-full p-4 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">User Guide</div>
                    <div className="text-xs text-gray-500">Learn how to use the app</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>
          </div>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 px-2">
            Legal
          </h3>
          <div className="bg-white/90 rounded-3xl border border-purple-200/50 shadow-md overflow-hidden">
            {/* Terms & Conditions */}
            <button className="w-full p-4 border-b border-gray-100 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">Terms & Conditions</div>
                    <div className="text-xs text-gray-500">Review our Terms of Service</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>

            {/* Privacy Policy */}
            <button className="w-full p-4 hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-900">Privacy Policy</div>
                    <div className="text-xs text-gray-500">How we keep your data safe</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>
          </div>
        </div>

        {/* SELF-DESTRUCT */}
        <div className="bg-red-50 rounded-3xl p-6 border border-red-200 shadow-md">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900 mb-1">Self-Destruct</div>
              <div className="text-xs text-gray-600 mb-3">Permanently delete all your data</div>
              <div className="text-xs text-red-600 leading-relaxed mb-4">
                This action is irreversible. All your tracked cycles, symptoms, and notes will be permanently erased.
              </div>
              
              {/* Checkbox */}
              <label className="flex items-start gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailBeforeDelete}
                  onChange={(e) => setEmailBeforeDelete(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-xs text-gray-700">
                  Email me a zipped archive of my data before deleting
                </span>
              </label>

              {/* Delete Button */}
              <button
                onClick={handleDeleteAccount}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
              >
                {showDeleteConfirm ? 'Confirm Deletion' : 'Delete My Data'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom spacing for nav */}
        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate}
        currentScreen="home-dashboard"
      />
    </div>
  );
}