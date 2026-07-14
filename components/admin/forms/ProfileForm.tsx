"use client";

import { useState } from "react";
import type { ProfileRow } from "@/lib/supabase/database.types";
import { updateProfile } from "@/app/admin/_actions/profile";
import { useToast } from "@/components/admin/ui/ToastProvider";
import { TextField } from "@/components/admin/ui/TextField";
import { SwitchField } from "@/components/admin/ui/SwitchField";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";
import { FormActions } from "@/components/admin/ui/FormActions";

interface ProfileFormProps {
  initial: ProfileRow | null;
}

export function ProfileForm({ initial }: ProfileFormProps) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [shortBio, setShortBio] = useState(initial?.short_bio ?? "");
  const [longBio, setLongBio] = useState(initial?.long_bio ?? "");
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial?.photo_url ?? null);
  const [cvUrl, setCvUrl] = useState<string | null>(initial?.cv_url ?? null);
  const [availableForWork, setAvailableForWork] = useState(
    initial?.available_for_work ?? true
  );
  const [fiverrUrl, setFiverrUrl] = useState(initial?.fiverr_url ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.github_url ?? "");

  const reset = () => {
    setName(initial?.name ?? "");
    setRole(initial?.role ?? "");
    setShortBio(initial?.short_bio ?? "");
    setLongBio(initial?.long_bio ?? "");
    setPhotoUrl(initial?.photo_url ?? null);
    setCvUrl(initial?.cv_url ?? null);
    setAvailableForWork(initial?.available_for_work ?? true);
    setFiverrUrl(initial?.fiverr_url ?? "");
    setGithubUrl(initial?.github_url ?? "");
  };

  const handleSave = async () => {
    if (!name.trim() || !role.trim()) {
      toast.error("Name and role are required.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name,
        role,
        short_bio: shortBio || null,
        long_bio: longBio || null,
        photo_url: photoUrl,
        cv_url: cvUrl,
        available_for_work: availableForWork,
        fiverr_url: fiverrUrl || null,
        github_url: githubUrl || null,
      });
      toast.success("Profile saved.");
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
          profile
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
          Edit Profile
        </h1>
        <p className="text-sm text-ink-secondary mt-2">
          Update your name, role, bio, photo, CV, and profile links.
        </p>
      </div>

      <TextField label="Name" value={name} onChange={setName} required />
      <TextField label="Role" value={role} onChange={setRole} required />
      <TextField
        label="Short bio"
        value={shortBio}
        onChange={setShortBio}
        multiline
        rows={3}
        hint="shown in the About card"
      />
      <TextField
        label="Long bio"
        value={longBio}
        onChange={setLongBio}
        multiline
        rows={6}
      />
      <ImageUploadField
        label="Profile photo"
        currentUrl={photoUrl}
        onChange={setPhotoUrl}
        bucket="portfolio-images"
      />
      <ImageUploadField
        label="CV / Resume (PDF)"
        currentUrl={cvUrl}
        onChange={setCvUrl}
        bucket="portfolio-documents"
        accept="application/pdf"
      />
      <SwitchField
        label="Available for work"
        description="Shows the 'Open to work' badge on the portfolio."
        checked={availableForWork}
        onChange={setAvailableForWork}
      />
      <TextField
        label="Fiverr URL"
        type="url"
        value={fiverrUrl}
        onChange={setFiverrUrl}
      />
      <TextField
        label="GitHub URL"
        type="url"
        value={githubUrl}
        onChange={setGithubUrl}
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
