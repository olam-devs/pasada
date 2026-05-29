import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";

export default function StudioPage() {
  return (
    <PageShell
      eyebrow="Admin"
      title="Administration"
      heroImageSrc={media.hero.careers}
    >
      <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-black">Administration</div>
        <p className="mt-2 text-sm leading-7 text-zinc-800">
          This area is reserved for site administration.
        </p>
      </div>
    </PageShell>
  );
}

