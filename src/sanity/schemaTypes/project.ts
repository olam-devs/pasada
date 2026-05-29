import { defineField, defineType } from "sanity";
import { richTextBlock, sortableFeaturedFields } from "@/sanity/schemaTypes/richText";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  orderings: [
    {
      title: "Display order",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "projectCategory" }],
    }),
    ...sortableFeaturedFields.map((f) => defineField(f)),
    defineField({
      name: "tag",
      title: "Tag label",
      type: "string",
      description: "Short label shown on cards (e.g. Youth, Community).",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "video",
      title: "Short video (optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
    }),
    defineField({
      name: "content",
      title: "Full description",
      type: "array",
      of: [richTextBlock],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
