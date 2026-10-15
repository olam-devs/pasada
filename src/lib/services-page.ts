import "server-only";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { servicesPageDefaults } from "@/lib/page-defaults";
import { media } from "@/lib/media";
import { urlFor } from "@/lib/sanity-image";

type ServicesPageRow = Partial<typeof servicesPageDefaults> & {
  mainImage?: SanityImageSource;
  mainImageAlt?: string;
};

export async function getServicesPage() {
  const fallback = { ...servicesPageDefaults, mainImageUrl: media.hero.services as string, mainImageAlt: "" };
  if (!sanityConfigured) return fallback;
  try {
    const row = await sanityClient.fetch<ServicesPageRow | null>(
      '*[_type == "servicesPage" && _id == "servicesPage"][0]',
      {},
      { perspective: "published", next: { revalidate: 60 } },
    );
    if (!row) return fallback;
    return {
      heroEyebrow: row.heroEyebrow ?? fallback.heroEyebrow,
      heroTitle: row.heroTitle ?? fallback.heroTitle,
      intro: row.intro ?? fallback.intro,
      allLabel: row.allLabel ?? fallback.allLabel,
      mainImageAlt: row.mainImageAlt ?? fallback.mainImageAlt,
      mainImageUrl: row.mainImage ? urlFor(row.mainImage).width(1920).height(800).fit("crop").url() : fallback.mainImageUrl,
    };
  } catch (error) {
    console.error("Unable to load Services page content from Sanity", error);
    return fallback;
  }
}
