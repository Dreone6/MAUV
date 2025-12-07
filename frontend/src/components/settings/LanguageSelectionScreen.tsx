import { ArrowLeft, Check, Search } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectionScreenProps {
  onBack: () => void;
  onSelectLanguage: (languageCode: string) => void;
  currentLanguage?: string;
}

export function LanguageSelectionScreen({ 
  onBack, 
  onSelectLanguage,
  currentLanguage = 'en'
}: LanguageSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
    { code: 'zh-tw', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
    { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  ];

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    onSelectLanguage(code);
    // Could add a small delay before navigating back
    setTimeout(() => {
      onBack();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Language</h1>
          <div className="w-10" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
          />
        </div>
      </div>

      {/* Languages List */}
      <div className="px-6 py-4">
        {filteredLanguages.length > 0 ? (
          <div className="space-y-1">
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelectLanguage(language.code)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  selectedLanguage === language.code
                    ? 'bg-pink-50 border-2 border-pink-400'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <span className="text-3xl flex-shrink-0">{language.flag}</span>
                <div className="flex-1 text-left">
                  <h3 className={`${selectedLanguage === language.code ? 'text-pink-600' : 'text-gray-900'}`}>
                    {language.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{language.nativeName}</p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No languages found</p>
          </div>
        )}
      </div>
    </div>
  );
}
