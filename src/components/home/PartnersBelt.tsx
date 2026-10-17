"use client";
import Image from "next/image";
import { useState } from "react";
import { Grid2X2, Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Partner } from "@/lib/partners";

function PartnerCards({
  partners,
  duplicate = false,
}: {
  partners: Partner[];
  duplicate?: boolean;
}) {
  return (
    <ul className="partner-group" aria-hidden={duplicate || undefined}>
      {partners.map((partner) => (
        <li
          key={partner._key}
          className="partner-card flex flex-col items-center justify-center rounded-xl border border-zinc-100 bg-white px-5 py-5"
        >
          <div className="relative h-24 w-full">
            <Image
              src={partner.logoUrl}
              alt=""
              fill
              sizes="180px"
              className="object-contain"
              unoptimized={partner.logoUrl.includes(".svg")}
            />
          </div>
          <p className="mt-4 text-center text-xs font-medium leading-5 text-zinc-600">
            {partner.name}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PartnersBelt({ partners }: { partners: Partner[] }) {
  const [paused, setPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  if (!partners.length) return null;
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden border-t border-zinc-100 bg-white py-14 sm:py-16"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Working together</p>
            <h2 id="partners-heading" className="section-title mt-3">
              Our partners
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              Partnerships that support our work in health and community
              wellbeing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-pressed={showAll}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-200 px-4 text-sm font-semibold text-[var(--brand-maroon)] hover:bg-[var(--brand-cream)]"
            >
              <Grid2X2 className="h-4 w-4" aria-hidden="true" />
              {showAll ? "Show moving strip" : "View all partners"}
            </button>
            {!showAll ? (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused ? "Play partner strip" : "Pause partner strip"
                }
                className="partner-motion-control grid h-11 w-11 place-items-center rounded-full border border-zinc-200 text-[var(--brand-maroon)] hover:bg-[var(--brand-cream)]"
              >
                {paused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </Container>
      <div
        className={`partner-window mt-8 ${showAll ? "partner-show-all mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" : ""}`}
      >
        <div className="partner-track" data-paused={paused}>
          <PartnerCards partners={partners} />
          {!showAll ? <PartnerCards partners={partners} duplicate /> : null}
        </div>
      </div>
    </section>
  );
}
