"use client";

import { useState, type FormEvent } from "react";
import { createEmailDraft } from "@/lib/email-draft";

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
    window.location.href = prepared.href;
  }

  return (
    <form className={className} action={`mailto:${recipient}`} method="post" encType="text/plain" onSubmit={prepareDraft} onChange={() => setDraft(null)}>
      {children}
      <p className="text-xs leading-6 text-zinc-600 sm:col-span-2">
        Opens your email app with your message ready. Review it and press Send there. Your sender address comes from your email account.
      </p>
      {draft ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm sm:col-span-2">
          <p role="status" className="font-medium text-blue-950">Your draft is ready. Complete sending in your email app.</p>
          <a className="mt-2 inline-block font-semibold text-blue-900 underline" href={draft.href}>Open email draft again</a>
          <details className="mt-3 text-blue-950">
            <summary className="cursor-pointer">View or copy your message</summary>
            <textarea aria-label="Prepared email message" readOnly value={draft.body} rows={8} className="mt-2 w-full rounded-lg border border-blue-200 bg-white p-3 text-sm text-zinc-900" />
          </details>
        </div>
      ) : null}
    </form>
  );
}
