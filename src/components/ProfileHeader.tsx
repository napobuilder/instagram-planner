import React from 'react';
import StoryHighlight from './StoryHighlight';
import useAppStore from '../store/useStore';
import type { AppState } from '../store/useStore';

interface ProfileHeaderProps {
    storyCategories: string[];
    onStoryClick: (category: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ storyCategories, onStoryClick }) => {
    const posts = useAppStore((state: AppState) => state.posts);

    return (
        <header className="px-4 py-8 md:px-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <div className="relative group cursor-pointer">
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative border-4 border-white shadow-inner">
                            <img src="https://captaincandyspain.com/wp-content/uploads/2020/12/logo-banner-inicio.png" className="w-full h-full object-contain p-1 scale-110 group-hover:scale-125 transition-transform duration-300 ease-out" alt="Profile avatar" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-1.5 border-4 border-black"><div className="w-4 h-4 flex items-center justify-center font-bold text-xs">+</div></div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                        <h1 className="text-xl md:text-2xl font-light">captaincandyshop</h1>
                        <div className="flex gap-2">
                            <span className="px-4 py-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition">Edit profile</span>
                            <span className="px-4 py-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition">Tools</span>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
                        <div><span className="font-bold">{posts.length}</span> posts</div>
                        <div><span className="font-bold">14.3k</span> followers</div>
                        <div><span className="font-bold">342</span> following</div>
                    </div>
                    <div className="text-sm leading-snug max-w-md mx-auto md:mx-0">
                        <p className="font-bold">Captain Candy Shop ⚓️🍭</p>
                        <p className="text-gray-400">Boutique Candy Store</p>
                        <p>📍 Miami | Unforgettable Experiences</p>
                        <p>🍫 Exclusive selection of Fine European Chocolates.</p>
                        <p>🏴‍☠️ Discover the taste of our most valuable treasure.</p>
                        <p>👇 Join the Captain's VIP Crew!</p>
                        <a href="#" className="text-blue-400 font-medium hover:underline">bit.ly/captain-candy-crew</a>
                    </div>
                </div>
            </div>

            <StoryHighlight storyCategories={storyCategories} onStoryClick={onStoryClick} />
        </header>
    );
};

export default ProfileHeader;
