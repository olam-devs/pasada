import { defineField, defineType } from "sanity";
import { richTextBlock } from "@/sanity/schemaTypes/richText";

const VALUE_ICONS = [
  { title: "Scale (justice)", value: "scale" },
  { title: "Users (community)", value: "users" },
  { title: "Target (focus)", value: "target" },
  { title: "Sparkles (excellence)", value: "sparkles" },
  { title: "Heart (compassion)", value: "heart" },
  { title: "Eye (respect/vision)", value: "eye" },
  { title: "Handshake (partnership)", value: "handshake" },
  { title: "Shield (protection)", value: "shield" },
];

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      initialValue: "About PASADA",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      initialValue: "A faith-based organization serving all with dignity",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      description: "Large image above the intro text.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      description: "History and background paragraphs shown at the top of the page.",
      type: "array",
      of: [richTextBlock],
    }),
    defineField({
      name: "missionText",
      title: "Mission statement",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "visionText",
      title: "Vision statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coreValues",
      title: "Core values",
      type: "array",
      of: [
        {
          type: "object",
          name: "coreValue",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: VALUE_ICONS },
              initialValue: "heart",
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "focusAreas",
      title: "What we focus on",
      description: "Short list shown as bullet points (e.g. service names).",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "sideImage",
      title: "Sidebar image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaTitle",
      title: "Sidebar call-to-action title",
      type: "string",
      initialValue: "Get inspired—take action",
    }),
    defineField({
      name: "ctaText",
      title: "Sidebar call-to-action text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
