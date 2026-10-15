import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { getJobs } from "@/lib/jobs";
import { getSiteSettings } from "@/lib/settings";
import { ArrowUpRight, Briefcase, MapPin, Clock } from "lucide-react";

export default async function JobsPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSiteSettings()]);
  return (
    <PageShell eyebrow="Careers" title="Build a career that makes a difference">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="vacancies-heading">
          <p className="max-w-2xl text-base leading-8 text-zinc-600">
            Bring your skills and compassion to PASADA. Explore opportunities to support health, dignity and wellbeing in our communities.
          </p>
          <div className="mb-6 mt-10 flex items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <h2 id="vacancies-heading" className="text-xl font-semibold">Current vacancies</h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{jobs.length} {jobs.length === 1 ? "opportunity" : "opportunities"}</span>
          </div>
          <div className="space-y-5">
            {jobs.map((job) => (
              <article key={job._id} className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-red-200 hover:shadow-md sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold tracking-wide text-blue-700">{job.department}</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">{job.employmentType}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight"><Link className="hover:text-red-700" href={`/jobs/${job.slug}`}>{job.title}</Link></h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{job.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{job.location}</span>
                  {job.postedAt ? <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />Posted {new Date(job.postedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Dar_es_Salaam" })}</span> : null}
                </div>
                <Link href={`/jobs/${job.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-red-700 hover:text-red-900">View role & application details <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
            {!jobs.length ? <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8"><Briefcase className="h-8 w-8 text-zinc-400" aria-hidden="true" /><h3 className="mt-4 font-semibold">No vacancies to display right now</h3><p className="mt-2 text-sm leading-7 text-zinc-600">Please check back for new opportunities to join the PASADA team.</p></div> : null}
          </div>
        </section>
        <aside className="space-y-6 lg:pt-1">
          <div className="rounded-2xl bg-slate-950 p-7 text-white">
            <Briefcase className="h-8 w-8 text-red-300" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-semibold">Work with purpose</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Help deliver compassionate care and strengthen community wellbeing through your work.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 p-7">
            <h2 className="font-semibold">How to apply</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-4 text-sm leading-7 text-zinc-600">
              <li>Open a role and review its responsibilities and requirements.</li>
              <li>Prepare your CV, cover letter and any requested documents.</li>
              <li>Follow the application instructions listed for that role.</li>
            </ol>
            <a href={`mailto:${settings.careersEmail}?subject=Careers%20inquiry`} className="mt-6 inline-flex rounded-lg text-sm font-semibold text-red-700 hover:underline">Contact the recruitment team →</a>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
