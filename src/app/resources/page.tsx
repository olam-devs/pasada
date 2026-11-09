import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ResourceRow, resourceIcons } from "@/components/resources/ResourceList";
import { getResources, resourceSections } from "@/lib/resources";

export const metadata = {
  title: "Resources",
  description:
    "Download PASADA's publications, newsletters and annual reports.",
};

export default async function ResourcesPage() {
  const items = await getResources();
  const latest = items.slice(0, 5);
  return (
    <PageShell eyebrow="Resources" title="Publications, newsletters and annual reports">
      <p className="text-base leading-8 text-zinc-600">
        Read and download PASADA&apos;s research, newsletters and yearly reports.
        Every document is a PDF you can open in your browser or save.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {resourceSections.map((section) => {
          const Icon = resourceIcons[section.kind];
          const count = items.filter((item) => item.kind === section.kind).length;
          return (
            <Link
              key={section.slug}
              href={`/resources/${section.slug}`}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-[var(--primary)]/40 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--brand-cream)] text-[var(--primary)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--primary)]">
                {section.title}
              </h2>
              <p className="mt-2 flex-1 text-body leading-7 text-zinc-600">
                {section.description}
              </p>
              <p className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm font-semibold text-[var(--primary)]">
                {count === 1 ? "1 document" : count ? `${count} documents` : "No documents yet"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </p>
            </Link>
          );
        })}
      </div>
      <section aria-labelledby="latest-heading" className="mt-14">
        <h2 id="latest-heading" className="text-2xl font-semibold text-[var(--ink)]">
          Latest documents
        </h2>
        <div className="mt-6 space-y-4">
          {latest.map((item) => (
            <ResourceRow key={item._id} item={item} showKind />
          ))}
          {!latest.length ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-7 text-body leading-7 text-zinc-600">
              PASADA&apos;s documents will appear here as soon as they are published.
            </div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
