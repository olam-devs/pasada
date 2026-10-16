import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  HandHeart,
  Stethoscope,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ContentCard } from "@/components/content/ContentCard";
import { PortableContent } from "@/components/content/PortableContent";
import { getSiteSettings } from "@/lib/settings";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getBlogPosts } from "@/lib/blog";
import { getHomePage } from "@/lib/home-page";
import { getTestimonials } from "@/lib/testimonials";
import { getAboutPage } from "@/lib/about";

export const dynamic = "force-dynamic";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      <div className="mx-auto mt-5 h-1 w-12 bg-[var(--brand-gold)]" />
      {description ? (
        <p className="mt-5 text-sm leading-7 text-zinc-600">{description}</p>
      ) : null}
    </div>
  );
}

export default async function Home() {
  const [settings, home, about] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getAboutPage(),
  ]);
  const [services, projects, posts, testimonials] = await Promise.all([
    getServices({ featuredOnly: true, limit: settings.maxFeaturedServices }),
    getProjects({ featuredOnly: true, limit: settings.maxFeaturedProjects }),
    getBlogPosts({ featuredOnly: true, limit: settings.maxFeaturedPosts }),
    getTestimonials({ featuredOnly: true, limit: 6 }),
  ]);
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main>
        <HeroSlideshow
          slides={home.slides}
          intervalSeconds={home.slideInterval}
        >
          <div className="max-w-[690px] text-white">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold leading-6 tracking-[.1em] text-white/90">
              <span className="h-px w-8 shrink-0 bg-[var(--brand-gold)]" />
              {home.heroEyebrow}
            </p>
            <h1 className="text-balance text-[2.05rem] font-bold leading-[1.13] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {home.heroTitle}
            </h1>
            <p className="mt-6 max-w-[570px] text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
              {home.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={home.heroPrimaryHref} className="text-sm">
                {home.heroPrimaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={home.heroSecondaryHref}
                variant="ghost"
                className="border border-white/65 text-sm text-white hover:bg-white/10"
              >
                {home.heroSecondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </HeroSlideshow>

        <section
          className="bg-white py-16 lg:py-24"
          aria-labelledby="who-we-are"
        >
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="relative pb-5 pr-5">
                <div
                  className="absolute bottom-0 left-5 right-0 top-5 rounded-lg border-2 border-[var(--brand-gold)]"
                  aria-hidden="true"
                />
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-[var(--brand-cream)]">
                  <PasadaImage
                    src={
                      about.mainImageUrl.includes(
                        "pasada.or.tz/uploads/service-1.jpg",
                      )
                        ? "/images/home-clinical-care.jpg"
                        : about.mainImageUrl
                    }
                    alt="PASADA care and community services"
                    fill
                    sizes="(min-width:1024px) 50vw,100vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-10 right-0 rounded-l-lg bg-[var(--brand-maroon)] px-6 py-4 text-sm font-semibold text-white">
                  Care. Hope. Dignity.
                </span>
              </div>
              <div>
                <p className="section-kicker">Who we are</p>
                <h2 id="who-we-are" className="section-title mt-3">
                  Pastoral Activities and Services for people with AIDS
                </h2>
                <div className="my-5 h-1 w-12 bg-[var(--brand-gold)]" />
                <div className="text-sm leading-7 text-zinc-600">
                  <PortableContent value={about.intro?.slice(0, 2)} />
                </div>
                <ButtonLink href="/about" className="mt-7">
                  About PASADA
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="brand-banner text-white" aria-label="Our approach">
          <Container className="grid gap-8 py-10 md:grid-cols-3 md:gap-10">
            {home.highlights.map((item) => {
              const Icon =
                item.icon === "community"
                  ? Users
                  : item.icon === "compassion"
                    ? HandHeart
                    : Stethoscope;
              return (
                <div key={item._key} className="flex items-start gap-4">
                  <Icon
                    className="h-10 w-10 shrink-0 text-[var(--brand-gold)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        <section className="bg-[var(--brand-cream)] py-16 lg:py-24">
          <Container>
            <SectionHeading
              eyebrow={home.servicesEyebrow}
              title={home.servicesTitle}
              description={home.servicesDescription}
            />
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item, i) => (
                <ContentCard
                  key={item._id}
                  href={`/services/${item.slug}`}
                  title={item.title}
                  excerpt={item.summary}
                  imageUrl={item.imageUrl}
                  badge={item.category}
                  index={i}
                  cta={home.servicesCardLabel}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <ButtonLink href={home.servicesLinkHref}>
                {home.servicesLinkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-24">
          <Container>
            <SectionHeading
              eyebrow="What guides us"
              title="Our mission, vision and values"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-zinc-200 p-7 sm:p-9">
                <Heart
                  className="h-9 w-9 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-xl font-semibold text-[var(--brand-maroon)]">
                  {home.missionTitle}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {home.missionText}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-[var(--brand-cream)] p-7 sm:p-9">
                <Eye
                  className="h-9 w-9 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-xl font-semibold text-[var(--brand-maroon)]">
                  Our vision
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {about.visionText}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {about.coreValues.map((value) => (
                <div
                  key={value.title}
                  className="flex gap-3 rounded-lg bg-[var(--brand-blush)] p-5"
                >
                  <ShieldCheck
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--brand-maroon)]">
                      {value.title}
                    </h3>
                    {value.description ? (
                      <p className="mt-2 text-xs leading-6 text-zinc-600">
                        {value.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[var(--brand-cream)] py-16 lg:py-24">
          <Container>
            <SectionHeading
              eyebrow={home.projectsEyebrow}
              title={home.projectsTitle}
            />
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((item, i) => (
                <ContentCard
                  key={item._id}
                  href={`/projects/${item.slug}`}
                  title={item.title}
                  excerpt={item.summary}
                  imageUrl={item.imageUrl}
                  badge={item.tag ?? item.category}
                  index={i}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <ButtonLink href={home.projectsLinkHref}>
                {home.projectsLinkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </section>

        {posts.length ? (
          <section className="py-16 lg:py-24">
            <Container>
              <SectionHeading
                eyebrow={home.storiesEyebrow}
                title={home.storiesTitle}
              />
              <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((item, i) => (
                  <ContentCard
                    key={item._id}
                    href={`/blog/${item.slug}`}
                    title={item.title}
                    excerpt={item.excerpt}
                    imageUrl={item.imageUrl}
                    badge={item.category}
                    index={i}
                    cta={home.storiesCardLabel}
                  />
                ))}
              </div>
              <div className="mt-10 text-center">
                <ButtonLink href={home.storiesLinkHref} variant="secondary">
                  {home.storiesLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </Container>
          </section>
        ) : null}

        <section className="bg-[var(--brand-cream)] py-16 lg:py-24">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <p className="section-kicker">{home.testimonialsEyebrow}</p>
                <h2 className="section-title mt-3">{home.testimonialsTitle}</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-600">
                  {home.testimonialsDescription}
                </p>
                <Link
                  href={home.testimonialsLinkHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                >
                  {home.testimonialsLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="min-w-0 lg:col-span-3">
                <TestimonialsCarousel
                  title={home.testimonialsCarouselTitle}
                  subtitle={home.testimonialsCarouselSubtitle}
                  items={testimonials.map((item) => ({
                    quote: item.quote,
                    name: item.name,
                    role: item.role ?? item.category,
                  }))}
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="brand-banner py-14 text-white sm:py-16">
          <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                {home.supportTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80">
                {home.supportDescription}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href={home.supportPrimaryHref}>
                {home.supportPrimaryLabel}
              </ButtonLink>
              <ButtonLink
                href={home.supportSecondaryHref}
                variant="ghost"
                className="border border-white/60 text-white hover:bg-white/10"
              >
                {home.supportSecondaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
