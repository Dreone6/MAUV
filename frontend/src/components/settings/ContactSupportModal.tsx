import { X, Mail, MessageSquare, Send, AlertCircle, Check } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('olivia@example.com');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'bug', name: 'Bug Report', emoji: '🐛' },
    { id: 'feature', name: 'Feature Request', emoji: '✨' },
    { id: 'account', name: 'Account Issue', emoji: '👤' },
    { id: 'billing', name: 'Billing Question', emoji: '💳' },
    { id: 'data', name: 'Data & Privacy', emoji: '🔒' },
    { id: 'other', name: 'Other', emoji: '💬' },
  ];

  const handleSend = async () => {
    if (!category || !subject || !message) return;
    
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setCategory('');
      setSubject('');
      setMessage('');
      onClose();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl text-gray-800 mb-2">Message Sent!</h2>
          <p className="text-gray-600">
            We've received your message and will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-2xl text-gray-800">Contact Support</h2>
            <p className="text-sm text-gray-500">We're here to help!</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl transition-all border ${
                    category === cat.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-1">{cat.emoji}</span>
                    <p className="text-xs text-gray-700">{cat.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Your Email</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Subject</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
                placeholder="Brief description of your issue"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-gray-800 resize-none"
              placeholder="Please provide as much detail as possible..."
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-3 my-4 border border-blue-200">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              Average response time: 24 hours. For urgent issues, please call our support line.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSending}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || !category || !subject || !message || !email}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
