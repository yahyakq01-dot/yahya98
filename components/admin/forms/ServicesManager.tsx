"use client";

import type { ServiceRow } from "@/lib/supabase/database.types";
import {
  createService,
  updateService,
  deleteService,
} from "@/app/admin/_actions/services";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { nextDisplayOrder } from "@/lib/nextDisplayOrder";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";
import { TagInput } from "@/components/admin/ui/TagInput";
import { SwitchField } from "@/components/admin/ui/SwitchField";

type Input = Omit<ServiceRow, "id" | "created_at" | "updated_at">;

const empty: Input = {
  number: "",
  title: "",
  description: "",
  tools: [],
  icon: "",
  highlight: false,
  display_order: 0,
};

export function ServicesManager({ services }: { services: ServiceRow[] }) {
  return (
    <CollectionManager<ServiceRow, Input>
      rows={services}
      title="Manage Services"
      description="Edit the services you offer, their descriptions, tools, and display order."
      addLabel="Add Service"
      itemNoun="Service"
      emptyInput={{ ...empty, display_order: nextDisplayOrder(services) }}
      toInput={(r) => ({
        number: r.number,
        title: r.title,
        description: r.description,
        tools: r.tools,
        icon: r.icon,
        highlight: r.highlight,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: `${r.number} · ${r.title}`,
        subtitle: r.description,
        meta: (
          <>
            <Pill tone="muted">{r.icon}</Pill>
            {r.highlight && <Pill tone="brand">Featured</Pill>}
          </>
        ),
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.number.trim()) e.number = "Number is required.";
        if (!i.title.trim()) e.title = "Title is required.";
        if (!i.description.trim()) e.description = "Description is required.";
        if (!i.icon.trim()) e.icon = "Icon is required.";
        return e;
      }}
      create={createService}
      update={updateService}
      remove={deleteService}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Number"
            value={i.number}
            onChange={(v) => patch({ number: v })}
            required
            error={errors.number}
            placeholder="01"
          />
          <TextField
            label="Title"
            value={i.title}
            onChange={(v) => patch({ title: v })}
            required
            error={errors.title}
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
          <TagInput
            label="Tools"
            value={i.tools}
            onChange={(next) => patch({ tools: next })}
          />
          <TextField
            label="Icon"
            value={i.icon}
            onChange={(v) => patch({ icon: v })}
            required
            error={errors.icon}
            hint="a lucide icon name"
            placeholder="LayoutDashboard, Sheet, Database…"
          />
          <p className="-mt-4 mb-5 text-[11px] text-ink-muted">
            Use a Lucide icon name like &lsquo;LayoutDashboard&rsquo;,
            &lsquo;Sheet&rsquo;, &lsquo;Database&rsquo;, etc. See lucide.dev for
            the full list.
          </p>
          <SwitchField
            label="Featured"
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
