import React, { useState, useRef } from 'react';
import { generateEditedImage } from '../services/geminiService';

interface ImageEditorProps {
  onBack: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null); // Reset result when new image loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsLoading(true);
    try {
      const result = await generateEditedImage(selectedImage, prompt);
      setResultImage(result);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const presetPrompts = [
    "Make it look vintage",
    "Add a soft pink glow",
    "Make it cyberpunk style",
    "Turn it into a sketch",
  ];

  return (
    <div className="w-full min-h-screen pb-24 flex flex-col z-10 relative animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="flex items-center p-4 border-b border-primary/10 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="ml-2 text-lg font-bold">Amara Magic Studio</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Main Display Area */}
        <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-inner border-2 border-dashed border-gray-300 dark:border-gray-700 relative flex items-center justify-center group">
          
          {selectedImage ? (
            <div className="relative w-full h-full">
               <img 
                src={resultImage || selectedImage} 
                alt="Workspace" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100'}`}
              />
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-primary font-bold animate-pulse">Amara is dreaming...</p>
                </div>
              )}
               {/* Compare Button (Show original on hover/press if result exists) */}
               {resultImage && !isLoading && (
                 <button 
                  onMouseDown={() => { const img = document.querySelector('img[alt="Workspace"]') as HTMLImageElement; if(img) img.src = selectedImage; }}
                  onMouseUp={() => { const img = document.querySelector('img[alt="Workspace"]') as HTMLImageElement; if(img) img.src = resultImage; }}
                  onTouchStart={() => { const img = document.querySelector('img[alt="Workspace"]') as HTMLImageElement; if(img) img.src = selectedImage; }}
                  onTouchEnd={() => { const img = document.querySelector('img[alt="Workspace"]') as HTMLImageElement; if(img) img.src = resultImage; }}
                  className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md pointer-events-auto"
                 >
                   Hold to Compare
                 </button>
               )}
            </div>
          ) : (
             <div className="text-center p-6" onClick={() => fileInputRef.current?.click()}>
               <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                 <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
               </div>
               <p className="text-text-light dark:text-text-dark font-medium">Tap to upload a photo</p>
               <p className="text-xs text-text-light/60 dark:text-text-dark/60 mt-1">Selfies, outfits, or inspo pics</p>
             </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {!selectedImage ? (
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 active:scale-95 transition-transform"
             >
               Select Photo
             </button>
          ) : (
            <>
              {/* Prompt Input */}
              <div className="bg-white dark:bg-background-dark p-4 rounded-xl shadow-sm border border-primary/20">
                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">Magic Instruction</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Turn my hair blue..." 
                    className="w-full bg-background-light dark:bg-[#2a152a] rounded-lg p-3 pr-12 text-sm focus:ring-2 focus:ring-primary focus:outline-none border-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={!prompt || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/20 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-sm">auto_fix</span>
                  </button>
                </div>
                
                {/* Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {presetPrompts.map((p) => (
                    <button 
                      key={p} 
                      onClick={() => setPrompt(p)}
                      className="text-[10px] px-3 py-1.5 rounded-full bg-secondary-lavender/20 text-text-light dark:text-text-dark hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/30"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => { setSelectedImage(null); setResultImage(null); setPrompt(''); }}
                   className="py-3 rounded-xl bg-gray-200 dark:bg-gray-800 font-medium text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                 >
                   Clear
                 </button>
                 <button 
                   onClick={handleGenerate}
                   disabled={!prompt || isLoading}
                   className="py-3 rounded-xl bg-gradient-to-r from-primary to-secondary-lavender text-white font-bold text-sm shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform flex items-center justify-center gap-2"
                 >
                   {isLoading ? 'Dreaming...' : 'Generate'}
                   {!isLoading && <span className="material-symbols-outlined text-sm">auto_awesome</span>}
                 </button>
              </div>

              {resultImage && (
                 <a 
                   href={resultImage} 
                   download="amara-magic-edit.png"
                   className="block w-full text-center py-3 border border-primary text-primary rounded-xl font-medium text-sm hover:bg-primary/5 transition-colors"
                 >
                   Download Result
                 </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
