import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Handle click outside
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-primary-light rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto border border-indigo-900/30"
      >
        <div className="flex justify-between items-center p-4 border-b border-indigo-900/30">
          {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-all rounded-full p-2 hover:bg-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal; 