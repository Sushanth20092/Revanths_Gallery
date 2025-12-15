# Revanths Gallery Setup Guide

## Initial Setup

### 1. Clone & Install

\`\`\`bash
git clone <repository-url>
cd revanths-gallery
npm install
\`\`\`

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

\`\`\`env
# Admin Contact Information (Required)
NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=919663608903
NEXT_PUBLIC_ADMIN_EMAIL=revanthacharya9481@gmail.com

# Supabase (Optional - when adding database)
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_key
\`\`\`

### 3. Add Painting Images

Place your artwork images in these directories:

- **Static paintings** (hard-coded 8): `/public/`
- Examples:
  - `/public/abstract-painting-horizon.jpg`
  - `/public/landscape-painting-nature.jpg`
  - `/public/modern-geometric-art.jpg`
  - etc.

### 4. Add Hero Video

Place your hero video: `/public/hero.mp4`

### 5. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000`

## Demo Credentials

**Admin Login** (temporary mock auth):
- Email: `admin@revanthsgallery.com`
- Password: `admin123`

## File Structure

\`\`\`
revanths-gallery/
├── app/
│   ├── layout.tsx                 # Root layout with fonts
│   ├── globals.css                # Global styles & animations
│   ├── page.tsx                   # Home page
│   ├── (public)/
│   │   ├── originals/             # Gallery collection
│   │   ├── about/                 # Artist bio
│   │   ├── commission-art/        # Custom commission form
│   │   ├── contact/               # Contact page
│   │   └── terms-of-service/      # Legal terms
│   ├── painting/
│   │   └── [slug]/                # Painting detail page
│   ├── login/                     # Admin login
│   └── admin/
│       ├── page.tsx               # Admin dashboard
│       └── paintings/             # Painting management
│
├── components/
│   ├── navbar.tsx                 # Sticky navigation
│   ├── footer.tsx                 # Site footer
│   └── ask-for-price-button.tsx   # WhatsApp inquiry button
│
├── data/
│   └── static-paintings.ts        # Hard-coded 8 paintings
│
├── lib/
│   └── types.ts                   # TypeScript interfaces
│
├── public/
│   ├── hero.mp4                   # Hero section video
│   ├── static-paintings/          # Individual painting images
│   └── [other assets]
│
├── .env.example                   # Environment template
├── .env.local                     # Local env variables (not committed)
├── README.md                      # Project documentation
├── SETUP_GUIDE.md                 # This file
└── DEPLOYMENT.md                  # Deployment instructions
\`\`\`

## Customization

### Change Gallery Name
- Update "Revanths Gallery" → Search and replace in:
  - `app/layout.tsx` (metadata)
  - `components/navbar.tsx`
  - `components/footer.tsx`
  - `data/static-paintings.ts` comments

### Update Contact Information
Edit in `.env.local`:
- `NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_ADMIN_EMAIL`

### Modify Theme Colors
Edit `app/globals.css`:
- Change CSS variables in `:root` and `.dark` sections
- Adjust font sizes, spacing, or animations

### Update Static Paintings
Edit `data/static-paintings.ts`:
- Add/remove painting entries
- Update image paths to match files in `/public/`
- Modify title, medium, status for each painting

## Features Overview

### Public Features
- ✅ Responsive gallery with 8 static paintings
- ✅ Hero section with video background
- ✅ Featured paintings from database (2 sections on home)
- ✅ Painting detail pages with image gallery
- ✅ WhatsApp integration for inquiries
- ✅ About artist page
- ✅ Commission request form
- ✅ Contact page with multiple channels
- ✅ Pop-in animations on page load
- ✅ Smooth scroll animations
- ✅ Mobile-responsive design

### Admin Features
- ✅ Secure login system
- ✅ Painting management (CRUD operations)
- ✅ Set featured paintings for homepage
- ✅ Manage painting status (Available, Sold, Reserved, Not for Sale)
- ✅ Dashboard with statistics
- ✅ Responsive admin interface

## Next Steps

### To Add Database (Supabase)
1. Create Supabase account
2. Create project and database
3. Run migration scripts from `/scripts/` folder
4. Update `.env.local` with Supabase credentials
5. Replace mock data fetching with Supabase queries

### To Deploy
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy with one click

### To Go Live
1. Configure custom domain in Vercel
2. Set up SSL certificate (automatic with Vercel)
3. Update social media links
4. Test all contact forms and WhatsApp links

## Troubleshooting

### Images Not Loading
- Check `/public/` folder for correct filenames
- Verify paths match exactly in `data/static-paintings.ts`
- Ensure image formats are supported (JPG, PNG, WebP)

### WhatsApp Links Not Working
- Verify `NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER` format (should start with country code, no +)
- Test link: `https://wa.me/919663608903?text=test`

### Admin Login Not Working (when upgrading to Supabase)
- Replace mock localStorage auth with Supabase auth
- Import `@supabase/ssr` package
- Follow Supabase auth documentation

## Support

For issues or questions:
- Email: revanthacharya9481@gmail.com
- WhatsApp: +91 96636 08903
- GitHub Issues: [Your repo]

---

Happy selling! 🎨
