# Velora

Velora is a modern jewelry storefront and custom design experience built with Next.js, React, TypeScript, Tailwind CSS, Zustand, and Supabase.

## What this project includes
- Public storefront pages for shop, builder, about, contact, cart, checkout, wishlist, and profile
- An admin dashboard for products, orders, customers, analytics, inventory, coupons, and settings
- Supabase-backed data access for products, designs, orders, reviews, and user-related flows
- A custom jewelry builder experience with interactive UI

## Quick start

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Environment variables
Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scripts
- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — start the production build locally
- `npm run lint` — run ESLint

## Project structure
- `src/app` — page routes and app layouts
- `src/components` — reusable UI and feature components
- `src/lib` — helpers, utilities, and Supabase integration
- `src/stores` — Zustand state stores
- `src/types` — shared TypeScript types

## Notes for future AI or contributors
- This project uses the Next.js App Router.
- Supabase configuration is expected through `.env.local`.
- Keep `.env.local` private and do not commit it.
- If the app shows hydration warnings, they are usually caused by client-only values or animated math-generated styles.

## Deployment
This app can be deployed on Vercel or any platform that supports Next.js. Make sure to add the same Supabase environment variables in the deployment environment settings.
