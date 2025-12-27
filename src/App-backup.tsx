import { useState, useEffect } from 'react';
import useAppStore from './store/useStore';
import ProfileHeader from './components/ProfileHeader';
import FeedGrid from './components/FeedGrid';
import PostViewModal from './components/PostViewModal';
import StoryViewer from './components/StoryViewer';
import Preloader from './components/Preloader';
import { AlertTriangle, Download } from 'lucide-react';

const App = () => {
    const {
        posts,
        selectedPost,
        activeStoryCategory,
        STORIES_DATA,
        MAIN_DRIVE_FOLDER,
        setSelectedPost,
        setActiveStoryCategory
    } = useAppStore();

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const storyCategories = Object.keys(STORIES_DATA);

    // Preload assets
    useEffect(() => {
        let allUrls: string[] = [];
        
        // Feed Assets
        posts.forEach(post => {
            if (post.type === 'carousel' && post.media) {
                post.media.forEach(m => allUrls.push(m.url));
            } else {
                allUrls.push(post.visualMediaUrl);
            }
        });
        
        // Story Assets
        Object.values(STORIES_DATA).flat().forEach(s => allUrls.push(s.url));
        
        // Logo
        allUrls.push("https://captaincandyspain.com/wp-content/uploads/2020/12/logo-banner-inicio.png");

        let loadedCount = 0;
        const total = allUrls.length;

        const updateProgress = () => {
            loadedCount++;
            const percent = Math.floor((loadedCount / total) * 100);
            setProgress(percent);
            if (loadedCount >= total) {
                setTimeout(() => setLoading(false), 500);
            }
        };

        if (total === 0) setLoading(false);

        allUrls.forEach(url => {
            if (!url) { updateProgress(); return; }
            if (url.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.onloadeddata = updateProgress;
                video.onerror = updateProgress;
                video.src = url;
                video.preload = 'auto';
                video.load();
            } else {
                const img = new Image();
                img.onload = updateProgress;
                img.onerror = updateProgress;
                img.src = url;
            }
        });
    }, [posts, STORIES_DATA]);

    const handleDownloadAll = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            window.open(MAIN_DRIVE_FOLDER, '_blank');
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">
            
            {/* LOADER */}
            <Preloader progress={progress} loading={loading} />

            {/* DISCLAIMER */}
            <div className="bg-yellow-100 dark:bg-yellow-900/40 border-b border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 text-[10px] sm:text-xs font-bold text-center py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-50">
                <AlertTriangle size={14} />
                VISUALIZER MODE: Instant View
            </div>

            {/* NAV */}
            <nav className="sticky top-[34px] z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center">
                <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    <span>🍬</span> Captain Candy Manager
                </div>
                <button 
                    onClick={handleDownloadAll} 
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold py-2 px-4 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                    {isDownloading ? 'Opening Drive...' : (
                        <>
                            <Download size={16} /> 
                            <span className="hidden sm:inline">Download All Assets</span>
                        </>
                    )}
                </button>
            </nav>

            <main className="max-w-4xl mx-auto pb-20">
                <ProfileHeader
                    storyCategories={storyCategories}
                    onStoryClick={setActiveStoryCategory}
                />
                <FeedGrid posts={posts} onPostClick={setSelectedPost} />
            </main>

            {selectedPost && (
                <PostViewModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}

            {activeStoryCategory && (
                <StoryViewer
                    stories={STORIES_DATA[activeStoryCategory]}
                    category={activeStoryCategory}
                    onClose={() => setActiveStoryCategory(null)}
                />
            )}
        </div>
    );
};

export default App;

