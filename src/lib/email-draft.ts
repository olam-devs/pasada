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
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(body)}`,
  };
}
