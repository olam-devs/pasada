import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSiteSettings } from "@/lib/settings";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <PageShell
      eyebrow="Contact"
      title="Reach out to PASADA"
      heroImageSrc={media.hero.contact}
      heroImageAlt="Illustration of an open envelope and a conversation"
    >
      <AnimatedSection>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-zinc-800">
              Whether you want to donate, volunteer, partner, or learn more
              about our services—contact us and we&apos;ll respond as soon as
              possible.
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black">
                Quick contacts
              </div>
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
                <div>Location: Dar es Salaam, Tanzania</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-lg font-semibold text-black">
              Send a message
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-800">
              Tell us how we can help, then choose Gmail, Outlook or your
              device’s email app to review and send your message.
            </p>

            <ContactForm recipient={settings.email} />
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
