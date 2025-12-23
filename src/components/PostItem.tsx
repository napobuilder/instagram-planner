import React from 'react';
import { Film, Layers } from 'lucide-react';
import type { Post } from '../store/useStore';

interface PostItemProps {
    post: Post;
    onPostClick: (post: Post) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onPostClick }) => {
    const gridMediaUrl = (post.type === 'carousel' && post.media && post.media.length > 0)
        ? post.media[0].url
        : post.visualMediaUrl;

    return (
        <div 
            onClick={() => onPostClick(post)} 
            className="relative group aspect-[9/16] cursor-pointer overflow-hidden bg-gray-800 md:rounded-lg border border-gray-800"
        >
            {gridMediaUrl ? (
                post.type === 'reel' ? (
                    <video
                        src={gridMediaUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        muted
                        loop
                        playsInline
                        autoPlay
                    />
                ) : (
                    <img
                        src={gridMediaUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="eager"
                        decoding="sync"
                    />
                )
            ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center"><span className="text-4xl">{post.icon}</span></div>
            )}
            <div className="absolute top-2 right-2 text-white drop-shadow-md opacity-90 z-10">
                {post.type === 'reel' && <Film size={16} strokeWidth={2.5} />}
                {post.type === 'carousel' && <Layers size={16} strokeWidth={2.5} />}
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
};
