"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactInfoRow } from "@/lib/supabase/database.types";
import { updateContactInfo } from "@/app/admin/_actions/contact-info";
import { useToast } from "@/components/admin/ui/ToastProvider";
import { TextField } from "@/components/admin/ui/TextField";
import { FormActions } from "@/components/admin/ui/FormActions";

interface ContactInfoFormProps {
  initial: ContactInfoRow | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_RE = /^\+\d{6,15}$/;

export function ContactInfoForm({ initial }: ContactInfoFormProps) {
  const toast = useToast();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [email, setEmail] = useState(initial?.email ?? "");
  const [whatsapp, setWhatsapp] = useState(initial?.whatsapp ?? "");
  const [whatsappDisplay, setWhatsappDisplay] = useState(initial?.whatsapp_display ?? "");
  const [fiverrUrl, setFiverrUrl] = useState(initial?.fiverr_url ?? "");
  const [fiverrDisplay, setFiverrDisplay] = useState(initial?.fiverr_display ?? "");
  const [responseTime, setResponseTime] = useState(initial?.response_time ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [availability, setAvailability] = useState(initial?.availability ?? "");

  const reset = () => {
    setEmail(initial?.email ?? "");
    setWhatsapp(initial?.whatsapp ?? "");
    setWhatsappDisplay(initial?.whatsapp_display ?? "");
    setFiverrUrl(initial?.fiverr_url ?? "");
    setFiverrDisplay(initial?.fiverr_display ?? "");
    setResponseTime(initial?.response_time ?? "");
    setLocation(initial?.location ?? "");
    setAvailability(initial?.availability ?? "");
    setErrors({});
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email.";
    if (whatsapp.trim() && !WHATSAPP_RE.test(whatsapp.trim())) {
      next.whatsapp = "Use international format, digits only, e.g. +923331234567.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await updateContactInfo({
        email,
        whatsapp: whatsapp || null,
        whatsapp_display: whatsappDisplay || null,
        fiverr_url: fiverrUrl || null,
        fiverr_display: fiverrDisplay || null,
        response_time: responseTime || null,
        location: location || null,
        availability: availability || null,
      });
      toast.success("Contact info saved.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-light">
          contact info
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          Contact Info
        </h1>
        <p className="text-sm text-ink-secondary mt-2">
          Manage your email, WhatsApp, Fiverr, response time, and availability.
        </p>
      </div>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        error={errors.email}
      />
      <TextField
        label="WhatsApp number"
        value={whatsapp}
        onChange={setWhatsapp}
        error={errors.whatsapp}
        hint="digits only, + prefix"
        placeholder="+923331234567"
      />
      <TextField
        label="WhatsApp display"
        value={whatsappDisplay}
        onChange={setWhatsappDisplay}
        placeholder="+92 333 123 4567"
      />
      <TextField
        label="Fiverr URL"
        type="url"
        value={fiverrUrl}
        onChange={setFiverrUrl}
        placeholder="https://www.fiverr.com/yahya_qureshii"
      />
      <TextField
        label="Fiverr display"
        value={fiverrDisplay}
        onChange={setFiverrDisplay}
        placeholder="fiverr.com/yahya_qureshii"
      />
      <TextField
        label="Response time"
        value={responseTime}
        onChange={setResponseTime}
        placeholder="Within 24 hours"
      />
      <TextField
        label="Location"
        value={location}
        onChange={setLocation}
        placeholder="Pakistan 🇵🇰 · Available Worldwide"
      />
      <TextField
        label="Availability"
        value={availability}
        onChange={setAvailability}
        placeholder="Open to remote engagements"
      />

      <FormActions
        mode="edit"
        onSave={handleSave}
        onCancel={reset}
        isSaving={saving}
      />
    </div>
  );
}
