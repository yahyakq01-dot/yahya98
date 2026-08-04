"use client";

import type { WorkedWithRow } from "@/lib/supabase/database.types";
import {
  createWorkedWith,
  updateWorkedWith,
  deleteWorkedWith,
} from "@/app/admin/_actions/worked-with";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { nextDisplayOrder } from "@/lib/nextDisplayOrder";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";

type Input = Omit<WorkedWithRow, "id" | "created_at" | "updated_at">;

const empty: Input = { name: "", monogram: "", category: "", display_order: 0 };

export function WorkedWithManager({ items }: { items: WorkedWithRow[] }) {
  return (
    <CollectionManager<WorkedWithRow, Input>
      rows={items}
      title="Manage Worked With"
      description="Maintain the list of organizations, clients, and tools shown in the marquee."
      addLabel="Add Entry"
      itemNoun="Entry"
      emptyInput={{ ...empty, display_order: nextDisplayOrder(items) }}
      toInput={(r) => ({
        name: r.name,
        monogram: r.monogram,
        category: r.category,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: r.name,
        subtitle: r.category,
        meta: <Pill tone="muted">{r.monogram}</Pill>,
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.name.trim()) e.name = "Name is required.";
        if (!i.monogram.trim()) e.monogram = "Monogram is required.";
        if (!i.category.trim()) e.category = "Category is required.";
        return e;
      }}
      create={createWorkedWith}
      update={updateWorkedWith}
      remove={deleteWorkedWith}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Name"
            value={i.name}
            onChange={(v) => patch({ name: v })}
            required
            error={errors.name}
          />
          <TextField
            label="Monogram"
            value={i.monogram}
            onChange={(v) => patch({ monogram: v })}
            required
            error={errors.monogram}
            placeholder="iG"
          />
          <TextField
            label="Category"
            value={i.category}
            onChange={(v) => patch({ category: v })}
            required
            error={errors.category}
            placeholder="Employer, Client, Tool…"
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
