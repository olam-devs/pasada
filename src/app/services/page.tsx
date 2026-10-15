import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import { getServiceCategories, getServices } from "@/lib/services";
import { getServicesPage } from "@/lib/services-page";

export default async function ServicesPage() {
  const [services, categories, page] = await Promise.all([
    getServices(),
    getServiceCategories(),
    getServicesPage(),
  ]);

  const items = services.map((s) => ({
    _id: s._id,
    title: s.title,
    slug: s.slug,
    summary: s.summary,
    imageUrl: s.imageUrl,
    badge: s.category,
    categorySlug: s.categorySlug,
  }));

  return (
    <PageShell
      eyebrow={page.heroEyebrow}
      title={page.heroTitle}
      heroImageSrc={page.mainImageUrl}
      heroImageAlt={page.mainImageAlt}
    >
      <AnimatedSection>
        <p className="max-w-none text-sm leading-7 text-zinc-800">
          {page.intro}
        </p>
      </AnimatedSection>

      <CategoryGrid
        items={items}
        categories={categories}
        basePath="/services"
        allLabel={page.allLabel}
      />
    </PageShell>
  );
}
