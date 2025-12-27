# 🍬 Captain Candy Manager - Instagram Planner

> Professional Instagram content planner with drag & drop, dual URLs, and client preview mode.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## ✨ Features

- 📅 **Visual Date Picker** - Intuitive calendar for scheduling posts
- 🎯 **21 Marketing Objectives** - Pre-defined + custom objectives
- 🎠 **Advanced Carousel Support** - Up to 10 media items with dual URLs
- 🔗 **Dual URL System** - Separate URLs for preview and high-quality download
- 🖱️ **Drag & Drop** - Reorder posts and carousel items
- 👁️ **Client View Mode** - Share-ready presentation mode
- 📤 **Export/Import** - JSON backup and sharing
- 💾 **Auto-save** - LocalStorage persistence
- 🎨 **Beautiful UI** - Instagram-like interface

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/napobuilder/instagram-planner.git
cd instagram-planner

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5174

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🌐 Deploy to Netlify

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select this repository
5. Build settings are auto-configured via `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📖 Usage

### Editor Mode (Default)

Create, edit, and organize your Instagram content:

1. **Create Posts**: Click "New Post" button
2. **Upload Media**: Drag & drop or paste URLs
3. **Dual URLs**: 
   - Visualization URL (for app preview)
   - Download URL (high-quality, e.g., Google Drive)
4. **Carousel**: Add up to 10 items, reorder with drag & drop
5. **Schedule**: Use date picker to set post date
6. **Objectives**: Choose from 21 marketing objectives
7. **Export**: Download JSON for backup or sharing

### Client View Mode

Share with clients using:
```
https://your-app.netlify.app/?mode=view
```

Or with specific feed:
```
https://your-app.netlify.app/?mode=view&feed=https://files.catbox.moe/your-feed.json
```

## 🎯 Marketing Objectives

- Brand Awareness
- Engagement
- Lead Generation
- Sales / Conversions
- Product Launch
- Product / Niche
- Product / Highlight
- Educational Content
- Behind the Scenes
- User Generated Content
- Social Proof / Testimonials
- Seasonal / Holiday
- Viral / Trending
- And more...

## 🔧 Configuration

### Netlify Functions

The app includes serverless functions for file uploads:
- Located in `netlify/functions/`
- Automatically deployed with your site
- No additional configuration needed

### Environment Variables (Optional)

Create a `.env` file if you need custom configuration:

```env
# Add any environment variables here
```

## 📂 Project Structure

```
instagram-planner/
├── netlify/
│   └── functions/
│       └── upload.js          # Upload proxy function
├── src/
│   ├── components/
│   │   ├── CreatePostModal.tsx
│   │   ├── EditPostModal.tsx
│   │   ├── PostViewModal.tsx
│   │   ├── FileUploader.tsx
│   │   ├── FeedGrid.tsx
│   │   └── ...
│   ├── store/
│   │   └── useStore.ts        # Zustand state management
│   └── utils/
│       └── uploadHelpers.ts
├── netlify.toml               # Netlify configuration
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Drag & Drop**: dnd-kit
- **Icons**: Lucide React
- **Deployment**: Netlify + Functions

## 📝 Workflow Example

### For Content Creators:

1. Create posts in editor mode
2. Upload media to Catbox.moe for preview
3. Upload high-res to Google Drive for download
4. Export JSON
5. Share with client using URL

### For Clients:

1. Open shared URL
2. View beautiful Instagram preview
3. Download high-quality files
4. No editing capabilities (view-only)

## 🎨 Customization

### Adding Custom Objectives

Edit `src/components/CreatePostModal.tsx`:

```typescript
const MARKETING_OBJECTIVES = [
  'Your Custom Objective',
  // ... other objectives
];
```

### Styling

Tailwind classes can be customized in any component file.

## 🐛 Troubleshooting

### Upload Issues

If uploads fail, use manual upload:
1. Upload to https://catbox.moe
2. Paste URL in "Permanent URL" field

### LocalStorage Full

Export JSON and clear old posts:
```javascript
localStorage.clear()
```

Then import your JSON backup.

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for content creators and marketers.
