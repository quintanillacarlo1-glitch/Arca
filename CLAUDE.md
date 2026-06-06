# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint over the repo
- `npm run preview` — preview the production build

No test runner is configured.

## Architecture

This is a React 19 + Vite SPA branded as **Arca**, a marketplace for Texas industrial real estate. The package name (`warehouse-marketplace`) and the user-facing brand differ.

### Routing and state
- `src/main.jsx` wraps `<App/>` in `BrowserRouter` and `AppProvider`.
- `src/App.jsx` registers a single route: `/` → `Home`. `Navbar` is always rendered.
- `src/pages/MapView.jsx` exists but is **not wired into the router** — it's dead code kept around as a reference (it's also the only place Tailwind utility classes are actually used).
- `src/context/AppContext.jsx` loads the warehouse list once on mount and exposes `{ warehouses, filteredWarehouses, loading }`. There is no filtering logic — `filteredWarehouses` is just a copy of `warehouses`. The filter chips in `Home.jsx` set local `activeFilter` state but don't actually filter; treat them as UI scaffolding.

### Data layer
- `src/services/api.js` is **not a real API client**. It exports `fetchWarehouses`/`fetchWarehouseById` which return a hardcoded `mockWarehouses` array (100 Texas locations) after a `setTimeout` delay. `axios` is a dependency but unused. Edits to the dataset go directly in this file.
- Each warehouse shape: `{ id, type, price, price_unit, address, size, clear_height, dock_doors, latitude, longitude, features[], availability }`. `type` is one of `warehouse | distribution | cold-storage | manufacturing`.

### Map: Leaflet via CDN (not npm)
- Leaflet's CSS and JS are loaded from unpkg in `index.html` as `<link>`/`<script>` tags, exposing a global `L`.
- `src/components/WarehouseMapCDN.jsx` references that global `L` directly — there is **no `import` of leaflet** and no leaflet package in `package.json`. If you add map features, either keep using the CDN global (and add an eslint disable for `no-undef` if it fires) or migrate the whole component to an npm import — don't mix.
- The component manages markers and popups imperatively in `useEffect`s keyed off `warehouses` and `hoveredId`. Card↔marker hover sync is done by setting inline styles on `.arca-marker` DOM nodes by `data-id`, not via React state on the markers.

### Styling: mostly inline, Tailwind partially wired
- `tailwind`, `postcss`, `autoprefixer` are installed and `src/index.css` uses `@tailwind` directives.
- **`tailwind.config.js` is a directory, not a file**, containing `tailwind.config.js` and `postcss.config.js` inside it. PostCSS/Tailwind will not auto-discover configs in that location. Most of the app sidesteps this by using inline `style={{...}}` objects (see `Home.jsx`, `Navbar.jsx`, `WarehouseMapCDN.jsx`). If you need real Tailwind utility classes to work, move the configs to the project root first.
- Design system in practice (read from the inline styles): primary dark `#0A2540`, text `#1D1D1F`, muted `#86868B`, border `#E8E8ED`, surface `#FAFAFA`/`#FFFFFF`. Heavy use of `border-radius: 999px` pills, `cubic-bezier(0.4, 0, 0.2, 1)` transitions, and Inter font (loaded from Google Fonts in `index.html`).

### Conventions worth matching
- Components are `.jsx`, default-exported, function components with hooks. No TypeScript.
- New UI work should follow the existing inline-style pattern unless you're also fixing the Tailwind config situation.
- Listings card images come from a hardcoded Unsplash URL array in `Home.jsx` cycled by index — there's no per-warehouse image field.
