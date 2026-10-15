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
  plugins: [structureTool({
    structure: (S) => S.list().title("Content").items([
      S.listItem().id("homePage").title("Homepage").child(
        S.document().schemaType("homePage").documentId("homePage"),
      ),
      S.listItem().id("servicesPage").title("Services page").child(
        S.document().schemaType("servicesPage").documentId("servicesPage"),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !["homePage", "servicesPage"].includes(item.getId() ?? "")),
    ]),
  })],
  document: {
    newDocumentOptions: (options) => options.filter((option) => !["homePage", "servicesPage"].includes(option.templateId)),
    actions: (actions, context) => ["homePage", "servicesPage"].includes(context.schemaType)
      ? actions.filter((action) => action.action !== "duplicate" && action.action !== "delete")
      : actions,
  },
  schema: {
    types: schemaTypes,
  },
});

