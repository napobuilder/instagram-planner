import { useState, useEffect } from 'react';
import { X, Save, Trash2, Calendar as CalendarIcon, GripVertical, ExternalLink, Eye, Plus } from 'lucide-react';
import type { Post, MediaItem } from '../store/useStore';
import useAppStore from '../store/useStore';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { detectMediaTypeFromUrl } from '../utils/uploadHelpers';

const MARKETING_OBJECTIVES = [
    'Brand Awareness',
    'Engagement',
    'Community Building',
    'Lead Generation',
    'Sales / Conversions',
    'Product Launch',
    'Product / Niche',
    'Product / Highlight',
    'Educational Content',
    'Behind the Scenes',
    'User Generated Content',
    'Social Proof / Testimonials',
    'Seasonal / Holiday',
    'Viral / Trending',
    'Lifestyle',
    'Storytelling',
    'Influencer Collaboration',
    'Contest / Giveaway',
    'Customer Service',
    'Announce / News',
    'Custom...',
];

interface MediaItemEditorProps {
    item: MediaItem & { id: string };
    index: number;
    onUpdate: (index: number, updates: Partial<MediaItem>) => void;
    onRemove: (index: number) => void;
}

const MediaItemEditor = ({ item, index, onUpdate, onRemove }: MediaItemEditorProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2"
        >
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
                >
                    <GripVertical size={20} />
                </button>
                <span className="font-bold text-sm">#{index + 1}</span>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {item.type === 'video' ? '🎥 Video' : '📸 Image'}
                </span>
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="ml-auto text-red-500 hover:text-red-700"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {item.url && (
                <div className="relative h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    {item.type === 'video' ? (
                        <video 
                            src={item.url} 
                            className="w-full h-full object-cover" 
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <img src={item.url} alt={`Media ${index + 1}`} className="w-full h-full object-cover" />
                    )}
                </div>
            )}

            <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1">
                    <Eye size={12} /> URL Visualización
                </label>
                <input
                    type="url"
                    value={item.url}
                    onChange={(e) => {
                        const newUrl = e.target.value;
                        const detectedType = detectMediaTypeFromUrl(newUrl);
                        onUpdate(index, { url: newUrl, type: detectedType });
                    }}
                    placeholder="https://files.catbox.moe/abc.jpg"
                    className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                />
            </div>

            <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1">
                    <ExternalLink size={12} /> URL Descarga (HQ)
                </label>
                <input
                    type="url"
                    value={item.downloadUrl || ''}
                    onChange={(e) => onUpdate(index, { downloadUrl: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
        </div>
    );
};

interface EditPostModalProps {
    post: Post;
    onClose: () => void;
}

const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
    const updatePost = useAppStore((state) => state.updatePost);
    
    const [title, setTitle] = useState(post.title);
    const [objective, setObjective] = useState(post.objective);
    const [customObjective, setCustomObjective] = useState('');
    const [copy, setCopy] = useState(post.copy);
    const [hashtags, setHashtags] = useState(post.hashtags.join(', '));
    const [day, setDay] = useState(() => {
        // Convert "Mon Dec 27" back to "YYYY-MM-DD"
        const date = new Date(post.day);
        return isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0];
    });
    const [type] = useState(post.type);
    const [icon, setIcon] = useState(post.icon || '📸');
    const [visualMediaUrl, setVisualMediaUrl] = useState(post.visualMediaUrl);
    const [downloadUrl, setDownloadUrl] = useState(post.downloadUrl || '');
    const [media, setMedia] = useState<(MediaItem & { id: string })[]>(() => {
        return post.media?.map((m, i) => ({ ...m, id: `media-${i}` })) || [];
    });
    const [likes, setLikes] = useState(post.stats.likes);
    const [views, setViews] = useState(post.stats.views || '');

    useEffect(() => {
        if (!MARKETING_OBJECTIVES.includes(objective)) {
            setCustomObjective(objective);
            setObjective('Custom...');
        }
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleAddMediaItem = () => {
        if (media.length >= 10) {
            alert('Instagram permite máximo 10 imágenes/videos por carrusel');
            return;
        }
        const newItem: MediaItem & { id: string } = {
            id: `media-${Date.now()}`,
            type: 'image',
            url: '',
            downloadUrl: '',
        };
        setMedia([...media, newItem]);
    };

    const handleUpdateMediaItem = (index: number, updates: Partial<MediaItem>) => {
        const newMedia = [...media];
        newMedia[index] = { ...newMedia[index], ...updates };
        setMedia(newMedia);
        
        if (index === 0 && updates.url) {
            setVisualMediaUrl(updates.url);
        }
    };

    const handleRemoveMediaItem = (index: number) => {
        const newMedia = media.filter((_, i) => i !== index);
        setMedia(newMedia);
        if (newMedia.length > 0 && index === 0) {
            setVisualMediaUrl(newMedia[0].url);
        } else if (newMedia.length === 0) {
            setVisualMediaUrl('');
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setMedia((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                if (newItems.length > 0) {
                    setVisualMediaUrl(newItems[0].url);
                }
                
                return newItems;
            });
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalObjective = objective === 'Custom...' ? customObjective : objective;

        const updatedPost: Partial<Post> = {
            id: post.id,
            title,
            objective: finalObjective,
            copy,
            hashtags: hashtags ? hashtags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`) : [],
            day: formatDate(day),
            icon,
            stats: {
                views: views || undefined,
                likes: likes || 0,
            },
            visualMediaUrl: type === 'carousel' ? (media[0]?.url || visualMediaUrl) : visualMediaUrl,
            downloadUrl: type === 'carousel' ? (media[0]?.downloadUrl || media[0]?.url || downloadUrl) : downloadUrl,
            ...(type === 'carousel' && media.length > 0 ? { 
                media: media.map(({ id, ...rest }) => rest) 
            } : {}),
        };

        updatePost(updatedPost);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl border border-gray-800"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold">Edit Post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Carousel Media Manager */}
                    {type === 'carousel' && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-bold">
                                    Carousel Media ({media.length}/10)
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddMediaItem}
                                    disabled={media.length >= 10}
                                    className="text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Item
                                </button>
                            </div>

                            {media.length > 0 ? (
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext items={media.map(m => m.id)} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {media.map((item, index) => (
                                                <MediaItemEditor
                                                    key={item.id}
                                                    item={item}
                                                    index={index}
                                                    onUpdate={handleUpdateMediaItem}
                                                    onRemove={handleRemoveMediaItem}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            ) : null}
                        </div>
                    )}

                    {/* Single Media URLs (Static/Reel) */}
                    {type !== 'carousel' && (
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-bold mb-2">URL Visualización</label>
                                <input
                                    type="url"
                                    value={visualMediaUrl}
                                    onChange={(e) => setVisualMediaUrl(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">URL Descarga HQ (opcional)</label>
                                <input
                                    type="url"
                                    value={downloadUrl}
                                    onChange={(e) => setDownloadUrl(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Icon/Emoji</label>
                            <input
                                type="text"
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                                <CalendarIcon size={14} /> Post Date
                            </label>
                            <input
                                type="date"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                            <p className="text-xs text-gray-400 mt-1">Preview: {formatDate(day)}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Marketing Objective</label>
                            <select
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            >
                                {MARKETING_OBJECTIVES.map((obj) => (
                                    <option key={obj} value={obj}>
                                        {obj}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {objective === 'Custom...' && (
                        <div>
                            <label className="block text-sm font-bold mb-2">Custom Objective</label>
                            <input
                                type="text"
                                value={customObjective}
                                onChange={(e) => setCustomObjective(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                placeholder="Escribe tu objetivo personalizado..."
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold mb-2">Caption</label>
                        <textarea
                            value={copy}
                            onChange={(e) => setCopy(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Hashtags (comma separated)</label>
                        <input
                            type="text"
                            value={hashtags}
                            onChange={(e) => setHashtags(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Likes</label>
                            <input
                                type="number"
                                value={likes}
                                onChange={(e) => setLikes(parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Views</label>
                            <input
                                type="text"
                                value={views}
                                onChange={(e) => setViews(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;




