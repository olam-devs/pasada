/** Curated PASADA media URLs (from pasada.or.tz/uploads). */
export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    home: [
      "https://pasada.or.tz/uploads/service-1.jpg",
      "/brand/logo.jpg",
      "https://pasada.or.tz/uploads/project-featured-photo-8.jpg",
      "https://pasada.or.tz/uploads/service-3.jpg",
      "https://pasada.or.tz/uploads/project-featured-photo-9.jpg",
    ],
    about: "/brand/logo.jpg",
    services: "https://pasada.or.tz/uploads/service-2.jpg",
    projects: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    blog: "https://pasada.or.tz/uploads/service-9.jpg",
    contact: "https://pasada.or.tz/uploads/appointment_bg.jpeg",
    getInvolved: "https://pasada.or.tz/uploads/service-9.jpg",
    careers: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    donate: "https://pasada.or.tz/uploads/service-7.jpg",
  },
  about: {
    community: "https://pasada.or.tz/uploads/service-1.jpg",
    care: "https://pasada.or.tz/uploads/service-3.jpg",
  },
  testimonialCategories: {
    clients: "https://pasada.or.tz/uploads/service-1.jpg",
    caregivers: "https://pasada.or.tz/uploads/service-3.jpg",
    volunteers: "https://pasada.or.tz/uploads/service-9.jpg",
    partners: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
  },
  placeholder: "/placeholder/hero.svg",
} as const;

export function isPasadaCdn(url: string) {
  return url.includes("pasada.or.tz");
}

export function isLogoImage(url: string) {
  return url.includes("logo.jpg") || url.includes("/brand/logo");
}

/** Compare an asset rather than its different resized/cropped URLs. */
export function imageIdentity(url: string) {
  try {
    const parsed = new URL(url, "https://pasada.local");
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

export function testimonialCategoryImage(slug: string) {
  const map = media.testimonialCategories;
  return map[slug as keyof typeof map] ?? media.hero.services;
}
