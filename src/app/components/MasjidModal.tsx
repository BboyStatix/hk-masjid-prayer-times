'use client';

import { useEffect, useState } from 'react';
import { MasjidInformation } from '../MasjidService';

interface MasjidModalProps {
  masjid: MasjidInformation | null;
  isOpen: boolean;
  onClose: () => void;
}

const MasjidModal = ({ masjid, isOpen, onClose }: MasjidModalProps) => {
    if (!isOpen || !masjid) return null;
    
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (masjid) {
      const apiUrl = `https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=${masjid.id}`;
      setIframeUrl(apiUrl);
      setIsLoading(true);
    }
  }, [masjid]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full sm:w-[60vw] max-w-4xl mx-4 relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

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