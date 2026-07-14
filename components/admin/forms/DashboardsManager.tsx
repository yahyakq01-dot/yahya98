"use client";

import type { DashboardRow } from "@/lib/supabase/database.types";
import {
  createDashboard,
  updateDashboard,
  deleteDashboard,
} from "@/app/admin/_actions/dashboards";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";
import { TagInput } from "@/components/admin/ui/TagInput";
import { SwitchField } from "@/components/admin/ui/SwitchField";
import { ImageUploadField } from "@/components/admin/ui/ImageUploadField";

type Input = Omit<DashboardRow, "id" | "created_at" | "updated_at">;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const empty: Input = {
  slug: "",
  title: "",
  category: "",
  image_url: "",
  description: "",
  tools: [],
  live_preview_url: null,
  highlight: false,
  display_order: 0,
};

export function DashboardsManager({ dashboards }: { dashboards: DashboardRow[] }) {
  return (
    <CollectionManager<DashboardRow, Input>
      rows={dashboards}
      title="Manage Dashboards"
      description="Add, edit, reorder, and remove the Power BI dashboard projects showcased on your portfolio."
      addLabel="Add Dashboard"
      itemNoun="Dashboard"
      emptyInput={empty}
      toInput={(r) => ({
        slug: r.slug,
        title: r.title,
        category: r.category,
        image_url: r.image_url,
        description: r.description,
        tools: r.tools,
        live_preview_url: r.live_preview_url,
        highlight: r.highlight,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: r.title,
        subtitle: r.category,
        imageUrl: r.image_url,
        meta: (
          <>
            <Pill tone="muted">#{r.display_order}</Pill>
            {r.highlight && <Pill tone="brand">Featured</Pill>}
          </>
        ),
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.slug.trim()) e.slug = "Slug is required.";
        else if (!SLUG_RE.test(i.slug))
          e.slug = "Lowercase letters, numbers and dashes only.";
        if (!i.title.trim()) e.title = "Title is required.";
        if (!i.category.trim()) e.category = "Category is required.";
        if (!i.image_url.trim()) e.image_url = "An image is required.";
        return e;
      }}
      create={createDashboard}
      update={updateDashboard}
      remove={deleteDashboard}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Slug"
            value={i.slug}
            onChange={(v) => patch({ slug: v })}
            required
            error={errors.slug}
            hint="url-friendly, e.g. combat-sports"
          />
          <TextField
            label="Title"
            value={i.title}
            onChange={(v) => patch({ title: v })}
            required
            error={errors.title}
          />
          <TextField
            label="Category"
            value={i.category}
            onChange={(v) => patch({ category: v })}
            required
            error={errors.category}
            placeholder="Sports · B2B Analytics"
          />
          <ImageUploadField
            label="Dashboard image"
            currentUrl={i.image_url || null}
            onChange={(url) => patch({ image_url: url ?? "" })}
            bucket="portfolio-images"
          />
          {errors.image_url && (
            <p className="-mt-3 mb-5 text-xs text-red-400">{errors.image_url}</p>
          )}
          <TextField
            label="Description"
            value={i.description}
            onChange={(v) => patch({ description: v })}
            multiline
            rows={4}
          />
          <TagInput
            label="Tools"
            value={i.tools}
            onChange={(next) => patch({ tools: next })}
            placeholder="Power BI, DAX…"
          />
          <TextField
            label="Live preview URL"
            type="url"
            value={i.live_preview_url ?? ""}
            onChange={(v) => patch({ live_preview_url: v || null })}
          />
          <SwitchField
            label="Featured"
            description="Highlights this dashboard with a Featured badge."
            checked={i.highlight}
            onChange={(c) => patch({ highlight: c })}
          />
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
