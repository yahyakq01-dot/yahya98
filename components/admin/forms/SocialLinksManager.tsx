"use client";

import type { SocialLinkRow } from "@/lib/supabase/database.types";
import {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "@/app/admin/_actions/social-links";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { nextDisplayOrder } from "@/lib/nextDisplayOrder";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";

type Input = Omit<SocialLinkRow, "id" | "created_at" | "updated_at">;

const empty: Input = {
  label: "",
  href: "",
  username: "",
  icon: "",
  display_order: 0,
};

export function SocialLinksManager({ links }: { links: SocialLinkRow[] }) {
  return (
    <CollectionManager<SocialLinkRow, Input>
      rows={links}
      title="Social Links"
      description="Add and reorder the social media links shown in the footer."
      addLabel="Add Link"
      itemNoun="Link"
      emptyInput={{ ...empty, display_order: nextDisplayOrder(links) }}
      toInput={(r) => ({
        label: r.label,
        href: r.href,
        username: r.username,
        icon: r.icon,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: r.label,
        subtitle: r.username,
        meta: <Pill tone="muted">{r.icon}</Pill>,
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.label.trim()) e.label = "Label is required.";
        if (!i.href.trim()) e.href = "Link URL is required.";
        if (!i.icon.trim()) e.icon = "Icon is required.";
        return e;
      }}
      create={createSocialLink}
      update={updateSocialLink}
      remove={deleteSocialLink}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Label"
            value={i.label}
            onChange={(v) => patch({ label: v })}
            required
            error={errors.label}
            placeholder="LinkedIn"
          />
          <TextField
            label="URL"
            type="url"
            value={i.href}
            onChange={(v) => patch({ href: v })}
            required
            error={errors.href}
            placeholder="https://linkedin.com/in/…"
          />
          <TextField
            label="Username"
            value={i.username}
            onChange={(v) => patch({ username: v })}
            placeholder="/in/yahya-khan"
          />
          <TextField
            label="Icon"
            value={i.icon}
            onChange={(v) => patch({ icon: v })}
            required
            error={errors.icon}
            hint="Linkedin, Github, Instagram, or fiverr"
          />
          <p className="-mt-4 mb-5 text-[11px] text-ink-muted">
            Use a Lucide icon name (Linkedin, Github, Instagram) or
            &lsquo;fiverr&rsquo; for the Fiverr mark.
          </p>
          <TextField
            label="Display order"
            type="number"
            value={String(i.display_order)}
            onChange={(v) => patch({ display_order: Number(v) || 0 })}
          />
        </>
      )}
    />
  );
}
