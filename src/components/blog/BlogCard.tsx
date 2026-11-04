"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { Calendar, Tag } from "lucide-react";

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_10px_30px_rgba(72,19,27,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_18px_40px_rgba(72,19,27,0.16)]"
      >
        <div className="photo-frame relative aspect-[16/10] overflow-hidden">
          <PasadaImage
            src={post.imageUrl}
            alt=""
            fill
            className="photo-vivid object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 90vw"
          />
          {post.category ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--brand-maroon)]/90 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {post.category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {post.publishedAt}
          </div>
          <h2 className="mt-2 text-base font-semibold text-[var(--brand-maroon)] group-hover:text-[var(--primary)]">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-zinc-800">
            {post.excerpt}
          </p>
          <div className="mt-4 text-sm font-semibold text-[var(--primary)]">
            Read story →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
