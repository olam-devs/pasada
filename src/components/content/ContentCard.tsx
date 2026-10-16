"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PasadaImage } from "@/components/ui/PasadaImage";

export function ContentCard({
  href,
  title,
  excerpt,
  imageUrl,
  badge,
  index = 0,
  cta = "View details",
}: {
  href: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  badge?: string;
  index?: number;
  cta?: string;
}) {
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
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_4px_20px_rgba(40,15,20,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
          <PasadaImage
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 90vw"
          />
          {badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-black ring-1 ring-black/10">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-6 text-[var(--brand-maroon)] group-hover:text-[var(--primary)]">
            {title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-600">
            {excerpt}
          </p>
          <div className="mt-auto pt-5 text-sm font-semibold text-[var(--primary)]">
            {cta} →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
