import React from 'react';
import useAppStore from './store/useStore';
import ProfileHeader from './components/ProfileHeader';
import FeedGrid from './components/FeedGrid';
import Modal from './components/Modal';
import StoryViewer from './components/StoryViewer';
import PostEditorForm from './components/PostEditorForm';

const App: React.FC = () => {
    const {
        posts,
        selectedPost,
        activeStoryCategory,
        STORIES_DATA,
        setSelectedPost,
        setActiveStoryCategory
    } = useAppStore();

    const storyCategories = Object.keys(STORIES_DATA);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <main className="max-w-4xl mx-auto p-4">
                <ProfileHeader
                    storyCategories={storyCategories}
                    onStoryClick={setActiveStoryCategory}
                />
                <FeedGrid posts={posts} onPostClick={setSelectedPost} />
            </main>

            {selectedPost && (
                <Modal onClose={() => setSelectedPost(null)}>
                    <PostEditorForm
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                </Modal>
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