import { createClient } from "next-sanity";
import { sanityEnv } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "pending",
  dataset: sanityEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  // Next.js caches published content for 60 seconds; avoid a second CDN cache.
  useCdn: false,
  perspective: "published",
  token: sanityEnv.SANITY_API_READ_TOKEN,
});

