import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { PortableContent } from "@/components/content/PortableContent";
import { getAboutPage } from "@/lib/about";
import { getSiteSettings } from "@/lib/settings";
import { imageIdentity } from "@/lib/media";
import { programmeIcon } from "@/lib/programme-icons";
import {
  Eye,
  Handshake,
  Heart,
  Scale,
  Shield,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

const VALUE_ICONS: Record<string, LucideIcon> = {
  scale: Scale,
  users: Users,
  target: Target,
  sparkles: Sparkles,
  heart: Heart,
  eye: Eye,
  handshake: Handshake,
  shield: Shield,
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  return (
    <PageShell
      eyebrow={about.heroEyebrow}
      title={about.heroTitle}
      heroImageSrc={about.mainImageUrl}
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <AnimatedSection delay={0.05}>
            <PortableContent value={about.intro} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="brand-vivid relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_16px_36px_rgba(34,28,28,0.2)]">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-[var(--brand-gold)] ring-1 ring-white/20">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">Mission</h2>
                <p className="mt-3 text-body leading-7 text-white/85">
                  {about.missionText}
                </p>
              </div>
              <div className="brand-gold-band relative overflow-hidden rounded-2xl p-6 shadow-[0_16px_36px_rgba(34,28,28,0.15)]">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">Vision</h2>
                <p className="mt-3 text-base leading-8 text-[var(--ink)]/85 italic">
                  &ldquo;{about.visionText}&rdquo;
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-lg font-semibold text-black">Core values</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {about.coreValues.map((v) => {
                const Icon = VALUE_ICONS[v.icon ?? "heart"] ?? Heart;
                return (
                  <div
                    key={v.title}
                    className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-[var(--primary)] hover:shadow-md"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[var(--primary)] ring-1 ring-[var(--primary)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-black">
                        {v.title}
                      </div>
                      {v.description ? (
                        <p className="mt-1 text-xs leading-5 text-zinc-700">
                          {v.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          {about.focusAreas.length ? (
            <AnimatedSection delay={0.2}>
              <div className="brand-tint rounded-2xl border border-[var(--brand-gold)]/30 p-6">
                <div className="text-sm font-semibold text-[var(--ink)]">
                  What we focus on
                </div>
                <ul className="mt-4 grid gap-3 text-sm text-zinc-800 sm:grid-cols-2">
                  {about.focusAreas.map((item) => {
                    const Icon = programmeIcon(item.toLowerCase().replace(/\s+/g, "-"));
                    return (
                      <li key={item} className="flex items-center gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedSection>
          ) : null}
        </div>

        <aside className="space-y-4">
          {imageIdentity(about.sideImageUrl) !==
          imageIdentity(about.mainImageUrl) ? (
            <AnimatedSection>
              <div className="photo-frame relative h-56 overflow-hidden rounded-2xl shadow-lg ring-4 ring-[var(--brand-gold)]/40">
                <PasadaImage
                  src={about.sideImageUrl}
                  alt="PASADA staff and volunteers in the community"
                  fill
                  className="photo-vivid object-cover"
                  sizes="400px"
                />
              </div>
            </AnimatedSection>
          ) : null}

          <AnimatedSection delay={0.05}>
            <div className="rounded-2xl border border-[var(--primary)] bg-red-50 p-6">
              <div className="text-sm font-semibold text-black">
                {about.ctaTitle}
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-800">
                {about.ctaText}
              </p>
              <div className="mt-4 text-sm font-semibold text-[var(--primary)] underline">
                <a href="/get-involved">Get involved</a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="text-sm font-semibold text-black">Contact</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-800">
                <div>
                  Email:{" "}
                  <a
                    className="font-semibold text-black underline"
                    href={`mailto:${settings.email}`}
                  >
                    {settings.email}
                  </a>
                </div>
                <div>
                  Phone:{" "}
                  <a
                    className="font-semibold text-black underline"
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </aside>
      </div>
    </PageShell>
  );
}
