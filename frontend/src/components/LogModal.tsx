
import React, { useState, useEffect } from 'react';
import { LogCategoryDefinition } from '../types';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: LogCategoryDefinition;
  initialValue: any;
  onSave: (categoryId: string, value: any) => void;
}

const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose, category, initialValue, onSave }) => {
  const [value, setValue] = useState<any>(initialValue);

  // Reset value when modal opens with new category or initialValue
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue || (category.type === 'selection' ? (category.multiSelect ? [] : null) : ''));
    }
  }, [isOpen, category, initialValue]);

  if (!isOpen) return null;

  const handleOptionToggle = (optionId: string) => {
    if (category.multiSelect) {
      setValue((prev: string[]) => {
        const current = Array.isArray(prev) ? prev : [];
        if (current.includes(optionId)) {
          return current.filter(id => id !== optionId);
        } else {
          return [...current, optionId];
        }
      });
    } else {
      setValue(value === optionId ? null : optionId);
    }
  };

  const handleSave = () => {
    onSave(category.id, value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full sm:max-w-sm bg-white dark:bg-background-dark rounded-t-2xl sm:rounded-2xl shadow-xl p-6 border-t sm:border border-primary/20 scale-100 animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-full bg-opacity-10 ${category.colorClass.replace('text-', 'bg-').split(' ')[0]}`}>
              <span className={`material-symbols-outlined ${category.colorClass} filled text-2xl`}>
                {category.icon}
              </span>
            </div>
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">{category.label}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          {category.type === 'selection' && category.options && (
            <div className="flex flex-wrap gap-2">
              {category.options.map((option) => {
                const isSelected = category.multiSelect 
                  ? (Array.isArray(value) && value.includes(option.label))
                  : value === option.label;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionToggle(option.label)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-background-light dark:bg-gray-800 text-text-light dark:text-text-dark border-transparent hover:border-primary/30'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {category.type === 'number' && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-full">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.0"
                  className="w-full text-center text-4xl font-bold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:outline-none py-2 text-text-light dark:text-text-dark placeholder-gray-300"
                  autoFocus
                />
                <span className="absolute right-0 bottom-4 text-sm font-medium text-gray-400">{category.unit}</span>
              </div>
            </div>
          )}

          {category.type === 'text' && (
            <div className="flex flex-col items-center justify-center py-2">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write your notes here..."
                className="w-full min-h-[150px] p-4 rounded-xl bg-background-light dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-text-light dark:text-text-dark resize-none"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3">
          {value && (
             <button 
                onClick={() => {
                   onSave(category.id, null);
                   onClose();
                }}
                className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
             >
                Clear
             </button>
          )}
          <button 
            onClick={handleSave}
            className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary-lavender text-white font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            Save Log
          </button>
        </div>

      </div>
    </div>
  );
};

export default LogModal;