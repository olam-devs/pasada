## PASADA Website (Next.js + Vercel-ready)

Modern redesign for PASADA (T) with a smooth, mobile-first UI and a CMS-ready structure for Sanity Studio (to be connected once your Sanity project is created).

### Tech

- Next.js App Router
- Tailwind CSS
- Embla Carousel (testimonials slider)
- Framer Motion (available for animations)
- Sanity client libs (CMS wiring pending)

### Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env.local` and fill later when your Sanity project is created:

```bash
cp .env.example .env.local
```

### Notes

- `/studio` is currently a placeholder page until Sanity Studio is embedded.
- Placeholder images live in `public/placeholder/` and should be replaced with real photos.

### Deploy (Vercel)

Push to GitHub and import into Vercel. Add env vars in Vercel once Sanity is ready.
