import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { ResourceRow, ResourceTabs } from "@/components/resources/ResourceList";
import { getResources, resourceSections, sectionBySlug } from "@/lib/resources";

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceSections.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const section = sectionBySlug((await params).section);
  if (!section) return { title: "Resources" };
  return { title: section.title, description: section.description };
}

export default async function ResourceSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const section = sectionBySlug((await params).section);
  if (!section) notFound();
  const all = await getResources();
  const items = all.filter((item) => item.kind === section.kind);
  return (
    <PageShell eyebrow="Resources" title={section.title}>
      <p className="max-w-2xl text-base leading-8 text-zinc-600">
        {section.description} Choose View to read a document in your browser,
        or Download to save it.
      </p>
      <div className="mt-8 border-b border-zinc-200 pb-6">
        <ResourceTabs items={all} current={section.kind} />
      </div>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <ResourceRow key={item._id} item={item} />
        ))}
        {!items.length ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-7 text-body leading-7 text-zinc-600">
            <p>{section.empty}</p>
            <Link
              href="/resources"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all resources
            </Link>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
