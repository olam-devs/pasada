import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { isLogoImage } from "@/lib/media";

export function PageShell({
  title,
  eyebrow,
  heroImageSrc,
  heroImageAlt,
  children,
}: {
  title: string;
  eyebrow?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  children: React.ReactNode;
}) {
  const logo = heroImageSrc ? isLogoImage(heroImageSrc) : false;
  const drawing = heroImageSrc ? /\.svg($|\?)/.test(heroImageSrc) : false;
  const photo = Boolean(heroImageSrc) && !logo && !drawing;
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        {photo && heroImageSrc ? (
          <section
            aria-label={eyebrow ?? title}
            className="relative isolate overflow-hidden bg-[var(--brand-maroon)] text-white"
          >
            <div className="absolute inset-0 -z-10 md:left-[42%]">
              <PasadaImage
                src={heroImageSrc}
                alt={heroImageAlt || `${eyebrow ?? title} at PASADA`}
                fill
                priority
                sizes="(min-width:768px) 58vw, 100vw"
                className="photo-vivid object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-[rgba(72,19,27,0.8)] md:bg-transparent md:bg-gradient-to-r md:from-[var(--brand-maroon)] md:via-[rgba(72,19,27,0.5)] md:to-[rgba(72,19,27,0.22)]"
                aria-hidden="true"
              />
            </div>
            <div
              className="pointer-events-none absolute -left-24 -top-40 h-96 w-96 rounded-full border-[35px] border-white/[.04]"
              aria-hidden="true"
            />
            <Container className="relative py-14 sm:py-16 md:py-20">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.15em] text-[var(--brand-gold)]">
                  <span className="h-px w-8 bg-[var(--brand-gold)]" aria-hidden="true" />
                  {eyebrow ?? "PASADA Tanzania"}
                </p>
                <h1 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">
                  {title}
                </h1>
                <nav
                  aria-label="Breadcrumb"
                  className="mt-5 flex items-center gap-2 text-xs text-white/80"
                >
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  <span>{eyebrow ?? title}</span>
                </nav>
              </div>
            </Container>
            <div
              className="h-1.5 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--primary)] to-[var(--brand-maroon)]"
              aria-hidden="true"
            />
          </section>
        ) : (
        <section
          aria-label={eyebrow ?? title}
          className="brand-banner relative isolate overflow-hidden text-white"
        >
          <div
            className="pointer-events-none absolute -left-24 -top-40 h-96 w-96 rounded-full border-[35px] border-white/[.035]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-60 right-5 h-[450px] w-[450px] rounded-full border-[50px] border-white/[.035]"
            aria-hidden="true"
          />
          <Container
            className={
              heroImageSrc
                ? "relative grid items-center gap-6 py-8 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-10"
                : "relative py-12 text-center sm:py-16"
            }
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.15em] text-[var(--brand-gold)]">
                {eyebrow ?? "PASADA Tanzania"}
              </p>
              <h1 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
                {title}
              </h1>
              <nav
                aria-label="Breadcrumb"
                className={`mt-5 flex items-center gap-2 text-xs text-white/75 ${heroImageSrc ? "" : "justify-center"}`}
              >
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                <span>{eyebrow ?? title}</span>
              </nav>
            </div>
            {heroImageSrc ? (
              <div className="relative h-36 overflow-hidden rounded-xl border-2 border-[var(--brand-gold)]/60 bg-[var(--brand-cream)] shadow-xl md:h-48">
                <PasadaImage
                  src={heroImageSrc}
                  alt={
                    heroImageAlt ||
                    (logo ? "PASADA logo" : `${eyebrow ?? title} at PASADA`)
                  }
                  fill
                  priority
                  className={
                    logo ? "object-contain p-4" : "object-cover object-center"
                  }
                  sizes="(min-width:768px) 40vw,100vw"
                />
              </div>
            ) : null}
          </Container>
          <div
            className="h-1.5 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--primary)] to-[var(--brand-maroon)]"
            aria-hidden="true"
          />
        </section>
        )}
        <div id="page-content" className="scroll-mt-28">
          <Container className="py-10 sm:py-14">{children}</Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}
