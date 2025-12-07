import { ArrowLeft } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/1220b64962bcd5a1383832e53b5beb7c82ac51ef.png';

interface HealthConditionsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function HealthConditionsScreen({ onBack, onNext }: HealthConditionsScreenProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const conditions = [
    // REPRODUCTIVE HEALTH
    { id: 'pcos', label: 'Polycystic ovary syndrome (PCOS)', category: 'reproductive' },
    { id: 'endometriosis', label: 'Endometriosis', category: 'reproductive' },
    { id: 'uterine-fibroids', label: 'Uterine fibroids', category: 'reproductive' },
    { id: 'ovarian-cysts', label: 'Ovarian cysts', category: 'reproductive' },
    { id: 'pid', label: 'Pelvic inflammatory disease (PID)', category: 'reproductive' },
    { id: 'pms', label: 'Premenstrual syndrome (PMS)', category: 'reproductive' },
    { id: 'pmdd', label: 'Premenstrual dysphoric disorder (PMDD)', category: 'reproductive' },
    
    // MENTAL HEALTH
    { id: 'anxiety', label: 'Anxiety', category: 'mental' },
    { id: 'depression', label: 'Depression', category: 'mental' },
    
    // PHYSICAL CONDITIONS
    { id: 'bipolar', label: 'Bipolar disorder', category: 'physical' },
    { id: 'eating-disorder', label: 'Eating disorder', category: 'physical' },
    
    // METABOLIC CONDITIONS
    { id: 'hyper-thyroid', label: 'Hyperthyroidism', category: 'metabolic' },
    { id: 'hypo-thyroid', label: 'Hypothyroidism', category: 'metabolic' },
    { id: 'diabetes-1', label: 'Diabetes (Type 1)', category: 'metabolic' },
    { id: 'diabetes-2', label: 'Diabetes (Type 2)', category: 'metabolic' },
    { id: 'celiac', label: 'Celiac disease', category: 'metabolic' },
    { id: 'ibd', label: 'Inflammatory bowel disease (IBD)', category: 'metabolic' },
    { id: 'ibs', label: "Irritable bowel syndrome (IBS)", category: 'metabolic' },
    { id: 'migraine', label: 'Migraine', category: 'metabolic' },
    { id: 'asthma', label: 'Asthma', category: 'metabolic' },
    { id: 'epilepsy', label: 'Epilepsy', category: 'metabolic' },
    { id: 'eczema', label: 'Eczema', category: 'metabolic' },
    { id: 'psoriasis', label: 'Psoriasis', category: 'metabolic' },
    { id: 'acne', label: 'Acne', category: 'metabolic' },
    
    // OTHER
    { id: 'other', label: 'Other condition', category: 'other' },
    { id: 'prefer-not', label: 'Prefer not to say/show', category: 'other' },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300 mb-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <h1 className="text-center text-xl mb-6">
            <img src={mauvLogo} alt="MAUV" className="h-8 mx-auto" />
          </h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <p className="text-center text-sm text-gray-400 tracking-widest mb-8">MAUV</p>

          <h2 className="text-2xl mb-4">
            Do you have any of these health conditions?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            This helps us provide better advice and personalized insights. We're all about privacy and your data will never be sold.
          </p>
        </div>

        {/* Scrollable Conditions List */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-2">
          {/* REPRODUCTIVE HEALTH */}
          <div className="mb-4">
            <h3 className="text-xs text-gray-500 tracking-wider mb-2">REPRODUCTIVE HEALTH</h3>
            {conditions.filter(c => c.category === 'reproductive').map(condition => (
              <button
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                className="w-full flex items-center justify-between py-4 px-1 border-b border-gray-800 hover:bg-purple-900/20 transition-colors"
              >
                <span className="text-white text-left">{condition.label}</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                    selectedConditions.includes(condition.id) ? 'bg-purple-400' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      selectedConditions.includes(condition.id) ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* MENTAL HEALTH */}
          <div className="mb-4">
            <h3 className="text-xs text-gray-500 tracking-wider mb-2">MENTAL HEALTH</h3>
            {conditions.filter(c => c.category === 'mental').map(condition => (
              <button
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                className="w-full flex items-center justify-between py-4 px-1 border-b border-gray-800 hover:bg-purple-900/20 transition-colors"
              >
                <span className="text-white text-left">{condition.label}</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                    selectedConditions.includes(condition.id) ? 'bg-purple-400' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      selectedConditions.includes(condition.id) ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* PHYSICAL CONDITIONS */}
          <div className="mb-4">
            <h3 className="text-xs text-gray-500 tracking-wider mb-2">PHYSICAL CONDITIONS</h3>
            {conditions.filter(c => c.category === 'physical').map(condition => (
              <button
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                className="w-full flex items-center justify-between py-4 px-1 border-b border-gray-800 hover:bg-purple-900/20 transition-colors"
              >
                <span className="text-white text-left">{condition.label}</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                    selectedConditions.includes(condition.id) ? 'bg-purple-400' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      selectedConditions.includes(condition.id) ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* METABOLIC CONDITIONS */}
          <div className="mb-4">
            <h3 className="text-xs text-gray-500 tracking-wider mb-2">METABOLIC CONDITIONS</h3>
            {conditions.filter(c => c.category === 'metabolic').map(condition => (
              <button
                key={condition.id}
                onClick={() => toggleCondition(condition.id)}
                className="w-full flex items-center justify-between py-4 px-1 border-b border-gray-800 hover:bg-purple-900/20 transition-colors"
              >
                <span className="text-white text-left">{condition.label}</span>
                <div
                  className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                    selectedConditions.includes(condition.id) ? 'bg-purple-400' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      selectedConditions.includes(condition.id) ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* OTHER */}
          {conditions.filter(c => c.category === 'other').map(condition => (
            <button
              key={condition.id}
              onClick={() => toggleCondition(condition.id)}
              className="w-full flex items-center justify-between py-4 px-1 border-b border-gray-800 hover:bg-purple-900/20 transition-colors"
            >
              <span className="text-white text-left">{condition.label}</span>
              <div
                className={`w-12 h-7 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                  selectedConditions.includes(condition.id) ? 'bg-purple-400' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                    selectedConditions.includes(condition.id) ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-purple-300 text-gray-900 text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}