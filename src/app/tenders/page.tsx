import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getTenders } from "@/lib/tenders";
import { ArrowUpRight, FileText, Calendar } from "lucide-react";

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Dar_es_Salaam" }) : "See tender notice";
}

export default async function TendersPage() {
  const tenders = await getTenders();
  const open = tenders.filter((tender) => tender.status === "Open");
  const closed = tenders.filter((tender) => tender.status === "Closed");
  return (
    <PageShell eyebrow="Procurement & tenders" title="Opportunities to work with PASADA">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="max-w-2xl text-base leading-8 text-zinc-600">Find procurement notices, tender documents and submission details. Review the full notice for eligibility, requirements and closing dates.</p>
          <div className="mt-8 flex flex-wrap gap-3 border-b border-zinc-200 pb-6 text-sm">
            <a href="#open-tenders" className="rounded-full bg-red-50 px-4 py-2 font-semibold text-red-800">Open notices · {open.length}</a>
            <a href="#closed-tenders" className="rounded-full bg-zinc-100 px-4 py-2 font-medium text-zinc-600">Closed notices · {closed.length}</a>
          </div>
          {([{ id: "open-tenders", title: "Open tenders", items: open }, { id: "closed-tenders", title: "Closed tenders", items: closed }]).map((group) => (
            <section key={group.id} id={group.id} className="mt-8 scroll-mt-24" aria-labelledby={`${group.id}-heading`}>
              <h2 id={`${group.id}-heading`} className="mb-5 text-xl font-semibold">{group.title}</h2>
              <div className="space-y-4">
                {group.items.map((tender) => (
                  <article key={tender._id} className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-medium text-zinc-500"><FileText className="h-4 w-4" aria-hidden="true" />{tender.tenderNumber ?? "Procurement notice"}</span>
                      <span className={`rounded-full px-3 py-1 font-semibold ${tender.status === "Open" ? "bg-emerald-50 text-emerald-800" : "bg-zinc-100 text-zinc-600"}`}>{tender.status}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight"><Link className="hover:text-blue-800" href={`/tenders/${tender.slug}`}>{tender.title}</Link></h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{tender.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-5">
                      <span className="inline-flex items-center gap-2 text-xs text-zinc-500"><Calendar className="h-4 w-4" aria-hidden="true" />Closing date: {formatDate(tender.deadline)}</span>
                      <Link href={`/tenders/${tender.slug}`} className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-blue-800 hover:underline">Read notice & documents <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                    </div>
                  </article>
                ))}
                {!group.items.length ? <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-7 text-sm leading-7 text-zinc-600">{group.id === "open-tenders" ? "There are no open tenders to display right now. Please check back for new procurement opportunities." : "No closed notices to display."}</div> : null}
              </div>
            </section>
          ))}
        </div>
        <aside className="space-y-6 lg:pt-1">
          <div className="rounded-2xl bg-slate-950 p-7 text-white"><FileText className="h-8 w-8 text-blue-300" aria-hidden="true" /><h2 className="mt-5 text-xl font-semibold">Supplier information</h2><p className="mt-3 text-sm leading-7 text-slate-300">Each tender notice contains the requirements and submission instructions for that opportunity.</p></div>
          <div className="rounded-2xl border border-zinc-200 p-7"><h2 className="font-semibold">Before you submit</h2><ol className="mt-5 list-decimal space-y-4 pl-4 text-sm leading-7 text-zinc-600"><li>Read the full tender notice and check eligibility.</li><li>Download the tender documents where provided.</li><li>Prepare the required documents and follow the stated submission method and deadline.</li></ol></div>
        </aside>
      </div>
    </PageShell>
  );
}
