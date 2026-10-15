export function createEmailDraft(
  recipient: string,
  subject: string,
  fields: readonly (readonly [label: string, value: string])[],
) {
  const cleanSubject = subject.replace(/[\r\n]+/g, " ").trim();
  const body = fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join("\r\n\r\n")
    .replace(/\r\n|\r|\n/g, "\r\n");
  return {
    subject: cleanSubject,
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(body)}`,
    gmailHref: `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", to: recipient, su: cleanSubject, body })}`,
    outlookHref: `https://outlook.live.com/mail/0/deeplink/compose?${new URLSearchParams({ to: recipient, subject: cleanSubject, body })}`,
    officeHref: `https://outlook.office.com/mail/deeplink/compose?${new URLSearchParams({ to: recipient, subject: cleanSubject, body })}`,
  };
}
