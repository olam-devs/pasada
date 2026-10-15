import { defineField, defineType } from "sanity";

export const testimonialCategory = defineType({
  name: "testimonialCategory",
  title: "Testimonial categories",
  type: "document",
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
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "icon",
      title: "Category symbol",
      type: "string",
      description: "Choose a symbol for this category. If left empty, the website chooses one from the category slug.",
      options: { list: [
        { title: "People — clients", value: "people" },
        { title: "Heart — caregivers", value: "heart" },
        { title: "Helping hand — volunteers", value: "helping" },
        { title: "Handshake — partners", value: "partnership" },
        { title: "Conversation — community voices", value: "conversation" },
      ] },
    }),
    // Preserve older content without asking editors to upload unused photos.
    defineField({ name: "image", title: "Legacy category image", type: "image", hidden: true }),
  ],
});

