import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { sanityEnv } from "@/sanity/env";

export const sanityConfig = defineConfig({
  basePath: "/studio",
  name: "default",
  title: "PASADA Content Studio",
  projectId: sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "4mu2imft",
  dataset: sanityEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

