import React from 'react';
import { PostItem } from './PostItem';
import { Grid, Film } from 'lucide-react';
import type { Post } from '../store/useStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import useAppStore from '../store/useStore';

interface FeedGridProps {
    posts: Post[];
    onPostClick: (post: Post) => void;
}

const FeedGrid: React.FC<FeedGridProps> = ({ posts, onPostClick }) => {
    const setPosts = useAppStore((state) => state.setPosts);
    
    // Detect mode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'edit';
    const isEditMode = mode === 'edit';

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        if (!isEditMode) return;
        
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = posts.findIndex((post) => post.id === active.id);
            const newIndex = posts.findIndex((post) => post.id === over.id);

            const newPosts = arrayMove(posts, oldIndex, newIndex);
            setPosts(newPosts);
        }
    };

    const gridContent = (
        <div className="grid grid-cols-3 gap-0.5 md:gap-4 px-0 md:px-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onPostClick={onPostClick} isDraggable={isEditMode} />
            ))}
        </div>
    );

    return (
        <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-center gap-12 text-xs font-bold tracking-widest uppercase py-4">
                <div className="flex items-center gap-2 border-t-2 border-white dark:border-white pt-1 -mt-4 cursor-pointer">
                    <Grid size={12} /> Posts
                </div>
                <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-200 transition">
                    <Film size={12} /> Reels
                </div>
            </div>

            {isEditMode ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={posts.map(p => p.id)} strategy={rectSortingStrategy}>
                        {gridContent}
                    </SortableContext>
                </DndContext>
            ) : (
                gridContent
            )}
        </div>
    );
};

export default FeedGrid;
