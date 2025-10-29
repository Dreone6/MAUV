import React from 'react';
import { User, Bell, Lock, Mail, HelpCircle, Shield, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Switch } from '../components/ui/switch';
import { mockUser } from '../mockData';

const ProfilePage = () => {
  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              <AvatarImage src="" alt={mockUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white text-2xl">
                {mockUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{mockUser.name}</h2>
              <p className="text-gray-600">{mockUser.email}</p>
              <Button variant="outline" size="sm" className="mt-2 border-pink-300 text-pink-600 hover:bg-pink-50">
                Edit Profile
              </Button>
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
              <p className="text-sm text-gray-600">{mockUser.cycleLength} days</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Period Duration</p>
              <p className="text-sm text-gray-600">{mockUser.periodLength} days</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-pink-600" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Period Reminders</p>
              <p className="text-sm text-gray-600">Get notified before your period</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Fertile Window</p>
              <p className="text-sm text-gray-600">Notifications for ovulation</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Daily Health Tips</p>
              <p className="text-sm text-gray-600">Receive wellness reminders</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Biometric Login</span>
            </div>
            <Switch />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Export My Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6 space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Help Center</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Delete Account & Data</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>MAUV Personal Tracker v1.0.0</p>
        <p>Your data is stored locally and never shared</p>
      </div>
    </div>
  );
};

export default ProfilePage;
