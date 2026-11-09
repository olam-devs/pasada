import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  HandHeart,
  Stethoscope,
  Users,
  ShieldCheck,
  Scale,
  Sparkles,
  Target,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { PartnersBelt } from "@/components/home/PartnersBelt";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ContentCard } from "@/components/content/ContentCard";
import { PhotoOverlayCard } from "@/components/content/PhotoOverlayCard";
import { PortableContent } from "@/components/content/PortableContent";
import { getSiteSettings } from "@/lib/settings";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getBlogPosts } from "@/lib/blog";
import { getHomePage } from "@/lib/home-page";
import { getTestimonials } from "@/lib/testimonials";
import { getAboutPage } from "@/lib/about";

export const dynamic = "force-dynamic";

const FOUNDED = 1992;

const VALUE_ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  users: Users,
  target: Target,
  sparkles: Sparkles,
  heart: Heart,
  eye: Eye,
};

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={light ? "section-kicker !text-[var(--brand-gold)]" : "section-kicker"}>
        {eyebrow}
      </p>
      <h2 className={`section-title mt-3 ${light ? "!text-white" : ""}`}>{title}</h2>
      <div className="mx-auto mt-5 h-1 w-12 bg-[var(--brand-gold)]" />
      {description ? (
        <p className={`mt-5 text-body leading-7 ${light ? "text-white/80" : "text-zinc-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Rings() {
  return (
    <>
      <span className="brand-rings -left-28 -top-36 h-96 w-96" aria-hidden="true" />
      <span className="brand-rings -bottom-56 -right-24 h-[460px] w-[460px]" aria-hidden="true" />
    </>
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
          <div className="hero-text max-w-[600px] text-white">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold leading-6 tracking-[.1em] text-white/90">
              <span className="h-px w-8 shrink-0 bg-[var(--brand-gold)]" />
              {home.heroEyebrow}
            </p>
            <h1 className="text-balance text-[1.8rem] font-bold leading-[1.15] tracking-tight sm:text-[2.35rem] lg:text-[2.6rem]">
              {home.heroTitle}
            </h1>
            <p className="mt-5 max-w-[540px] text-body leading-7 text-white/90 sm:text-base sm:leading-8">
              {home.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={home.heroPrimaryHref}
                className="bg-white text-sm text-[var(--primary-2)] hover:bg-[var(--brand-cream)]"
              >
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

        {/* Who we are: two framed photos on a brand-colour block. */}
        <section
          className="relative overflow-hidden bg-white py-16 lg:py-24"
          aria-labelledby="who-we-are"
        >
          <Container>
            <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
              <div className="relative mx-auto w-full max-w-xl pb-16 pl-5 pr-8 pt-5 sm:pb-20 sm:pl-7 sm:pr-14 sm:pt-7 lg:mx-0 2xl:max-w-[44rem]">
                <div
                  className="brand-vivid absolute bottom-28 left-0 right-4 top-0 rounded-2xl sm:right-9"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-2 bottom-2 h-28 w-28 rounded-full border-[14px] border-[var(--brand-gold)]/35"
                  aria-hidden="true"
                />
                <div className="photo-frame relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <PasadaImage
                    src={about.mainImageUrl}
                    alt="The PASADA centre in Dar es Salaam"
                    fill
                    sizes="(min-width:1024px) 40vw, 90vw"
                    className="photo-vivid object-cover"
                  />
                </div>
                <div className="photo-frame absolute bottom-0 right-0 aspect-[4/3] w-[48%] overflow-hidden rounded-xl border-[6px] border-white shadow-2xl">
                  <PasadaImage
                    src={home.aboutInset.src}
                    alt={home.aboutInset.alt}
                    fill
                    sizes="(min-width:1024px) 20vw, 45vw"
                    className="photo-vivid object-cover"
                  />
                </div>
                <div className="absolute bottom-8 left-0 rounded-xl bg-[var(--brand-gold)] px-5 py-4 text-[var(--ink)] shadow-lg sm:bottom-12 sm:left-5">
                  <div className="text-3xl font-extrabold leading-none sm:text-4xl">
                    {FOUNDED}
                  </div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[.14em]">
                    Serving since
                  </div>
                </div>
              </div>
              <div>
                <p className="section-kicker">{home.aboutEyebrow}</p>
                <h2 id="who-we-are" className="section-title mt-3">
                  {home.aboutTitle}
                </h2>
                <div className="my-5 h-1 w-12 bg-[var(--brand-gold)]" />
                <div className="text-body leading-7 text-zinc-600">
                  <PortableContent value={about.intro?.slice(0, 2)} />
                </div>
                <ButtonLink href={home.aboutLinkHref} className="mt-7">
                  {home.aboutLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        {/* Approach highlights, on flame gold. Reach figures live in the annual
            reports (Resources), since PASADA updates them over time. */}
        <section
          className="brand-gold-band relative overflow-hidden"
          aria-label="PASADA at a glance"
        >
          <Rings />
          <Container className="relative py-14 lg:py-16">
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {home.highlights.map((item) => {
                const Icon =
                  item.icon === "community"
                    ? Users
                    : item.icon === "compassion"
                      ? HandHeart
                      : Stethoscope;
                return (
                  <div key={item._key} className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--primary)] text-white shadow-md">
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--ink)]/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Programmes: maroon header with photo cards overlapping a tinted base. */}
        <section aria-labelledby="programmes">
          <div className="brand-banner relative overflow-hidden pb-40 pt-16 text-white lg:pt-20">
            <Rings />
            <Container className="relative">
              <div id="programmes">
                <SectionHeading
                  tone="light"
                  eyebrow={home.servicesEyebrow}
                  title={home.servicesTitle}
                  description={home.servicesDescription}
                />
              </div>
            </Container>
          </div>
          <div className="brand-tint pb-16 lg:pb-24">
            <Container className="relative -mt-28">
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
                    iconKey={item.slug}
                  />
                ))}
              </div>
              <div className="mt-12 text-center">
                <ButtonLink href={home.servicesLinkHref}>
                  {home.servicesLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </Container>
          </div>
        </section>

        {/* Photo banner: real PASADA photo washed in PASADA red (duotone). */}
        <section
          className="relative isolate overflow-hidden bg-[var(--primary-2)] text-white"
          aria-labelledby="community-banner"
        >
          <div className="absolute inset-0">
            <PasadaImage
              src={home.banner.src}
              alt={home.banner.alt}
              fill
              sizes="100vw"
              className="photo-duotone object-cover"
            />
            <div
              className="absolute inset-0 bg-[var(--primary)] mix-blend-multiply"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[rgba(127,14,32,0.55)] lg:bg-transparent lg:bg-gradient-to-r lg:from-[rgba(127,14,32,0.88)] lg:via-[rgba(127,14,32,0.4)] lg:to-transparent"
              aria-hidden="true"
            />
          </div>
          <Container className="relative py-20 lg:py-28">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-[var(--brand-gold)]">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />
                {home.bannerEyebrow}
              </p>
              <h2
                id="community-banner"
                className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
              >
                {home.bannerTitle}
              </h2>
              <p className="mt-5 text-body leading-7 text-white/85 sm:text-base sm:leading-8">
                {home.bannerText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={home.bannerLinkHref}
                  className="bg-white text-[var(--primary-2)] hover:bg-[var(--brand-cream)]"
                >
                  {home.bannerLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={home.projectsLinkHref}
                  variant="ghost"
                  className="border border-white/60 text-white hover:bg-white/10"
                >
                  {home.projectsLinkLabel}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission and vision on a vivid card; core values beside it. */}
        <section className="brand-tint py-16 lg:py-24">
          <Container>
            <SectionHeading eyebrow={home.valuesEyebrow} title={home.valuesTitle} />
            <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="brand-vivid relative overflow-hidden rounded-2xl p-8 text-white shadow-[0_20px_45px_rgba(34,28,28,0.25)] sm:p-10">
                <span className="brand-rings -bottom-40 -right-32 h-80 w-80" aria-hidden="true" />
                <div className="relative flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Heart className="h-6 w-6 text-[var(--brand-gold)]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{home.missionTitle}</h3>
                    <p className="mt-2 text-body leading-7 text-white/85">{home.missionText}</p>
                  </div>
                </div>
                <div className="relative my-7 h-px bg-white/20" />
                <div className="relative flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    <Eye className="h-6 w-6 text-[var(--brand-gold)]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{home.visionTitle}</h3>
                    <p className="mt-2 text-body leading-7 text-white/85">{about.visionText}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[var(--ink)]">
                    Our core values
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-[var(--brand-gold)] to-transparent" />
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {about.coreValues.map((value) => {
                    const Icon = VALUE_ICONS[value.icon ?? ""] ?? ShieldCheck;
                    return (
                      <div
                        key={value.title}
                        className="flex gap-4 rounded-xl border-b-4 border-[var(--brand-gold)] bg-white p-5 shadow-[0_8px_24px_rgba(34,28,28,0.07)]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--brand-blush)] text-[var(--primary)]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--ink)]">
                            {value.title}
                          </h4>
                          {value.description ? (
                            <p className="mt-1 text-xs leading-6 text-zinc-600">
                              {value.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Projects as full-photo cards. */}
        <section className="bg-white py-16 lg:py-24">
          <Container>
            <SectionHeading eyebrow={home.projectsEyebrow} title={home.projectsTitle} />
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((item) => (
                <PhotoOverlayCard
                  key={item._id}
                  href={`/projects/${item.slug}`}
                  title={item.title}
                  excerpt={item.summary}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <ButtonLink href={home.projectsLinkHref}>
                {home.projectsLinkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </section>

        {posts.length ? (
          <section className="brand-tint py-16 lg:py-24">
            <Container>
              <SectionHeading eyebrow={home.storiesEyebrow} title={home.storiesTitle} />
              <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="mt-12 text-center">
                <ButtonLink href={home.storiesLinkHref} variant="secondary">
                  {home.storiesLinkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </Container>
          </section>
        ) : null}

        {/* Testimonials on charcoal (the logo's black). */}
        <section className="brand-dark relative overflow-hidden py-16 text-white lg:py-24">
          <Rings />
          <Container className="relative">
            <div className="grid items-center gap-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <Quote className="h-10 w-10 text-[var(--brand-gold)]" aria-hidden="true" />
                <p className="section-kicker mt-5 !text-[var(--brand-gold)]">
                  {home.testimonialsEyebrow}
                </p>
                <h2 className="section-title mt-3 !text-white">{home.testimonialsTitle}</h2>
                <p className="mt-5 text-body leading-7 text-white/80">
                  {home.testimonialsDescription}
                </p>
                <Link
                  href={home.testimonialsLinkHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-gold)] underline-offset-4 hover:underline"
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

        <PartnersBelt partners={home.partners} />

        {/* Support call to action over a photo. */}
        <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
          <PasadaImage
            src={home.supportPhoto.src}
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(209,26,47,0.95)] via-[rgba(176,20,42,0.9)] to-[rgba(127,14,32,0.8)]"
            aria-hidden="true"
          />
          <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                {home.supportTitle}
              </h2>
              <p className="mt-4 text-body leading-7 text-white/85">
                {home.supportDescription}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink
                href={home.supportPrimaryHref}
                className="bg-white text-[var(--primary-2)] hover:bg-[var(--brand-cream)]"
              >
                {home.supportPrimaryLabel}
              </ButtonLink>
              <ButtonLink
                href={home.supportSecondaryHref}
                variant="ghost"
                className="border border-white/70 text-white hover:bg-white/10"
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
