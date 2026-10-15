import "server-only";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { homePageDefaults } from "@/lib/page-defaults";
import { isLogoImage, media } from "@/lib/media";
import { urlFor } from "@/lib/sanity-image";

export type HeroSlide = {
  _key: string;
  src: string;
  alt: string;
  fit: "cover" | "contain";
};

export type HomePageContent = typeof homePageDefaults & { slides: HeroSlide[] };

type HomePageRow = Partial<typeof homePageDefaults> & {
  slides?: { _key: string; image?: SanityImageSource; alt?: string; fit?: "cover" | "contain" }[];
};

export async function getHomePage(): Promise<HomePageContent> {
  const fallback = {
    ...homePageDefaults,
    slides: media.hero.home.map((src, i): HeroSlide => ({
      _key: `default-${i}`,
      src,
      alt: isLogoImage(src) ? "PASADA logo" : "PASADA community and health programs",
      fit: isLogoImage(src) ? "contain" : "cover",
    })),
  };
  if (!sanityConfigured) return fallback;

  try {
    const row = await sanityClient.fetch<HomePageRow | null>(
      '*[_type == "homePage" && _id == "homePage"][0]',
      {},
      { perspective: "published", next: { revalidate: 60 } },
    );
    if (!row) return fallback;
    const slides = row.slides?.flatMap((slide) => {
      if (!slide.image) return [];
      const image = urlFor(slide.image).width(1200);
      return [{
        _key: slide._key,
        src: slide.fit === "contain" ? image.url() : image.height(900).fit("crop").url(),
        alt: slide.alt ?? "PASADA community and health programs",
        fit: slide.fit ?? "cover",
      }];
    });
    // Sanity can return null for unset fields; retain the existing page defaults.
    const values = Object.fromEntries(Object.entries(row).filter(([, value]) => value != null));
    return {
      ...fallback,
      ...values,
      highlights: row.highlights ?? fallback.highlights,
      slideInterval: row.slideInterval && row.slideInterval >= 2 ? row.slideInterval : fallback.slideInterval,
      slides: slides?.length ? slides : fallback.slides,
    };
  } catch (error) {
    console.error("Unable to load homepage content from Sanity", error);
    return fallback;
  }
}
