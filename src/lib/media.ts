/** Curated PASADA media URLs (from pasada.or.tz/uploads). */
export const media = {
  logo: "/brand/logo.jpg",
  hero: {
    home: [
      "/brand/logo.jpg",
      "/images/home-clinical-care.jpg",
      "/images/home-outreach-vehicles.jpg",
      "https://pasada.or.tz/uploads/project-featured-photo-9.jpg",
      "https://pasada.or.tz/uploads/service-1.jpg",
    ],
    about: "/brand/logo.jpg",
    services: "https://pasada.or.tz/uploads/service-2.jpg",
    projects: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    blog: "/illustrations/stories.svg",
    contact: "/illustrations/contact.svg",
    getInvolved: "/illustrations/get-involved.svg",
    testimonials: "/illustrations/testimonials.svg",
    careers: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    donate: "https://pasada.or.tz/uploads/service-7.jpg",
  },
  about: {
    community: "https://pasada.or.tz/uploads/service-1.jpg",
    care: "https://pasada.or.tz/uploads/service-3.jpg",
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

