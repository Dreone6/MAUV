interface LogoutConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmationModal({ onCancel, onConfirm }: LogoutConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up-modal">
        {/* Content */}
        <div className="px-6 py-8 text-center">
          {/* Title */}
          <h2 className="text-red-500 text-xl mb-4">Logout</h2>
          
          {/* Message */}
          <p className="text-gray-900 mb-8">Sure you want to log out?</p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-4 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:shadow-lg transition-all"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up-modal {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up-modal {
          animation: slide-up-modal 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
