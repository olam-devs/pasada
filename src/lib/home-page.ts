import "server-only";
import { defaultPartners, type Partner } from "@/lib/partners";
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

export type HomePhoto = { src: string; alt: string };

export type HomePageContent = typeof homePageDefaults & {
  slides: HeroSlide[];
  partners: Partner[];
  aboutInset: HomePhoto;
  banner: HomePhoto;
  supportPhoto: HomePhoto;
};

type PhotoRow = SanityImageSource & { asset?: unknown; alt?: string };

type HomePageRow = Partial<typeof homePageDefaults> & {
  aboutInsetImage?: PhotoRow;
  bannerImage?: PhotoRow;
  supportImage?: PhotoRow;
  partners?: { _key: string; name: string; logo?: SanityImageSource }[];
  slides?: {
    _key: string;
    image?: SanityImageSource;
    alt?: string;
    fit?: "cover" | "contain";
  }[];
};

function photo(row: PhotoRow | undefined, fallback: HomePhoto, width: number): HomePhoto {
  if (!row?.asset) return fallback;
  return { src: urlFor(row).width(width).url(), alt: row.alt || fallback.alt };
}

export async function getHomePage(): Promise<HomePageContent> {
  const fallback = {
    ...homePageDefaults,
    aboutInset: media.home.aboutInset,
    banner: media.home.banner,
    supportPhoto: media.home.support,
    partners: defaultPartners,
    slides: media.hero.home.map(
      (src, i): HeroSlide => ({
        _key: `default-${i}`,
        src,
        alt: isLogoImage(src)
          ? "PASADA logo"
          : "PASADA community and health programs",
        fit: isLogoImage(src) ? "contain" : "cover",
      }),
    ),
  };
  if (!sanityConfigured) return fallback;

  try {
    const row = await sanityClient.fetch<HomePageRow | null>(
      '*[_type == "homePage" && _id == "homePage"][0]',
      {},
      { perspective: "published", cache: "no-store" },
    );
    if (!row) return fallback;
    const slides = row.slides?.flatMap((slide) => {
      if (!slide.image) return [];
      const image = urlFor(slide.image).width(1920);
      return [
        {
          _key: slide._key,
          src: image.url(),
          alt: slide.alt ?? "PASADA community and health programs",
          fit: slide.fit ?? "cover",
        },
      ];
    });
    // Sanity can return null for unset fields; retain the existing page defaults.
    const { aboutInsetImage, bannerImage, supportImage, ...textRow } = row;
    const values = Object.fromEntries(
      Object.entries(textRow).filter(([, value]) => value != null && value !== ""),
    );
    return {
      ...fallback,
      ...values,
      partners: row.partners
        ? row.partners.flatMap((partner) =>
            partner.logo && partner.name
              ? [
                  {
                    _key: partner._key,
                    name: partner.name,
                    logoUrl: urlFor(partner.logo).width(480).fit("max").url(),
                  },
                ]
              : [],
          )
        : fallback.partners,
      highlights: row.highlights ?? fallback.highlights,
      slideInterval:
        row.slideInterval && row.slideInterval >= 2
          ? row.slideInterval
          : fallback.slideInterval,
      slides: slides?.length ? slides : fallback.slides,
      bannerLinkHref:
        row.bannerLinkHref && /^\/(?!\/)/.test(row.bannerLinkHref)
          ? row.bannerLinkHref
          : fallback.bannerLinkHref,
      aboutInset: photo(aboutInsetImage, fallback.aboutInset, 900),
      banner: photo(bannerImage, fallback.banner, 2000),
      supportPhoto: photo(supportImage, fallback.supportPhoto, 2000),
    };
  } catch (error) {
    console.error("Unable to load homepage content from Sanity", error);
    return fallback;
  }
}
