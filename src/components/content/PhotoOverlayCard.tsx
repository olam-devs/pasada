import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PasadaImage } from "@/components/ui/PasadaImage";

/** A card where the photo fills the whole card and the text sits on a dark fade. */
export function PhotoOverlayCard({
  href,
  title,
  excerpt,
  imageUrl,
  badge,
  cta = "View details",
}: {
  href: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  badge?: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="photo-frame group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl text-white shadow-[0_16px_40px_rgba(34,28,28,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(34,28,28,0.28)] sm:aspect-[5/6]"
    >
      <PasadaImage
        src={imageUrl}
        alt=""
        fill
        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 90vw"
        className="photo-vivid -z-10 object-cover transition duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(26,20,20,0.92)] via-[rgba(26,20,20,0.4)] to-transparent"
        aria-hidden="true"
      />
      {badge ? (
        <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-gold)] px-3 py-1 text-xs font-bold text-[var(--ink)] shadow">
          {badge}
        </span>
      ) : null}
      <div className="p-6">
        <div className="mb-4 h-1 w-10 bg-[var(--brand-gold)] transition-all duration-300 group-hover:w-16" />
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/80">
          {excerpt.replace(/\*\*/g, "")}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-gold)]">
          {cta}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
