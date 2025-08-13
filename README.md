# 🎬 DOOM VIP IPTV

A modern, responsive IPTV service website built with Next.js 15, featuring multi-language support, dark mode, and premium user experience.

## Features

### 🌍 **Internationalization**
- Bilingual support (English LTR / Arabic RTL)
- Automatic locale detection and routing
- RTL layout support with proper text direction
- Localized content and metadata

### 🎨 **Modern Design System**
- Dark theme with emerald/cyan gradient accents
- Responsive grid system with mobile-first approach
- Smooth animations and hover effects
- Custom Tailwind CSS configuration
- Consistent spacing and typography

### ⚡ **Performance Optimizations**
- Next.js 14 App Router with server components
- Optimized images with lazy loading
- Dynamic imports for code splitting
- Resource preloading and prefetching
- Web Vitals tracking
- Service Worker support (production)

### ♿ **Accessibility Features**
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Skip navigation links
- Focus management and keyboard navigation
- Screen reader announcements
- High contrast support
- Reduced motion preferences

### 🔍 **SEO Optimization**
- Bilingual meta tags and descriptions
- OpenGraph and Twitter card support
- JSON-LD structured data (Organization, Product, FAQ)
- Automatic sitemap generation
- Robots.txt configuration
- Canonical URLs and hreflang tags

### 📞 **WhatsApp Integration**
- Direct ordering links with pre-filled messages
- Localized contact numbers
- Support chat integration
- Deep linking support

## Pages

- **Home** (`/`): Hero section, services overview, features, CTA
- **Pricing** (`/pricing`): Service plans with WhatsApp ordering
- **FAQ** (`/faq`): Interactive accordion with common questions
- **Contact** (`/contact`): Contact form and WhatsApp support
- **Legal Pages**: Refund Policy, Privacy Policy, Terms of Service

## Services

### DH PLUS VIP IPTV
- 15,000+ Channels
- 70,000+ VOD+
- 100% Uptime
- 7-day Money Back Guarantee
- Ready within 5–7 mins
- Plans: 6m ($9), 12m ($15), 24m ($25 + 6 months free)

### Doom VIP IPTV
- 11,000+ Live TV Channels
- 65,000+ Movies
- 11,500 TV Shows (VOD)
- 99.9% Uptime
- Anti-Freeze Technology
- EU/US Servers

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Fonts**: Inter (Latin), Noto Sans Arabic
- **Icons**: Heroicons (SVG)

## Setup & Installation

### Prerequisites
- Node.js 18+ installed on your system
- npm, pnpm, or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doom-vip-iptv
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Windows Users with Node.js Path Issues

If Node.js is installed but not in PATH (e.g., located at `C:\Program Files\nodejs`):

1. **Option 1: Add to PATH (Recommended)**
   - Open System Properties → Environment Variables
   - Add `C:\Program Files\nodejs` to PATH variable
   - Restart terminal and run `npm run dev`

2. **Option 2: Use full path**
   ```cmd
   "C:\Program Files\nodejs\npm.cmd" install
   "C:\Program Files\nodejs\npm.cmd" run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Home page
│   │   ├── pricing/       # Pricing page
│   │   ├── faq/          # FAQ page
│   │   ├── contact/      # Contact page
│   │   └── ...           # Other pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx    # Navigation with language switcher
│   │   ├── Footer.tsx    # Footer with links
│   │   └── ...
│   └── sections/         # Page sections
│       ├── Hero.tsx      # Hero section
│       ├── Services.tsx  # Services overview
│       ├── Features.tsx  # Features grid
│       └── ...
├── content/              # Content and configuration
│   ├── locales/         # Translation files
│   │   ├── en.json      # English translations
│   │   └── ar.json      # Arabic translations
│   └── site.config.ts   # Site configuration
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions
├── i18n.ts             # Internationalization config
└── middleware.ts       # Next.js middleware for i18n
```

## Configuration

### Site Configuration
All service data, pricing, and contact information is centralized in `src/content/site.config.ts`:

- Service statistics (channels, VOD, uptime)
- Pricing plans and special offers
- WhatsApp contact numbers
- Device compatibility
- SEO keywords

### Localization
Translations are stored in JSON files:
- `src/content/locales/en.json` - English content
- `src/content/locales/ar.json` - Arabic content

### Styling
- Tailwind CSS with custom configuration
- Dark theme with emerald/cyan accent colors
- Custom fonts: Inter (Latin) and Noto Sans Arabic
- Responsive design with mobile-first approach

## WhatsApp Integration

The website includes deep WhatsApp integration:
- Direct ordering links with pre-filled messages
- Support contact buttons
- Pricing plan specific messages
- Localized contact numbers

Contact: +1 (332) 266-2387

## SEO Features

- Bilingual meta tags and descriptions
- OpenGraph and Twitter card support
- JSON-LD structured data
- Sitemap.xml generation
- Robots.txt configuration
- Optimized images with alt text

## Deployment

The project is ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Build the project:
```bash
npm run build
```

## License

© 2025 Doom VIP & DH PLUS VIP IPTV. All rights reserved.

## Support

For technical support or questions about the website, please contact the development team.
For IPTV service support, contact via WhatsApp: +1 (332) 266-2387
