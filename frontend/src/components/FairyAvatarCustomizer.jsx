import React, { useState } from 'react';
import { X, Sparkles, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import fairyData from '../data/fairyPresets.json';
import { saveProfile, getProfile } from '../services/dataService';
import { toast } from '../hooks/use-toast';

const FairyAvatarCustomizer = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('presets');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customization, setCustomization] = useState({
    skinTone: '',
    hairStyle: '',
    hairColor: '',
    eyeColor: '',
    wings: '',
    accessories: []
  });

  const handlePresetSelect = (fairy) => {
    setSelectedPreset(fairy);
    setCustomization(fairy.preset);
    setActiveTab('customize');
  };

  const handleCustomizationChange = (category, value) => {
    setCustomization(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const toggleAccessory = (accessory) => {
    setCustomization(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  };

  const handleSave = async () => {
    try {
      const profile = await getProfile();
      await saveProfile({
        ...profile,
        avatarId: selectedPreset?.id || 'custom',
        avatarConfig: customization
      });
      
      toast({
        title: "Fairy Avatar Saved!",
        description: `Your ${selectedPreset?.name || 'custom'} fairy is ready.`
      });
      
      if (onSave) onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save fairy avatar:', error);
      toast({
        title: "Error",
        description: "Failed to save your fairy avatar.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardHeader className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your MAUV Fairy
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Select a preset or customize your own unique fairy
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="presets">12 Presets</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>

            {/* Presets Tab */}
            <TabsContent value="presets" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fairyData.fairies.map((fairy) => (
                  <button
                    key={fairy.id}
                    onClick={() => handlePresetSelect(fairy)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedPreset?.id === fairy.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg ring-2 ring-purple-300'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br ${fairy.colorGradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {fairy.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-800">{fairy.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{fairy.heritage}</p>
                  </button>
                ))}
              </div>

              {selectedPreset && (
                <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedPreset.name}</h3>
                      <p className="text-sm text-gray-600">{selectedPreset.description}</p>
                    </div>
                    <Button
                      onClick={() => setActiveTab('customize')}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                    >
                      Customize <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Customize Tab - Will continue in next message due to length */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FairyAvatarCustomizer;
