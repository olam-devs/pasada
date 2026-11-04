import { defineField, defineType } from "sanity";
import { homePageDefaults } from "@/lib/page-defaults";

function textField(
  name: keyof typeof homePageDefaults,
  title: string,
  group: string,
  multiline = false,
) {
  return defineField({
    name,
    title,
    group,
    type: multiline ? "text" : "string",
    ...(multiline ? { rows: 3 } : {}),
    validation: (rule) => rule.required(),
  });
}

function linkField(
  name: keyof typeof homePageDefaults,
  title: string,
  group: string,
) {
  return defineField({
    name,
    title,
    group,
    type: "string",
    description: "A page on this website, for example /donate or /services.",
    validation: (rule) =>
      rule
        .required()
        .regex(/^\/(?!\/)/, { name: "website path starting with /" }),
  });
}

/** Optional text: the website default is shown until an editor fills it in. */
function optionalText(
  name: keyof typeof homePageDefaults,
  title: string,
  group: string,
  multiline = false,
) {
  return defineField({
    name,
    title,
    group,
    type: multiline ? "text" : "string",
    ...(multiline ? { rows: 3 } : {}),
    description: `Leave empty to use: "${String(homePageDefaults[name])}"`,
  });
}

function optionalPhoto(name: string, title: string, group: string, description: string) {
  return defineField({
    name,
    title,
    group,
    type: "image",
    options: { hotspot: true },
    description,
    fields: [
      defineField({
        name: "alt",
        title: "Image description",
        type: "string",
        description: "Describe the photo for people using screen readers.",
      }),
    ],
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "slideshow", title: "Slideshow", default: true },
    { name: "hero", title: "Introduction" },
    { name: "partners", title: "Partner logos" },
    { name: "organisation", title: "Organisation & values" },
    { name: "highlights", title: "Highlights & mission" },
    { name: "services", title: "Services section" },
    { name: "banner", title: "Photo banner" },
    { name: "projects", title: "Projects section" },
    { name: "stories", title: "Stories section" },
    { name: "support", title: "Support banner" },
    { name: "testimonials", title: "Testimonials section" },
  ],
  initialValue: homePageDefaults,
  fields: [
    defineField({
      name: "partners",
      title: "Partners",
      group: "partners",
      type: "array",
      description:
        "Drag to reorder the homepage partner belt. Use original logos with a clear or white background. An empty list hides the section.",
      of: [
        {
          type: "object",
          name: "partnerLogo",
          title: "Partner",
          fields: [
            defineField({
              name: "name",
              title: "Organisation / programme name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
    textField("heroEyebrow", "Intro badge text", "hero"),
    textField("aboutEyebrow", "Organisation section eyebrow", "organisation"),
    textField("aboutTitle", "Organisation section heading", "organisation"),
    optionalPhoto(
      "aboutInsetImage",
      "Second photo (small, overlapping)",
      "organisation",
      "A colourful photo of people or activities, shown overlapping the main About photo. Leave empty to use the AIDS Day photo.",
    ),
    textField("aboutLinkLabel", "About link label", "organisation"),
    linkField("aboutLinkHref", "About link destination", "organisation"),
    textField("valuesEyebrow", "Mission & values eyebrow", "organisation"),
    textField("valuesTitle", "Mission & values heading", "organisation"),
    textField("visionTitle", "Vision card heading", "organisation"),
    textField("heroTitle", "Main heading", "hero"),
    textField("heroDescription", "Introduction", "hero", true),
    textField("heroPrimaryLabel", "Primary button label", "hero"),
    linkField("heroPrimaryHref", "Primary button destination", "hero"),
    textField("heroSecondaryLabel", "Secondary button label", "hero"),
    linkField("heroSecondaryHref", "Secondary button destination", "hero"),
    defineField({
      name: "slides",
      title: "Slideshow images — displayed in this order",
      group: "slideshow",
      type: "array",
      description:
        "The first image in this list appears first on the homepage. Drag a slide using its handle to move it earlier or later, then click Publish. You can also add, replace or remove images here.",
      options: { sortable: true },
      validation: (rule) => rule.min(1).max(20),
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Slide",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required().assetRequired(),
            }),
            defineField({
              name: "alt",
              title: "Image description",
              type: "string",
              description:
                "Describe the image for people using screen readers.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "fit",
              title: "Display",
              type: "string",
              initialValue: "cover",
              options: {
                list: [
                  { title: "Fill frame (photos)", value: "cover" },
                  { title: "Show entire image (logos)", value: "contain" },
                ],
                layout: "radio",
              },
            }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "slideInterval",
      title: "Seconds between slides",
      description: "3.5 seconds is recommended for a brisk slideshow.",
      group: "slideshow",
      type: "number",
      validation: (rule) => rule.required().min(2).max(30),
    }),
    defineField({
      name: "highlights",
      title: "Highlight cards",
      group: "highlights",
      type: "array",
      validation: (rule) => rule.required().min(1).max(6),
      of: [
        {
          type: "object",
          name: "homeHighlight",
          title: "Highlight",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              initialValue: "care",
              options: {
                list: [
                  { title: "Care (stethoscope)", value: "care" },
                  { title: "Community (people)", value: "community" },
                  { title: "Compassion (heart)", value: "compassion" },
                ],
              },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Impact figures (red strip)",
      group: "highlights",
      type: "array",
      description:
        "Up to four figures shown large in the red strip below the introduction. Leave empty to use the figures from the About page text.",
      validation: (rule) => rule.max(4),
      of: [
        {
          type: "object",
          name: "homeStat",
          title: "Figure",
          fields: [
            defineField({
              name: "value",
              title: "Figure",
              type: "string",
              description: "For example 1.5M+ or 29,401",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "What it counts",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    textField("missionTitle", "Mission box heading", "highlights"),
    textField("missionText", "Mission box text", "highlights", true),
    textField("servicesEyebrow", "Section eyebrow", "services"),
    textField("servicesTitle", "Section heading", "services"),
    textField("servicesDescription", "Section description", "services", true),
    textField("servicesLinkLabel", "View services button label", "services"),
    linkField(
      "servicesLinkHref",
      "View services button destination",
      "services",
    ),
    textField("servicesCardLabel", "Service card link label", "services"),
    optionalPhoto(
      "bannerImage",
      "Banner photo",
      "banner",
      "A wide, colourful photo of PASADA's work, ideally at least 1600 pixels wide. Leave empty to use the community group photo.",
    ),
    optionalText("bannerEyebrow", "Banner eyebrow", "banner"),
    optionalText("bannerTitle", "Banner heading", "banner"),
    optionalText("bannerText", "Banner text", "banner", true),
    optionalText("bannerLinkLabel", "Banner button label", "banner"),
    optionalText("bannerLinkHref", "Banner button destination (for example /get-involved)", "banner"),
    textField("projectsEyebrow", "Section eyebrow", "projects"),
    textField("projectsTitle", "Section heading", "projects"),
    textField("projectsLinkLabel", "View projects button label", "projects"),
    linkField(
      "projectsLinkHref",
      "View projects button destination",
      "projects",
    ),
    textField("storiesEyebrow", "Section eyebrow", "stories"),
    textField("storiesTitle", "Section heading", "stories"),
    textField("storiesLinkLabel", "View stories button label", "stories"),
    linkField("storiesLinkHref", "View stories button destination", "stories"),
    textField("storiesCardLabel", "Story card link label", "stories"),
    optionalPhoto(
      "supportImage",
      "Background photo",
      "support",
      "Shown behind a red overlay. Leave empty to use the outreach photo.",
    ),
    textField("supportTitle", "Banner heading", "support"),
    textField("supportDescription", "Banner description", "support", true),
    textField("supportPrimaryLabel", "Primary button label", "support"),
    linkField("supportPrimaryHref", "Primary button destination", "support"),
    textField("supportSecondaryLabel", "Secondary button label", "support"),
    linkField(
      "supportSecondaryHref",
      "Secondary button destination",
      "support",
    ),
    textField("testimonialsEyebrow", "Section eyebrow", "testimonials"),
    textField("testimonialsTitle", "Section heading", "testimonials"),
    textField(
      "testimonialsDescription",
      "Section description",
      "testimonials",
      true,
    ),
    textField("testimonialsCarouselTitle", "Carousel heading", "testimonials"),
    textField(
      "testimonialsCarouselSubtitle",
      "Carousel subtitle",
      "testimonials",
    ),
    textField(
      "testimonialsLinkLabel",
      "View testimonials link label",
      "testimonials",
    ),
    linkField(
      "testimonialsLinkHref",
      "View testimonials link destination",
      "testimonials",
    ),
  ],
  preview: {
    prepare: () => ({
      title: "Homepage",
      subtitle: "Intro, slideshow and homepage sections",
    }),
  },
});
