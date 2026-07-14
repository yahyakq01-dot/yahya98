"use client";

import { useState } from "react";
import type { SiteSettingsRow } from "@/lib/supabase/database.types";
import { updateSiteSettings } from "@/app/admin/_actions/site-settings";
import { useToast } from "@/components/admin/ui/ToastProvider";
import { TextField } from "@/components/admin/ui/TextField";
import { FormActions } from "@/components/admin/ui/FormActions";

interface HeroFormProps {
  initial: SiteSettingsRow | null;
}

export function HeroForm({ initial }: HeroFormProps) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const [eyebrow, setEyebrow] = useState(initial?.hero_eyebrow ?? "");
  const [line1, setLine1] = useState(initial?.hero_line_1 ?? "");
  const [line2, setLine2] = useState(initial?.hero_line_2 ?? "");
  const [line3, setLine3] = useState(initial?.hero_line_3 ?? "");
  const [subheadline, setSubheadline] = useState(initial?.hero_subheadline ?? "");
  const [ticker, setTicker] = useState(initial?.hero_ticker ?? "");

  const reset = () => {
    setEyebrow(initial?.hero_eyebrow ?? "");
    setLine1(initial?.hero_line_1 ?? "");
    setLine2(initial?.hero_line_2 ?? "");
    setLine3(initial?.hero_line_3 ?? "");
    setSubheadline(initial?.hero_subheadline ?? "");
    setTicker(initial?.hero_ticker ?? "");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteSettings({
        hero_eyebrow: eyebrow,
        hero_line_1: line1,
        hero_line_2: line2,
        hero_line_3: line3,
        hero_subheadline: subheadline || null,
        hero_ticker: ticker || null,
      });
      toast.success("Hero section saved.");
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
          hero
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          Edit Hero Section
        </h1>
        <p className="text-sm text-ink-secondary mt-2">
          Manage the headline, eyebrow text, subheadline, and ticker shown on
          the homepage hero.
        </p>
      </div>

      {!initial && (
        <p className="mb-6 text-sm text-red-400">
          No site settings row found. Seed the database first.
        </p>
      )}

      <TextField
        label="Eyebrow"
        value={eyebrow}
        onChange={setEyebrow}
        hint="the small pill above the headline"
        placeholder="AVAILABLE FOR PROJECTS"
      />
      <TextField
        label="Headline line 1"
        value={line1}
        onChange={setLine1}
        placeholder="Turning"
      />
      <TextField
        label="Headline line 2"
        value={line2}
        onChange={setLine2}
        hint="shown with the gradient accent"
        placeholder="Complex Data"
      />
      <TextField
        label="Headline line 3"
        value={line3}
        onChange={setLine3}
        hint="a trailing period gets the accent colour"
        placeholder="Into Clear Decisions."
      />
      <TextField
        label="Subheadline"
        value={subheadline}
        onChange={setSubheadline}
        multiline
        rows={3}
        hint="the paragraph under the headline"
      />
      <TextField
        label="Ticker"
        value={ticker}
        onChange={setTicker}
        hint="the small text bottom-right of the hero"
        placeholder="Decoding Data Into Decisions ↗"
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
