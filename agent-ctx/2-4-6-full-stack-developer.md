# Task 2-4-6: Project Screenshots, SEO Meta Tags, Theme Persistence

## Work Log

### Task 1: Project Screenshot Previews

**`src/lib/data.ts`**
- Added `image?: string` to the `Project` interface
- Added `image` field to all 6 projects:
  - id 1 (Nexus Retail): `/projects/nexus-retail.png`
  - id 2 (TMS Lite PRO): `/projects/tms-lite.png`
  - id 3 (EnergyOS): `/projects/energyos.png`
  - id 4 (TradePro): `/projects/tradepro.png`
  - id 5 (Herdeiros do Einstein): `/projects/herdeiros.png`
  - id 6 (API Gateway Service): `/projects/api-gateway.png`

**`src/components/sections/projects.tsx`**
- Added `import Image from "next/image"`
- Added image preview block BEFORE the top accent line inside `ProjectCard`:
  - `aspect-video` container with `overflow-hidden`
  - `next/image` with `fill`, `object-cover`, hover scale 1.05 transition (500ms)
  - Responsive `sizes` attribute
  - Gradient overlay (`h-1/2 bg-gradient-to-t from-[var(--surface)] to-transparent`) at bottom for text readability
  - Conditional render: only shows when `project.image` exists

### Task 2: SEO Meta Tags

**`src/app/layout.tsx`**
- Enhanced `openGraph`:
  - Updated description to comprehensive Portuguese text with SAP mention and São Paulo
  - Updated `siteName` to "Raphael Freitas"
  - Added `images` array with avatar (400×400)
- Enhanced `twitter`:
  - Updated description to comprehensive Portuguese text
  - Added `images: ["/avatar.png"]`
- Added `robots: { index: true, follow: true }`

### Task 3: Theme Persistence

**Already configured correctly.** Verified:
- `ThemeProvider` has `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`
- `next-themes` persists to localStorage by default
- `enableSystem={false}` prevents system preference from overriding user choice

## Verification

- `bun run lint`: 0 errors
- Dev server: compiling cleanly, 200 responses
- Transient editorial-ticker module-not-found in log is a known Turbopack hot-reload race condition (file exists, not a real bug)