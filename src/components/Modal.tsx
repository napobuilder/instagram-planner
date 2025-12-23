import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl border border-gray-800" 
                onClick={e => e.stopPropagation()}
            >
                {/* Header with a close button */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-semibold">Edit Post</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
