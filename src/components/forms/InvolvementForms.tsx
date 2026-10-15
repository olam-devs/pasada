"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormSubmit,
  FormTextarea,
} from "@/components/ui/FormFields";
import { HandHeart, Handshake, Heart } from "lucide-react";
import { EmailDraftForm } from "@/components/forms/EmailDraftForm";

type Tab = "volunteer" | "partner" | "donate";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "volunteer",
    label: "Volunteer",
    icon: <HandHeart className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "partner",
    label: "Partnership",
    icon: <Handshake className="h-4 w-4" aria-hidden="true" />,
  },
  {
    id: "donate",
    label: "Donations",
    icon: <Heart className="h-4 w-4" aria-hidden="true" />,
  },
];

function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-800">{description}</p>
      {children}
    </div>
  );
}

export function InvolvementForms({
  volunteerEmail = "volunteer@pasada.or.tz",
  partnerEmail = "info@pasada.or.tz",
  donateEmail = "info@pasada.or.tz",
}: {
  volunteerEmail?: string;
  partnerEmail?: string;
  donateEmail?: string;
}) {
  const [active, setActive] = useState<Tab>("volunteer");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition",
              active === tab.id
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black hover:bg-zinc-50",
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {active === "volunteer" && (
        <FormCard
          title="Volunteer application"
          description="Share your details and how you would like to support PASADA programs."
        >
          <EmailDraftForm
            className="mt-6 grid gap-4 sm:grid-cols-2"
            recipient={volunteerEmail}
            subject="Volunteer application — PASADA"
            fields={[["name", "Full name"], ["phone", "Phone"], ["interest", "Area of interest"], ["message", "Skills, motivation and availability"]]}
          >
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Full name</FormLabel>
              <FormInput name="name" required placeholder="Your full name" />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Phone</FormLabel>
              <FormInput name="phone" type="tel" autoComplete="tel" placeholder="+255..." />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Area of interest</FormLabel>
              <FormSelect name="interest" required defaultValue="">
                <option value="" disabled>
                  Select an area
                </option>
                <option>Community outreach</option>
                <option>Health education</option>
                <option>Admin &amp; communications</option>
                <option>Events &amp; fundraising</option>
              </FormSelect>
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <FormLabel>Why do you want to volunteer?</FormLabel>
              <FormTextarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your skills and availability..."
              />
            </label>
            <div className="sm:col-span-2">
              <FormSubmit>Prepare volunteer application</FormSubmit>
            </div>
          </EmailDraftForm>
        </FormCard>
      )}

      {active === "partner" && (
        <FormCard
          title="Partnership inquiry"
          description="Organizations and institutions can propose collaboration with PASADA."
        >
          <EmailDraftForm
            className="mt-6 grid gap-4 sm:grid-cols-2"
            recipient={partnerEmail}
            subject="Partnership inquiry — PASADA"
            fields={[["organization", "Organization"], ["contact", "Contact person"], ["partnershipType", "Partnership type"], ["proposal", "Proposal summary"]]}
          >
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Organization name</FormLabel>
              <FormInput name="organization" required />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Contact person</FormLabel>
              <FormInput name="contact" required />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Partnership type</FormLabel>
              <FormSelect name="partnershipType" required defaultValue="">
                <option value="" disabled>
                  Select type
                </option>
                <option>Program implementation</option>
                <option>Funding / grants</option>
                <option>Research</option>
                <option>In-kind support</option>
              </FormSelect>
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <FormLabel>Proposal summary</FormLabel>
              <FormTextarea
                name="proposal"
                required
                rows={5}
                placeholder="Describe goals, timeline, and expected impact..."
              />
            </label>
            <div className="sm:col-span-2">
              <FormSubmit>Prepare partnership inquiry</FormSubmit>
            </div>
          </EmailDraftForm>
        </FormCard>
      )}

      {active === "donate" && (
        <FormCard
          title="Donation pledge form"
          description="Prepare a donation pledge for our team, then choose your preferred email service to review and send it."
        >
          <EmailDraftForm
            className="mt-6 grid gap-4 sm:grid-cols-2"
            recipient={donateEmail}
            subject="Donation pledge — PASADA"
            fields={[["donorName", "Full name"], ["phone", "Phone"], ["amount", "Donation amount (TZS)"], ["paymentMethod", "Preferred payment method"], ["dedication", "Dedication"], ["message", "Message"]]}
          >
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Full name</FormLabel>
              <FormInput name="donorName" required />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Phone</FormLabel>
              <FormInput name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Donation amount (TZS)</FormLabel>
              <FormInput
                name="amount"
                type="number"
                min={1000}
                required
                placeholder="e.g. 50000"
              />
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Payment method preference</FormLabel>
              <FormSelect name="paymentMethod" required defaultValue="">
                <option value="" disabled>
                  Select method
                </option>
                <option>Mobile Money</option>
                <option>Bank transfer</option>
                <option>International transfer</option>
              </FormSelect>
            </label>
            <label className="grid gap-1.5 sm:col-span-1">
              <FormLabel>Dedication (optional)</FormLabel>
              <FormInput name="dedication" placeholder="In honor of..." />
            </label>
            <label className="grid gap-1.5 sm:col-span-2">
              <FormLabel>Message (optional)</FormLabel>
              <FormTextarea
                name="message"
                rows={4}
                placeholder="Any notes for PASADA..."
              />
            </label>
            <div className="sm:col-span-2">
              <FormSubmit>Prepare donation pledge</FormSubmit>
            </div>
          </EmailDraftForm>
        </FormCard>
      )}
    </div>
  );
}
