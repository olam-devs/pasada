import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";

export type ResourceKind = "publication" | "newsletter" | "annualReport";

/** The three Resources pages. Editors upload PDFs to these in Sanity Studio. */
export const resourceSections: {
  kind: ResourceKind;
  slug: string;
  title: string;
  singular: string;
  description: string;
  empty: string;
}[] = [
  {
    kind: "publication",
    slug: "publications",
    title: "Publications",
    singular: "Publication",
    description: "Research papers, reports and briefs from PASADA's work.",
    empty: "No publications have been published yet.",
  },
  {
    kind: "newsletter",
    slug: "newsletters",
    title: "Newsletters",
    singular: "Newsletter",
    description: "Regular updates from PASADA's programmes and communities.",
    empty: "No newsletters have been published yet.",
  },
  {
    kind: "annualReport",
    slug: "annual-reports",
    title: "Annual reports",
    singular: "Annual report",
    description: "Yearly reviews of PASADA's work, reach and finances.",
    empty: "No annual reports have been published yet.",
  },
];

export function sectionBySlug(slug: string) {
  return resourceSections.find((section) => section.slug === slug);
}

export type ResourceItem = {
  _id: string;
  kind: ResourceKind;
  title: string;
  date: string;
  authors?: string;
  source?: string;
  summary?: string;
  coverUrl?: string;
  viewUrl: string;
  downloadUrl: string;
  sizeLabel?: string;
};

type Row = {
  _id: string;
  _createdAt: string;
  kind?: string;
  title?: string;
  publishedAt?: string;
  authors?: string;
  source?: string;
  summary?: string;
  cover?: Parameters<typeof urlFor>[0];
  fileUrl: string;
  fileName?: string;
  fileSize?: number;
};

const listQuery = groq`
  *[_type == "resource" && defined(file.asset)] {
    _id, _createdAt, kind, title, publishedAt, authors, source, summary, cover,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename,
    "fileSize": file.asset->size
  }
`;

/** "PASADA_Annual-Report_2024.pdf" becomes "PASADA Annual Report 2024". */
export function titleFromFileName(name?: string) {
  if (!name) return "Untitled document";
  const base = name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "Untitled document";
}

function sizeLabel(bytes?: number) {
  if (!bytes) return undefined;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function mapRow(row: Row): ResourceItem {
  const kind = (resourceSections.some((s) => s.kind === row.kind)
    ? row.kind
    : "publication") as ResourceKind;
  return {
    _id: row._id,
    kind,
    title: row.title?.trim() || titleFromFileName(row.fileName),
    date: row.publishedAt ?? row._createdAt,
    authors: row.authors?.trim() || undefined,
    source: row.source?.trim() || undefined,
    summary: row.summary?.trim() || undefined,
    coverUrl: row.cover ? urlFor(row.cover).width(480).url() : undefined,
    viewUrl: row.fileUrl,
    // Sanity's file CDN sends the file as a download, keeping its own name.
    downloadUrl: `${row.fileUrl}?dl=`,
    sizeLabel: sizeLabel(row.fileSize),
  };
}

/** Every published resource, newest first. */
export async function getResources(): Promise<ResourceItem[]> {
  if (!sanityConfigured) return [];
  try {
    const rows = await sanityClient.fetch<Row[]>(listQuery);
    return (rows ?? [])
      .filter((row) => row.fileUrl)
      .map(mapRow)
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.error("Unable to load resources", error);
    return [];
  }
}
