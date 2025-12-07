import { useState } from 'react';
import { ArrowLeft } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface TermsAgreementScreenProps {
  onNext: () => void;
  onBack: () => void;
  onViewTerms?: () => void;
  onViewPrivacy?: () => void;
}

export function TermsAgreementScreen({ onNext, onBack, onViewTerms, onViewPrivacy }: TermsAgreementScreenProps) {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    dataProcessing: false,
  });

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allAgreed = agreements.terms && agreements.privacy && agreements.dataProcessing;

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Progress Bar */}
            <div className="flex-1 flex gap-2 mx-6">
              <div className="w-16 h-1 rounded-full bg-purple-400" />
              <div className="flex-1 h-1 rounded-full bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <img src={mauvLogo} alt="MAUV Logo" className="w-24 h-24" />
        </div>

        {/* Title */}
        <h2 className="text-4xl text-center mb-4 leading-tight">
          You and MAUV
        </h2>

        <p className="text-gray-400 text-center mb-12 leading-relaxed px-4">
          We promise to keep your data safe, secure and private. Please take a moment to get to know our policies.
        </p>

        {/* Checkboxes */}
        <div className="space-y-6 mb-auto">
          <div className="flex items-start gap-4 text-left w-full">
            <button
              onClick={() => toggleAgreement('terms')}
              className="flex items-start gap-4 text-left group flex-shrink-0"
            >
              <div className={`w-6 h-6 rounded border-2 flex-shrink-0 mt-1 transition-all ${
                agreements.terms
                  ? 'bg-purple-400 border-purple-400'
                  : 'border-gray-500 group-hover:border-gray-400'
              }`}>
                {agreements.terms && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
            <span className="text-gray-300 text-lg leading-relaxed">
              I agree to MAUV's{' '}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewTerms?.();
                }}
                className="text-purple-400 underline hover:text-purple-300 transition-colors"
              >
                Terms of Service
              </button>
              .
            </span>
          </div>

          <div className="flex items-start gap-4 text-left w-full">
            <button
              onClick={() => toggleAgreement('privacy')}
              className="flex items-start gap-4 text-left group flex-shrink-0"
            >
              <div className={`w-6 h-6 rounded border-2 flex-shrink-0 mt-1 transition-all ${
                agreements.privacy
                  ? 'bg-purple-400 border-purple-400'
                  : 'border-gray-500 group-hover:border-gray-400'
              }`}>
                {agreements.privacy && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
            <span className="text-gray-300 text-lg leading-relaxed">
              I have read MAUV's{' '}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPrivacy?.();
                }}
                className="text-purple-400 underline hover:text-purple-300 transition-colors"
              >
                Privacy Policy
              </button>
              .
            </span>
          </div>

          <button
            onClick={() => toggleAgreement('dataProcessing')}
            className="flex items-start gap-4 text-left w-full group"
          >
            <div className={`w-6 h-6 rounded border-2 flex-shrink-0 mt-1 transition-all ${
              agreements.dataProcessing
                ? 'bg-purple-400 border-purple-400'
                : 'border-gray-500 group-hover:border-gray-400'
            }`}>
              {agreements.dataProcessing && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-gray-300 text-lg leading-relaxed">
              I agree to MAUV processing the health data I choose to share with the app, so they can provide their service.
            </span>
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!allAgreed}
          className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 mt-12 mb-8 ${
            allAgreed
              ? 'bg-purple-400 text-white hover:scale-105 active:scale-95'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
