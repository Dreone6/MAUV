import React, { useState, useEffect } from 'react';
import { User, Bell, Lock, Mail, HelpCircle, Shield, LogOut, ChevronRight, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '../hooks/use-toast';
import { 
  getProfile, 
  saveProfile,
  getCycleSettings, 
  saveCycleSettings,
  exportAllData,
  deleteAllData 
} from '../services/dataService';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [cycleSettings, setCycleSettings] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlias, setEditedAlias] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profileData = await getProfile();
    const settingsData = await getCycleSettings();
    setProfile(profileData);
    setCycleSettings(settingsData);
    setEditedAlias(profileData?.alias || '');
  };

  const handleSaveAlias = async () => {
    try {
      await saveProfile({ ...profile, alias: editedAlias });
      setProfile({ ...profile, alias: editedAlias });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your alias has been updated successfully."
      });
    } catch (error) {
      console.error('Failed to save alias:', error);
      toast({
        title: "Error",
        description: "Failed to update your alias.",
        variant: "destructive"
      });
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mauv-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: "Your data has been downloaded successfully."
      });
    } catch (error) {
      console.error('Failed to export data:', error);
      toast({
        title: "Error",
        description: "Failed to export your data.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAllData();
      toast({
        title: "Data Deleted",
        description: "All your data has been permanently deleted."
      });
      // Reload page to reset to onboarding
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete data:', error);
      toast({
        title: "Error",
        description: "Failed to delete your data.",
        variant: "destructive"
      });
    }
  };

  if (!profile || !cycleSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const avatarData = profile.avatarId ? 
    { id: profile.avatarId, image: `/avatars/${profile.avatarId}.jpg` } : 
    null;

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              {avatarData && <AvatarImage src={avatarData.image} alt={profile.alias} />}
              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl">
                {profile.alias.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">{profile.alias}</h2>
                  <p className="text-sm text-gray-600">Anonymous Identity</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Alias
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Input
                    value={editedAlias}
                    onChange={(e) => setEditedAlias(e.target.value)}
                    maxLength={20}
                    className="text-lg"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSaveAlias}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      setEditedAlias(profile.alias);
                      setIsEditing(false);
                    }}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cycle Settings */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Cycle Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Average Cycle Length</p>
              <p className="text-sm text-gray-600">{cycleSettings.cycleLength} days</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Period Duration</p>
              <p className="text-sm text-gray-600">{cycleSettings.periodLength} days</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          {cycleSettings.lastPeriodStart && (
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Last Period Start</p>
                <p className="text-sm text-gray-600">
                  {new Date(cycleSettings.lastPeriodStart).toLocaleDateString()}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Privacy & Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium">Export My Data</p>
                <p className="text-xs text-gray-600">Download all your data as JSON</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Delete All Data</p>
                  <p className="text-xs text-red-500">Permanently erase everything</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <p className="text-sm font-semibold text-red-800 mb-2">
                ⚠️ Are you absolutely sure?
              </p>
              <p className="text-xs text-red-700 mb-3">
                This will permanently delete all your data from this device. This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Yes, Delete Everything
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          🔒 <strong>Your Privacy:</strong> All your data is stored locally on your device. 
          MAUV never sends your personal health data to our servers. Only you have access to your information.
        </p>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>MAUV Personal Tracker v1.0.0</p>
        <p>Local-first • Privacy-first • Anonymous by design</p>
      </div>
    </div>
  );
};

export default ProfilePage;
