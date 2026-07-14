"use client";

import { useState } from "react";
import type { SiteSettingsRow } from "@/lib/supabase/database.types";
import { updateSiteSettings } from "@/app/admin/_actions/site-settings";
import { useToast } from "@/components/admin/ui/ToastProvider";
import { TextField } from "@/components/admin/ui/TextField";
import { FormActions } from "@/components/admin/ui/FormActions";

interface SiteSettingsFormProps {
  initial: SiteSettingsRow | null;
}

export function SiteSettingsForm({ initial }: SiteSettingsFormProps) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const [siteName, setSiteName] = useState(initial?.site_name ?? "");
  const [monogram, setMonogram] = useState(initial?.monogram ?? "");
  const [footerTagline, setFooterTagline] = useState(initial?.footer_tagline ?? "");
  const [footerBio, setFooterBio] = useState(initial?.footer_bio ?? "");

  const reset = () => {
    setSiteName(initial?.site_name ?? "");
    setMonogram(initial?.monogram ?? "");
    setFooterTagline(initial?.footer_tagline ?? "");
    setFooterBio(initial?.footer_bio ?? "");
  };

  const handleSave = async () => {
    if (!siteName.trim() || !monogram.trim()) {
      toast.error("Site name and monogram are required.");
      return;
    }
    setSaving(true);
    try {
      await updateSiteSettings({
        site_name: siteName,
        monogram,
        footer_tagline: footerTagline || null,
        footer_bio: footerBio || null,
      });
      toast.success("Site settings saved.");
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
          site settings
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          Site Settings
        </h1>
        <p className="text-sm text-ink-secondary mt-2">
          Configure the site name, monogram, and global footer copy.
        </p>
      </div>

      <TextField
        label="Site name"
        value={siteName}
        onChange={setSiteName}
        required
        hint="shown in the navbar (a trailing period gets the accent)"
        placeholder="Yahya."
      />
      <TextField
        label="Monogram"
        value={monogram}
        onChange={setMonogram}
        required
        hint="the initials in badges & preloader"
        placeholder="YK"
      />
      <TextField
        label="Footer tagline"
        value={footerTagline}
        onChange={setFooterTagline}
        multiline
        rows={2}
        hint="the big footer heading"
      />
      <TextField
        label="Footer bio"
        value={footerBio}
        onChange={setFooterBio}
        multiline
        rows={2}
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
