// components/Dialog.js
// components/Dialog.js
import React from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-96">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              &times;
            </button>
            {children}
          </div>
        </div>
  );
};

export default Dialog;