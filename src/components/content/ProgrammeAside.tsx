import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programmeIcon } from "@/lib/programme-icons";

type Fact = { label: string; value: string };
type RelatedLink = { href: string; title: string; key: string };

/** Side panel for a programme page: key facts and related links. */
export function ProgrammeAside({
  facts,
  links,
  linksTitle,
  allHref,
  allLabel,
}: {
  facts: Fact[];
  links: RelatedLink[];
  linksTitle: string;
  allHref: string;
  allLabel: string;
}) {
  return (
    <div className="space-y-7 lg:sticky lg:top-28">
      {facts.length ? (
        <div className="brand-vivid relative overflow-hidden rounded-2xl p-6 text-white shadow-[0_16px_36px_rgba(72,19,27,0.2)]">
          <span className="brand-rings -bottom-40 -right-28 h-72 w-72" aria-hidden="true" />
          <p className="relative text-xs font-bold uppercase tracking-[.16em] text-[var(--brand-gold)]">
            At a glance
          </p>
          <dl className="relative mt-4 space-y-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-[var(--brand-gold)] pl-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[.12em] text-white/70">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {links.length ? (
        <nav
          aria-label={linksTitle}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_10px_30px_rgba(72,19,27,0.06)]"
        >
          <p className="text-sm font-semibold text-[var(--brand-maroon)]">{linksTitle}</p>
          <ul className="mt-3 space-y-1">
            {links.map((link) => {
              const Icon = programmeIcon(link.key);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-700 transition hover:bg-[var(--brand-blush)] hover:text-[var(--brand-maroon)]"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--brand-blush)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{link.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={allHref}
            className="mt-3 inline-flex items-center gap-2 px-2 text-sm font-semibold text-[var(--primary)]"
          >
            {allLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
