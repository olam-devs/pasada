"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const groups = [
  { label: "Home", href: "/" },
  {
    label: "Who we are",
    href: "/about",
    children: [
      { label: "About PASADA", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    label: "Our work",
    href: "/services",
    children: [
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
    ],
  },
  { label: "News & stories", href: "/blog" },
  {
    label: "Get involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer & partner", href: "/get-involved" },
      { label: "Donate", href: "/donate" },
    ],
  },
  { label: "Careers", href: "/jobs" },
  { label: "Tenders", href: "/tenders" },
  { label: "Contact", href: "/contact" },
];
const mobileLinks = groups.flatMap(
  (item) => item.children ?? [{ label: item.label, href: item.href }],
);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const elements =
        menuRef.current?.querySelectorAll<HTMLElement>("a[href],button");
      if (!elements?.length) return;
      const start = elements[0],
        end = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return (
    <>
      <div className="brand-topbar">
        <Container className="flex min-h-9 items-center justify-between gap-4 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href="mailto:info@pasada.or.tz"
              className="inline-flex items-center gap-2"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              info@pasada.or.tz
            </a>
            <a
              href="tel:+255222866618"
              className="hidden items-center gap-2 sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              +255 22 286 6618
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-white/80 md:block">
              Care. Hope. Dignity.
            </span>
            <Link
              href="/whistleblower"
              className="text-white/90 hover:text-white"
            >
              Tupe taarifa
            </Link>
          </div>
        </Container>
      </div>
      <header className="site-header sticky top-0 z-50 bg-white shadow-[0_3px_20px_rgba(55,18,22,0.06)]">
        <Container className="flex h-[84px] items-center justify-between gap-5 sm:h-[94px]">
          <Link
            href="/"
            aria-label="PASADA Tanzania home"
            className="relative block h-[72px] w-[72px] shrink-0 bg-white sm:h-[82px] sm:w-[82px]"
          >
            <Image
              src="/brand/logo.jpg"
              alt="PASADA Tanzania"
              fill
              sizes="82px"
              className="object-contain"
              priority
            />
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 xl:flex"
          >
            {groups.map((item) =>
              item.children ? (
                <details
                  key={item.href}
                  className="relative"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.currentTarget.open = false;
                      event.currentTarget.querySelector("summary")?.focus();
                    }
                  }}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    )
                      event.currentTarget.open = false;
                  }}
                >
                  <summary
                    className={cn(
                      "flex cursor-pointer list-none items-center gap-1.5 py-5 text-[13px] font-semibold [&::-webkit-details-marker]:hidden",
                      item.children.some((child) => isActive(child.href))
                        ? "text-[var(--primary)]"
                        : "text-zinc-800 hover:text-[var(--primary)]",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </summary>
                  <div className="absolute left-0 top-full min-w-52 border-t-2 border-[var(--primary)] bg-white py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={isActive(child.href) ? "page" : undefined}
                        className="block px-5 py-3 text-sm text-zinc-800 hover:bg-[var(--brand-cream)] hover:text-[var(--primary)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "border-b-2 py-5 text-[13px] font-semibold transition-colors",
                    isActive(item.href)
                      ? "border-[var(--primary)] text-[var(--primary)]"
                      : "border-transparent text-zinc-800 hover:text-[var(--primary)]",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-2)]"
            >
              Donate
            </Link>
            <button
              ref={triggerRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-lg border border-zinc-200 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>
      {open ? (
        <div className="fixed inset-0 z-[80] xl:hidden">
          <div
            className="absolute inset-0 bg-black/45"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 w-[min(90vw,380px)] overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="font-semibold text-[var(--brand-maroon)]">
                PASADA Tanzania
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-lg hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {[
                ...mobileLinks,
                {
                  label: "Whistleblower / Tupe taarifa",
                  href: "/whistleblower",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3.5 text-sm",
                    isActive(item.href)
                      ? "bg-[var(--brand-blush)] font-semibold text-[var(--primary)]"
                      : "text-zinc-800 hover:bg-zinc-50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href="tel:+255222866618"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--brand-maroon)]"
            >
              <Phone className="h-4 w-4" />
              +255 22 286 6618
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
