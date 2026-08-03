# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RESQIO Fire Safety Hub is a marketing/landing page website for a comprehensive fire department management system. Built with Vite, React, TypeScript, and shadcn/ui components, this site showcases various modules and features of the RESQIO platform for German-speaking fire departments (Feuerwehr).
## Development Commands

```bash
# Install dependencies (uses npm, but project supports bun as well)
npm i

# Start development server (Vite dev server on port 8080)
npm run dev

# Build for production (automatically regenerates sitemap first via prebuild)
npm run build

# Build in development mode (also regenerates sitemap)
npm run build:dev

# Manually regenerate public/sitemap.xml from module-data.ts
npm run generate-sitemap

# Manually regenerate public/llms.txt from module-data.ts + wissen-data.ts
npm run generate-llms

# Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver — not Google)
npm run indexnow

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

### Tech Stack
- **Build Tool**: Vite 5.x with React SWC plugin for fast compilation
- **Framework**: React 18.3 with TypeScript 5.8
- **Routing**: React Router DOM v6 (client-side routing)
- **UI Framework**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Styling**: Tailwind CSS with custom HSL-based theming
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components (auto-generated, don't manually edit)
│   ├── Header.tsx      # Main navigation with scroll detection
│   ├── Footer.tsx      # Site footer
│   └── *Section.tsx    # Landing page sections (Hero, Features, Pricing, etc.)
├── pages/              # Route pages
│   ├── Index.tsx       # Main landing page (composes all sections)
│   ├── ModulDetail.tsx # Dynamic module detail pages
│   ├── Impressum.tsx   # Legal imprint
│   ├── Datenschutz.tsx # Privacy policy
│   └── NotFound.tsx    # 404 page
├── data/
│   └── module-data.ts  # Central module definitions (all features/modules)
├── hooks/              # Custom React hooks
├── lib/
│   └── utils.ts        # Utility functions (cn for className merging)
└── App.tsx             # Root component with providers and routing
```

### Key Design Patterns

1. **Module Data Architecture**: All RESQIO modules are defined in `src/data/module-data.ts`. This single source of truth contains:
   - Module metadata (title, descriptions, keywords)
   - Benefits and features lists
   - Technical details
   - Icon and color associations
   - SEO metadata

2. **Route Structure**:
   - `/` - Main landing page (Index.tsx)
   - `/modul/:slug` - Dynamic module detail pages using module-data.ts keys
   - `/impressum` - Legal imprint
   - `/datenschutz` - Privacy policy
   - `*` - Catch-all 404 route

3. **Component Composition**: The Index page is composed of discrete section components (HeroSection, FeaturesSection, etc.) arranged sequentially. Each section is self-contained with its own styling and data.

4. **Scroll-based Navigation**: Header.tsx implements smooth scrolling to section IDs on the homepage using the `scrollToSection` function. Navigation links scroll to anchored sections rather than navigate to new routes.

5. **Dynamic Meta Tags**: ModulDetail.tsx updates document title, description, and keywords dynamically based on the module being viewed.

## Styling System

### Tailwind Configuration
- **Base Color**: Slate
- **Theme System**: HSL-based CSS variables (see `src/index.css`)
- **Custom Fonts**:
  - Sans: Poppins
  - Serif: Merriweather
  - Mono: JetBrains Mono
- **Custom Shadows**: Defined via CSS variables (--shadow-xs through --shadow-2xl)

### Color Palette
The site uses a custom color system defined in tailwind.config.ts with semantic naming:
- `background`, `foreground` - Base colors
- `primary`, `secondary` - Brand colors
- `muted`, `accent` - Supporting colors
- `card`, `popover` - Component backgrounds
- Each module in module-data.ts can have its own color (blue, amber, red, slate, etc.)

### Path Alias
- `@/` maps to `./src/` (configured in vite.config.ts and tsconfig.json)

## Important Files

### module-data.ts
Central data source for all RESQIO modules. When adding or modifying module information:
- Use the ModuleData interface
- Include all required fields: title, shortDesc, longDesc, benefits, features, icon
- Optional: technicalDetails, keywords (for SEO), color
- Slug is the object key in the modules record

### Header.tsx
- Implements sticky header with scroll detection
- Background blur and styling changes on scroll
- Scroll progress bar at bottom
- Mobile responsive menu
- Uses `scrollToSection` for smooth scrolling to anchored sections

### App.tsx
- Sets up QueryClient for TanStack Query
- Wraps app in TooltipProvider, Toaster, and Sonner
- Defines all routes with BrowserRouter
- **CRITICAL**: All custom routes must be added ABOVE the catch-all `*` route

## shadcn/ui Components

This project uses shadcn/ui components located in `src/components/ui/`. These are:
- Auto-generated via the shadcn CLI
- Based on Radix UI primitives
- Styled with Tailwind CSS
- Should not be manually edited; use the CLI to update/add components

Configuration: `components.json`

## Content Language

All user-facing content is in German (Deutsch). Maintain German language for:
- UI text, buttons, navigation
- Marketing copy, descriptions
- Meta tags, page titles
- Error messages

## Common Development Patterns

### Adding a New Module
1. Add module entry to `modules` object in `src/data/module-data.ts`
2. Choose appropriate icon from lucide-react
3. Module automatically appears in listings and is accessible via `/modul/{key}`
4. **Run `npm run generate-sitemap`** — the sitemap is NOT static; it is generated from `module-data.ts`. Forgetting this step means the new module page will NOT be indexed by Google.
5. Commit both `module-data.ts` AND the regenerated `public/sitemap.xml` together.

> Note: `npm run build` and `npm run build:dev` automatically call the sitemap generator via the `prebuild` hook, so CI/CD deployments always produce a fresh sitemap. Manual dev work requires running `npm run generate-sitemap` explicitly.

### Sitemap Auto-Generation
- **Script**: `scripts/generate-sitemap.cjs` (and `scripts/prerender.mjs` regenerates `dist/sitemap.xml` at build time)
- **Source of truth**: slug keys in the `modules` object in `src/data/module-data.ts` AND article keys in `src/data/wissen-data.ts`
- **Output**: `public/sitemap.xml` (homepage + /kreis + module pages + /wissen + article pages)
- **Excluded slugs**: `kreis-platform` (has a dedicated `/kreis` page, handled by a Vercel 301 redirect)
- **lastmod**: always set to today's date at generation time, so Google sees fresh dates after every build
- **NEVER edit `public/sitemap.xml` manually** — changes will be overwritten on the next build

### llms.txt Auto-Generation (AI-Sitemap)

`public/llms.txt` is the file ChatGPT, Claude, Perplexity & Co. read to understand what RESQIO is. It used to be hand-written and drifted badly from reality — 8 modules missing, a `/modul/wasserversorgung` URL for a page that never existed (the slug is `wasserkarte`), and no mention of `/wissen` at all. It is now generated.

- **Script**: `scripts/generate-llms.cjs`, wired into `prebuild` next to the sitemap generator
- **Source of truth**: `src/data/module-data.ts` (title, shortDesc, longDesc, first 6 `features`) and `src/data/wissen-data.ts`
- **Output**: `public/llms.txt` — all module pages + `/kreis` + `/wissen` articles + `/impressum` + `/datenschutz`
- **`kreis-platform`** is mapped to `/kreis` (same special case as the sitemap), so no dead URL is emitted
- **Editorial prose** (Über RESQIO, Preismodelle, Kernfunktionen, Technische Details, Kontakt) lives in the script — edit it there, not in the output
- **Pricing stays "auf Anfrage"** — `PricingSection.tsx` sets `price: ""`, so the site shows no figures. `llms.txt` must not reveal more than the website does; do not copy the numbers from the pricing table further down this file into it.
- **NEVER edit `public/llms.txt` manually** — changes will be overwritten on the next build

### IndexNow (Crawl-Anstoß für Bing & Co.)

- **Script**: `scripts/indexnow-submit.cjs`, manuell via `npm run indexnow` (bewusst NICHT im Build — jeder Build würde sonst alle URLs erneut melden)
- **Key-Datei**: `public/65d138ee65b0381ab594674033754b82.txt` — muss unter `https://resqio.de/<KEY>.txt` erreichbar sein und exakt den Key enthalten. Der Key ist kein Geheimnis, er belegt nur Schreibzugriff auf die Domain. Datei niemals umbenennen oder löschen, sonst schlägt jeder Submit mit 403 fehl.
- **Teilnehmer**: Bing (und damit Copilot), Yandex, Seznam, Naver. **Google nimmt an IndexNow nicht teil.**
- **Für Google** gibt es keinen programmatischen Weg mehr: `google.com/ping?sitemap=` antwortet 404, `bing.com/ping` antwortet 410 Gone — beide Endpunkte sind abgeschaltet. Die Indexing API ist auf `JobPosting` und `BroadcastEvent` beschränkt. Bleibt nur die Search Console: Sitemap neu einreichen und einzelne URLs über die URL-Prüfung.
- Das Script prüft vor dem Submit, ob die Key-Datei live ist und den richtigen Inhalt hat — schlägt sonst mit klarer Meldung fehl statt in einem 403 der API zu enden.

### Wissen / Ratgeber Section (SEO content)
- **Data source**: `src/data/wissen-data.ts` (articles as `Record<slug, WissenArticle>`)
- **Routes**: `/wissen` (listing, `src/pages/Wissen.tsx`) and `/wissen/:slug` (`src/pages/WissenArtikel.tsx`)
- Articles are prerendered by `scripts/prerender.mjs` (meta tags + Article/Breadcrumb JSON-LD) and included in the sitemap
- After adding/changing an article: run `npm run generate-sitemap` and commit `public/sitemap.xml` along with `wissen-data.ts`
- JSON-LD scripts use stable element IDs (`wissen-article-jsonld`, `homepage-faq-jsonld`): the client removes the prerendered script by ID before re-adding — never inject schema without reusing these IDs (duplicate schemas caused Search Console errors before)

### Analytics & Consent (DSGVO)
- GA4 is loaded ONLY after consent: `src/lib/consent.ts` + `src/components/ConsentBanner.tsx` (Google Consent Mode v2, default: denied — set inline in `index.html`)
- Never add `<script src="googletagmanager.com/...">` directly to `index.html`
- Conversion event: `trackEvent("generate_lead")` fires on successful contact form submit (`ContactSection.tsx`)

### Adding a New Section to Landing Page
1. Create component in `src/components/` as `{Name}Section.tsx`
2. Import and add to `src/pages/Index.tsx`
3. Add anchor ID for scroll navigation

### Adding shadcn/ui Components
Use the shadcn CLI (already configured via components.json):
```bash
npx shadcn@latest add [component-name]
```

## TypeScript Configuration

- Relaxed type checking: `noImplicitAny: false`, `strictNullChecks: false`
- Allow JavaScript files: `allowJs: true`
- Path aliases configured for `@/*`
- Skip lib checks for faster builds

## Build Output

Production builds go to `dist/` directory. The project is configured for static site deployment.

## API Endpoints

The contact form uses different handlers depending on deployment target:

| File | Runtime | Path | Notes |
|------|---------|------|-------|
| `api/contact.ts` | Vercel Edge Function | `/api/contact` | Primary — used by `ContactSection.tsx` |
| `public/api/contact.php` | Apache + PHP | `/api/contact.php` via `.htaccess` rewrite | Fallback for non-Vercel hosting |

**Always call `/api/contact`** from the frontend. The `.htaccess` rewrite maps this to `.php` on Apache, and Vercel routes it to the Edge Function automatically.

The API path `/api/` is blocked in `public/robots.txt` (`Disallow: /api/`) to prevent search engine crawlers from hitting the contact endpoint and generating 5xx errors in Google Search Console.

## SEO / Indexing Rules

- **sitemap.xml is auto-generated** — never edit it manually (see "Sitemap Auto-Generation" above)
- **robots.txt** (`public/robots.txt`) — `/api/` is disallowed for all bots; all public pages are allowed
- **Canonical URLs** — set dynamically in `ModulDetail.tsx` for each module page; set statically in `index.html` for the homepage. `createPage()` in `scripts/prerender.mjs` **removes** the static canonical from the template before inserting the page-specific one — every prerendered page must end up with exactly **one** `<link rel="canonical">`. Two conflicting canonicals make Google discard both.
- **`kreis-platform` slug** exists in `module-data.ts` but is excluded from the sitemap. Vercel serves a 301 redirect `/modul/kreis-platform` → `/kreis`. Do not add it to the sitemap.
- **After any content change to a page**, run `npm run generate-sitemap` and commit the updated `public/sitemap.xml` so Google sees a fresh `lastmod` date and re-crawls the affected page.
- **Every route MUST be prerendered.** `public/.htaccess` has no blanket SPA fallback any more — unknown URLs return a real `404` via `ErrorDocument 404 /404.html` instead of `200 /index.html` (soft 404). A new `<Route>` in `src/App.tsx` that is not also emitted by `scripts/prerender.mjs` will therefore return **404 in production**, even though it works in `npm run dev`. After adding a route, verify: `npm run build && ls dist/<route>/index.html`.
- **URL form is "no trailing slash"** — `.htaccess` sets `DirectorySlash Off` so `/kreis` serves the prerendered file directly with 200 (no 301 hop to `/kreis/`), and `/kreis/` 301-redirects to `/kreis`. Sitemap, canonicals and internal links must all use the slash-less form.

### Hosting reality (resqio.de)

The live site does **not** run on Vercel. It is a Plesk server (nginx → Apache, `X-Powered-By: PleskLin`), so `vercel.json` is currently inert and `public/.htaccess` is the file that actually governs routing. Two consequences:

- Phusion Passenger must stay disabled (`PassengerEnabled off` at the top of `.htaccess`) — otherwise it intercepts every non-file request and answers `500 Web application could not be started`.
- nginx serves static files directly and bypasses Apache, so the `mod_headers`/`mod_expires` blocks in `.htaccess` do **not** apply to them. Cache-Control and the security headers for static assets have to be configured server-side in Plesk.

## About RESQIO Platform

This website markets **RESQIO** - a comprehensive fire department management system (Feuerwehr-Verwaltungssoftware). RESQIO is the actual SaaS application, while this repository contains only the marketing/landing page.

### What RESQIO Does

RESQIO is an all-in-one platform for fire departments covering:
- **Equipment Management** (Ausrüstungsverwaltung): Inventory, maintenance, lifecycle tracking
- **Operations** (Einsatzmanagement): Mission documentation, exercises, reports
- **Personnel** (Personalverwaltung): Qualifications, training, availability analysis
- **Logistics**: Vehicle fleet, laundry, warehouse movements
- **Kiosk Mode**: Touchscreen-optimized interface for fire stations
- **AI Features**: Text optimization, personnel analysis, smart parsing
- **Enterprise**: MQTT integration, object plans (DIN 14095), digital ID cards

### Target Audience

German-speaking fire departments (Freiwillige Feuerwehr) with focus on:
- Municipalities < 5,000 inhabitants (All-in-One package)
- Municipalities < 10,000 inhabitants (Professional package)
- Cities and districts (Enterprise package)

### Pricing Tiers

| Package | Target | Annual Price |
|---------|--------|-------------|
| All in One | < 5,000 inhabitants | 399 € |
| Professional | < 10,000 inhabitants | 599 € |
| Enterprise | Cities/Districts | On request |

## Content Strategy & Documentation Sources

### Reference Documentation

The repository includes comprehensive German documentation about RESQIO features:

1. **WEBSITE_CONTENT.md** - Marketing copy for all modules (primary source for website content)
2. **FEATURES_DOKUMENTATION.md** - Detailed feature specifications (~1400 lines)
3. **HANDBUCH_ADMINISTRATOR.md** - Administrator handbook with technical details
4. **HANDBUCH_WARTUNG.md** - Maintenance management guide
5. **HANDBUCH_KI_FEATURES.md** - AI features handbook

### Using Documentation for Content Updates

When updating marketing copy or adding features:

1. **Check WEBSITE_CONTENT.md first** - This contains curated marketing descriptions for each module
2. **Reference FEATURES_DOKUMENTATION.md** - For technical accuracy and comprehensive feature lists
3. **Module naming conventions**:
   - Dashboard: "Kommandozentrale"
   - Equipment: "Gerätehaus & Technik"
   - Maintenance: "Wartungsmanagement"
   - Kiosk: "Kiosk-Modus"
   - Operations: "Einsätze & Übungen"
   - And 20+ additional modules

### Content Principles

- **Language**: All content in German (formal "Sie" form for business communication)
- **Tone**: Professional but accessible, emphasizing safety and efficiency
- **Keywords**: Focus on fire department terminology (DGUV, FwDV, DIN 14095, Atemschutz, etc.)
- **Benefits over features**: Emphasize "Mehrwert" (value) for fire departments
- **Real-world scenarios**: Reference actual use cases (Prüffristen, Einsatzbereitschaft, Wartung)

### Module Data Synchronization

When adding/updating modules in `module-data.ts`:
- Cross-reference with WEBSITE_CONTENT.md for accurate descriptions
- Maintain consistency between `shortDesc`, `longDesc`, and `benefits`
- Use appropriate icons from lucide-react (existing pattern: Map, AlertTriangle, FileText, Wrench, Users, etc.)
- Choose semantic colors that match the module's purpose

## Important Marketing Context

### Key Differentiators

RESQIO stands out through:
1. **All-in-One**: Complete solution, no need for multiple tools
2. **German Market Focus**: Compliance with DGUV, FwDV, DIN 14095
3. **Modern Tech Stack**: React 19, Node.js, MariaDB, Docker-ready
4. **AI Integration**: OpenAI-powered text optimization and analysis
5. **Kiosk Mode**: Tablet-optimized for on-site usage at fire stations
6. **Server Location**: Data hosted in Germany (DSGVO-compliant)

### Call-to-Actions

Primary CTAs throughout the site:
- "Jetzt Demo anfordern" (Request demo)
- "Angebot anfragen" (Request quote)
- "Kontakt aufnehmen" (Get in touch)

Contact: support@resqio.de

### SEO Keywords

Important terms for fire department market:
- Feuerwehr Software, Gerätewart, Wartungsplaner
- Einsatzverwaltung, Inventar, Ausrüstung
- DGUV, FwDV, DIN 14095, Atemschutz (AGT)
- Digitaler Dienstausweis, Kiosk-Modus
- Objektpläne, Hydrantenkarte
