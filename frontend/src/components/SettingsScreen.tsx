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
import { ThemeSelectorModal } from './settings/ThemeSelectorModal';
import { ReminderSettingsModal } from './settings/ReminderSettingsModal';
import { MessagePermissionsModal } from './settings/MessagePermissionsModal';
import { ExportDataModal } from './settings/ExportDataModal';
import { ManageProfileModal } from './settings/ManageProfileModal';
import { ChangePasswordModal } from './settings/ChangePasswordModal';
import { ContactSupportModal } from './settings/ContactSupportModal';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  const [selectedNav, setSelectedNav] = useState('settings');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Settings state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menstrualCycle, setMenstrualCycle] = useState(true);
  const [fertilityWindow, setFertilityWindow] = useState(true);
  const [menopauseTransition, setMenopauseTransition] = useState(false);
  const [reminders, setReminders] = useState<any[]>([]);
  const [messagePermissions, setMessagePermissions] = useState('full-access');
  const [exportFormat, setExportFormat] = useState('csv');
  
  // Modal states
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Data deletion state
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [deleteConfirm1, setDeleteConfirm1] = useState(false);
  const [deleteConfirm2, setDeleteConfirm2] = useState(false);
  const [deleteConfirm3, setDeleteConfirm3] = useState(false);

  const handleSave = () => {
    // Save settings logic
    setHasUnsavedChanges(false);
    toast.success('Settings saved successfully!');
  };

  const handleToggleChange = (setter: (value: boolean) => void, value: boolean) => {
    setter(value);
    setHasUnsavedChanges(true);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    setHasUnsavedChanges(true);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleReminderSave = (remindersList: any[]) => {
    setReminders(remindersList);
    setHasUnsavedChanges(true);
    const enabledCount = remindersList.filter(r => r.enabled).length;
    toast.success(`${enabledCount} reminder${enabledCount !== 1 ? 's' : ''} enabled!`);
  };

  const handleMessagePermissionSave = (permission: string) => {
    setMessagePermissions(permission);
    setHasUnsavedChanges(true);
    toast.success('Message permissions updated!');
  };

  const handleExport = (format: string, dataTypes: string[]) => {
    // Simulate data export
    toast.success(`Exporting ${dataTypes.length} data types as ${format.toUpperCase()}...`);
    
    // Create a mock download
    setTimeout(() => {
      const blob = new Blob(['Mock exported data'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mauv-data-export.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully!');
    }, 2000);
  };

  const handleProfileSave = (profile: any) => {
    setHasUnsavedChanges(true);
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    // Simulate password change
    toast.success('Password changed successfully!');
  };

  const handleDeleteData = () => {
    if (deleteConfirm1 && deleteConfirm2 && deleteConfirm3) {
      if (confirm('Are you absolutely sure? This action cannot be undone!')) {
        toast.error('Account deletion initiated. All data will be permanently deleted.');
        setTimeout(() => {
          // Redirect to logout or landing page
          onBack();
        }, 2000);
      }
    } else {
      toast.error('Please confirm all checkboxes before deleting your data.');
    }
  };

  const getMessagePermissionLabel = () => {
    const labels: { [key: string]: string } = {
      'full-access': 'Full Access',
      'friends-only': 'Friends Only',
      'verified-only': 'Verified Users',
      'no-messages': 'No Messages',
    };
    return labels[messagePermissions] || 'Full Access';
  };

  const getReminderLabel = () => {
    const labels: { [key: string]: string } = {
      'off': 'Off',
      'daily': 'Daily',
      'twice-daily': 'Twice Daily',
      'weekly': 'Weekly',
      'custom': 'Custom',
    };
    return labels[reminderFrequency] || 'Daily';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Title */}
            <h1 className="text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settings
            </h1>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 rounded-full text-sm transition-all shadow-sm ${
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
          
          {/* Subtitle */}
          <p className="text-center text-xs text-gray-400 mt-2">
            Tailor your MAUV experience to your unique journey
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 pb-24">
        {/* App Theme */}
        <div className="mb-6">
          <button 
            onClick={() => setShowThemeModal(true)}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">App Theme</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-600 capitalize">{theme}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        </div>

        {/* PERIOD OPTIONS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Period Options</h4>
          
          {/* Menstrual Cycle */}
          <div className="bg-white/90 rounded-3xl p-5 shadow-md mb-3 border border-purple-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-800">Menstrual Cycle</h3>
                  <p className="text-xs text-gray-400">Start your period process</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleChange(setMenstrualCycle, !menstrualCycle)}
                className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
                  menstrualCycle ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
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
          <div className="bg-white/90 rounded-3xl p-5 shadow-md mb-3 border border-purple-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Sunrise className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-800">Fertility Window</h3>
                  <p className="text-xs text-gray-400">See your fertile days</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleChange(setFertilityWindow, !fertilityWindow)}
                className={`relative w-12 h-7 rounded-full transition-colors shadow-inner ${
                  fertilityWindow ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
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
          <div className="bg-white/90 rounded-3xl p-5 shadow-md border border-purple-100/50 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-800">Menopause Transition</h3>
                  <p className="text-xs text-gray-400">Life's a journey</p>
                </div>
              </div>
              <button
                disabled
                className="relative w-12 h-7 rounded-full bg-gray-200 cursor-not-allowed shadow-inner"
              >
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* REMINDERS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Reminders</h4>
          
          <button 
            onClick={() => setShowReminderModal(true)}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Reminders for Logging</h3>
                <p className="text-xs text-gray-400">
                  {reminders.filter(r => r.enabled).length} active
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* INTEGRATIONS */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Integrations</h4>
          
          {/* External Health Apps */}
          <button 
            onClick={() => onNavigate?.('device-integrations')}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">External Health Apps</h3>
                <p className="text-xs text-gray-400">Link to other health apps</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Message Permissions */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Message Permissions</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-600">Full Access</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        </div>

        {/* ACCOUNT MANAGEMENT */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Account Management</h4>
          
          {/* Manage Profile */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Manage Profile</h3>
                <p className="text-xs text-gray-400">Update your information</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Change Password */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Change Password</h3>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Export All Data */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Download className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Export All Data</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-600">CSV</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        </div>

        {/* HELP & SUPPORT */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Help & Support</h4>
          
          {/* FAQs */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">FAQs</h3>
                <p className="text-xs text-gray-400">Get answers to common questions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Contact Support */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-pink-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Contact Support</h3>
                <p className="text-xs text-gray-400">Need help? Reach out</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* User Guide */}
          <button className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">User Guide</h3>
                <p className="text-xs text-gray-400">Learn how to use the app</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* LEGAL */}
        <div className="mb-6">
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-2">Legal</h4>
          
          {/* Terms & Conditions */}
          <button 
            onClick={() => onNavigate?.('terms-of-service')}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Terms & Conditions</h3>
                <p className="text-xs text-gray-400">Read the legal stuff</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Privacy Policy */}
          <button 
            onClick={() => onNavigate?.('privacy-policy')}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-purple-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-800">Privacy Policy</h3>
                <p className="text-xs text-gray-400">How we handle your data</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* DATA DELETION */}
        <div className="mb-6">
          {/* Self Destruct Button */}
          <button 
            onClick={() => setShowDeleteSection(!showDeleteSection)}
            className="w-full bg-white/90 rounded-3xl p-5 shadow-md hover:shadow-lg transition-all border border-red-200/50 flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="text-red-600">Self Destruct</h3>
                <p className="text-xs text-gray-400">Delete all of your data</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showDeleteSection ? 'rotate-90' : ''}`} />
          </button>

          {/* Delete Section (Expandable) */}
          {showDeleteSection && (
            <div className="bg-red-50/80 rounded-3xl p-6 shadow-md border border-red-200/50">
              <div className="flex items-start gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 leading-relaxed">
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
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">
                    I understand this will delete all my cycle data
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirm2}
                    onChange={(e) => setDeleteConfirm2(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">
                    Email me a backup at the end of the data-before deleting
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deleteConfirm3}
                    onChange={(e) => setDeleteConfirm3(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">
                    I'm sure - proceed with account deletion
                  </span>
                </label>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleDeleteData}
                disabled={!deleteConfirm1 || !deleteConfirm2 || !deleteConfirm3}
                className={`w-full py-4 rounded-2xl text-white transition-all shadow-md ${
                  deleteConfirm1 && deleteConfirm2 && deleteConfirm3
                    ? 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
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

      {/* Modals */}
      <ThemeSelectorModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        currentTheme={theme}
        onSelectTheme={handleThemeChange}
      />

      <ReminderSettingsModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        onSave={handleReminderSave}
        currentReminders={reminders}
      />

      <MessagePermissionsModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        currentPermission={messagePermissions}
        onSave={handleMessagePermissionSave}
      />

      <ExportDataModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />

      <ManageProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleProfileSave}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordChange}
      />

      <ContactSupportModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />

      {/* Bottom Navigation */}
      <BottomNav
        onNavigate={onNavigate || (() => {})}
        currentScreen="home-dashboard"
      />
    </div>
  );
}