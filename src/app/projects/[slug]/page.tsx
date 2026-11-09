import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import { cn } from "@/lib/cn";
import { ProgrammeAside } from "@/components/content/ProgrammeAside";

export async function generateStaticParams() {
  const projects = await getProjects();
  const slugs = new Set([
    ...getAllProjectSlugs(),
    ...projects.map((p) => p.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);
  if (!project) notFound();
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 5);
  const focus = project.tag ?? project.category;
  const facts = [
    { label: "Status", value: project.status },
    ...(project.partner ? [{ label: "Partner", value: project.partner }] : []),
    ...(project.duration ? [{ label: "Duration", value: project.duration }] : []),
    ...(focus ? [{ label: "Focus", value: focus }] : []),
  ];

  return (
    <PageShell
      eyebrow="Projects"
      title={project.title}
      heroImageSrc={project.imageUrl}
    >
      <AnimatedSection>
        <div className="mb-2 flex flex-wrap items-center gap-2 lg:hidden">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1",
              project.status === "Ongoing"
                ? "bg-rose-50 text-rose-700 ring-rose-300"
                : "bg-zinc-100 text-zinc-600 ring-zinc-300",
            )}
          >
            {project.status}
          </span>
          {project.partner ? (
            <span className="text-sm text-zinc-700">
              Partner: {project.partner}
            </span>
          ) : null}
          {project.duration ? (
            <span className="text-sm text-zinc-700">
              Duration: {project.duration}
            </span>
          ) : null}
        </div>

        <DetailLayout
          backHref="/projects"
          backLabel="All projects"
          title={project.title}
          summary={project.summary}
          imageUrl={project.imageUrl}
          galleryUrls={project.galleryUrls}
          videoUrl={project.videoUrl}
          content={project.content}
          aside={
            <ProgrammeAside
              facts={facts}
              linksTitle="Other projects"
              links={related.map((p) => ({ href: `/projects/${p.slug}`, title: p.title, key: p.slug }))}
              allHref="/projects"
              allLabel="All projects"
            />
          }
        >
          <p>
            This project reflects PASADA&apos;s commitment to compassionate,
            community-centered health programming across Dar es Salaam and
            partner regions.
          </p>
          <p>
            We work with communities and partners to strengthen prevention,
            improve referral pathways, and support clients and caregivers with
            dignity and respect.
          </p>
        </DetailLayout>

        <div className="brand-vivid relative mt-12 overflow-hidden rounded-2xl p-7 text-white shadow-[0_20px_45px_rgba(34,28,28,0.22)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-9">
          <span className="brand-rings -right-24 -top-32 h-72 w-72" aria-hidden="true" />
          <p className="relative text-xl font-semibold">
            Interested in partnering on this program?
          </p>
          <div className="relative mt-5 shrink-0 sm:mt-0">
            <ButtonLink
              href="/contact"
              className="bg-white text-[var(--primary-2)] hover:bg-[var(--brand-cream)]"
            >
              Contact PASADA
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
