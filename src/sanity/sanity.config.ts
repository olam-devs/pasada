import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "@/sanity/schemaTypes";
import { sanityEnv } from "@/sanity/env";

export const sanityConfig = defineConfig({
  name: "default",
  title: "PASADA Content Studio",
  projectId: sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "4mu2imft",
  dataset: sanityEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});

