import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type SiteSettings = {
  maxFeaturedPosts: number;
  maxFeaturedProjects: number;
  maxFeaturedServices: number;
  email: string;
  phone: string;
  donationEmail: string;
  donationMobileProvider: string;
  donationMobileNumber: string;
  donationMobileReference: string;
  careersEmail: string;
  volunteerEmail: string;
  whistleblowerChannel1Url: string;
  whistleblowerChannel2Url: string;
};

const defaults: SiteSettings = {
  maxFeaturedPosts: 3,
  maxFeaturedProjects: 3,
  maxFeaturedServices: 6,
  email: "info@pasada.or.tz",
  phone: "+255 22 286 6618",
  donationEmail: "info@pasada.or.tz",
  donationMobileProvider: "Mpesa",
  donationMobileNumber: "350 232 115",
  donationMobileReference: "PASADA DONATION",
  careersEmail: "recruitment@pasada.or.tz",
  volunteerEmail: "volunteer@pasada.or.tz",
  whistleblowerChannel1Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAob4kyZUME5RVlRHVlZUWEVKUE42TEw2OEFMRDhFMy4u",
  whistleblowerChannel2Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__qiYUi9UQUpVNDhPWk1QQTNRVkY5TFZBNjdXUElUWi4u",
};

const query = groq`
  *[_type == "siteSettings"][0] {
    maxFeaturedPosts,
    maxFeaturedProjects,
    maxFeaturedServices,
    email,
    phone,
    donationEmail,
    donationMobileProvider,
    donationMobileNumber,
    donationMobileReference,
    careersEmail,
    volunteerEmail,
    whistleblowerChannel1Url,
    whistleblowerChannel2Url
  }
`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return defaults;
  try {
    const row = await sanityClient.fetch<Partial<SiteSettings> | null>(query);
    const saved = Object.fromEntries(Object.entries(row ?? {}).filter(([, value]) => value != null));
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}
