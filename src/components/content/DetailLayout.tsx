import Link from "next/link";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { PortableContent } from "@/components/content/PortableContent";
import { ArrowLeft } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/react";
import { imageIdentity } from "@/lib/media";

export function DetailLayout({
  backHref,
  backLabel,
  title,
  summary,
  badge,
  imageUrl,
  galleryUrls,
  videoUrl,
  content,
  children,
  aside,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  summary: string;
  badge?: string;
  imageUrl: string;
  galleryUrls?: string[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  children?: React.ReactNode;
  /** Optional side panel (photo, facts, related links) shown beside the text on wide screens. */
  aside?: React.ReactNode;
}) {
  const gallery = [
    ...new Map(
      (galleryUrls ?? [])
        .filter((url) => imageIdentity(url) !== imageIdentity(imageUrl))
        .map((url) => [imageIdentity(url), url]),
    ).values(),
  ];

  const main = (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {backLabel}
      </Link>

      {badge ? (
        <span className="mt-4 block w-fit rounded-full bg-[var(--brand-blush)] px-3 py-1 text-xs font-semibold text-[var(--ink)] ring-1 ring-[var(--primary)]/30">
          {badge}
        </span>
      ) : null}

      <p className="mt-6 max-w-none border-l-4 border-[var(--brand-gold)] pl-5 text-base leading-8 text-zinc-800 sm:text-lg sm:leading-8">
        {summary}
      </p>

      {videoUrl ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200">
          <video
            src={videoUrl}
            controls
            playsInline
            className="aspect-video w-full"
            poster={imageUrl}
          />
        </div>
      ) : null}

      {gallery.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((url) => (
            <div
              key={url}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--primary)]/40 bg-[var(--brand-blush)]"
            >
              <PasadaImage
                src={url}
                alt={`${title} — gallery photo`}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 400px, 90vw"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10">
        {content?.length ? (
          <PortableContent value={content} />
        ) : (
          <div className="space-y-4 text-base leading-8 text-zinc-800">
            {children}
          </div>
        )}
      </div>
    </div>
  );

  if (!aside) return main;
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
      {main}
      <aside className="mt-12 lg:mt-0">{aside}</aside>
    </div>
  );
}
