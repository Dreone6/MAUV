import { X } from 'lucide-react@0.487.0';
import { useState, useEffect } from 'react';
import { LogDefinition, LogEntry } from '../types';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  definition: LogDefinition;
  existingLog?: LogEntry;
  onSave: (log: LogEntry) => void;
}

export function LogModal({ isOpen, onClose, definition, existingLog, onSave }: LogModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(existingLog?.selectedOptions || []);
  const [numericValue, setNumericValue] = useState<number>(existingLog?.numericValue || definition.min || 0);
  const [textValue, setTextValue] = useState<string>(existingLog?.textValue || '');

  useEffect(() => {
    if (isOpen) {
      setSelectedOptions(existingLog?.selectedOptions || []);
      setNumericValue(existingLog?.numericValue || definition.min || 0);
      setTextValue(existingLog?.textValue || '');
    }
  }, [isOpen, existingLog, definition.min]);

  if (!isOpen) return null;

  const toggleOption = (optionId: string) => {
    if (definition.type === 'single-select') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSave = () => {
    const log: LogEntry = {
      categoryId: definition.id,
      timestamp: new Date(),
    };

    if (definition.type === 'multi-select' || definition.type === 'single-select') {
      log.selectedOptions = selectedOptions;
    } else if (definition.type === 'numeric') {
      log.numericValue = numericValue;
    } else if (definition.type === 'text') {
      log.textValue = textValue;
    }

    onSave(log);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${definition.color} flex items-center justify-center text-white shadow-md`}>
              <span className="text-xl">{definition.icon}</span>
            </div>
            <h2 className="text-gray-900">{definition.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {(definition.type === 'multi-select' || definition.type === 'single-select') && (
            <div className="flex flex-wrap gap-2">
              {definition.options?.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 shadow-sm ${
                      isSelected
                        ? `${definition.color} text-white shadow-md scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {definition.type === 'numeric' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setNumericValue(Math.max((definition.min || 0), numericValue - (definition.step || 1)))}
                  className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors shadow-md"
                >
                  -
                </button>
                <div className="text-center">
                  <div className="text-4xl text-gray-900">{numericValue}</div>
                  {definition.unit && (
                    <div className="text-sm text-gray-500 mt-1">{definition.unit}</div>
                  )}
                </div>
                <button
                  onClick={() => setNumericValue(Math.min((definition.max || 999), numericValue + (definition.step || 1)))}
                  className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors shadow-md"
                >
                  +
                </button>
              </div>
              
              {/* Slider */}
              <input
                type="range"
                min={definition.min || 0}
                max={definition.max || 100}
                step={definition.step || 1}
                value={numericValue}
                onChange={(e) => setNumericValue(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}

          {definition.type === 'text' && (
            <div className="space-y-2">
              <textarea
                value={textValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue.length <= 250) {
                    setTextValue(newValue);
                  }
                }}
                maxLength={250}
                className="w-full h-32 bg-gray-50 rounded-2xl p-4 text-gray-900 resize-none border border-purple-200/50 focus:border-purple-400 focus:outline-none transition-colors"
                placeholder={definition.placeholder || 'Enter text here...'}
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{textValue.length}/250 characters</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={
              (definition.type === 'multi-select' || definition.type === 'single-select') && selectedOptions.length === 0
            }
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Log
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #a855f7, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #a855f7, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}