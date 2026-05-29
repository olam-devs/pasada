import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import { getProjectCategories, getProjects } from "@/lib/projects";
import { media } from "@/lib/media";

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  const items = projects.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    imageUrl: p.imageUrl,
    badge: p.tag ?? p.category,
    categorySlug: p.categorySlug,
  }));

  return (
    <PageShell
      eyebrow="Projects"
      title="Our projects"
      heroImageSrc={media.hero.projects}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          PASADA works with partners on community-based initiatives that strengthen
          prevention, care and resilience. Open any project for photos, videos and
          full details.
        </p>
      </AnimatedSection>

      <CategoryGrid
        items={items}
        categories={categories}
        basePath="/projects"
        allLabel="All projects"
      />
    </PageShell>
  );
}
