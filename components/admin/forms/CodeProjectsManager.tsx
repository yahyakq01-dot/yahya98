"use client";

import type { CodeProjectRow, Json } from "@/lib/supabase/database.types";
import {
  createCodeProject,
  updateCodeProject,
  deleteCodeProject,
} from "@/app/admin/_actions/code-projects";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { nextDisplayOrder } from "@/lib/nextDisplayOrder";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";
import { TagInput } from "@/components/admin/ui/TagInput";
import { ObjectListEditor } from "@/components/admin/ui/ObjectListEditor";

type Feature = { icon: string; label: string };
type StatItem = { value: string; label: string };

interface Input {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: Feature[];
  stack: string[];
  stats: StatItem[];
  github_url: string | null;
  live_preview_url: string | null;
  code_snippet: string | null;
  code_filename: string | null;
  display_order: number;
}

const empty: Input = {
  slug: "",
  title: "",
  subtitle: "",
  category: "",
  description: "",
  features: [],
  stack: [],
  stats: [],
  github_url: null,
  live_preview_url: null,
  code_snippet: null,
  code_filename: null,
  display_order: 0,
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toDbInput(i: Input): Omit<CodeProjectRow, "id" | "created_at" | "updated_at"> {
  return {
    slug: i.slug,
    title: i.title,
    subtitle: i.subtitle,
    category: i.category,
    description: i.description,
    features: i.features as unknown as Json,
    stack: i.stack,
    stats: i.stats as unknown as Json,
    github_url: i.github_url,
    live_preview_url: i.live_preview_url,
    code_snippet: i.code_snippet,
    code_filename: i.code_filename,
    display_order: i.display_order,
  };
}

export function CodeProjectsManager({
  projects,
}: {
  projects: CodeProjectRow[];
}) {
  return (
    <CollectionManager<CodeProjectRow, Input>
      rows={projects}
      title="Manage Code Projects"
      description="Curate the SQL and Python analysis projects, their code snippets, features, and stats."
      addLabel="Add Code Project"
      itemNoun="Code Project"
      emptyInput={{ ...empty, display_order: nextDisplayOrder(projects) }}
      toInput={(r) => ({
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        category: r.category,
        description: r.description,
        features: (r.features as unknown as Feature[]) ?? [],
        stack: r.stack,
        stats: (r.stats as unknown as StatItem[]) ?? [],
        github_url: r.github_url,
        live_preview_url: r.live_preview_url,
        code_snippet: r.code_snippet,
        code_filename: r.code_filename,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: r.title,
        subtitle: r.subtitle,
        meta: (
          <>
            <Pill tone="muted">{r.category}</Pill>
            <Pill tone="muted">#{r.display_order}</Pill>
          </>
        ),
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.slug.trim()) e.slug = "Slug is required.";
        else if (!SLUG_RE.test(i.slug))
          e.slug = "Lowercase letters, numbers and dashes only.";
        if (!i.title.trim()) e.title = "Title is required.";
        if (!i.subtitle.trim()) e.subtitle = "Subtitle is required.";
        if (!i.category.trim()) e.category = "Category is required.";
        if (!i.description.trim()) e.description = "Description is required.";
        return e;
      }}
      create={(i) => createCodeProject(toDbInput(i))}
      update={(id, i) => updateCodeProject(id, toDbInput(i))}
      remove={deleteCodeProject}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Slug"
            value={i.slug}
            onChange={(v) => patch({ slug: v })}
            required
            error={errors.slug}
            hint="url-friendly, e.g. bike-retail"
          />
          <TextField
            label="Title"
            value={i.title}
            onChange={(v) => patch({ title: v })}
            required
            error={errors.title}
          />
          <TextField
            label="Subtitle"
            value={i.subtitle}
            onChange={(v) => patch({ subtitle: v })}
            required
            error={errors.subtitle}
          />
          <TextField
            label="Category"
            value={i.category}
            onChange={(v) => patch({ category: v })}
            required
            error={errors.category}
            placeholder="📊 Retail Analytics"
          />
          <TextField
            label="Description"
            value={i.description}
            onChange={(v) => patch({ description: v })}
            multiline
            rows={4}
            required
            error={errors.description}
          />
          <ObjectListEditor<Feature>
            label="Features"
            value={i.features}
            onChange={(next) => patch({ features: next })}
            fields={[
              { key: "icon", placeholder: "📈" },
              { key: "label", placeholder: "Change-Over-Time Analysis" },
            ]}
            addLabel="Add feature"
            hint="emoji + label"
          />
          <TagInput
            label="Stack"
            value={i.stack}
            onChange={(next) => patch({ stack: next })}
          />
          <ObjectListEditor<StatItem>
            label="Stats"
            value={i.stats}
            onChange={(next) => patch({ stats: next })}
            fields={[
              { key: "value", placeholder: "20+" },
              { key: "label", placeholder: "SQL Queries" },
            ]}
            addLabel="Add stat"
            hint="value + label"
          />
          <TextField
            label="GitHub URL"
            type="url"
            value={i.github_url ?? ""}
            onChange={(v) => patch({ github_url: v || null })}
          />
          <TextField
            label="Live preview URL"
            type="url"
            value={i.live_preview_url ?? ""}
            onChange={(v) => patch({ live_preview_url: v || null })}
          />
          <TextField
            label="Code snippet"
            value={i.code_snippet ?? ""}
            onChange={(v) => patch({ code_snippet: v || null })}
            multiline
            rows={14}
            mono
            hint="use \n for line breaks (or real newlines)"
          />
          <TextField
            label="Code filename"
            value={i.code_filename ?? ""}
            onChange={(v) => patch({ code_filename: v || null })}
            hint=".sql or .py sets the syntax highlighting"
            placeholder="customer_segmentation.sql"
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
