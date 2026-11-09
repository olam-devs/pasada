import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import { ProgrammeAside } from "@/components/content/ProgrammeAside";

export const dynamic = "force-dynamic";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServices,
} from "@/lib/services";

export async function generateStaticParams() {
  const services = await getServices();
  const slugs = new Set([
    ...getAllServiceSlugs(),
    ...services.map((s) => s.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, services] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 6);

  return (
    <PageShell
      eyebrow="Services"
      title={service.title}
      heroImageSrc={service.imageUrl}
    >
      <AnimatedSection>
        <DetailLayout
          backHref="/services"
          backLabel="All services"
          title={service.title}
          summary={service.summary}
          imageUrl={service.imageUrl}
          galleryUrls={service.galleryUrls}
          content={service.content}
          aside={
            <ProgrammeAside
              facts={[
                ...(service.category ? [{ label: "Programme area", value: service.category }] : []),
                { label: "Cost", value: "Free of charge" },
                { label: "Who can use it", value: "Open to all, without discrimination" },
                { label: "How we work", value: "Confidential and client-centred" },
              ]}
              linksTitle="Other services"
              links={related.map((s) => ({ href: `/services/${s.slug}`, title: s.title, key: s.slug }))}
              allHref="/services"
              allLabel="All services"
            />
          }
        >
          <p>
            PASADA delivers this service with dignity, confidentiality and
            respect for every client—without discrimination and free of charge.
          </p>
          <p>
            Our team supports clients and families through counseling,
            education, follow-up care and referrals, working closely with health
            facilities and community stakeholders.
          </p>
        </DetailLayout>

        <div className="brand-vivid relative mt-12 overflow-hidden rounded-2xl p-7 text-white shadow-[0_20px_45px_rgba(34,28,28,0.22)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-9">
          <span className="brand-rings -right-24 -top-32 h-72 w-72" aria-hidden="true" />
          <div className="relative">
            <p className="text-xl font-semibold">Need this service or have questions?</p>
            <p className="mt-1 text-sm text-white/80">
              Our team is ready to help, confidentially and free of charge.
            </p>
          </div>
          <div className="relative mt-5 flex shrink-0 flex-wrap gap-3 sm:mt-0">
            <ButtonLink
              href="/contact"
              className="bg-white text-[var(--primary-2)] hover:bg-[var(--brand-cream)]"
            >
              Contact us
            </ButtonLink>
            <ButtonLink
              href="/donate"
              variant="ghost"
              className="border border-white/70 text-white hover:bg-white/10"
            >
              Support our work
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
