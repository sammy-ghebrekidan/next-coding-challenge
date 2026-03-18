# Michael's NextJS Coding Challenge

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run tests and linting with `npm run test` and `npm run lint`.

---

## Changes Made

### Code Cleanup
- Fixed broken and questionable tests, resolved TODOs throughout the codebase
- Removed inefficient code patterns and unused imports/components
- Consistent use of arrow functions and `Props` interfaces across components

### Checkout Page
- Created a checkout page at `/{locale}/checkout` displaying all cart items with quantities and a total item count
- Includes increment/decrement controls, remove item functionality, and an empty cart state
- "Continue shopping" link navigates back to the product listing

### Product API Migration
- Migrated to the new product API (`/api/products`) with server-side fetching so products are available immediately on page load with no loading spinners
- Integrated the more products endpoint (`/api/more-products`) using React `Suspense` so additional products stream in after the initial load

### Locale Support (UK & US)
- Dynamic routing via `[locale]` segment — `/uk` for GBP, `/us` for USD
- Centralised locale configuration in `src/config/locales.ts` — adding a new region is just adding an object
- Currency formatting via `Intl.NumberFormat` with locale-specific settings
- Middleware handles locale redirects (e.g. `/checkout` → `/uk/checkout`) so no duplicate route files are needed
- `generateStaticParams` pre-renders supported locale routes
- `generateMetadata` sets locale-aware page titles

---

## Additional Improvements

### Architecture & Scalability
- Implemented separation of concerns with a clear folder structure separating UI, logic, state, and services
- Barrel exports via `ui/index.ts` and `utils/index.ts` for clean imports
- Custom `usePanel` hook extracts panel open/close and click-outside logic from Cart
- Reusable `CartItemRow` shared between Cart dropdown and `CheckoutItems`
- Shared utilities (`formatItemCount`, `formatPrice`) replace duplicated string logic
- Middleware handles locale redirects centrally, removing duplicate route files

```
src/
├── app/                    # Routes (Next.js App Router)
├── components/             # UI components
│   └── ui/                 # Reusable primitives (CartItemRow, CheckoutItems, ProductListItem)
├── config/                 # App configuration (locales)
├── context/                # React context (CartContext)
├── hooks/                  # Custom hooks (useCart, usePanel)
├── lib/storage/            # localStorage utilities
├── screens/                # Page-level components (Checkout, PLP)
├── services/               # API calls (products)
├── types/                  # TypeScript types
├── utils/                  # Pure functions (cart, products)
└── middleware.ts            # Locale redirect middleware
```

### Performance
- `next/dynamic` with `ssr: false` for Cart and MoreProducts to reduce initial bundle size
- `memo()` on `CartItemRow` and `ProductListItem` to prevent unnecessary re-renders
- `useCallback` and `useMemo` in `CartContext` and `MoreProducts` for memoisation and reduced recomputation
- `priority` on the first product image for LCP optimisation, all others lazy loaded
- ISR caching (`revalidate: 60`) on the main products API

### Accessibility
- ARIA labels on interactive elements (cart toggle, quantity controls, remove buttons)
- `aria-live` regions for dynamic content (cart count, checkout total)
- `role="dialog"` with `aria-modal` on the cart panel
- Semantic HTML (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`)

### UI/UX
- Improved Cart panel UI to scale better with many products
- Responsive design using CSS Grid layout and media queries
- Applied system-level dark/light mode using existing CSS variables across components (Checkout, Cart, CheckoutItems, etc.)
- Improved checkout aesthetics while adhering to the existing CSS variable design guidelines

### Testing
- 69 tests across 15 test suites covering components, hooks, utils, services, config, and middleware
- Mocked Swiper, Next.js Image, and fetch for isolated unit tests

---

## Future Improvements

- **Pagination** — if the product catalogue grows, paginate the product list or implement infinite scroll
- **Sort & Filter** — sort by price/name/newest, filter by category or price range
- **Product Detail Page** — clicking a product card links to `/{locale}/products/{id}` with full description, images, and stock info
- **Breadcrumbs** — breadcrumb navigation (e.g. Home > Products > Product Name) for wayfinding and SEO
- **Categories** — group products by category with dedicated pages and navigation
- **Search** — search bar to filter products by name or keyword
- **Error Boundaries** — wrap key sections in React error boundaries for graceful failure handling
- **E2E Tests** — Playwright or Cypress tests for critical user flows (add to cart, checkout, locale switching)
