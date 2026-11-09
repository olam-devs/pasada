import Link from "next/link";
import { BookOpen, ChartColumn, Download, Eye, FileText, Newspaper, Users } from "lucide-react";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { cn } from "@/lib/cn";
import {
  resourceSections,
  type ResourceItem,
  type ResourceKind,
} from "@/lib/resources";

export const resourceIcons: Record<ResourceKind, typeof FileText> = {
  publication: BookOpen,
  newsletter: Newspaper,
  annualReport: ChartColumn,
};

function formatDate(item: ResourceItem) {
  return new Date(item.date).toLocaleDateString("en-GB", {
    ...(item.kind === "newsletter" ? { month: "long" as const } : {}),
    year: "numeric",
    timeZone: "Africa/Dar_es_Salaam",
  });
}

/** Pills linking the three Resources pages, with how many documents each has. */
export function ResourceTabs({
  items,
  current,
}: {
  items: ResourceItem[];
  current?: ResourceKind;
}) {
  return (
    <nav aria-label="Resource types" className="flex flex-wrap gap-2.5 text-sm">
      {resourceSections.map((section) => {
        const active = section.kind === current;
        const count = items.filter((item) => item.kind === section.kind).length;
        return (
          <Link
            key={section.slug}
            href={`/resources/${section.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full border px-4 py-2 font-semibold transition-colors",
              active
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-[var(--primary)] hover:text-[var(--primary)]",
            )}
          >
            {section.title} · {count}
          </Link>
        );
      })}
    </nav>
  );
}

/** One document: cover or icon, title, details, and View / Download buttons. */
export function ResourceRow({
  item,
  showKind = false,
}: {
  item: ResourceItem;
  showKind?: boolean;
}) {
  const Icon = resourceIcons[item.kind];
  const kindTitle = resourceSections.find((s) => s.kind === item.kind)?.singular;
  return (
    <article className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-[var(--primary)]/30 hover:shadow-md sm:gap-6 sm:p-6">
      <div className="relative h-[88px] w-16 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-[var(--brand-cream)] sm:h-[132px] sm:w-24">
        {item.coverUrl ? (
          <PasadaImage
            src={item.coverUrl}
            alt=""
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1.5 text-[var(--primary)]">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-wider sm:text-xs">PDF</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-zinc-500">
          {showKind && kindTitle ? (
            <span className="rounded-full bg-[var(--brand-cream)] px-2.5 py-0.5 font-semibold text-[var(--primary-2)]">
              {kindTitle}
            </span>
          ) : null}
          <span>{formatDate(item)}</span>
          {item.sizeLabel ? <span>PDF · {item.sizeLabel}</span> : <span>PDF</span>}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl">
          {item.title}
        </h3>
        {item.authors ? (
          <p className="mt-2 flex gap-2 text-sm leading-6 text-zinc-600">
            <Users className="mt-1 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <span>
              {item.authors}
              {item.source ? <em className="text-zinc-500"> · {item.source}</em> : null}
            </span>
          </p>
        ) : item.source ? (
          <p className="mt-2 text-sm italic text-zinc-500">{item.source}</p>
        ) : null}
        {item.summary ? (
          <p className="mt-3 line-clamp-3 text-body leading-7 text-zinc-600">{item.summary}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={item.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${item.title} (PDF, opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary)] hover:bg-[var(--brand-cream)]"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </a>
          <a
            href={item.downloadUrl}
            aria-label={`Download ${item.title} (PDF${item.sizeLabel ? `, ${item.sizeLabel}` : ""})`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-2)]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </article>
  );
}
