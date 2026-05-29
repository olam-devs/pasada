import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type SiteSettings = {
  maxFeaturedPosts: number;
  maxFeaturedProjects: number;
  maxFeaturedServices: number;
};

const defaults: SiteSettings = {
  maxFeaturedPosts: 3,
  maxFeaturedProjects: 3,
  maxFeaturedServices: 6,
};

const query = groq`
  *[_type == "siteSettings"][0] {
    maxFeaturedPosts,
    maxFeaturedProjects,
    maxFeaturedServices
  }
`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return defaults;
  try {
    const row = await sanityClient.fetch<Partial<SiteSettings> | null>(query);
    return { ...defaults, ...row };
  } catch {
    return defaults;
  }
}
