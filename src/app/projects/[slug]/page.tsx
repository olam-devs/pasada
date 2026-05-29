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

export async function generateStaticParams() {
  const projects = await getProjects();
  const slugs = new Set([...getAllProjectSlugs(), ...projects.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell eyebrow="Projects" title={project.title} heroImageSrc={project.imageUrl}>
      <AnimatedSection>
        <DetailLayout
          backHref="/projects"
          backLabel="All projects"
          title={project.title}
          summary={project.summary}
          badge={project.tag ?? project.category}
          imageUrl={project.imageUrl}
          galleryUrls={project.galleryUrls}
          videoUrl={project.videoUrl}
          content={project.content}
        >
          <p>
            This project reflects PASADA&apos;s commitment to compassionate,
            community-centered health programming across Dar es Salaam and partner
            regions.
          </p>
          <p>
            We work with communities and partners to strengthen prevention,
            improve referral pathways, and support clients and caregivers with
            dignity and respect.
          </p>
        </DetailLayout>

        <div className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
          <p className="text-sm text-zinc-800">Interested in partnering on this program?</p>
          <div className="mt-4">
            <ButtonLink href="/contact">Contact PASADA</ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
