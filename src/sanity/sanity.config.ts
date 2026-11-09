import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { resourceKindOptions } from "@/sanity/schemaTypes/resource";
import { sanityEnv } from "@/sanity/env";

const singletons = ["homePage", "servicesPage"];
const resourceLists = [
  { kind: "publication", title: "Publications" },
  { kind: "newsletter", title: "Newsletters" },
  { kind: "annualReport", title: "Annual reports" },
];

export const sanityConfig = defineConfig({
  basePath: "/studio",
  name: "default",
  title: "PASADA Content Studio",
  projectId: sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "4mu2imft",
  dataset: sanityEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool({
    structure: (S) => S.list().title("Content").items([
      S.listItem().id("homePage").title("Homepage & slideshow").child(
        S.document().schemaType("homePage").documentId("homePage"),
      ),
      S.listItem().id("servicesPage").title("Services page").child(
        S.document().schemaType("servicesPage").documentId("servicesPage"),
      ),
      S.divider(),
      // One list per kind, so a new document already has the right type.
      S.listItem().id("resource").title("Resources (PDFs)").schemaType("resource").child(
        S.list().title("Resources (PDFs)").items(
          resourceLists.map(({ kind, title }) =>
            S.listItem().id(kind).title(title).schemaType("resource").child(
              S.documentTypeList("resource")
                .title(title)
                .filter('_type == "resource" && kind == $kind')
                .params({ kind })
                .defaultOrdering([
                  { field: "publishedAt", direction: "desc" },
                  { field: "_createdAt", direction: "desc" },
                ])
                .initialValueTemplates([S.initialValueTemplateItem(`resource-${kind}`)]),
            ),
          ),
        ),
      ),
      ...S.documentTypeListItems().filter((item) => ![...singletons, "resource"].includes(item.getId() ?? "")),
    ]),
  })],
  document: {
    newDocumentOptions: (options) => options.filter((option) => !singletons.includes(option.templateId) && option.templateId !== "resource"),
    actions: (actions, context) => singletons.includes(context.schemaType)
      ? actions.filter((action) => action.action !== "duplicate" && action.action !== "delete")
      : actions,
  },
  schema: {
    types: schemaTypes,
    // "New publication", "New newsletter" and "New annual report".
    templates: (previous) => [
      ...previous,
      ...resourceKindOptions.map((option) => ({
        id: `resource-${option.value}`,
        title: option.title,
        schemaType: "resource",
        value: { kind: option.value },
      })),
    ],
  },
});
