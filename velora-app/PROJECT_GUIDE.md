# Velora Project Guide

## Purpose
This file is the main repository reference for future AI assistants, contributors, and maintainers. It captures the current architecture, setup steps, important files, and known implementation details so the project can be understood without needing to infer too much from the code.

## Project Summary
Velora is a jewelry storefront and custom jewelry builder experience. The application combines marketing pages, shopping flows, a design builder, and an admin dashboard.

## Current Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Zustand
- Lucide React

## Requirements
- Node.js 20+ recommended
- npm
- A Supabase project

## Local Development
From the project root:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is busy, Next.js may choose another port automatically.

## Environment Variables
Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values are used by the Supabase browser and server clients.

## Main Scripts
- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint

## Important File Locations
- `src/app` — routes, layouts, and pages
- `src/components` — reusable UI and feature components
- `src/lib` — utilities and Supabase integration
- `src/stores` — Zustand state stores
- `src/types` — shared TypeScript types
- `public` — static assets

## Key Routes
- Home: `src/app/page.tsx`
- Shop: `src/app/shop/page.tsx`
- Builder: `src/app/builder/page.tsx`
- Cart: `src/app/cart/page.tsx`
- Checkout: `src/app/checkout/page.tsx`
- Contact: `src/app/contact/page.tsx`
- About: `src/app/about/page.tsx`
- Admin: `src/app/admin/**`

## Supabase Integration
The project is wired to use Supabase for data access and auth-related flows.

Main files:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/middleware.ts`
- `src/lib/supabase/database.ts`
- `src/stores/auth-store.ts`

Expected database concepts include:
- `products`
- `beads`
- `categories`
- `designs`
- `orders`
- `order_items`
- `reviews`
- `addresses`
- `profiles`

## State and UI Notes
- Zustand is used for cart, auth, builder, and UI state.
- The UI uses custom styled components and Tailwind classes.
- Several pages are client components and may show hydration warnings when values differ between server and client render.

## Known Development Notes
- The app uses the Next.js App Router.
- The homepage and contact page were adjusted to avoid a hydration mismatch issue.
- The Next.js `middleware` warning is non-blocking for local development.

## Troubleshooting
### Dev server issues
- Check that Node.js and npm are installed
- Run `npm install` again if needed
- If a port is in use, Next.js may switch to another port

### Supabase issues
- Confirm `.env.local` exists and contains the correct values
- Restart the dev server after updating environment variables
- Confirm the Supabase URL and anon key are valid

### Build issues
- Run `npm run build` to see the exact problem
- Check TypeScript or import errors in the modified files

## Deployment Notes
The app can be deployed on Vercel or any host that supports Next.js. Add the same Supabase environment variables in the deployment environment settings.

## Expected Supabase Data Model
The app is written assuming these tables or entities exist in Supabase:

- `products` — catalog items for the shop
- `beads` — available builder materials
- `categories` — product or collection categories
- `designs` — saved or generated customer designs
- `orders` — customer order records
- `order_items` — items attached to each order
- `reviews` — product reviews
- `addresses` — saved shipping or billing addresses
- `profiles` — user profile metadata

If a table is missing, the app may fail when that route or feature is used. This is especially important for product listing, builder-related data, and checkout flows.

## Maintenance Guidance for Future AI Work
- Keep this guide updated when major features, routes, or data flows change.
- Prefer making small, focused changes.
- If new pages or major components are added, record them here.
- Keep `.env.local` private and never commit it.
- Use `.env.local.example` as the shared template for required environment variables.

## Common Bugs and Fixes
- Hydration mismatch warnings often come from client-only values or math-generated styles.
- A deprecated `selected` attribute on `<option>` should be replaced with a controlled `value` on `<select>`.
- If the dev server fails to start, confirm that no old Next.js process is still holding the port.
- If Supabase queries fail, verify the environment variables and the project URL/anon key are correct.

## Suggested Workflow for New Changes
1. Read this guide first.
2. Check the relevant route or component file.
3. Make the smallest change that solves the issue.
4. Re-run `npm run dev` or `npm run build` to verify.
5. Update this guide if a new pattern, route, or dependency is introduced.

## How to Add a New Page or Feature
1. Create the route in `src/app` using the App Router pattern.
2. Add reusable UI to `src/components` if it will be used more than once.
3. Put shared logic, API calls, or data access in `src/lib`.
4. If the feature needs state, add or update a Zustand store in `src/stores`.
5. Add the relevant TypeScript types in `src/types` if needed.
6. Test the route locally with `npm run dev` and verify that it works end to end.
7. Update this guide if the feature introduces a new dependency, flow, or route.
