import { EmailDraftForm } from "@/components/forms/EmailDraftForm";
import { FormInput, FormLabel, FormSubmit, FormTextarea } from "@/components/ui/FormFields";

export function ContactForm({ recipient }: { recipient: string }) {
  return (
    <EmailDraftForm recipient={recipient} subject="Message from the PASADA website" fields={[["name", "Name"], ["message", "Message"]]} className="mt-6 grid gap-4">
      <label className="grid gap-1.5">
        <FormLabel>Name</FormLabel>
        <FormInput name="name" autoComplete="name" required placeholder="Your full name" />
      </label>
      <label className="grid gap-1.5">
        <FormLabel>Subject</FormLabel>
        <FormInput name="subject" required placeholder="How can we help?" maxLength={160} />
      </label>
      <label className="grid gap-1.5 sm:col-span-2">
        <FormLabel>Message</FormLabel>
        <FormTextarea name="message" required rows={6} placeholder="Write your message here..." />
      </label>
      <div className="sm:col-span-2"><FormSubmit>Open message in email app</FormSubmit></div>
    </EmailDraftForm>
  );
}
