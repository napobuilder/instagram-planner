import React from 'react';

interface PreloaderProps {
    progress: number;
    loading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ progress, loading }) => {
    return (
        <div 
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50 dark:bg-black transition-all duration-700 ${
                !loading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 p-[3px] shadow-2xl animate-pulse">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                        🍬
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Content</p>
                    <div className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-yellow-500 transition-all duration-300 ease-out" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-[10px] text-gray-400">{progress}%</p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;

