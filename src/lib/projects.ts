import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";
import type { PortableTextBlock } from "@portabletext/react";

export type ProjectItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tag?: string;
  category?: string;
  categorySlug?: string;
  imageUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  featured?: boolean;
  sortOrder?: number;
};

const SAMPLE: ProjectItem[] = [
  {
    _id: "p1",
    title: "ACHIEVE – PACT",
    slug: "achieve-pact",
    summary:
      "PASADA implements community-level activities supporting health and wellbeing as a sub-grantee partner.",
    tag: "Community",
    category: "Community",
    categorySlug: "community",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-8.jpg",
    galleryUrls: [
      "https://pasada.or.tz/uploads/project-featured-photo-8.jpg",
      "https://pasada.or.tz/uploads/service-1.jpg",
    ],
    sortOrder: 1,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Program overview" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "ACHIEVE – PACT supports community-level activities that strengthen prevention, care, and referral pathways. PASADA works alongside partners to deliver outreach, education, and client follow-up in priority areas.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Key activities" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Community sensitization and health education sessions" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Linkage to care and treatment support" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Supportive follow-up for clients and caregivers" }],
        markDefs: [],
      },
    ],
  },
  {
    _id: "p2",
    title: "Integrated Approach in TB – GLRA",
    slug: "integrated-tb-glra",
    summary:
      "Integrating TB with diabetes, Covid-19, malnutrition and leprosy to improve community health outcomes.",
    tag: "Health",
    category: "Health",
    categorySlug: "health",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-10.jpg"],
    sortOrder: 2,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Integrated health approach" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This project strengthens TB outcomes by integrating screening, education, and referrals with related conditions. Community engagement improves early detection and adherence to care.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "p3",
    title: "READY – REPPSI",
    slug: "ready-reppsi",
    summary:
      "Supporting adolescents and young people living with or most affected by HIV to build resilience.",
    tag: "Youth",
    category: "Youth",
    categorySlug: "youth",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-9.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-9.jpg"],
    sortOrder: 3,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Youth resilience" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "READY – REPPSI supports adolescents and young people with tailored counseling, peer support, and linkage to services—reducing barriers to care and strengthening wellbeing.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "p4",
    title: "SLF (OVC Support)",
    slug: "slf-ovc-support",
    summary:
      "Supporting orphans and vulnerable children, young women and teenage girls across districts in Pwani.",
    tag: "OVC",
    category: "OVC",
    categorySlug: "ovc",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-12.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-12.jpg"],
    sortOrder: 4,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Supporting vulnerable families" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "PASADA supports OVC and caregivers through community follow-up, psychosocial support, referrals and practical guidance—strengthening protection, wellbeing and access to services.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "p5",
    title: "APOPO – SUA",
    slug: "apopo-sua",
    summary:
      "Research using innovative detection methods to improve TB diagnosis from samples that appeared negative.",
    tag: "Research",
    category: "Research",
    categorySlug: "research",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-13.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-13.jpg"],
    sortOrder: 5,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Innovation and research" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Research partnerships can strengthen diagnostic pathways and improve outcomes. PASADA collaborates on approaches that enhance detection and referral—supporting public health goals through evidence-informed practice.",
          },
        ],
        markDefs: [],
      },
    ],
  },
];

const listQuery = groq`
  *[_type == "project"] | order(sortOrder asc, title asc) {
    _id, title, "slug": slug.current, summary, tag, sortOrder, featured,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery, "videoUrl": video.asset->url
  }
`;

const detailQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, summary, tag, sortOrder, featured,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery, content, "videoUrl": video.asset->url
  }
`;

const categoriesQuery = groq`
  *[_type == "projectCategory"] | order(title asc) {
    _id, title, "slug": slug.current
  }
`;

function imageFromSanity(mainImage?: unknown, fallback?: string) {
  if (mainImage) {
    return urlFor(mainImage as Parameters<typeof urlFor>[0])
      .width(1200)
      .height(800)
      .fit("crop")
      .url();
  }
  return fallback ?? media.hero.projects;
}

function mapRow(row: {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  tag?: string;
  category?: string;
  categorySlug?: string;
  mainImage?: unknown;
  gallery?: unknown[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  featured?: boolean;
  sortOrder?: number;
}, fallbackImg?: string): ProjectItem {
  const galleryUrls =
    row.gallery?.map((img) =>
      urlFor(img as Parameters<typeof urlFor>[0]).width(1000).url(),
    ) ?? [];

  const imageUrl = imageFromSanity(row.mainImage, fallbackImg);
  if (!galleryUrls.length) galleryUrls.push(imageUrl);

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    tag: row.tag ?? row.category,
    category: row.category,
    categorySlug: row.categorySlug,
    imageUrl,
    galleryUrls,
    videoUrl: row.videoUrl,
    content: row.content,
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

function filterProjects(list: ProjectItem[], opts?: { featuredOnly?: boolean; limit?: number }) {
  let out = [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  if (opts?.featuredOnly) {
    out = out.filter((p) => p.featured);
  }
  if (opts?.limit) out = out.slice(0, opts.limit);
  return out;
}

export async function getProjects(opts?: { featuredOnly?: boolean; limit?: number }) {
  if (!sanityConfigured) {
    return filterProjects(SAMPLE, opts);
  }
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapRow>[0][]>(listQuery);
    if (!rows?.length) return filterProjects(SAMPLE, opts);
    const list = rows.map((r, i) => mapRow(r, SAMPLE[i % SAMPLE.length]?.imageUrl));
    return filterProjects(list, opts);
  } catch {
    return filterProjects(SAMPLE, opts);
  }
}

export async function getProjectBySlug(slug: string) {
  const sample = SAMPLE.find((p) => p.slug === slug);
  if (!sanityConfigured) return sample ?? null;
  try {
    const row = await sanityClient.fetch<Parameters<typeof mapRow>[0] | null>(
      detailQuery,
      { slug },
    );
    if (row) return mapRow(row);
    return sample ?? null;
  } catch {
    return sample ?? null;
  }
}

export async function getProjectCategories() {
  if (!sanityConfigured) {
    return [
      { _id: "pc1", title: "Community", slug: "community" },
      { _id: "pc2", title: "Health", slug: "health" },
      { _id: "pc3", title: "Youth", slug: "youth" },
    ];
  }
  try {
    const rows = await sanityClient.fetch<{ _id: string; title: string; slug: string }[]>(
      categoriesQuery,
    );
    return rows?.length
      ? rows
      : [
          { _id: "pc1", title: "Community", slug: "community" },
          { _id: "pc2", title: "Health", slug: "health" },
        ];
  } catch {
    return [];
  }
}

export function getAllProjectSlugs() {
  return SAMPLE.map((p) => p.slug);
}
