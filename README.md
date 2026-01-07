# Dream Big for Children (DBC) - Official Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mohamed-super-dumbuyas-projects/v0-dbc-sierra-leone-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/d4PV33tNRON)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

## About Dream Big for Children

Dream Big for Children (DBC) is a Sierra Leone-based nonprofit organization dedicated to transforming the lives of vulnerable children and youth through comprehensive programs in:

- **Education** - Providing quality learning opportunities and school supplies
- **Child Protection** - Safeguarding children from abuse, neglect, and exploitation
- **Health & Nutrition** - Ensuring access to healthcare and proper nutrition
- **Economic Empowerment** - Equipping youth with skills for sustainable livelihoods

**Our Motto:** *"Empowering Every Child to Dream, Grow, and Thrive"*

## Project Overview

This is the official website for Dream Big for Children, built with modern web technologies to provide a professional, engaging platform for sharing our mission, programs, and impact with supporters, partners, and the communities we serve.

### Key Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Framer Motion for elegant page transitions and interactions
- **SEO Optimized** - Comprehensive metadata and Open Graph tags for better discoverability
- **Program Pages** - Dedicated pages for each focus area with detailed information
- **Photo Gallery** - Showcasing our work and impact in the community
- **Google Analytics** - Integrated tracking for monitoring website performance
- **Accessibility** - Built with semantic HTML and ARIA labels

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Deployment:** Vercel
- **Analytics:** Google Analytics 4

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/dbc-website.git
cd dbc-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Analytics (replace with your actual GA4 measurement ID)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Project Structure

```
dbc-website/
├── app/                      # Next.js App Router pages
│   ├── programs/            # Individual program pages
│   │   ├── education/
│   │   ├── protection/
│   │   ├── health/
│   │   └── empowerment/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles & design tokens
├── components/              # React components
│   ├── navigation.tsx       # Header & navigation
│   ├── hero-section.tsx     # Homepage hero banner
│   ├── about-section.tsx    # About & mission section
│   ├── focus-areas.tsx      # Four focus areas grid
│   ├── gallery-section.tsx  # Photo gallery
│   ├── impact-stats.tsx     # Impact statistics
│   ├── donate-section.tsx   # Partnership & donation CTA
│   └── footer.tsx           # Footer with contact info
└── public/                  # Static assets
```

## Customization

### Updating Content

- **Hero Section:** Edit `components/hero-section.tsx`
- **Mission & Vision:** Edit `components/about-section.tsx`
- **Programs:** Edit individual pages in `app/programs/`
- **Impact Stats:** Edit `components/impact-stats.tsx`
- **Contact Info:** Edit `components/footer.tsx`

### Branding

Brand colors are defined in `app/globals.css`:

```css
--primary: #001F3F;      /* Navy Blue */
--primary-foreground: #FFFFFF;
--accent: #FDB813;       /* Gold */
--accent-foreground: #001F3F;
```

### Adding Google Analytics

Replace the placeholder in `app/layout.tsx` with your actual GA4 measurement ID:

```typescript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

### Replacing the Logo

Replace the placeholder logo in `components/navigation.tsx` with your actual logo file:

```tsx
<Image 
  src="/path-to-your-logo.png" 
  alt="DBC Logo"
  width={50}
  height={50}
/>
```

## Deployment

This project is automatically deployed to Vercel. Any changes pushed to the `main` branch will trigger a new deployment.

**Live Site:** [https://vercel.com/mohamed-super-dumbuyas-projects/v0-dbc-sierra-leone-website](https://vercel.com/mohamed-super-dumbuyas-projects/v0-dbc-sierra-leone-website)

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Future Enhancements

- [ ] Newsletter subscription integration
- [ ] Contact form with email notifications
- [ ] Online donation integration (Monime.io)
- [ ] Blog/News section for updates and stories
- [ ] Testimonials from beneficiaries and partners
- [ ] Multi-language support (English, Krio)
- [ ] Volunteer application portal

## Contact

**Dream Big for Children (DBC)**  
Freetown, Sierra Leone

- **Phone:** +232 78 001 233 | +232 88 001 233
- **Email:** dreambigforchildren@gmail.com | info@dreambigforchildren.org
- **Website:** www.dreambigforchildren.org

## Contributing

This project is maintained by the DBC team. For suggestions or issues, please contact the development team.

## License

Copyright © 2025 Dream Big for Children. All rights reserved.

---
