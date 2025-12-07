import { X, Check, MessageSquare, UserCheck, Users, Lock } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface MessagePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPermission: string;
  onSave: (permission: string) => void;
}

export function MessagePermissionsModal({ isOpen, onClose, currentPermission, onSave }: MessagePermissionsModalProps) {
  const [selectedPermission, setSelectedPermission] = useState(currentPermission);

  if (!isOpen) return null;

  const permissions = [
    {
      id: 'full-access',
      name: 'Full Access',
      description: 'Anyone in Tribal Chat can message you',
      icon: MessageSquare,
      color: 'from-green-400 to-green-500',
    },
    {
      id: 'friends-only',
      name: 'Friends Only',
      description: 'Only accepted connections can message',
      icon: UserCheck,
      color: 'from-blue-400 to-blue-500',
    },
    {
      id: 'verified-only',
      name: 'Verified Users',
      description: 'Only verified members can reach out',
      icon: Users,
      color: 'from-purple-400 to-purple-500',
    },
    {
      id: 'no-messages',
      name: 'No Messages',
      description: 'Disable all direct messages',
      icon: Lock,
      color: 'from-gray-400 to-gray-500',
    },
  ];

  const handleSave = () => {
    onSave(selectedPermission);
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
            <h2 className="text-2xl text-gray-800">Message Permissions</h2>
            <p className="text-sm text-gray-500">Control who can message you</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Permission Options */}
        <div className="space-y-3 mb-6">
          {permissions.map((perm) => {
            const Icon = perm.icon;
            const isSelected = selectedPermission === perm.id;
            
            return (
              <button
                key={perm.id}
                onClick={() => setSelectedPermission(perm.id)}
                className={`w-full p-4 rounded-2xl transition-all border-2 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${perm.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-800">{perm.name}</h3>
                    <p className="text-sm text-gray-500">{perm.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
