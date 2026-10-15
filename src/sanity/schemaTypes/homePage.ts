import { defineField, defineType } from "sanity";
import { homePageDefaults } from "@/lib/page-defaults";

function textField(name: keyof typeof homePageDefaults, title: string, group: string, multiline = false) {
  return defineField({
    name, title, group,
    type: multiline ? "text" : "string",
    ...(multiline ? { rows: 3 } : {}),
    validation: (rule) => rule.required(),
  });
}

function linkField(name: keyof typeof homePageDefaults, title: string, group: string) {
  return defineField({
    name, title, group, type: "string",
    description: "A page on this website, for example /donate or /services.",
    validation: (rule) => rule.required().regex(/^\/(?!\/)/, { name: "website path starting with /" }),
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Intro & slideshow", default: true },
    { name: "highlights", title: "Highlights & mission" },
    { name: "services", title: "Services section" },
    { name: "projects", title: "Projects section" },
    { name: "stories", title: "Stories section" },
    { name: "support", title: "Support banner" },
    { name: "testimonials", title: "Testimonials section" },
  ],
  initialValue: homePageDefaults,
  fields: [
    textField("heroEyebrow", "Intro badge text", "hero"),
    textField("heroTitle", "Main heading", "hero"),
    textField("heroDescription", "Introduction", "hero", true),
    textField("heroPrimaryLabel", "Primary button label", "hero"),
    linkField("heroPrimaryHref", "Primary button destination", "hero"),
    textField("heroSecondaryLabel", "Secondary button label", "hero"),
    linkField("heroSecondaryHref", "Secondary button destination", "hero"),
    defineField({
      name: "slides", title: "Slideshow images", group: "hero", type: "array",
      description: "Upload/select photos and drag to reorder. Publishing this list replaces the original slideshow. Until then, the existing slideshow stays visible.",
      validation: (rule) => rule.min(1).max(20),
      of: [{
        type: "object", name: "heroSlide", title: "Slide",
        fields: [
          defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (rule) => rule.required().assetRequired() }),
          defineField({ name: "alt", title: "Image description", type: "string", description: "Describe the image for people using screen readers.", validation: (rule) => rule.required() }),
          defineField({ name: "fit", title: "Display", type: "string", initialValue: "cover", options: { list: [{ title: "Fill frame (photos)", value: "cover" }, { title: "Show entire image (logos)", value: "contain" }], layout: "radio" } }),
        ],
        preview: { select: { title: "alt", media: "image" } },
      }],
    }),
    defineField({ name: "slideInterval", title: "Seconds between slides", group: "hero", type: "number", validation: (rule) => rule.required().min(2).max(30) }),
    defineField({
      name: "highlights", title: "Highlight cards", group: "highlights", type: "array",
      validation: (rule) => rule.required().min(1).max(6),
      of: [{
        type: "object", name: "homeHighlight", title: "Highlight",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (rule) => rule.required() }),
          defineField({ name: "icon", title: "Icon", type: "string", initialValue: "care", options: { list: [{ title: "Care (stethoscope)", value: "care" }, { title: "Community (people)", value: "community" }, { title: "Compassion (heart)", value: "compassion" }] } }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    textField("missionTitle", "Mission box heading", "highlights"),
    textField("missionText", "Mission box text", "highlights", true),
    textField("servicesEyebrow", "Section eyebrow", "services"),
    textField("servicesTitle", "Section heading", "services"),
    textField("servicesDescription", "Section description", "services", true),
    textField("servicesLinkLabel", "View services button label", "services"),
    linkField("servicesLinkHref", "View services button destination", "services"),
    textField("servicesCardLabel", "Service card link label", "services"),
    textField("projectsEyebrow", "Section eyebrow", "projects"),
    textField("projectsTitle", "Section heading", "projects"),
    textField("projectsLinkLabel", "View projects button label", "projects"),
    linkField("projectsLinkHref", "View projects button destination", "projects"),
    textField("storiesEyebrow", "Section eyebrow", "stories"),
    textField("storiesTitle", "Section heading", "stories"),
    textField("storiesLinkLabel", "View stories button label", "stories"),
    linkField("storiesLinkHref", "View stories button destination", "stories"),
    textField("storiesCardLabel", "Story card link label", "stories"),
    textField("supportTitle", "Banner heading", "support"),
    textField("supportDescription", "Banner description", "support", true),
    textField("supportPrimaryLabel", "Primary button label", "support"),
    linkField("supportPrimaryHref", "Primary button destination", "support"),
    textField("supportSecondaryLabel", "Secondary button label", "support"),
    linkField("supportSecondaryHref", "Secondary button destination", "support"),
    textField("testimonialsEyebrow", "Section eyebrow", "testimonials"),
    textField("testimonialsTitle", "Section heading", "testimonials"),
    textField("testimonialsDescription", "Section description", "testimonials", true),
    textField("testimonialsCarouselTitle", "Carousel heading", "testimonials"),
    textField("testimonialsCarouselSubtitle", "Carousel subtitle", "testimonials"),
    textField("testimonialsLinkLabel", "View testimonials link label", "testimonials"),
    linkField("testimonialsLinkHref", "View testimonials link destination", "testimonials"),
  ],
  preview: { prepare: () => ({ title: "Homepage", subtitle: "Intro, slideshow and homepage sections" }) },
});
