import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Download, Calendar, Target, ChevronLeft, ChevronRight, ExternalLink, Trash2, Edit } from 'lucide-react';
import type { Post } from '../store/useStore';
import useAppStore from '../store/useStore';

interface PostViewModalProps {
    post: Post;
    onClose: () => void;
    onEdit?: () => void;
}

const PostViewModal: React.FC<PostViewModalProps> = ({ post, onClose, onEdit }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const MAIN_DRIVE_FOLDER = useAppStore((state) => state.MAIN_DRIVE_FOLDER);
    const deletePost = useAppStore((state) => state.deletePost);
    
    // Detect mode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'edit';
    const isEditMode = mode === 'edit';

    useEffect(() => {
        setCurrentSlide(0);
    }, [post]);

    if (!post) return null;

    // Determinar el asset actual (imagen/video)
    const isCarousel = post.type === 'carousel' && post.media && post.media.length > 0;
    const currentAsset = isCarousel && post.media
        ? post.media[currentSlide] 
        : { type: post.type === 'reel' ? 'video' : 'image', url: post.visualMediaUrl, downloadUrl: post.downloadUrl };

    if (!currentAsset) return null;

    // LOGICA PARA EL LINK DE DESCARGA
    const hasSpecificLink = currentAsset.downloadUrl && currentAsset.downloadUrl !== '#' && currentAsset.downloadUrl.trim() !== '';
    const finalDownloadUrl = hasSpecificLink ? currentAsset.downloadUrl : MAIN_DRIVE_FOLDER;
    const downloadText = hasSpecificLink 
        ? (isCarousel ? `Download Slide ${currentSlide + 1}` : 'Download High-Res')
        : 'Find in Drive Folder';
    const DownloadIcon = hasSpecificLink ? Download : ExternalLink;

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (post.media && currentSlide < post.media.length - 1) setCurrentSlide(prev => prev + 1);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
    };

    const handleDelete = () => {
        if (confirm('¿Estás seguro de eliminar este post? Esta acción no se puede deshacer.')) {
            deletePost(post.id);
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200" 
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[95vh] md:h-[90vh] rounded-lg md:rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-800" 
                onClick={e => e.stopPropagation()}
            >
                {/* Visual */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-black relative flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 z-0 opacity-60">
                        {currentAsset.type === 'video' || post.type === 'reel' ? (
                            <video src={currentAsset.url} className="w-full h-full object-cover blur-2xl scale-110" autoPlay muted loop playsInline />
                        ) : (
                            <img src={currentAsset.url} className="w-full h-full object-cover blur-2xl scale-110" alt="background" />
                        )}
                    </div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                        {currentAsset.type === 'video' || post.type === 'reel' ? (
                            <video 
                                key={`vid-${currentSlide}-${currentAsset.url}`} 
                                src={currentAsset.url} 
                                className="h-full w-full object-contain drop-shadow-2xl rounded-sm" 
                                controls 
                                autoPlay 
                                muted 
                                loop 
                                playsInline
                                preload="auto"
                                onError={(e) => {
                                    console.error('Error loading video:', currentAsset.url, e);
                                }}
                            />
                        ) : (
                            <img 
                                key={`img-${currentSlide}-${currentAsset.url}`} 
                                src={currentAsset.url} 
                                className="h-full w-full object-contain drop-shadow-2xl rounded-sm" 
                                alt={post.title}
                                onError={(e) => {
                                    console.error('Error loading image:', currentAsset.url, e);
                                }}
                            />
                        )}
                    </div>
                    {isCarousel && post.media && (
                        <>
                            {currentSlide > 0 && (
                                <button 
                                    onClick={prevSlide} 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                            )}
                            {currentSlide < post.media.length - 1 && (
                                <button 
                                    onClick={nextSlide} 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            )}
                            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs font-mono text-white/90 backdrop-blur-md z-20">
                                {currentSlide + 1}/{post.media.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Info & Data */}
                <div className="w-full md:w-1/2 h-[45vh] md:h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs overflow-hidden">
                                    <img 
                                        src="https://captaincandyspain.com/wp-content/uploads/2020/12/logo-banner-inicio.png" 
                                        className="w-full h-full object-contain p-[1px] scale-110" 
                                        alt="Captain Candy Logo"
                                    />
                                </div>
                            </div>
                            <span className="font-bold text-sm">captaincandyshop</span>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                                <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">Post Date</p>
                                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium text-xs md:text-sm">
                                    <Calendar size={14} className="md:w-4 md:h-4" /> {post.day}
                                </div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded-lg border border-purple-100 dark:border-purple-800">
                                <p className="text-[10px] md:text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mb-1">Objective</p>
                                <div className="flex items-center gap-2 text-purple-900 dark:text-purple-100 font-medium text-xs md:text-sm">
                                    <Target size={14} className="md:w-4 md:h-4" /> {post.objective}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-[10px] md:text-xs font-bold uppercase text-gray-400 tracking-widest">Caption</h3>
                            <div className="text-xs md:text-sm leading-relaxed whitespace-pre-line font-light border-l-2 border-yellow-500 pl-3 md:pl-4 py-1 max-h-32 md:max-h-none overflow-y-auto">
                                {post.copy}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-[10px] md:text-xs font-bold uppercase text-gray-400 tracking-widest">Hashtags</h3>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {post.hashtags.map((tag, i) => (
                                    <span 
                                        key={i} 
                                        className="text-[10px] md:text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-mono"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
                        <div className="flex gap-3 md:gap-4 text-gray-400">
                            <span className="flex items-center gap-1 text-xs">
                                <Heart size={12} className="md:w-3.5 md:h-3.5" /> {post.stats.likes}
                            </span>
                            <span className="flex items-center gap-1 text-xs">
                                <MessageCircle size={12} className="md:w-3.5 md:h-3.5" /> 42
                            </span>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            {isEditMode && (
                                <>
                                    <button 
                                        onClick={() => onEdit && onEdit()}
                                        className="text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-all shadow-lg bg-orange-600 hover:bg-orange-700"
                                    >
                                        <Edit size={14} className="md:w-4 md:h-4" /> 
                                        <span className="truncate">Edit</span>
                                    </button>
                                    <button 
                                        onClick={handleDelete}
                                        className="text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-all shadow-lg bg-red-600 hover:bg-red-700"
                                    >
                                        <Trash2 size={14} className="md:w-4 md:h-4" /> 
                                        <span className="truncate">Delete</span>
                                    </button>
                                </>
                            )}
                            <a 
                                href={finalDownloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`text-black text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-lg flex items-center gap-2 transition-all shadow-lg flex-1 sm:flex-initial justify-center ${
                                    hasSpecificLink 
                                        ? 'bg-yellow-500 hover:bg-yellow-400 shadow-yellow-500/20' 
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                            >
                                <DownloadIcon size={14} className="md:w-4 md:h-4" /> 
                                <span className="truncate">{downloadText}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostViewModal;

