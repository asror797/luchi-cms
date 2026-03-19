# Diary of a Breastie — Website

## Project Overview
A 7-page website for **Diary of a Breastie** — a faith-integrated media and wellness platform for breast cancer survivors. Built with **Next.js 16 + Sanity CMS + Tailwind CSS**.

**Client:** Luchi (Upwork, $200 fixed-price)
**Preview:** https://luchi-cms.vercel.app/

---

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **CMS:** Sanity.io (headless CMS)
- **Styling:** CSS Modules (pixel-perfect match to HTML mockups)
- **Fonts:** DM Serif Display (headings) + DM Sans (body) via next/font/google
- **Deploy:** Vercel (planned)

---

## Sanity CMS Details
- **Project ID:** `xopzhvde`
- **Dataset:** `production`
- **Organization ID:** `oDRUC073b`
- **Studio URL:** `/studio` (embedded in Next.js app)
- **Plan:** Growth Trial (free)

### Sanity Schemas (9 total)
| Schema | Purpose | Pages |
|---|---|---|
| Site Settings | Hero text, host info, social/podcast links, Calendly | All pages |
| Podcast Episode | Episodes (featured, starter flags) | Homepage, Listen |
| Wellness Program | 3 tracks (survivor, women, org) with includes list | Homepage, Programs |
| Library Article | Substack articles (6 categories) | Library |
| Free Download | PDF downloads for email gate | Library |
| Testimonial | Quotes with page assignment (homepage/newsletter/programs) | 3 pages |
| Newsletter Issue | Past newsletter issues | Newsletter |
| FAQ Item | Questions and answers | Programs |
| Team Member | Host/team info with social links | About |

### Seed Data
All content from HTML mockups has been seeded. To re-seed:
```bash
npx tsx scripts/seed.ts
```

---

## 7 Pages

| # | Page | Route | Status |
|---|---|---|---|
| 1 | Homepage | `/` | CSS fixed (pixel-perfect) |
| 2 | Listen (Podcast) | `/listen` | Needs pixel-perfect fix |
| 3 | Breastie Library | `/library` | Needs pixel-perfect fix |
| 4 | Wellness Programs | `/programs` | Needs pixel-perfect fix |
| 5 | Newsletter | `/newsletter` | Needs pixel-perfect fix |
| 6 | About | `/about` | Needs pixel-perfect fix |
| 7 | Work With Me | `/work-with-me` | Needs pixel-perfect fix |

### What "pixel-perfect fix" means:
The initial agent-generated pages have wrong content text and CSS differences from the HTML mockups. Homepage was already fixed manually. Other 6 pages need the same treatment — rewrite CSS modules and JSX to match the original HTML files exactly (found in `/public/html/`).

---

## Project Structure
```
src/
  app/
    layout.tsx              Root layout (DM Sans + DM Serif Display fonts)
    globals.css             Tailwind + CSS custom properties (colors, fonts)
    page.tsx                Homepage (pixel-perfect done)
    page.module.css         Homepage styles
    listen/                 Listen page
    library/                Library page (client component - has filtering/modal)
    programs/               Wellness Programs page
    newsletter/             Newsletter page
    about/                  About page
    work-with-me/           Work With Me page
    studio/[[...tool]]/     Sanity Studio (CMS admin panel)
  components/
    Navbar.tsx              Fixed nav (pixel-perfect done)
    Navbar.module.css       Nav styles
    Footer.tsx              Footer (pixel-perfect done)
    Footer.module.css       Footer styles
  sanity/
    env.ts                  Sanity env vars
    schemas/                All 9 CMS schemas
      index.ts
      episode.ts
      wellnessProgram.ts
      libraryItem.ts
      download.ts
      testimonial.ts
      teamMember.ts
      newsletterIssue.ts
      faqItem.ts
      siteSettings.ts
    lib/
      client.ts             Sanity client
      image.ts              Image URL builder
      queries.ts            All GROQ queries
scripts/
  seed.ts                   Seed script for Sanity data
public/
  html/                     Original HTML mockups (reference files)
sanity.config.ts            Sanity Studio config
.env.local                  Environment variables (DO NOT COMMIT)
```

---

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xopzhvde
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=sk... (Editor token - keep secret)
```

---

## Design System (from HTML mockups)
### Colors
- Primary Pink: #D85A8A
- Dark Pink: #993356
- Pink Hover: #c44d7a
- Light Pink BG: #FCF0F5
- Pink Border: #F4C0D1
- Beige BG: #f7f7f5
- Text: #1a1a1a
- Text Light: #555
- Text Gray: #666
- Border: #e0e0e0
- Teal: #1D9E75 / #0F6E56
- Spotify Green: #1DB954
- YouTube Red: #FF0000
- Amazon Dark: #232F3E

### Typography
- Headings: DM Serif Display (serif)
- Body: DM Sans (sans-serif, 400/500)
- Max-width: 960px
- Borders: 0.5px solid (thin, elegant)

### Responsive Breakpoints
- Tablet: 768px
- Mobile: 480px

---

## TODO (Next Steps)
1. Fix remaining 6 pages pixel-perfect — match HTML mockups in /public/html/ exactly (CSS + content)
2. Connect Sanity data to frontend — replace hardcoded content with GROQ queries from sanity/lib/queries.ts
3. Integrations:
   - Calendly embed on Work With Me page
   - Email platform (Mailchimp/Kit) for newsletter signup + download forms
   - Contact form submission (email routing)
4. Deploy to Vercel — connect repo, set env vars
5. Add CORS origin for production domain on Sanity dashboard
6. Record CMS tutorial video for client

---

## Commands
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npx tsx scripts/seed.ts  # Seed Sanity with mockup data
```

---

## Client Notes
- Proposal mentioned "Webflow CMS" but building with Next.js + Sanity instead
- If client asks: "I upgraded the tech stack for better performance, faster loading, and same easy editing"
- Timeline: 3-4 days, Fixed price: $200
- Client wants: mobile-responsive, fast-loading, CMS-editable, Calendly/email/podcast integrations
- Sanity CORS origins configured: localhost:3000 (Allow credentials)
- Sanity token type: Editor (read+write)
