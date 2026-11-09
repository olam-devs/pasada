/** Curated PASADA media URLs (from pasada.or.tz/uploads). */
export const media = {
  logo: "/brand/pasada-logo.jpg",
  hero: {
    home: [
      "/brand/pasada-logo.jpg",
      "/images/home-clinical-care.jpg",
      "/images/programmes/home-based-care-clinician-slide.jpg",
      "/images/home-outreach-vehicles.jpg",
      "https://pasada.or.tz/uploads/project-featured-photo-9.jpg",
      "https://pasada.or.tz/uploads/service-1.jpg",
    ],
    about: "/brand/pasada-logo.jpg",
    services: "https://pasada.or.tz/uploads/service-2.jpg",
    projects: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    blog: "/illustrations/stories.svg",
    contact: "/illustrations/contact.svg",
    getInvolved: "/illustrations/get-involved.svg",
    testimonials: "/illustrations/testimonials.svg",
    careers: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    donate: "https://pasada.or.tz/uploads/service-7.jpg",
  },
  /** Homepage photos used until editors choose their own in Sanity. */
  home: {
    aboutInset: {
      src: "/images/community-aids-day.jpg",
      alt: "PASADA staff and volunteers marking World AIDS Day with banners",
    },
    banner: {
      src: "/images/community-tb-group.jpg",
      alt: "Community members and PASADA staff gathered outside the PASADA centre",
    },
    support: {
      src: "/images/home-outreach-vehicles.jpg",
      alt: "PASADA vehicles used for community outreach",
    },
  },
  about: {
    community: "/images/pasada-building-clean.jpg",
    care: "/images/community-aids-day.jpg",
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

