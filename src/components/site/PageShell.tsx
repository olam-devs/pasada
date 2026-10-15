import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { isLogoImage } from "@/lib/media";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";

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
  const logoHero = heroImageSrc ? isLogoImage(heroImageSrc) : false;

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section aria-label={eyebrow ?? title} className="border-b border-zinc-200 bg-zinc-50">
          {heroImageSrc ? (
              <div className="relative aspect-[3/2] bg-slate-950 sm:aspect-auto sm:h-[calc(100svh-4rem)]">
                <PasadaImage
                  src={heroImageSrc}
                  alt={heroImageAlt || (logoHero ? "PASADA logo" : `${eyebrow ?? title} at PASADA`)}
                  fill
                  priority
                  className={
                    logoHero
                      ? "bg-white object-contain object-center p-12 sm:p-16"
                      : "object-contain object-center"
                  }
                  sizes="100vw"
                />
                <a href="#page-content" aria-label={`Continue to ${title}`} className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-semibold text-zinc-900 shadow-lg transition hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-500">
                  Explore this page <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
          ) : null}

          <Container className="mx-auto max-w-7xl py-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
              <Link href="/" className="rounded hover:text-red-700">Home</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span className="text-red-700">{eyebrow ?? title}</span>
            </nav>
            <div className="mb-5 h-1 w-12 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:leading-tight">
              {title}
            </h1>
          </Container>
        </section>
        <div id="page-content" className="scroll-mt-20">
          <Container className="mx-auto max-w-7xl py-10 sm:py-14">{children}</Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}
