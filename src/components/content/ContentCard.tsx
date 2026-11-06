"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { programmeIcon } from "@/lib/programme-icons";

export function ContentCard({
  href,
  title,
  excerpt,
  imageUrl,
  badge,
  index = 0,
  cta = "View details",
  iconKey,
}: {
  href: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  badge?: string;
  index?: number;
  cta?: string;
  /** Slug or title used to choose a programme symbol; omit for no symbol. */
  iconKey?: string;
}) {
  const Icon = iconKey ? programmeIcon(iconKey) : null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_10px_30px_rgba(34,28,28,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_18px_40px_rgba(34,28,28,0.16)]"
      >
        <div className="relative">
          <div className="photo-frame relative aspect-[16/10] overflow-hidden">
            <PasadaImage
              src={imageUrl}
              alt=""
              fill
              className="photo-vivid object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 380px, 90vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(26,20,20,0.35)] to-transparent"
              aria-hidden="true"
            />
            {badge ? (
              <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {badge}
              </span>
            ) : null}
          </div>
          {Icon ? (
            <span
              className="absolute -bottom-6 right-5 grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary)] text-white shadow-lg ring-4 ring-white transition group-hover:bg-[var(--primary-2)]"
              aria-hidden="true"
            >
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </span>
          ) : null}
        </div>
        <div className={`flex flex-1 flex-col p-5 sm:p-6 ${Icon ? "pt-7" : ""}`}>
          <h3 className="text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--primary)]">
            {title}
          </h3>
          <div className="flex-1">
            <p className="mt-3 line-clamp-3 text-body leading-7 text-zinc-600">
              {excerpt.replace(/\*\*/g, "")}
            </p>
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
            {cta}
            <span className="transition group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
