# Deployment Guide

## Vercel Deployment

This project is optimized for deployment on Vercel. Follow these steps:

### Step 1: Connect Repository
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository

### Step 2: Environment Variables
Add the following environment variables in Vercel project settings:

\`\`\`env
NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER=919663608903
NEXT_PUBLIC_ADMIN_EMAIL=revanthacharya9481@gmail.com
\`\`\`

### Step 3: Deploy
- Vercel will automatically detect Next.js and configure the build
- Your site will be live at a `.vercel.app` domain
- Connect a custom domain in project settings

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000`

## Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Database Integration (Supabase)

When ready to connect Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add these environment variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
\`\`\`

3. Run the SQL scripts in `scripts/` folder to create tables
4. Replace mock data fetching with Supabase queries

## Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update contact info in environment variables if needed

## Performance Tips

- Images in `/public/static-paintings/` are optimized with Next.js Image component
- Use `next/image` for all product images
- Static pages are pre-rendered at build time
- Implement ISR (Incremental Static Regeneration) for frequently updated content

## Security

- Never commit `.env.local` to Git
- Keep Supabase API keys private
- Use Row Level Security (RLS) policies in Supabase
- Validate all form inputs server-side
