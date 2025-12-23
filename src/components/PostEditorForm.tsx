import React, { useState, useEffect } from 'react';
import type { Post, AppState } from '../store/useStore';
import useAppStore from '../store/useStore';

interface PostEditorFormProps {
    post: Post;
    onClose: () => void;
}

const PostEditorForm: React.FC<PostEditorFormProps> = ({ post, onClose }) => {
    const updatePost = useAppStore((state: AppState) => state.updatePost);

    const [editedPost, setEditedPost] = useState<Post>(post);

    useEffect(() => {
        setEditedPost(post);
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "likes" && editedPost.stats) {
            setEditedPost({
                ...editedPost,
                stats: {
                    ...editedPost.stats,
                    likes: parseInt(value) || 0,
                },
            });
        } else if (name === "views" && editedPost.stats) {
            setEditedPost({
                ...editedPost,
                stats: {
                    ...editedPost.stats,
                    views: value,
                },
            });
        } else if (name === "hashtags") {
            setEditedPost({
                ...editedPost,
                hashtags: value.split(',').map((tag) => tag.trim()),
            });
        } else {
            setEditedPost({
                ...editedPost,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePost(editedPost);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={editedPost.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label htmlFor="objective" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Objective</label>
                <input
                    type="text"
                    name="objective"
                    id="objective"
                    value={editedPost.objective}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label htmlFor="copy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Copy</label>
                <textarea
                    name="copy"
                    id="copy"
                    value={editedPost.copy}
                    onChange={handleChange}
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                ></textarea>
            </div>
            <div>
                <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hashtags (comma separated)</label>
                <input
                    type="text"
                    name="hashtags"
                    id="hashtags"
                    value={editedPost.hashtags.join(', ')}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label htmlFor="likes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Likes</label>
                <input
                    type="number"
                    name="likes"
                    id="likes"
                    value={editedPost.stats?.likes || 0}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
            <div>
                <label htmlFor="views" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Views</label>
                <input
                    type="text"
                    name="views"
                    id="views"
                    value={editedPost.stats?.views || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default PostEditorForm;
