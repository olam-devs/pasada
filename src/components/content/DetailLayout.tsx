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
}) {
  const gallery = [
    ...new Map(
      (galleryUrls ?? [])
        .filter((url) => imageIdentity(url) !== imageIdentity(imageUrl))
        .map((url) => [imageIdentity(url), url]),
    ).values(),
  ];

  return (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {backLabel}
      </Link>

      {badge ? (
        <span className="mt-4 inline-block rounded-full border border-[var(--primary)] px-3 py-1 text-xs font-semibold text-black">
          {badge}
        </span>
      ) : null}

      <p className="mt-6 max-w-none text-base leading-8 text-zinc-800">
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
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--primary)] bg-zinc-100"
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
}
