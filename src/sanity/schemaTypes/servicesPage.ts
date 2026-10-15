import { defineField, defineType } from "sanity";
import { servicesPageDefaults } from "@/lib/page-defaults";

export const servicesPage = defineType({
  name: "servicesPage", title: "Services page", type: "document",
  initialValue: servicesPageDefaults,
  fields: [
    defineField({ name: "heroEyebrow", title: "Banner eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Banner heading", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "mainImage", title: "Services main picture", type: "image", options: { hotspot: true },
      description: "Large banner at the top of /services. Individual service photos are edited under Services → select a service → Main image. The existing banner stays visible until you publish a replacement.",
    }),
    defineField({ name: "mainImageAlt", title: "Main picture description", type: "string", description: "Describe the picture for people using screen readers." }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "allLabel", title: "All services filter label", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { media: "mainImage" }, prepare: ({ media }) => ({ title: "Services page", subtitle: "Main banner image and introduction", media }) },
});
