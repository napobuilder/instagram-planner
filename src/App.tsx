import { useState, useEffect } from 'react';
import useAppStore from './store/useStore';
import ProfileHeader from './components/ProfileHeader';
import FeedGrid from './components/FeedGrid';
import PostViewModal from './components/PostViewModal';
import StoryViewer from './components/StoryViewer';
import Preloader from './components/Preloader';
import CreatePostModal from './components/CreatePostModal';
import EditPostModal from './components/EditPostModal';
import { AlertTriangle, Download, Plus, Upload, Eye, Edit, FileJson, Share2, Check } from 'lucide-react';
import type { Post } from './store/useStore';

const App = () => {
    const store = useAppStore();
    const {
        posts,
        selectedPost,
        activeStoryCategory,
        feedId,
        STORIES_DATA,
        MAIN_DRIVE_FOLDER,
        setSelectedPost,
        setActiveStoryCategory,
        setPosts,
        setFeedId,
        loadFeedFromBlob
    } = store;

    const [loading, setLoading] = useState(true);
    const [progress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [copied, setCopied] = useState(false);
    
    // Detect mode and feedId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const [mode, setMode] = useState<'edit' | 'view'>(
        (urlParams.get('mode') as 'edit' | 'view') || 'edit'
    );
    const feedUrl = urlParams.get('feed'); // Legacy support
    const urlFeedId = urlParams.get('feedId'); // New Blob Storage feedId

    const storyCategories = Object.keys(STORIES_DATA);

    // Load feed from Blob Storage or URL if provided
    useEffect(() => {
        const loadFeed = async () => {
            try {
                // Priority 1: Load from Blob Storage (feedId)
                if (urlFeedId) {
                    setFeedId(urlFeedId);
                    await loadFeedFromBlob(urlFeedId);
                    setLoading(false);
                    return;
                }

                // Priority 2: Legacy support - load from external URL (feed)
                if (feedUrl) {
                    fetch(feedUrl)
                        .then(res => res.json())
                        .then((data: Post[]) => {
                            setPosts(data);
                            setLoading(false);
                        })
                        .catch(err => {
                            console.error('Error loading feed from URL:', err);
                            setLoading(false);
                        });
                    return;
                }

                // Priority 3: Generate new feedId in edit mode if none exists
                if (mode === 'edit' && !feedId) {
                    try {
                        const response = await fetch('/.netlify/functions/create-feed', {
                            method: 'POST',
                        });
                        const data = await response.json();
                        if (data.success && data.feedId) {
                            setFeedId(data.feedId);
                            // Update URL with feedId
                            const url = new URL(window.location.href);
                            url.searchParams.set('feedId', data.feedId);
                            window.history.pushState({}, '', url.toString());
                        }
                    } catch (error) {
                        console.error('Error creating feed:', error);
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error('Error loading feed:', error);
                setLoading(false);
            }
        };

        loadFeed();
    }, [urlFeedId, feedUrl, mode, feedId, setFeedId, loadFeedFromBlob, setPosts]);

    const handleDownloadAll = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            window.open(MAIN_DRIVE_FOLDER, '_blank');
        }, 1500);
    };

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(posts, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `captain-candy-feed-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImportJSON = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target?.result as string);
                        setPosts(imported);
                        alert('Feed imported successfully!');
                    } catch (error) {
                        alert('Error importing JSON file');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const toggleMode = () => {
        const newMode = mode === 'edit' ? 'view' : 'edit';
        setMode(newMode);
        const url = new URL(window.location.href);
        url.searchParams.set('mode', newMode);
        window.history.pushState({}, '', url.toString());
    };

    const handleShareFeed = async () => {
        if (!feedId) {
            alert('No feed ID available. Please create a post first.');
            return;
        }

        const shareUrl = `${window.location.origin}${window.location.pathname}?feedId=${feedId}&mode=view`;
        
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    console.log('App rendering', { posts: posts.length, selectedPost, activeStoryCategory, mode });

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">
            
            {/* LOADER */}
            <Preloader progress={progress} loading={loading} />

            {/* DISCLAIMER */}
            <div className="bg-yellow-100 dark:bg-yellow-900/40 border-b border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 text-[10px] sm:text-xs font-bold text-center py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-50">
                <AlertTriangle size={14} />
                {mode === 'view' ? 'CLIENT VIEW MODE: Preview Only' : 'EDITOR MODE: Full Control'}
            </div>

            {/* NAV */}
            <nav className="sticky top-[34px] z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center">
                <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    <span>🍬</span> Captain Candy Manager
                </div>
                <div className="flex items-center gap-2">
                    {mode === 'edit' ? (
                        <>
                            {feedId && (
                                <button 
                                    onClick={handleShareFeed}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                                    title="Share Feed"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={16} /> <span className="hidden sm:inline">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
                                        </>
                                    )}
                                </button>
                            )}
                            <button 
                                onClick={() => setShowCreateModal(true)}
                                className="bg-green-600 hover:bg-green-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                            >
                                <Plus size={16} /> <span className="hidden sm:inline">New Post</span>
                            </button>
                            <button 
                                onClick={handleExportJSON}
                                className="bg-purple-600 hover:bg-purple-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                            >
                                <Download size={16} /> <span className="hidden sm:inline">Export</span>
                            </button>
                            <button 
                                onClick={handleImportJSON}
                                className="bg-orange-600 hover:bg-orange-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                            >
                                <Upload size={16} /> <span className="hidden sm:inline">Import</span>
                            </button>
                        </>
                    ) : null}
                    
                    <button 
                        onClick={handleDownloadAll} 
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                    >
                        {isDownloading ? 'Opening...' : (
                            <>
                                <FileJson size={16} /> 
                                <span className="hidden sm:inline">Drive</span>
                            </>
                        )}
                    </button>

                    {!feedUrl && !urlFeedId && (
                        <button 
                            onClick={toggleMode}
                            className="bg-gray-600 hover:bg-gray-500 text-white text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all flex items-center gap-2 shadow-lg"
                        >
                            {mode === 'edit' ? (
                                <>
                                    <Eye size={16} /> <span className="hidden sm:inline">View Mode</span>
                                </>
                            ) : (
                                <>
                                    <Edit size={16} /> <span className="hidden sm:inline">Edit Mode</span>
                                </>
                            )}
                        </button>
                    )}
                    {feedId && mode === 'edit' && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                            ID: {feedId.substring(0, 8)}...
                        </div>
                    )}
                </div>
            </nav>

            <main className="max-w-4xl mx-auto pb-20">
                <ProfileHeader
                    storyCategories={storyCategories}
                    onStoryClick={setActiveStoryCategory}
                />
                <FeedGrid 
                    posts={posts} 
                    onPostClick={setSelectedPost}
                />
            </main>

            {selectedPost && (
                <PostViewModal
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                    onEdit={() => {
                        setEditingPost(selectedPost);
                        setSelectedPost(null);
                    }}
                />
            )}

            {activeStoryCategory && (
                <StoryViewer
                    stories={STORIES_DATA[activeStoryCategory] || []}
                    category={activeStoryCategory}
                    onClose={() => setActiveStoryCategory(null)}
                />
            )}

            {showCreateModal && mode === 'edit' && (
                <CreatePostModal onClose={() => setShowCreateModal(false)} />
            )}

            {editingPost && mode === 'edit' && (
                <EditPostModal 
                    post={editingPost} 
                    onClose={() => setEditingPost(null)} 
                />
            )}
        </div>
    );
};

export default App;
