import React from 'react';
import { Crown, Gem, Star, Heart, Cookie, Package } from 'lucide-react';

interface StoryHighlightProps {
    storyCategories: string[];
    onStoryClick: (category: string) => void;
}

const iconMap: { [key: string]: React.ReactElement } = {
    'Boutique': <Crown size={28} strokeWidth={1.5} />,
    'Chocolates': <Gem size={28} strokeWidth={1.5} />,
    'Reviews': <Star size={28} strokeWidth={1.5} />,
    'CandyLovers': <Heart size={28} strokeWidth={1.5} />,
    'Candies': <Cookie size={28} strokeWidth={1.5} />,
};

const StoryHighlight: React.FC<StoryHighlightProps> = ({ storyCategories, onStoryClick }) => {
    return (
        <div className="flex gap-4 overflow-x-auto mt-8 pb-2 md:pb-0 scrollbar-hide justify-center md:justify-start">
            {storyCategories.map((category, idx) => (
                <div key={idx}
                    onClick={() => onStoryClick(category)}
                    className="flex flex-col items-center space-y-1 min-w-[70px] cursor-pointer opacity-90 hover:opacity-100 transition-opacity transform hover:scale-105 duration-200"
                >
                    <div className="w-16 h-16 rounded-full bg-[#5D4037] border-2 border-[#8D6E63] p-1 shadow-lg ring-2 ring-black/20">
                        <div className="w-full h-full bg-[#3E2723] rounded-full flex items-center justify-center text-yellow-400 border border-[#4E342E] shadow-inner">
                            {iconMap[category] || <Package size={28} strokeWidth={1.5} />}
                        </div>
                    </div>
                    <span className="text-xs font-medium truncate w-16 text-center mt-1 text-gray-600 dark:text-gray-400">{category}</span>
                </div>
            ))}
        </div>
    );
};

export default StoryHighlight;
