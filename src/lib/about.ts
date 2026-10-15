import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";

export type CoreValue = {
  title: string;
  description?: string;
  icon?: string;
};

export type AboutPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  mainImageUrl: string;
  intro?: PortableTextBlock[];
  missionText: string;
  visionText: string;
  coreValues: CoreValue[];
  focusAreas: string[];
  sideImageUrl: string;
  ctaTitle: string;
  ctaText: string;
};

function block(text: string) {
  return {
    _type: "block" as const,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, text, marks: [] }],
  };
}

const FALLBACK: AboutPageContent = {
  heroEyebrow: "About PASADA",
  heroTitle: "A faith-based organization serving all with dignity",
  mainImageUrl: media.about.community,
  intro: [
    block(
      "Pastoral Activities and Services for people with AIDS Dar es Salaam Archdiocese (PASADA (T)) is a faith-based Organization operating under the Roman Catholic Archdiocese of Dar es Salaam. PASADA was formed in August 1992 when a small group of people with HIV gathered to seek mutual aid and support.",
    ),
    block(
      "Although sponsored by the Roman Catholic Church, the services offered by PASADA are available to all individuals without discrimination and are provided free of charge.",
    ),
  ],
  missionText:
    "Responding to the call of faith, PASADA (T) strives to provide and maintain quality, caring and compassionate services and support to people infected and affected by HIV and AIDS in Tanzania—with particular attention to the poorest and the neediest—through a holistic approach with the light of the Gospel, emphasizing justice, solidarity, sustainability and efficiency.",
  visionText:
    "A society in which all people can live life to their full potential with dignity and respect.",
  coreValues: [
    { title: "Justice", description: "Fair access to care for the poorest and neediest.", icon: "scale" },
    { title: "Solidarity", description: "Walking together with families and communities.", icon: "users" },
    { title: "Sustainability", description: "Programs built for long-term community resilience.", icon: "target" },
    { title: "Efficiency", description: "Responsible stewardship of resources and partnerships.", icon: "sparkles" },
    { title: "Compassion", description: "Client-centered support rooted in dignity.", icon: "heart" },
    { title: "Respect", description: "Confidential, non-judgmental service for all.", icon: "eye" },
  ],
  focusAreas: [
    "HIV testing and counseling",
    "Home-based and palliative care",
    "Comprehensive HIV care and treatment support",
    "PMTCT screening",
    "Cervical cancer screening",
    "NCD screening",
    "Support to OVC and caregivers",
    "Psychosocial support and counseling",
    "Community sensitization and education",
    "Capacity development",
  ],
  sideImageUrl: media.about.care,
  ctaTitle: "Get inspired—take action",
  ctaText:
    "Donors, volunteers and partners help us strengthen community wellbeing and bring hope to families.",
};

const query = groq`
  *[_type == "aboutPage"][0] {
    heroEyebrow,
    heroTitle,
    mainImage,
    intro,
    missionText,
    visionText,
    coreValues,
    focusAreas,
    sideImage,
    ctaTitle,
    ctaText
  }
`;

type Row = {
  heroEyebrow?: string;
  heroTitle?: string;
  mainImage?: unknown;
  intro?: PortableTextBlock[];
  missionText?: string;
  visionText?: string;
  coreValues?: CoreValue[];
  focusAreas?: string[];
  sideImage?: unknown;
  ctaTitle?: string;
  ctaText?: string;
};

function mapRow(row: Row): AboutPageContent {
  return {
    heroEyebrow: row.heroEyebrow ?? FALLBACK.heroEyebrow,
    heroTitle: row.heroTitle ?? FALLBACK.heroTitle,
    mainImageUrl: row.mainImage
      ? urlFor(row.mainImage as Parameters<typeof urlFor>[0]).width(2400).url()
      : FALLBACK.mainImageUrl,
    intro: row.intro?.length ? row.intro : FALLBACK.intro,
    missionText: row.missionText ?? FALLBACK.missionText,
    visionText: row.visionText ?? FALLBACK.visionText,
    coreValues: row.coreValues?.length ? row.coreValues : FALLBACK.coreValues,
    focusAreas: row.focusAreas?.length ? row.focusAreas : FALLBACK.focusAreas,
    sideImageUrl: row.sideImage
      ? urlFor(row.sideImage as Parameters<typeof urlFor>[0]).width(800).height(600).fit("crop").url()
      : FALLBACK.sideImageUrl,
    ctaTitle: row.ctaTitle ?? FALLBACK.ctaTitle,
    ctaText: row.ctaText ?? FALLBACK.ctaText,
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  if (!sanityConfigured) return FALLBACK;
  try {
    const row = await sanityClient.fetch<Row | null>(query);
    return row ? mapRow(row) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
