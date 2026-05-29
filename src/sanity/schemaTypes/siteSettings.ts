import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      initialValue: "PASADA (T)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Care • Hope • Dignity",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "info@pasada.or.tz",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      initialValue: "+255 22 286 6618",
    }),
    defineField({
      name: "address",
      title: "Address / Location",
      type: "string",
      initialValue: "Dar es Salaam, Tanzania",
    }),
    defineField({
      name: "maxFeaturedPosts",
      title: "Max featured blog posts on homepage",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "maxFeaturedProjects",
      title: "Max featured projects on homepage",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "maxFeaturedServices",
      title: "Max featured services on homepage",
      type: "number",
      initialValue: 6,
      validation: (r) => r.min(1).max(8),
    }),
  ],
});
