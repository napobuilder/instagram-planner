import { create } from 'zustand';

// Definición de tipos para la media de un post (usado en carousels)
export interface MediaItem {
    type: 'image' | 'video';
    url: string;
    downloadUrl?: string;
}

// Definición de tipos para un post individual
export interface Post {
    id: number;
    type: 'reel' | 'carousel' | 'static';
    day: string;
    imageType?: string;
    icon?: string;
    title: string;
    objective: string;
    stats: {
        views?: string;
        likes: number;
    };
    media?: MediaItem[];
    visualMediaUrl: string;
    downloadUrl?: string;
    copy: string;
    hashtags: string[];
}

export interface StoryItem {
    type: 'image' | 'video';
    url: string;
    duration: number;
}
export interface SaveStatus {
  status: 'idle' | 'saving' | 'saved' | 'error';
  message?: string;
}

export interface AppState {
  posts: Post[];
  selectedPost: Post | null;
  activeStoryCategory: string | null;
  feedId: string | null;
  saveStatus: SaveStatus;
  MAIN_DRIVE_FOLDER: string;
  STORIES_DATA: { [key: string]: StoryItem[] };
  setSelectedPost: (post: Post | null) => void;
  setActiveStoryCategory: (category: string | null) => void;
  setFeedId: (feedId: string | null) => void;
  setPosts: (posts: Post[]) => void;
  updatePost: (updatedPost: Partial<Post>) => void;
  deletePost: (postId: number) => void;
  loadFeedFromBlob: (feedId: string) => Promise<void>;
  saveFeedToBlob: (feedId: string, posts: Post[]) => Promise<boolean>;
}

const MAIN_DRIVE_FOLDER = 'https://drive.google.com/drive/folders/17AmAK1bz3NqVhLCOoU3NRmGmsG4Gv6g8?usp=drive_link';

// --- DATA DE HISTORIAS ---
const STORIES_DATA: { [key: string]: StoryItem[] } = {
    'Boutique': [
        { type: 'image', url: 'https://i.imgur.com/hUbk3tk.png', duration: 5000 },
        { type: 'image', url: 'https://i.imgur.com/4zlKVOp.png', duration: 5000 }
    ],
    'Chocolates': [
        { type: 'image', url: 'https://i.imgur.com/cODXWwD.jpeg', duration: 5000 },
        { type: 'video', url: 'https://i.imgur.com/o2zykFg.mp4', duration: 10000 }
    ],
    'Reviews': [
            { type: 'image', url: 'https://i.imgur.com/b3HdF7B.jpeg', duration: 5000 }
    ],
    'CandyLovers': [
            { type: 'image', url: 'https://i.imgur.com/6lhpSrE.png', duration: 5000 }
    ],
    'Candies': [
            { type: 'video', url: 'https://i.imgur.com/b3GUS5O.mp4', duration: 15000 }
    ]
};

// --- HASHTAGS GLOBALES ---
const GLOBAL_HASHTAGS = ['#CaptainCandyUSA', '#CandyTreasure', '#PirateCandy', '#MiamiCandyShop', '#AventuraMall', '#SweetAdventure', '#CandyLovers', '#TasteTheWorld', '#ChocolateLoot', '#CandyFromEveryPort', '#LincolnRoad', '#MiamiBeach', '#ForeignCandy'];

// --- DATA DEL FEED ---
const FEED_DATA: Post[] = [
    // ==============================
    // SEMANA 4 (22 Dic - 26 Dic)
    // ==============================

    // Friday 26: The Biggest Lie (ASMR Humor)
    {
        id: 24,
        type: 'reel',
        day: 'Fri Dec 26',
        imageType: 'gradient-6',
        icon: '🤥',
        title: 'The Biggest Lie',
        objective: 'Humor / Relatable',
        stats: { views: '28.1k', likes: 1850 },
        visualMediaUrl: 'https://i.imgur.com/tRiB9ki.mp4',
        downloadUrl: 'https://drive.google.com/open?id=1Qoo1xuldOwcjkBND5a88kXGVYS02lOrB&usp=drive_fs',
        copy: "The biggest lie I tell myself every weekend. 🤥🍬\n\nMe: \"I’m just going to try a sample.\" Also me: Proceeds to fill the entire bag.\n\nLet's be real... self-control doesn't exist at Captain Candy. Once you start scooping, you can't stop. 🛑✋\n\n👇 Tag the friend who has absolutely ZERO chill with candy.",
        hashtags: ['#CandyAddict', '#Relatable', '#MiamiEats', '#WeekendVibes', ...GLOBAL_HASHTAGS.slice(0, 5)]
    },

    // Thursday 25: Gluten Free Collection (Updated Copy)
    {
        id: 19,
        type: 'carousel',
        day: 'Thu Dec 25',
        imageType: 'gradient-2',
        icon: '🌾',
        title: 'Gluten Free Collection',
        objective: 'Product / Niche',
        stats: { views: '5.4k', likes: 320 },
        media: [
            { type: 'image', url: 'https://i.imgur.com/8lq7sIW.jpeg', downloadUrl: 'https://drive.google.com/open?id=19xgj0_FFQsyFCEt0ibMymJ6ZFrioy78l&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/lDUISBY.jpeg', downloadUrl: 'https://drive.google.com/open?id=14WcdapywuyVYhShIrVeiDtzksfwZrZTB&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/pK8x3ES.jpeg', downloadUrl: 'https://drive.google.com/open?id=1Pd1et3qKpSOGyvGzJPTryOncax_77Pep&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/z94BcP8.png', downloadUrl: 'https://drive.google.com/open?id=1I4Rch_TAxZpbAdENdluSOoiwvIsjrUBj&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/0KeUfHo.png', downloadUrl: 'https://drive.google.com/open?id=1pvJmQ4mZJHVk_cOtIiSp6gM2nPelcN3V&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/KNlb5hE.jpeg', downloadUrl: 'https://drive.google.com/open?id=1yWV05pUOQE2rFVDpq6OPkg1E9gR8Z9z-&usp=drive_fs' }
        ],
        visualMediaUrl: 'https://i.imgur.com/8lq7sIW.jpeg',
        copy: "Gluten-Free, without the compromise. ✨\nEveryone deserves a treat. That’s why our Gluten-Free collection is just as soft and flavorful as the rest. Honestly, you might even double-check the label just to be sure. 😉\n🍓 Featured in this post:\n1️⃣ Wild Strawberries\n2️⃣ Filled Gummy Bears\n3️⃣ Chocolate Coins\nAll flavor, no worries. Come mix your favorites at Lincoln Road! 📍",
        hashtags: ['#GlutenFreeMiami', '#GlutenFreeCandy', '#InclusiveTreats', ...GLOBAL_HASHTAGS.slice(0, 5)]
    },

    // Wednesday 24: Santa Spotted (Updated Copy)
    {
        id: 23,
        type: 'reel',
        day: 'Wed Dec 24',
        imageType: 'gradient-5',
        icon: '🎅',
        title: 'Santa Spotted!',
        objective: 'Seasonal / Viral',
        stats: { views: '25.4k', likes: 2100 },
        visualMediaUrl: 'https://i.imgur.com/fNqEgqG.mp4',
        downloadUrl: 'https://drive.google.com/open?id=1PfFFHAjePCPMTAfFvYJkHWQ8Q1s_sgX6&usp=drive_fs',
        copy: "Looks like Santa has a new favorite stop on Lincoln Road. 🎅✨\nWe spotted the sleigh loading up on something special this year. Because let’s be honest: the best gifts usually don't fit in a box—they come in a bag of premium sweets. 🍫\nSkip the socks this season. Treat your loved ones (and yourself) to the kind of treasure that actually gets eaten.\n📍 Upgrade your stockings at Captain Candy Shop.",
        hashtags: ['#SantaSpotted', '#MiamiChristmas', '#StockingStuffers', '#LincolnRoad', '#BreakingNewsMiami']
    },

    // Tuesday 23: 10+ Countries (Updated Copy)
    {
        id: 22,
        type: 'reel',
        day: 'Tue Dec 23',
        imageType: 'gradient-4',
        icon: '🌍',
        title: '10+ Countries',
        objective: 'Product / Authority',
        stats: { views: '19.2k', likes: 1350 },
        visualMediaUrl: 'https://i.imgur.com/Myasbaf.mp4',
        downloadUrl: 'https://drive.google.com/open?id=1KmzatuzFcWjSrHmAUf09tjP8MYb9xgpK&usp=drive_fs',
        copy: "10+ Countries. One Bag. Zero Regrets. 😌\nWe’ve gathered the finest chocolates from Brazil, Germany, Spain, Belgium, and beyond. At Captain Candy, we curate the ultimate treasure chest so you simply don't have to choose.\nThe world’s best sweets, all right here on Lincoln Road. 📍",
        hashtags: GLOBAL_HASHTAGS.slice(0, 8)
    },

    // Monday 22: COTW - Jumbo Fruits
    {
        id: 20,
        type: 'carousel',
        day: 'Mon Dec 22',
        imageType: 'gradient-2',
        icon: '🌈',
        title: 'COTW: Jumbo Fruits',
        objective: 'Product / Highlight',
        stats: { views: '3.2k', likes: 150 },
        media: [
            { type: 'image', url: 'https://i.imgur.com/oIZvorD.jpeg', downloadUrl: 'https://drive.google.com/open?id=1HdHNpstWVvB-5AlsebNPoR-65GMRDwaq&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/eV7yhwC.jpeg', downloadUrl: 'https://drive.google.com/file/d/15bOCjhq3ni2exByuI1Nh-2h-FxXtm0UW/view?usp=sharing' },
            { type: 'video', url: 'https://i.imgur.com/dQPE4zx.mp4', downloadUrl: 'https://drive.google.com/open?id=10rZjxPvX722vkV4Enpgy_7iNRAoAZDwk&usp=drive_fs' }
        ],
        visualMediaUrl: 'https://i.imgur.com/oIZvorD.jpeg',
        copy: "🌈 Candy of the Week: JUMBO Multi Fruits!\n\nWhy pick one flavor when you can have them all? These aren't your average sweets. They are JUMBO in size and JUMBO in flavor. 💥 Filled with a mix of fruity goodness. The perfect balance of sweet, chewy, and totally addictive.\n\n#CandyOfTheWeek #JumboCandy #FruitLovers",
        hashtags: ['#CandyOfTheWeek', ...GLOBAL_HASHTAGS].slice(0, 8)
    },


    // ==============================
    // SEMANA 3 (15 Dic - 19 Dic)
    // ==============================

    // Friday 19: Caught the Vibe
    {
        id: 16,
        type: 'carousel',
        day: 'Fri Dec 19',
        imageType: 'gradient-1',
        icon: '📸',
        title: 'Caught the Vibe',
        objective: 'Social Proof / Lifestyle',
        stats: { views: '3.5k', likes: 210 },
        media: [
            { type: 'image', url: 'https://i.imgur.com/fGz2oFZ.jpeg', downloadUrl: 'https://drive.google.com/open?id=1PFdvUUYVPXqFYMf15BTH2v-w0yS1MfXp&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/UR6duAS.jpeg', downloadUrl: 'https://drive.google.com/open?id=1upqVJbQ633zFuyMetbreRHbDxJ4WqaKS&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/y4x7h8u.jpeg', downloadUrl: 'https://drive.google.com/open?id=1kdGEupeJlpD87JqGntoiMcI6x8aQHO8j&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/sLaL62z.jpeg', downloadUrl: 'https://drive.google.com/open?id=1IbxFQPeiBbpBU8b6bI-gO_2PBjPNEcgY&usp=drive_fs' }
        ],
        visualMediaUrl: 'https://i.imgur.com/fGz2oFZ.jpeg',
        copy: "POV: You caught the Captain Candy vibe. 📸✨\n\nIt’s not just about the sugar... it’s about the smile that comes with it. From the moment you secure the bag to that very first bite of a blue shark 🦈, the experience is unmatched.\n\nSwipe ➡️ to see happy faces and full hands. This is what a successful treasure hunt looks like.\n\n👇 Who is your partner in crime for a candy run? Tag them!",
        hashtags: GLOBAL_HASHTAGS.slice(0, 10)
    },

    // Thursday 18: POV Sweetest Spot (Updated Copy)
    {
        id: 18,
        type: 'reel',
        day: 'Thu Dec 18',
        imageType: 'gradient-3',
        icon: '📍',
        title: 'POV: Sweetest Spot',
        objective: 'Branding / Aesthetic',
        stats: { views: '14.5k', likes: 890 },
        visualMediaUrl: 'https://i.imgur.com/gWrMzLx.mp4',
        downloadUrl: 'https://drive.google.com/open?id=12N0rTLOTvWKieL5nsUgDkUYTMoTzrb3I&usp=drive_fs',
        copy: "POV: You just found the sweetest spot in Miami. 📍☀️\n\nWe are talking about European textures, vibrant colors, and flavors that actually taste like fruit (and real chocolate!).\n\nLife is short. Make it sweet. 🍭\n\n🚀 Tag your candy buddy to plan your next visit",
        hashtags: ['#POV', '#MiamiSpots', '#NoFilterNeeded', ...GLOBAL_HASHTAGS.slice(0, 5)]
    },

    // Wednesday 17: Safe Space
    {
        id: 21,
        type: 'reel',
        day: 'Wed Dec 17',
        imageType: 'gradient-1',
        icon: '🎶',
        title: 'Safe Space',
        objective: 'Vibe / Lifestyle',
        stats: { views: '15.8k', likes: 980 },
        visualMediaUrl: 'https://i.imgur.com/WL7DmSp.mp4',
        downloadUrl: 'https://drive.google.com/open?id=1MHF62Kv0E6ZZY6Sn8aap31LfAkARr9ge&usp=drive_fs',
        copy: "Your safe space for sugar cravings. 🎶✨\n\n\"I could lift you up...\" literally. 🚀 Nothing fixes a bad day like a scoop of your favorite candy. From the moment you step under the ropes, the vibe changes. Good music, amazing smells, and rows of candy waiting for you.\n\nCome for the candy, stay for the vibes. 🦜",
        hashtags: ['#CandyVibes', '#MiamiLifestyle', '#SweetEscape', ...GLOBAL_HASHTAGS.slice(0, 5)]
    },

    // Tuesday 16: ASMR Crunch
    {
        id: 17,
        type: 'reel',
        day: 'Tue Dec 16',
        imageType: 'gradient-6',
        icon: '🔊',
        title: 'ASMR Crunch',
        objective: 'Sensory / Engagement',
        stats: { views: '22.1k', likes: 1600 },
        visualMediaUrl: 'https://i.imgur.com/eFF0hY7.mp4',
        downloadUrl: 'https://drive.google.com/file/d/1_xhcXq9NKFXcjNQtb91ZBBL8Swyaz8r_/view?usp=sharing',
        copy: "Oddly satisfying? No, just delicious. 🤤🔊\n\nTurn your volume UP. 🔉 That crunch you hear? That’s the sound of premium, high-quality chocolate hitting the scoop. No plastic, no fake stuff. Just real cocoa and the perfect texture.\n\n👇 Rate this crunch from 1 to 10!",
        hashtags: ['#ASMR', '#OddlySatisfying', '#ChocolateCrunch', '#FoodPorn']
    },

    // Monday 15: COTW - Milk vs Dark (Opens Week 3)
    {
        id: 15,
        type: 'carousel',
        day: 'Mon Dec 15',
        imageType: 'gradient-2',
        icon: '🍫',
        title: 'COTW: Milk vs Dark',
        objective: 'Product / Dilemma',
        stats: { views: '4.2k', likes: 310 },
        media: [
            { type: 'image', url: 'https://i.imgur.com/nKwHMRD.jpeg', downloadUrl: 'https://drive.google.com/open?id=1OLQUnHlwqjHgeMXXlxqK31Qe5howm1Vd&usp=drive_fs' },
            { type: 'image', url: 'https://i.imgur.com/pNXkm8B.jpeg', downloadUrl: 'https://drive.google.com/open?id=1hAayyLCJrE05vGpibFBSu5-kz4S7dLmH&usp=drive_fs' },
            { type: 'video', url: 'https://i.imgur.com/YTOeAIV.mp4', downloadUrl: 'https://drive.google.com/open?id=1JHPCLdXeLfWIKpOuLAu5NW5nj_QTtQyq&usp=drive_fs' }
        ],
        visualMediaUrl: 'https://i.imgur.com/nKwHMRD.jpeg',
        copy: "Team Milk 🆚 Team Dark. Why choose? 🍫⚖️\n\nLife is full of hard choices, but this bag shouldn't be one of them. Our Candy of the Week gives you the best of both worlds: ✨ Milk Chocolate: Creamy, sweet, and comforting. 🌑 Dark Chocolate: Rich, intense, and sophisticated. 🌰 The Core: A perfectly roasted, crunchy almond.\n\nThis is the ultimate power couple.\n\n👇 Which one do you fish out of the bag first?",
        hashtags: ['#TeamMilk', '#TeamDark', '#ChocolateLover', ...GLOBAL_HASHTAGS.slice(0, 6)]
    },
];

// Load posts from localStorage or use default
const loadPostsFromStorage = (): Post[] => {
  try {
    const stored = localStorage.getItem('captain-candy-posts');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading posts from localStorage:', error);
  }
  return FEED_DATA;
};

// Save posts to localStorage
const savePostsToStorage = (posts: Post[]) => {
  try {
    localStorage.setItem('captain-candy-posts', JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
  }
};

// Save feed to Netlify Blob Storage
const saveFeedToBlobStorage = async (feedId: string, posts: Post[]): Promise<boolean> => {
  try {
    const response = await fetch('/.netlify/functions/save-feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedId, posts }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error saving feed to Blob Storage:', error);
    return false;
  }
};

// Load feed from Netlify Blob Storage
const loadFeedFromBlobStorage = async (feedId: string): Promise<Post[] | null> => {
  try {
    const response = await fetch(`/.netlify/functions/get-feed?feedId=${feedId}`);
    const data = await response.json();
    
    if (data.success && data.posts) {
      return data.posts;
    }
    return null;
  } catch (error) {
    console.error('Error loading feed from Blob Storage:', error);
    return null;
  }
};

const useAppStore = create<AppState>((set, get) => ({
  posts: loadPostsFromStorage(),
  selectedPost: null,
  activeStoryCategory: null,
  feedId: null,
  saveStatus: { status: 'idle' },
  MAIN_DRIVE_FOLDER: MAIN_DRIVE_FOLDER,
  STORIES_DATA: STORIES_DATA,
  setSelectedPost: (post) => set({ selectedPost: post }),
  setActiveStoryCategory: (category) => set({ activeStoryCategory: category }),
  setFeedId: (feedId) => set({ feedId }),
  setPosts: (posts) => {
    savePostsToStorage(posts);
    set({ posts: posts });
    
    // Auto-save to Blob Storage if feedId exists
    const { feedId } = get();
    if (feedId) {
      set({ saveStatus: { status: 'saving', message: 'Guardando...' } });
      saveFeedToBlobStorage(feedId, posts)
        .then((success) => {
          if (success) {
            set({ saveStatus: { status: 'saved', message: 'Guardado en Netlify' } });
            // Reset to idle after 2 seconds
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'saved') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 2000);
          } else {
            set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'error') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 3000);
          }
        })
        .catch(err => {
          console.error('Failed to auto-save feed:', err);
          set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
          setTimeout(() => {
            const currentState = get();
            if (currentState.saveStatus.status === 'error') {
              set({ saveStatus: { status: 'idle' } });
            }
          }, 3000);
        });
    }
  },
  updatePost: (updatedPost) => {
    const state = get();
    const updatedPosts = state.posts.map((post) =>
      post.id === updatedPost.id ? { ...post, ...updatedPost } : post
    );
    savePostsToStorage(updatedPosts);
    set({ posts: updatedPosts });
    
    // Auto-save to Blob Storage if feedId exists
    if (state.feedId) {
      set({ saveStatus: { status: 'saving', message: 'Guardando...' } });
      saveFeedToBlobStorage(state.feedId, updatedPosts)
        .then((success) => {
          if (success) {
            set({ saveStatus: { status: 'saved', message: 'Guardado en Netlify' } });
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'saved') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 2000);
          } else {
            set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'error') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 3000);
          }
        })
        .catch(err => {
          console.error('Failed to auto-save feed:', err);
          set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
          setTimeout(() => {
            const currentState = get();
            if (currentState.saveStatus.status === 'error') {
              set({ saveStatus: { status: 'idle' } });
            }
          }, 3000);
        });
    }
  },
  deletePost: (postId) => {
    const state = get();
    const filteredPosts = state.posts.filter((post) => post.id !== postId);
    savePostsToStorage(filteredPosts);
    set({ posts: filteredPosts, selectedPost: null });
    
    // Auto-save to Blob Storage if feedId exists
    if (state.feedId) {
      set({ saveStatus: { status: 'saving', message: 'Guardando...' } });
      saveFeedToBlobStorage(state.feedId, filteredPosts)
        .then((success) => {
          if (success) {
            set({ saveStatus: { status: 'saved', message: 'Guardado en Netlify' } });
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'saved') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 2000);
          } else {
            set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
            setTimeout(() => {
              const currentState = get();
              if (currentState.saveStatus.status === 'error') {
                set({ saveStatus: { status: 'idle' } });
              }
            }, 3000);
          }
        })
        .catch(err => {
          console.error('Failed to auto-save feed:', err);
          set({ saveStatus: { status: 'error', message: 'Error al guardar' } });
          setTimeout(() => {
            const currentState = get();
            if (currentState.saveStatus.status === 'error') {
              set({ saveStatus: { status: 'idle' } });
            }
          }, 3000);
        });
    }
  },
  loadFeedFromBlob: async (feedId: string) => {
    const posts = await loadFeedFromBlobStorage(feedId);
    if (posts) {
      set({ posts, feedId });
      savePostsToStorage(posts);
    }
  },
  saveFeedToBlob: async (feedId: string, posts: Post[]) => {
    return await saveFeedToBlobStorage(feedId, posts);
  },
}));

export default useAppStore;
