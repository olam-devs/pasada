import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { isLogoImage } from "@/lib/media";

export function PageShell({ title, eyebrow, heroImageSrc, heroImageAlt, children }: {
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
        <section aria-label={eyebrow ?? title} className="relative overflow-hidden border-b border-zinc-200 bg-[#f6f7f5]">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50/80 to-transparent" aria-hidden="true" />
          <Container className={`relative mx-auto max-w-7xl ${heroImageSrc ? "py-7 sm:py-8" : "py-10 sm:py-12"}`}>
            <div className={heroImageSrc ? "grid items-center gap-7 md:grid-cols-[1fr_1.12fr] lg:gap-14" : ""}>
              <div className="max-w-2xl">
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                  <Link href="/" className="rounded hover:text-red-700">Home</Link>
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  <span className="text-blue-800">{eyebrow ?? title}</span>
                </nav>
                <div className="mb-4 h-1 w-12 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]">{title}</h1>
                {heroImageSrc ? <p className="mt-5 text-xs font-medium tracking-[0.14em] text-zinc-500">CARE <span className="mx-2 text-red-500">•</span> HOPE <span className="mx-2 text-red-500">•</span> DIGNITY</p> : null}
              </div>
              {heroImageSrc ? (
                <div className="relative md:pl-3">
                  <div aria-hidden="true" className="absolute -right-3 -top-3 h-20 w-24 rounded-3xl bg-red-100" />
                  <div aria-hidden="true" className="absolute -bottom-2 left-0 h-20 w-28 rounded-3xl bg-blue-100" />
                  <div className="relative h-44 overflow-hidden rounded-[1.75rem] rounded-bl-[3.5rem] border-[5px] border-white bg-white shadow-[0_12px_35px_-15px_rgba(15,23,42,0.3)] sm:h-52 md:h-64 lg:h-72">
                    <PasadaImage src={heroImageSrc} alt={heroImageAlt || (logoHero ? "PASADA logo" : `${eyebrow ?? title} at PASADA`)} fill priority className={logoHero ? "object-contain p-6" : "object-cover object-center"} sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw" />
                  </div>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
        <div id="page-content" className="scroll-mt-20"><Container className="mx-auto max-w-7xl py-8 sm:py-10">{children}</Container></div>
      </main>
      <Footer />
    </div>
  );
}
