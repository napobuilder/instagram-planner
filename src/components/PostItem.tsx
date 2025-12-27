import React from 'react';
import { Film, Layers } from 'lucide-react';
import type { Post } from '../store/useStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PostItemProps {
    post: Post;
    onPostClick: (post: Post) => void;
    isDraggable?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onPostClick, isDraggable = true }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: post.id, disabled: !isDraggable });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const gridMediaUrl = (post.type === 'carousel' && post.media && post.media.length > 0)
        ? post.media[0].url
        : post.visualMediaUrl;

    return (
        <div 
            ref={setNodeRef}
            style={style}
            {...(isDraggable ? attributes : {})}
            {...(isDraggable ? listeners : {})}
            onClick={() => onPostClick(post)} 
            className={`relative group aspect-[9/16] cursor-pointer overflow-hidden bg-gray-800 md:rounded-lg border border-gray-800 ${isDraggable ? 'touch-none' : ''}`}
        >
            {gridMediaUrl ? (
                post.type === 'reel' ? (
                    <video
                        src={gridMediaUrl}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
                        muted
                        loop
                        playsInline
                        autoPlay
                    />
                ) : (
                    <img
                        src={gridMediaUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                        loading="eager"
                        decoding="sync"
                    />
                )
            ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl">{post.icon}</span>
                </div>
            )}
            <div className="absolute top-2 right-2 text-white drop-shadow-md opacity-90 z-10 pointer-events-none">
                {post.type === 'reel' && <Film size={16} strokeWidth={2.5} />}
                {post.type === 'carousel' && <Layers size={16} strokeWidth={2.5} />}
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
};
