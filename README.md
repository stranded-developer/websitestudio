# websitestudio.id — Website Source Files

## Folder Structure

```
websitestudio/
├── index.html          ← Home page
├── work.html           ← Portfolio / Examples
├── pricing.html        ← Pricing packages
├── contact.html        ← Contact + enquiry form
│
├── css/
│   ├── main.css        ← Global styles, navbar, footer, buttons
│   ├── home.css        ← Hero, frame sequence, about sections
│   ├── work.css        ← Portfolio grid + video modal
│   ├── pricing.css     ← Pricing cards, FAQ, add-ons
│   └── contact.css     ← Contact form + layout
│
├── js/
│   ├── nav.js          ← Shared: navbar scroll, cursor, reveal animations
│   ├── home.js         ← Particle canvas + 240-frame scroll animation
│   ├── work.js         ← Portfolio filter tabs + video modal
│   ├── pricing.js      ← Billing toggle + FAQ accordion
│   └── contact.js      ← Enquiry form → WhatsApp redirect
│
└── assets/
    └── images/
        ├── favicon.svg
        └── seq/        ← Drop your 240 frames here (frame_001.jpg … frame_240.jpg)
```

---

## Quick Setup

1. **Open locally**: Just double-click `index.html` — no build step needed.
2. **Deploy**: Upload all files to any hosting (Hostinger, Niagahoster, Vercel, Netlify, etc.)

---

## Customisation Checklist

### 1. Your WhatsApp Number
Find and replace all occurrences of `6281234567890` with your real number.
Files to update: `index.html`, `work.html`, `pricing.html`, `contact.html`, `js/contact.js`

### 2. Your 240 Frame Sequence
- Name your frames: `frame_001.jpg`, `frame_002.jpg` … `frame_240.jpg`
- Drop them all into `assets/images/seq/`
- In `js/home.js`, find the comment `REAL IMAGES BLOCK` and follow instructions to uncomment it

### 3. Add Your Portfolio Videos
For each work card in `work.html`, add `data-video="path/to/your-video.mp4"` to the `<article>` tag.
Example: `<article class="work-card" data-video="assets/videos/project-moda.mp4" …>`

### 4. Pricing
Update the Rupiah amounts in `pricing.html` to match your actual rates.

### 5. Contact Info
Update email, phone, hours, and social links in `contact.html`.

---

## Fonts Used
- **Syne** (headings) — Google Fonts
- **DM Sans** (body) — Google Fonts

Both load automatically from Google Fonts CDN. No installation needed.

---

## Browser Support
Chrome, Safari, Firefox, Edge — all modern browsers. IE not supported.
