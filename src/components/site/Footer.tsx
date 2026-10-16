import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const explore = [
  { href: "/about", label: "About PASADA" },
  { href: "/services", label: "Our services" },
  { href: "/projects", label: "Our projects" },
  { href: "/testimonials", label: "Community voices" },
  { href: "/blog", label: "News & stories" },
];
const involved = [
  { href: "/get-involved", label: "Volunteer & partner" },
  { href: "/donate", label: "Donate" },
  { href: "/jobs", label: "Careers" },
  { href: "/tenders", label: "Tenders" },
  { href: "/whistleblower", label: "Whistleblower / Tupe taarifa" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[#281015] text-white/75">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <div className="relative h-24 w-24 bg-white">
              <Image
                src="/brand/logo.jpg"
                alt="PASADA Tanzania"
                fill
                sizes="96px"
                className="object-contain p-1"
              />
            </div>
            <p className="mt-5 text-sm leading-7">
              Pastoral Activities and Services for people with AIDS. A
              faith-based organisation under the Roman Catholic Archdiocese of
              Dar es Salaam, serving all with dignity.
            </p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <ChevronRight
                      className="h-3 w-3 text-[var(--brand-gold)]"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Get involved</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {involved.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <ChevronRight
                      className="h-3 w-3 text-[var(--brand-gold)]"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Contact us</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6">
              <li className="flex gap-3">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-gold)]"
                  aria-hidden="true"
                />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li>
                <a
                  href="tel:+255222866618"
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-[var(--brand-gold)]"
                    aria-hidden="true"
                  />
                  +255 22 286 6618
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@pasada.or.tz"
                  className="inline-flex items-center gap-3 hover:text-white"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-[var(--brand-gold)]"
                    aria-hidden="true"
                  />
                  info@pasada.or.tz
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-block text-sm font-semibold text-white underline decoration-[var(--brand-gold)] underline-offset-4"
            >
              Send us a message
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs sm:flex-row">
          <span>
            © {new Date().getFullYear()} PASADA (T). All rights reserved.
          </span>
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
