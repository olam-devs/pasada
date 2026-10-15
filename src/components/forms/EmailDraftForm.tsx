"use client";

import { useState, type FormEvent } from "react";
import { createEmailDraft } from "@/lib/email-draft";
import { ExternalLink, Mail } from "lucide-react";

export function EmailDraftForm({
  recipient, subject, fields, className, children,
}: {
  recipient: string;
  subject: string;
  fields: readonly (readonly [name: string, label: string])[];
  className?: string;
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<ReturnType<typeof createEmailDraft> | null>(null);

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const prepared = createEmailDraft(
      recipient,
      String(data.get("subject") || subject),
      fields.map(([name, label]) => [label, String(data.get(name) ?? "")]),
    );
    setDraft(prepared);
  }

  return (
    <form className={className} action={`mailto:${recipient}`} method="post" encType="text/plain" onSubmit={prepareDraft} onChange={() => setDraft(null)}>
      {children}
      <p className="text-xs leading-6 text-zinc-600 sm:col-span-2">
        Prepare your message, then choose your email app, Gmail or Outlook. You will review and send the draft from your own account.
      </p>
      {draft ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm sm:col-span-2">
          <p role="status" className="font-semibold text-blue-950">Your message is ready. How would you like to send it?</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl bg-blue-900 px-4 py-3 font-semibold text-white hover:bg-blue-800" href={draft.gmailHref} target="_blank" rel="noopener noreferrer">Gmail in browser <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            <a className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-blue-200 bg-white px-4 py-3 font-semibold text-blue-950 hover:bg-blue-100" href={draft.outlookHref} target="_blank" rel="noopener noreferrer">Outlook.com <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            <a className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-blue-200 bg-white px-4 py-3 font-semibold text-blue-950 hover:bg-blue-100" href={draft.officeHref} target="_blank" rel="noopener noreferrer">Work / school Outlook <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            <a className="inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-blue-200 bg-white px-4 py-3 font-semibold text-blue-950 hover:bg-blue-100" href={draft.href}>Default mail app <Mail className="h-4 w-4" aria-hidden="true" /></a>
          </div>
          <p className="mt-3 text-xs leading-6 text-blue-900">The mail-app option requires a mail app to be set up on your device. Otherwise choose a browser option above. Nothing has been sent yet.</p>
          <details className="mt-3 text-blue-950">
            <summary className="cursor-pointer">View or copy your message</summary>
            <textarea aria-label="Prepared email message" readOnly value={draft.body} rows={8} className="mt-2 w-full rounded-lg border border-blue-200 bg-white p-3 text-sm text-zinc-900" />
          </details>
        </div>
      ) : null}
    </form>
  );
}
