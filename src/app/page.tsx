import Link from "next/link";
import { ArrowRight, HandHeart, Users, Stethoscope, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ContentCard } from "@/components/content/ContentCard";
import { getSiteSettings } from "@/lib/settings";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getBlogPosts } from "@/lib/blog";
import { getHomePage } from "@/lib/home-page";
import { getTestimonials } from "@/lib/testimonials";

// Featured service pictures must reflect the current published CMS content.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomePage()]);
  const [featuredProjects, featuredServices, featuredPosts, featuredTestimonials] =
    await Promise.all([
    getProjects({ featuredOnly: true, limit: settings.maxFeaturedProjects }),
    getServices({ featuredOnly: true, limit: settings.maxFeaturedServices }),
    getBlogPosts({ featuredOnly: true, limit: settings.maxFeaturedPosts }),
    getTestimonials({ featuredOnly: true, limit: 6 }),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-100/60 via-sky-200/45 to-teal-200/60 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative flex min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            <AnimatedSection>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-900 ring-1 ring-blue-200">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {home.heroEyebrow}
                </div>

                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                  {home.heroTitle}
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-700 sm:text-lg">
                  {home.heroDescription}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href={home.heroPrimaryHref} size="lg" className="justify-center">
                    {home.heroPrimaryLabel} <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink
                    href={home.heroSecondaryHref}
                    variant="secondary"
                    size="lg"
                    className="justify-center"
                  >
                    {home.heroSecondaryLabel}
                  </ButtonLink>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border-2 border-[var(--primary)] bg-white/80 p-4 backdrop-blur sm:grid-cols-3">
                  {home.highlights.map((c) => (
                    <div key={c._key} className="rounded-xl p-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-900 ring-1 ring-blue-100">
                        {c.icon === "community" ? (
                          <Users className="h-4 w-4" aria-hidden="true" />
                        ) : c.icon === "compassion" ? (
                          <HandHeart className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Stethoscope className="h-4 w-4" aria-hidden="true" />
                        )}
                      </div>
                      <div className="mt-2 text-sm font-semibold">{c.title}</div>
                      <div className="mt-1 text-xs leading-5 text-zinc-600">
                        {c.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <HeroSlideshow slides={home.slides} intervalSeconds={home.slideInterval} />
              <div className="pointer-events-none relative z-10 -mt-2 hidden rounded-2xl border-2 border-black bg-white/95 p-4 text-sm shadow-lg sm:block sm:max-w-xs">
                <div className="font-semibold text-black">{home.missionTitle}</div>
                <div className="mt-1 text-zinc-800">
                  {home.missionText}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <Container className="py-16">
          <AnimatedSection>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[var(--brand-blue)]">
                  {home.servicesEyebrow}
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {home.servicesTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">
                  {home.servicesDescription}
                </p>
              </div>
              <ButtonLink href={home.servicesLinkHref} variant="secondary">
                {home.servicesLinkLabel} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <ContentCard
                key={s._id}
                href={`/services/${s.slug}`}
                title={s.title}
                excerpt={s.summary}
                imageUrl={s.imageUrl}
                badge={s.category}
                index={i}
                cta={home.servicesCardLabel}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-zinc-50">
        <Container className="py-16">
          <AnimatedSection>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[var(--brand-blue)]">
                  {home.projectsEyebrow}
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {home.projectsTitle}
                </h2>
              </div>
              <ButtonLink href={home.projectsLinkHref} variant="secondary">
                {home.projectsLinkLabel} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ContentCard
                key={p._id}
                href={`/projects/${p.slug}`}
                title={p.title}
                excerpt={p.summary}
                imageUrl={p.imageUrl}
                badge={p.tag ?? p.category}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {featuredPosts.length > 0 ? (
        <section className="border-t border-[var(--border)] bg-white">
          <Container className="py-16">
            <AnimatedSection>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[var(--brand-blue)]">
                    {home.storiesEyebrow}
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                    {home.storiesTitle}
                  </h2>
                </div>
                <ButtonLink href={home.storiesLinkHref} variant="secondary">
                  {home.storiesLinkLabel} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </AnimatedSection>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, i) => (
                <ContentCard
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  badge={post.category}
                  index={i}
                  cta={home.storiesCardLabel}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-[var(--border)] bg-white">
        <Container className="py-16">
          <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--primary)] bg-gradient-to-br from-red-50 via-white to-blue-50 p-8 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
                  {home.supportTitle}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-800">
                  {home.supportDescription}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <ButtonLink href={home.supportPrimaryHref} size="lg" className="justify-center">
                  {home.supportPrimaryLabel}
                </ButtonLink>
                <ButtonLink
                  href={home.supportSecondaryHref}
                  variant="secondary"
                  size="lg"
                  className="justify-center"
                >
                  {home.supportSecondaryLabel} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-zinc-50">
        <Container className="py-16">
          <div className="grid items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">
                {home.testimonialsEyebrow}
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                {home.testimonialsTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700">
                {home.testimonialsDescription}
              </p>
            </div>
            <div className="min-w-0 lg:col-span-3">
              <TestimonialsCarousel
                title={home.testimonialsCarouselTitle}
                subtitle={home.testimonialsCarouselSubtitle}
                items={featuredTestimonials.map((t) => ({
                  quote: t.quote,
                  name: t.name,
                  role: t.role ?? t.category,
                }))}
              />
              <div className="mt-4 text-sm font-semibold text-[var(--primary)]">
                <Link href={home.testimonialsLinkHref} className="hover:underline">
                  {home.testimonialsLinkLabel} →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
