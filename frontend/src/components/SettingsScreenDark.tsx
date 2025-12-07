import { useState } from 'react';
import { FloatingBackground } from './FloatingBackground';
import { BottomNav } from './BottomNav';
import { 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  Calendar as CalendarIcon, 
  Sunrise, 
  TrendingUp, 
  Bell, 
  Link2, 
  MessageSquare, 
  User, 
  Lock, 
  Download, 
  HelpCircle, 
  Mail, 
  BookOpen, 
  FileText, 
  Shield, 
  Trash2,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Users,
  AlertTriangle
} from 'lucide-react@0.487.0';
import { AmaraNavButton } from './AmaraNavButton';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function SettingsScreenDark({ onBack, onNavigate }: SettingsScreenProps) {
  const [selectedNav, setSelectedNav] = useState('settings');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Settings state
  const [theme, setTheme] = useState('system');
  const [menstrualCycle, setMenstrualCycle] = useState(true);
  const [fertilityWindow, setFertilityWindow] = useState(true);
  const [menopauseTransition, setMenopauseTransition] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [messagePermissions, setMessagePermissions] = useState('full-access');
  const [exportFormat, setExportFormat] = useState('csv');
  
  // Data deletion state
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [deleteConfirm1, setDeleteConfirm1] = useState(false);
  const [deleteConfirm2, setDeleteConfirm2] = useState(false);
  const [deleteConfirm3, setDeleteConfirm3] = useState(false);

  const handleSave = () => {
    // Save settings logic
    setHasUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const handleToggleChange = (setter: (value: boolean) => void, value: boolean) => {
    setter(value);
    setHasUnsavedChanges(true);
  };

  const handleDeleteData = () => {
    if (deleteConfirm1 && deleteConfirm2 && deleteConfirm3) {
      if (confirm('Are you absolutely sure? This action cannot be undone!')) {
        alert('Account deletion initiated. All data will be permanently deleted.');
      }
    } else {
      alert('Please confirm all checkboxes before deleting your data.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10 shadow-xl">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-700/80 hover:bg-gray-600/80 flex items-center justify-center transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Settings
            </h1>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 rounded-full text-sm transition-all shadow-md ${
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-700/80 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
          
          {/* Subtitle */}
          <p className="text-center text-xs text-gray-500 mt-2">
            Tailor your MAUV experience to your unique journey
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        {/* App Theme */}
        <div className="mb-6">
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">App Theme</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-400">System</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </button>
        </div>

        {/* PERIOD OPTIONS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Period Options</h4>
          
          {/* Menstrual Cycle */}
          <div className="bg-gray-800/80 rounded-3xl p-5 shadow-lg mb-3 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-pink-900/50 flex items-center justify-center border border-pink-700/50">
                  <CalendarIcon className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-200">Menstrual Cycle</h3>
                  <p className="text-xs text-gray-500">Start your period process</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleChange(setMenstrualCycle, !menstrualCycle)}
                className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
                  menstrualCycle ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    menstrualCycle ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Fertility Window */}
          <div className="bg-gray-800/80 rounded-3xl p-5 shadow-lg mb-3 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                  <Sunrise className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-200">Fertility Window</h3>
                  <p className="text-xs text-gray-500">See your fertile days</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleChange(setFertilityWindow, !fertilityWindow)}
                className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
                  fertilityWindow ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    fertilityWindow ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Menopause Transition */}
          <div className="bg-gray-800/80 rounded-3xl p-5 shadow-lg border border-gray-700/50 opacity-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-orange-900/50 flex items-center justify-center border border-orange-700/50">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-200">Menopause Transition</h3>
                  <p className="text-xs text-gray-500">Life's a journey</p>
                </div>
              </div>
              <button
                disabled
                className="relative w-12 h-7 rounded-full bg-gray-700 cursor-not-allowed shadow-inner"
              >
                <div className="absolute top-1 left-1 w-5 h-5 bg-gray-600 rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* REMINDERS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Reminders</h4>
          
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Reminders for Logging</h3>
                <p className="text-xs text-gray-500">Daily nudges to track</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-400">Daily</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </button>
        </div>

        {/* INTEGRATIONS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Integrations</h4>
          
          {/* External Health Apps */}
          <button 
            onClick={() => onNavigate?.('device-integrations')}
            className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center border border-green-700/50">
                <Link2 className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">External Health Apps</h3>
                <p className="text-xs text-gray-500">Link to other health apps</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Message Permissions */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Message Permissions</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-400">Full Access</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </button>
        </div>

        {/* ACCOUNT MANAGEMENT */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Account Management</h4>
          
          {/* Manage Profile */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Manage Profile</h3>
                <p className="text-xs text-gray-500">Update your information</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Change Password */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700/80 flex items-center justify-center border border-gray-600/50">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Change Password</h3>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Export All Data */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50">
                <Download className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Export All Data</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-400">CSV</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </button>
        </div>

        {/* HELP & SUPPORT */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Help & Support</h4>
          
          {/* FAQs */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">FAQs</h3>
                <p className="text-xs text-gray-500">Get answers to common questions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Contact Support */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-900/50 flex items-center justify-center border border-pink-700/50">
                <Mail className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Contact Support</h3>
                <p className="text-xs text-gray-500">Need help? Reach out</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* User Guide */}
          <button className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">User Guide</h3>
                <p className="text-xs text-gray-500">Learn how to use the app</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* LEGAL */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Legal</h4>
          
          {/* Terms & Conditions */}
          <button 
            onClick={() => onNavigate?.('terms-of-service')}
            className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-700/50">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Terms & Conditions</h3>
                <p className="text-xs text-gray-500">Read the legal stuff</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>

          {/* Privacy Policy */}
          <button 
            onClick={() => onNavigate?.('privacy-policy')}
            className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-700/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-700/50">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-200">Privacy Policy</h3>
                <p className="text-xs text-gray-500">How we handle your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* DATA DELETION */}
        <div className="mb-6">
          {/* Self Destruct Button */}
          <button 
            onClick={() => setShowDeleteSection(!showDeleteSection)}
            className="w-full bg-gray-800/80 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all border border-red-900/50 flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center border border-red-700/50">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <h3 className="text-red-400">Self Destruct</h3>
                <p className="text-xs text-gray-500">Delete all of your data</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${showDeleteSection ? 'rotate-90' : ''}`} />
          </button>

          {/* Delete Section (Expandable) */}
          {showDeleteSection && (
            <div className="bg-red-900/20 rounded-3xl p-6 shadow-lg border border-red-700/50">
              <div className="flex items-start gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 leading-relaxed">
                  This action is irreversible. All your tracked cycles, symptoms, notes, and personal data will be permanently deleted.
                </p>
              </div>

              {/* Confirmation Checkboxes */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirm1}
                    onChange={(e) => setDeleteConfirm1(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500 bg-gray-700"
                  />
                  <span className="text-sm text-gray-300">
                    I understand this will delete all my cycle data
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirm2}
                    onChange={(e) => setDeleteConfirm2(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500 bg-gray-700"
                  />
                  <span className="text-sm text-gray-300">
                    Email me a backup at the end of the data-before deleting
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirm3}
                    onChange={(e) => setDeleteConfirm3(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500 bg-gray-700"
                  />
                  <span className="text-sm text-gray-300">
                    I'm sure - proceed with account deletion
                  </span>
                </label>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleDeleteData}
                disabled={!deleteConfirm1 || !deleteConfirm2 || !deleteConfirm3}
                className={`w-full py-4 rounded-2xl text-white transition-all shadow-lg ${
                  deleteConfirm1 && deleteConfirm2 && deleteConfirm3
                    ? 'bg-red-600 hover:bg-red-700 hover:shadow-xl'
                    : 'bg-gray-700 cursor-not-allowed'
                }`}
              >
                Delete My Data
              </button>
            </div>
          )}
        </div>

        {/* Bottom Padding */}
        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate || (() => {})}
        currentScreen="home-dashboard"
        darkMode={true}
      />
    </div>
  );
}