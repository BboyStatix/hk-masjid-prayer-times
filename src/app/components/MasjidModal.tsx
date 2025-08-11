'use client';

import { useEffect, useState } from 'react';
import { MasjidInformation } from '../MasjidService';

interface MasjidModalProps {
  masjid: MasjidInformation | null;
  isOpen: boolean;
  onClose: () => void;
}

const MasjidModal = ({ masjid, isOpen, onClose }: MasjidModalProps) => {
  // All hooks must be called unconditionally at the top level
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (masjid) {
      const apiUrl = `https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=${masjid.id}`;
      setIframeUrl(apiUrl);
      setIsLoading(true);
    }
  }, [masjid]);

  // Early return after hooks to maintain hook order
  if (!isOpen || !masjid) return null;

  // Generate shareable link
  const generateShareLink = () => {
    return `${window.location.origin}/masjids/${masjid.name}`;
  };

  // Copy to clipboard function
  const copyShareLink = async () => {
    const link = generateShareLink();
    try {
      const encodedLink = encodeURI(link); //helps copy as an proper link you can paste on WhatsApp
      await navigator.clipboard.writeText(encodedLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full sm:w-[60vw] max-w-4xl mx-4 relative overflow-auto"
           onClick={(e) => e.stopPropagation()}
           style={{ maxHeight: '90vh' }}>
        
        {/* Share & Close Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={copyShareLink}
            className="text-gray-500 hover:text-gray-700"
            title="Share link">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Copy Feedback */}
        {isCopied && (
          <div className="absolute top-14 right-4 bg-green-100 text-green-800 px-3 py-1 rounded">
            Link copied!
          </div>
        )}

        {/* Rest of your existing modal content */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {masjid.name}
        </h2>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      <iframe
        src={iframeUrl}
        className={`w-full h-[65vh] sm:h-[580px] rounded-lg ${isLoading ? 'hidden' : 'block'}`}
        onLoad={() => setIsLoading(false)}
        title={`${masjid.name}`}
        allow="fullscreen"
      />
    </div>
    </div>
  );
};

export default MasjidModal;