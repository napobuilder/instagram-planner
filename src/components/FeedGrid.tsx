import React from 'react';
import { PostItem } from './PostItem';
import { Grid, Film } from 'lucide-react';
import type { Post } from '../store/useStore';

interface FeedGridProps {
    posts: Post[];
    onPostClick: (post: Post) => void;
}

const FeedGrid: React.FC<FeedGridProps> = ({ posts, onPostClick }) => {
    return (
        <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-center gap-12 text-xs font-bold tracking-widest uppercase py-4">
                <div className="flex items-center gap-2 border-t-2 border-white dark:border-white pt-1 -mt-4 cursor-pointer"><Grid size={12} /> Posts</div>
                <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-200 transition"><Film size={12} /> Reels</div>
            </div>

            <div className="grid grid-cols-3 gap-0.5 md:gap-4 px-0 md:px-4">
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} onPostClick={onPostClick} />
                ))}
            </div>
        </div>
    );
};

export default FeedGrid;
