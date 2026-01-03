# Revanths Gallery

A minimalist art gallery website built with Next.js, TypeScript, and Tailwind CSS. Features an admin dashboard for managing paintings, with support for featured artwork display and WhatsApp integration for inquiries.

## Features

- **Responsive Design**: Mobile-first design 
- **Hero Section**: Full-width video hero with smooth animations extending to navbar
- **Painting Gallery**: Database-driven paintings managed by admin
- **Static Collection**: 8 hard-coded paintings displayed on homepage
- **Admin Dashboard**: Add, edit, and delete paintings, set featured status, and upload images
- **Database Integration**: Supabase for paintings and admin authentication
- **WhatsApp Integration**: Direct inquiry button for customers
- **Minimalist UI**: Clean typography with elegant serif headings and sans-serif body text
- **Smooth Animations**: Scroll reveal and pop-in effects on initial load with viewport animations
- **Pop Effect**: Viewport animation on initial page load

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display (headings), Inter (body)
- **Database**: Supabase PostgreSQL
- **Authentication**: Custom email/password with bcrypt hashing (Supabase)
- **Storage**: Supabase Storage (image uploads)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project (for database)

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd revanths-gallery

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update environment variables with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=your_phone_number
# NEXT_PUBLIC_ADMIN_EMAIL=your_email

# Run database setup script in Supabase SQL editor
# Copy content from scripts/setup-database.sql and execute in Supabase

# Run development server
npm run dev
\`\`\`

Visit \`http://localhost:3000\` to see the site.

## Database Setup

### Step 1: Create Database Tables

In your Supabase project:
1. Go to SQL Editor
2. Create a new query
3. Copy and paste the entire content from \`scripts/setup-database.sql\`
4. Execute the query

This creates:
- **admins** table with your admin user (email: revanthacharya9481@gmail.com)
- **paintings** table for storing artwork

### Step 2: Update Admin Credentials

To change the admin password, generate a new bcrypt hash and update the admins table:

\`\`\`sql
UPDATE admins 
SET password_hash = '[new_bcrypt_hash]'
WHERE email = 'revanthacharya9481@gmail.com';
\`\`\`

## Project Structure

\`\`\`
revanths-gallery/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── globals.css         # Global styles and animations
│   ├── page.tsx            # Home page with static paintings + featured sections
│   ├── (public)/            # Public routes
│   │   ├── originals/       # Database paintings gallery
│   │   ├── about/           # About page
│   │   ├── commission-art/  # Commission page
│   │   ├── contact/         # Contact page
│   │   └── terms-of-service/# Terms page
│   ├── painting/
│   │   └── [slug]/          # Painting detail page
│   ├── login/               # Admin login
│   └── admin/               # Admin dashboard (protected)
├── components/
│   ├── navbar.tsx           # Navigation (transparent on homepage, white elsewhere)
│   ├── footer.tsx           # Footer component
│   └── ask-for-price-button.tsx # WhatsApp inquiry button
├── data/
│   └── static-paintings.ts  # 8 hard-coded paintings (always display on homepage)
├── lib/
│   └── types.ts             # TypeScript types
├── scripts/
│   └── setup-database.sql   # Database schema and admin user setup
└── public/
    ├── hero.mp4             # Hero video (recommended 1080p, 30fps)
    ├── artist-signature.png # Artist signature image
    └── static-paintings/    # Static painting images
\`\`\`

## Homepage Layout

The homepage displays in this order:

1. **Hero Video Section** - Full screen with CTA button
2. **First 4 Static Paintings** - From \`data/static-paintings.ts\`
3. **Artist Signature** - PNG image from public folder
4. **Featured Painting #1** - From database (admin marked as featured)
5. **Next 4 Static Paintings** - From \`data/static-paintings.ts\`
6. **Featured Painting #2** - From database (admin marked as featured)
7. **Connect with Us** - Instagram section
8. **Footer**

**Note**: Featured sections only appear once the admin adds paintings marked as featured in the dashboard.

## Originals Page

- Displays **only** paintings added by admin through the dashboard
- Empty state: "No Paintings Yet" message when no paintings exist
- Once admin adds paintings, they appear in a responsive grid
- Each painting shows status badge and "Ask for Price" button

## Admin Dashboard

### Login Credentials

Only the authorized admin email works:
- **Email**: revanthacharya9481@gmail.com
- **Password**: As set in database (initial bcrypt hash provided in setup-database.sql)

### Features

- **Manage Paintings**: Add, edit, delete paintings
- **Upload Images**: Main image and additional gallery images
- **Mark Featured**: Select up to 2 paintings to appear on homepage
- **Set Status**: Available, Sold, Not for Sale, Reserved
- **Edit Details**: Title, medium, dimensions, year, price, description

## Styling & Design

### Navbar Behavior

- **Homepage**: Transparent at top, hides on scroll down, reappears on scroll up with white background
- **Other Pages**: Always visible with white background

### Color Scheme

- Off-white background: \`oklch(0.99 0.001 0)\`
- Pure black text: \`oklch(0.15 0.02 0)\`
- Minimal use of color, focus on typography and whitespace

### Animations

- **Pop-in**: Initial page load with scale + opacity
- **Fade-up**: Content appears as you scroll
- **Viewport Pop**: Smooth transform animations on scroll reveal
- **Hover Effects**: Subtle scale and shadow transitions

## WhatsApp Integration

All "Ask for Price" buttons throughout the site:
- Open WhatsApp chat
- Pre-fill message with painting title
- Use phone number: +91 96636 08903

Configure in environment:
\`\`\`env
NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=919663608903
NEXT_PUBLIC_ADMIN_EMAIL=yourgmail@gmail.com
\`\`\`

## Environment Variables

Create \`.env.local\`:

\`\`\`env
# Supabase Configuration (Required for database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# WhatsApp Contact
NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=919663608903
NEXT_PUBLIC_ADMIN_EMAIL=revanthacharya9481@gmail.com
\`\`\`

## Performance Optimizations

- Image optimization with Next.js Image component
- CSS animations with GPU acceleration
- Lazy loading for painting galleries
- Smooth scrolling behavior
- Video preload caching for hero section
- Staggered animations for staggered reveal effect

## Mobile Responsive

- Hamburger menu for mobile navigation
- Stack layouts for smaller screens
- Touch-friendly button and link sizes
- Mobile-optimized video hero
- Responsive image sizing
- Optimized gap and padding for mobile

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Other Platforms

Environment variables needed on your hosting:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER
- NEXT_PUBLIC_ADMIN_EMAIL

## Support

For issues or questions:
- **Email**: revanthacharya9481@gmail.com
- **WhatsApp**: +91 96636 08903

## License

All rights reserved © 2025 Revanths Gallery


