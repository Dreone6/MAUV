import { X, Download, FileText, FileJson, Database, Calendar, Check } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, dataTypes: string[]) => void;
}

export function ExportDataModal({ isOpen, onClose, onExport }: ExportDataModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(['cycles', 'symptoms', 'notes']);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const formats = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Spreadsheet format (Excel, Google Sheets)',
      icon: FileText,
      color: 'from-green-400 to-green-500',
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Raw data format for developers',
      icon: FileJson,
      color: 'from-blue-400 to-blue-500',
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Printable document with charts',
      icon: FileText,
      color: 'from-red-400 to-red-500',
    },
  ];

  const dataTypes = [
    { id: 'cycles', name: 'Cycle Data', description: 'Period dates and cycle length' },
    { id: 'symptoms', name: 'Symptoms & Moods', description: 'All logged symptoms and moods' },
    { id: 'notes', name: 'Personal Notes', description: 'Your daily notes and observations' },
    { id: 'tests', name: 'Test Results', description: 'Pregnancy and ovulation tests' },
    { id: 'vitals', name: 'Vital Signs', description: 'Temperature, weight, water intake' },
    { id: 'activities', name: 'Activities', description: 'Exercise, sex, contraception' },
  ];

  const toggleDataType = (id: string) => {
    setSelectedDataTypes(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onExport(selectedFormat, selectedDataTypes);
    setIsExporting(false);
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
            <h2 className="text-2xl text-gray-800">Export Your Data</h2>
            <p className="text-sm text-gray-500">Download your health data</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 mb-3">Export Format</h3>
          <div className="space-y-2">
            {formats.map((format) => {
              const Icon = format.icon;
              const isSelected = selectedFormat === format.id;
              
              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full p-3 rounded-xl transition-all border ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${format.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800">{format.name}</p>
                      <p className="text-xs text-gray-500">{format.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Type Selection */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 mb-3">Select Data to Export</h3>
          <div className="space-y-2">
            {dataTypes.map((type) => {
              const isSelected = selectedDataTypes.includes(type.id);
              
              return (
                <button
                  key={type.id}
                  onClick={() => toggleDataType(type.id)}
                  className={`w-full p-3 rounded-xl transition-all border ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800 text-sm">{type.name}</p>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex gap-3">
            <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                Your data will be downloaded to your device. This may take a few moments.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || selectedDataTypes.length === 0}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
