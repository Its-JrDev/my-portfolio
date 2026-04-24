# My Portfolio

A portfolio website built with HTML, CSS, and JavaScript — perfect for learning how the three core web technologies work together.

## What is this project?

This is a **starter portfolio** that showcases what I've built while learning web development. It's a multi-page website with a unified design that runs entirely in the browser — no backend or database required.

The goal was to practice:
- Structuring content with HTML
- Styling pages with modern CSS
- Adding interactivity with vanilla JavaScript

## What's inside?

This portfolio includes **3 pages** that share the same header, footer, and design system:

1. **Home** (`index.html`) — Hero section, short bio, and contact form
2. **Projects** (`projects.html`) — Cards showing my web development projects
3. **My Pets** (`my_pets.html`) — Showcases my two real dogs (Max and Papi) alongside four fictional cartoon pets (Scooby-Doo, Courage, Perry the Platypus, and Charmander). Each pet has its own card with a photo/illustration and a short description.

## Quick start (for beginners)

**Option 1 — Just open it:**
1. Download or clone this repository
2. Double-click `index.html` — it will open in your browser
3. That's it! No installation needed

**Option 2 — Use a local server (recommended):**
```bash
# If you have Python installed:
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## File structure

```
my-portfolio/
├── index.html          ← Home page
├── projects.html       ← Projects page
├── my_pets.html        ← Pets page
├── css/
│   ├── styles.css      ← Shared styles (colors, fonts, layout)
│   ├── index.css       ← Home page styles
│   ├── projects.css    ← Projects page styles
│   └── my_pets.css     ← Pets page styles
├── js/
│   └── script.js       ← All interactive behavior
└── assets/
    ├── icons/          ← Social media icons
    └── illustrations/  ← Hero illustration
```

**Tip:** Each page loads `styles.css` first (the foundation), then its own page-specific stylesheet. This keeps shared code in one place.

## How the code is organized

This project uses **BEM naming** — a simple system that keeps CSS class names predictable:

- `.header` → a standalone component (Block)
- `.header__logo` → a piece inside the header (Element)
- `.btn--primary` → a variation of the button (Modifier)

**Real examples from the code:**
```html
<header class="header">
  <div class="header__logo">Its-JrDev</div>
  <a class="btn btn--primary header__link">Contact</a>
</header>
```

Why BEM helps:
- Easy to find related styles
- No guessing what a class does
- Safe to reuse components without conflicts

## Features (what you'll see)

- **Responsive design** — looks good on mobile, tablet, and desktop
- **Mobile menu** — hamburger button that opens on small screens
- **Sticky header** — navigation stays at the top when scrolling
- **Card components** — reusable design for projects and pets
- **Hover effects** — subtle animations when you hover over buttons and cards
- **Contact form** — validates input and shows a success message
- **Scroll to top** — appears after scrolling down
- **Page animations** — content fades in smoothly when a page loads

## Known limitations (what could be improved)

- Contact form doesn't send emails (no backend)
- Some project links are placeholders
- Images for Scooby, Courage, Perry, and Charmander are external illustrations (not my own photos)
- Animations could be optimized for performance

## Next steps I'm considering

- Connect the contact form to a service like Formspree or EmailJS
- Replace placeholder project links with actual live demos
- Add project filtering by technology (HTML, CSS, JavaScript)
- Implement a dark/light theme switcher

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills or build step required.

## Author

Jose David Romero Lara

---

**Note:** This is a learning project. The code is intentionally kept simple and well-commented to make it easy to understand and modify.
