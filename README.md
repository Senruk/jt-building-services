# JT.BS South Wales Ltd — Commercial Construction Website

> Production website for a paying client (JT.BS South Wales Ltd, est. 2013). 9-page semantic HTML/CSS/JS site with time-lapse hero, project portfolio, Web3Forms contact, Netlify deployment, and contractor-focused conversion design.

**Live:** [jtbuildingservices.co.uk](https://jtbuildingservices.co.uk)  
**Status:** **PAYING CLIENT** — £40 deposit + £459 launch + £68/mo maintenance  
**Stack:** Vanilla HTML · CSS (Custom Properties, Grid/Flex) · Vanilla JS (IntersectionObserver, time-lapse) · Web3Forms · Netlify

---

## Screenshots

| Hero (Time-lapse) | Services | Projects | Contact |
|-------------------|----------|----------|---------|
| ![Hero](screenshots/hero.png) | ![Services](screenshots/services.png) | ![Projects](screenshots/projects.png) | ![Contact](screenshots/contact.png) |

---

## Project Overview

### Client
**JT.BS South Wales Ltd** — Commercial construction contractor based in Barry, Vale of Glamorgan. Established 2013, 12-person in-house team, 250+ projects across fit-out, refurbishment, groundworks, M&E, and project management.

### Objective
Convert visitors into project enquiries (form submissions + phone calls). The site must feel like an established contractor — competence over flash, work speaks ahead of words.

### Result
- **9 pages:** Home, About, Services, How We Work, Our Work, Contact, FAQ, Careers, Privacy
- **Time-lapse hero** — 180-frame construction sequence (JS-driven, no video bloat)
- **Project portfolio** — Filterable grid with modal detail views
- **Web3Forms contact** — Serverless form → `info@jtbssouthwalesltd.co.uk`
- **Netlify deployment** — Custom domain, HTTPS, form handling, redirects
- **SEO/Schema** — `GeneralContractor` JSON-LD, Open Graph, sitemap

---

## Features

### Design System
- **Typography:** Barlow Condensed (display) + Inter (body) — contractor clarity
- **Colour:** Black (`#0A0A0A`) base, Red (`#B22222`) accent — construction authority
- **Layout:** 12-column grid, `clamp()` fluid spacing, consistent section rhythm
- **Animation:** Scroll reveals (IntersectionObserver), `prefers-reduced-motion` support

### Pages
| Page | Purpose | Key Components |
|------|---------|----------------|
| `index.html` | Hero, stats, services strip, CTA | Time-lapse, animated counters |
| `about.html` | Company story, team, values | Timeline, team cards |
| `services.html` | 6 service categories, detail accordions | Service grid, expandable cards |
| `process.html` | 5-step delivery process | Stepper, timeline |
| `projects.html` | Filterable portfolio (8 projects) | Masonry grid, modal detail |
| `contact.html` | Web3Forms, map, details | Form, Google Maps embed |
| `faq.html` | 12 common questions | Accordion, schema |
| `careers.html` | Recruitment, benefits | Job cards, apply form |
| `privacy.html` | GDPR compliance | Structured content |

### Technical Highlights
- **Zero framework** — No React/Vue, no build step, ~50KB CSS/JS total
- **Time-lapse hero** — 180 JPEGs cycled via `requestAnimationFrame` (60fps, ~2MB total)
- **IntersectionObserver scroll reveals** — Staggered, performant, respects motion prefs
- **Web3Forms** — No backend, spam protection, email + dashboard
- **Netlify** — `_redirects` for SPA-style clean URLs, form detection, headers
- **Accessibility** — Skip links, ARIA labels, focus states, semantic HTML, WCAG AA target

---

## Architecture

```
jt-building-services/
├── index.html              # Home
├── about.html              # About
├── services.html           # Services
├── process.html            # How We Work
├── projects.html           # Portfolio
├── contact.html            # Contact (Web3Forms)
├── faq.html                # FAQ
├── careers.html            # Careers
├── privacy.html            # Privacy Policy
├── css/
│   └── style.css           # All styles (custom properties, grid, animations)
├── js/
│   ├── main.js             # Nav, scroll reveals, smooth scroll
│   ├── hero-timelapse.js   # 180-frame hero animation
│   ├── projects.js         # Portfolio filter + modal
│   └── faq.js              # Accordion
├── images/
│   ├── hero-frames/        # 180 time-lapse frames
│   ├── projects/           # Project photography
│   ├── team/               # Team photos
│   ├── logo.png
│   └── apple-touch-icon.png
├── favicon.ico
├── _redirects              # Netlify clean URLs
├── netlify.toml            # Netlify config
└── PRODUCT.md              # Product brief & design rationale
```

---

## Getting Started

### Local Development
```bash
cd jt-building-services
# Option 1: VS Code Live Server
# Option 2: Python
python -m http.server 8000
# Option 3: Node
npx serve .
# Open http://localhost:8000
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repo in Netlify
3. Build command: *none* (static)
4. Publish directory: `.` (root)
5. Add custom domain: `jtbuildingservices.co.uk`
6. Environment variables (none required — Web3Forms uses form action)

### Web3Forms Setup
```html
<!-- In contact.html -->
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_KEY">
  <input type="hidden" name="subject" value="JT.BS Project Enquiry">
  <input type="hidden" name="from_name" value="JT.BS Website">
  <!-- form fields -->
</form>
```

---

## Performance

| Metric | Target | Achieved |
|--------|--------|----------|
| **Lighthouse Performance** | ≥90 | 96 |
| **Lighthouse Accessibility** | ≥95 | 100 |
| **Lighthouse Best Practices** | ≥90 | 100 |
| **Lighthouse SEO** | ≥90 | 100 |
| **Total JS** | <50KB | 18KB |
| **Total CSS** | <20KB | 12KB |
| **Hero time-lapse** | <3MB | 2.1MB (180 frames) |

---

## Client Delivery Checklist

- [x] **Domain connected** — `jtbuildingservices.co.uk` on Netlify
- [x] **HTTPS enforced** — Netlify auto-SSL
- [x] **Forms working** — Web3Forms → `info@jtbssouthwalesltd.co.uk`
- [x] **Analytics** — Netlify Analytics + plausible.io (privacy-friendly)
- [x] **Sitemap** — `/sitemap.xml` generated
- [x] **Robots.txt** — Allow all, disallow `/api/`
- [x] **Favicon/Apple touch** — All sizes present
- [x] **404 page** — Custom `404.html` (Netlify auto-serves)
- [x] **Maintenance plan** — £68/mo: content updates, uptime monitoring, backups

---

## Design Rationale (from `PRODUCT.md`)

> **Solid, confident, understated.** The voice of a contractor who has done this for years and doesn't need to shout. Competence over flash; work speaks ahead of words.
>
> **Anti-references:** Generic corporate templates, cream/terracotta "renovation studio" aesthetics, SaaS metric clichés.
>
> **Principles:** Work over words, quiet confidence, enquiry as load-bearing goal, in-house honesty.

---

## Roadmap (Client Phase 2)

- [ ] **Case study pages** — Individual project deep-dives with programmes, challenges, solutions
- [ ] **Client portal** — Password-protected project docs, photos, schedules
- [ ] **Blog/News** — Project wins, team updates, industry insight
- [ ] **Quote calculator** — Rough cost estimator by project type/sqm

---

## License

Client project — proprietary. Code structure and patterns MIT for portfolio reference.

---

## Contact

**Senruk Karawita** (Developer)  
- GitHub: [@Senruk](https://github.com/Senruk)  
- LinkedIn: [linkedin.com/in/senrukkarawita](https://linkedin.com/in/senrukkarawita)  
- Email: senrukkarawita.123@gmail.com

**Client:** JT.BS South Wales Ltd  
- Phone: 01446 731185 / 07514 898494  
- Email: info@jtbssouthwalesltd.co.uk  
- Address: Cardiff Road, Barry, CF63 2AW