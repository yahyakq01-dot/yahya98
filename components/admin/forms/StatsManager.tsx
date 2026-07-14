"use client";

import type { StatRow } from "@/lib/supabase/database.types";
import { createStat, updateStat, deleteStat } from "@/app/admin/_actions/stats";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";

type Input = Omit<StatRow, "id" | "created_at" | "updated_at">;

const empty: Input = { value: "", label: "", display_order: 0 };

export function StatsManager({ stats }: { stats: StatRow[] }) {
  return (
    <CollectionManager<StatRow, Input>
      rows={stats}
      title="Manage Stats"
      description="Update the headline statistics shown in the About section."
      addLabel="Add Stat"
      itemNoun="Stat"
      emptyInput={empty}
      toInput={(r) => ({
        value: r.value,
        label: r.label,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: `${r.value} — ${r.label}`,
        meta: <Pill tone="muted">#{r.display_order}</Pill>,
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.value.trim()) e.value = "Value is required.";
        if (!i.label.trim()) e.label = "Label is required.";
        return e;
      }}
      create={createStat}
      update={updateStat}
      remove={deleteStat}
      renderFields={(i, patch, errors) => (
        <>
          <TextField
            label="Value"
            value={i.value}
            onChange={(v) => patch({ value: v })}
            required
            error={errors.value}
            placeholder="11+"
          />
          <TextField
            label="Label"
            value={i.label}
            onChange={(v) => patch({ label: v })}
            required
            error={errors.label}
            placeholder="Projects"
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
