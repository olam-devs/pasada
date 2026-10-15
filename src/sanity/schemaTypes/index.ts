import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { homePage } from "@/sanity/schemaTypes/homePage";
import { servicesPage } from "@/sanity/schemaTypes/servicesPage";
import { aboutPage } from "@/sanity/schemaTypes/aboutPage";
import { page } from "@/sanity/schemaTypes/page";
import { service } from "@/sanity/schemaTypes/service";
import { project } from "@/sanity/schemaTypes/project";
import { testimonial } from "@/sanity/schemaTypes/testimonial";
import { post } from "@/sanity/schemaTypes/post";
import { category } from "@/sanity/schemaTypes/category";
import { job } from "@/sanity/schemaTypes/job";
import { tender } from "@/sanity/schemaTypes/tender";
import { projectCategory } from "@/sanity/schemaTypes/projectCategory";
import { serviceCategory } from "@/sanity/schemaTypes/serviceCategory";
import { testimonialCategory } from "@/sanity/schemaTypes/testimonialCategory";

export const schemaTypes = [
  homePage,
  servicesPage,
  siteSettings,
  aboutPage,
  page,
  category,
  projectCategory,
  serviceCategory,
  testimonialCategory,
  service,
  project,
  testimonial,
  post,
  job,
  tender,
];
