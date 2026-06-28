# Fizzi — Premium Soda Landing Page

A modern, high-performance landing page for Fizzi premium soda, built with React, TypeScript, Tailwind CSS, and GSAP animations.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Advanced Animations**: GSAP ScrollTrigger, 3D rotations, parallax effects
- **Responsive Design**: Mobile-first approach with perfect UX across devices
- **Lazy Loading**: Optimized images for faster initial load
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Error Boundary**: Graceful error handling for production reliability
- **Performance**: Code splitting, minification, optimized builds

## 📋 Requirements

- **Node.js** 18+ (with npm or yarn)
- **Git** (optional, for version control)

## ⚙️ Installation

1. **Install Dependencies**
   ```bash
   cd app
   npm install
   ```

2. **Configure Environment** (optional)
   ```bash
   cp .env.example .env.local
   ```

## 🏃 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Navigation.tsx    # Main navigation with scroll detection
│   ├── BubbleBackground.tsx  # Animated bubble background
│   ├── SodaCan.tsx       # Soda can image component
│   ├── ErrorBoundary.tsx # Error handling component
│   └── ui/              # Radix UI components
├── sections/            # Page sections
│   ├── HeroSection.tsx   # Hero with floating cans
│   ├── FlavorsSection.tsx # Flavor showcase with parallax
│   ├── RotatingCanSection.tsx # 3D rotating can
│   ├── FlavorCarouselSection.tsx # Interactive flavor carousel
│   ├── FeatureSection.tsx # Product features
│   ├── MarqueeSection.tsx # Marquee text section
│   └── Footer.tsx        # Footer with links
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Root component with lazy loading
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Design System

### Colors
- **Primary Yellow**: `#F5E85C`
- **Lime**: `#D4E88D`
- **Blue**: `#D6EBF0`
- **Purple**: `#C8B8D8`
- **Dark Purple**: `#2D1F3E`
- **Coral**: `#E85D3E`

### Typography
- **Headings**: Fredoka (Bold)
- **Body**: Quicksand (Medium)

## 🚀 Performance Optimization

- **Code Splitting**: Lazy loaded sections for faster initial load
- **Image Lazy Loading**: `loading="lazy"` on all images
- **CSS Animations**: Hardware-accelerated CSS instead of JS
- **Bundle Optimization**: Tree-shaking, minification, terser compression
- **Error Handling**: Error Boundary prevents full app crash

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support (Arrow keys for carousel)
- Focus indicators on interactive elements
- Alt text for all images
- Screen reader support

## 🔧 Build Configuration

- **Vite**: Lightning-fast build tool
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code quality and consistency
- **GSAP**: Professional animations library

## 📦 Dependencies

- **react**: 19.2.0
- **react-dom**: 19.2.0
- **gsap**: 3.15.0 (with ScrollTrigger plugin)
- **tailwindcss**: 4.0.0+
- **typescript**: 5.7.0+
- **vite**: 6.0.0+
- **lucide-react**: Icon library

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GSAP Animations Not Working
Ensure ScrollTrigger plugin is registered in `main.tsx`:
```typescript
gsap.registerPlugin(ScrollTrigger)
```

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development Tips

1. **Hot Module Replacement**: Changes are reflected immediately in browser
2. **CSS Hot Reload**: Tailwind classes update without refresh
3. **Type Checking**: Use `npm run type-check` before commits
4. **Linting**: Fix issues with `npm run lint`

## 🎯 Production Deployment

1. Run `npm run build`
2. Deploy `dist/` folder to your hosting service
3. Set appropriate environment variables in production
4. Enable gzip compression on server
5. Configure CDN for optimal global delivery

---

Built with ❤️ for Premium Soda Excellence
