import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause } from 'lucide-react';
import type { StoryItem } from '../store/useStore';

interface StoryViewerProps {
    stories: StoryItem[];
    category: string;
    onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, category, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentStory = stories[currentIndex];

    useEffect(() => {
        if (!currentStory || paused) return;

        const timer = setTimeout(() => {
            handleNext();
        }, currentStory.duration);

        return () => clearTimeout(timer);
    }, [currentIndex, paused, currentStory, stories.length]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(error => console.error("Video auto-play failed:", error));
        }
    }, [currentIndex]);


    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1); // Corrected this from -0 to -1
        }
    };

    if (!currentStory) return null;

    return (
        <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center animate-in fade-in duration-200">
            <div className="relative w-full h-full md:max-w-md md:h-[90vh] md:rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
                
                <div className="absolute top-4 left-2 right-2 flex gap-1 z-20">
                    {stories.map((story, idx) => (
                        <div key={idx} className="h-0.5 bg-white/30 flex-1 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-white transition-all duration-300 ease-linear ${
                                    idx < currentIndex ? 'w-full' : 
                                    idx === currentIndex ? (paused ? 'w-full opacity-50' : 'animate-progress') : 'w-0'
                                }`}
                                style={{ 
                                    animationDuration: idx === currentIndex ? `${story.duration}ms` : '0ms',
                                    animationPlayState: paused ? 'paused' : 'running'
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-8 left-4 z-20 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] overflow-hidden">
                                <img src="https://captaincandyspain.com/wp-content/uploads/2020/12/logo-banner-inicio.png" className="w-full h-full object-contain p-[1px] scale-110" alt="Profile" />
                            </div>
                        </div>
                    <span className="text-white text-sm font-bold shadow-black drop-shadow-md">{category}</span>
                    <span className="text-white/60 text-xs font-light">1h</span>
                </div>

                <button onClick={onClose} className="absolute top-8 right-4 z-30 text-white hover:text-gray-300">
                    <X size={28} />
                </button>

                <button 
                    className="absolute bottom-4 right-4 z-30 text-white/50 hover:text-white"
                    onClick={(e) => { e.stopPropagation(); setPaused(!paused); }}
                >
                    {paused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                </button>

                <div className="absolute inset-0 z-10 flex">
                    <div className="w-1/3 h-full" onClick={handlePrev}></div>
                    <div className="w-2/3 h-full" onClick={handleNext}></div>
                </div>

                <div className="w-full h-full flex items-center justify-center bg-black">
                    {currentStory.type === 'video' ? (
                        <video 
                            ref={videoRef}
                            src={currentStory.url} 
                            className="w-full h-full object-cover" 
                            autoPlay 
                            muted={false} 
                            playsInline
                            onEnded={handleNext}
                        />
                    ) : (
                        <img src={currentStory.url} className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" alt="Story content" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryViewer;
