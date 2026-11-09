import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

/** The three kinds of downloadable documents on the Resources pages. */
export const resourceKindOptions = [
  { value: "publication", title: "Publication" },
  { value: "newsletter", title: "Newsletter" },
  { value: "annualReport", title: "Annual report" },
];

export const resource = defineType({
  name: "resource",
  title: "Resources (PDFs)",
  type: "document",
  icon: FileText,
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: resourceKindOptions, layout: "radio", direction: "horizontal" },
      initialValue: "publication",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "file",
      title: "PDF file",
      description:
        "Upload the PDF, then press Publish. It appears on the website within a minute.",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required().error("Upload the PDF file."),
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "Leave empty to use the PDF's file name.",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Date",
      description: "Leave empty to use the date you uploaded it.",
      type: "date",
      options: { dateFormat: "D MMMM YYYY" },
    }),
    defineField({
      name: "summary",
      title: "Short description",
      description: "Optional. One to three sentences shown under the title.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "authors",
      title: "Authors",
      description: "Optional, for research papers.",
      type: "string",
      hidden: ({ document }) => document?.kind !== "publication",
    }),
    defineField({
      name: "source",
      title: "Journal or publisher",
      description: "Optional, for research papers. For example: BMC Public Health.",
      type: "string",
      hidden: ({ document }) => document?.kind !== "publication",
    }),
    defineField({
      name: "cover",
      title: "Cover picture",
      description:
        "Optional. A picture of the front page. Without one, the website shows a document icon.",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      fileName: "file.asset.originalFilename",
      kind: "kind",
      date: "publishedAt",
      created: "_createdAt",
      media: "cover",
    },
    prepare({ title, fileName, kind, date, created, media }) {
      const kindTitle =
        resourceKindOptions.find((option) => option.value === kind)?.title ?? "Resource";
      const year = (date ?? created ?? "").slice(0, 4);
      return {
        title: title || fileName || "New resource (upload a PDF)",
        subtitle: [kindTitle, year].filter(Boolean).join(" · "),
        media: media ?? FileText,
      };
    },
  },
});
