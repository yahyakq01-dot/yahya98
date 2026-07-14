"use client";

import { useState } from "react";
import type {
  DashboardCapabilityRow,
  CodeCapabilityRow,
} from "@/lib/supabase/database.types";
import {
  createDashboardCapability,
  updateDashboardCapability,
  deleteDashboardCapability,
} from "@/app/admin/_actions/dashboard-capabilities";
import {
  createCodeCapability,
  updateCodeCapability,
  deleteCodeCapability,
} from "@/app/admin/_actions/code-capabilities";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";

type DashInput = Omit<DashboardCapabilityRow, "id" | "created_at" | "updated_at">;
type CodeInput = Omit<CodeCapabilityRow, "id" | "created_at" | "updated_at">;

const ICON_HINT =
  "a lucide icon name — see lucide.dev (e.g. Gauge, Zap, Database, Users)";

interface CapabilitiesManagerProps {
  dashboardCaps: DashboardCapabilityRow[];
  codeCaps: CodeCapabilityRow[];
}

export function CapabilitiesManager({
  dashboardCaps,
  codeCaps,
}: CapabilitiesManagerProps) {
  const [tab, setTab] = useState<"dashboard" | "code">("dashboard");

  return (
    <div>
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest font-bold text-brand-light">
          capabilities
        </p>
        <h1 className="text-3xl font-black tracking-tight mt-2">
          Manage Capabilities
        </h1>
      </div>

      <div className="flex items-center gap-2 mb-8 border-b border-white/8">
        {(
          [
            ["dashboard", "Dashboard Capabilities"],
            ["code", "Code Capabilities"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${
              tab === key
                ? "border-brand-primary text-ink-primary"
                : "border-transparent text-ink-muted hover:text-ink-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "dashboard" ? (
        <CollectionManager<DashboardCapabilityRow, DashInput>
          rows={dashboardCaps}
          title="Dashboard Capabilities"
          description="The capability cards shown above the dashboards grid."
          addLabel="Add Capability"
          itemNoun="Capability"
          emptyInput={{ title: "", description: "", icon: "", display_order: 0 }}
          toInput={(r) => ({
            title: r.title,
            description: r.description,
            icon: r.icon,
            display_order: r.display_order,
          })}
          card={(r) => ({
            title: r.title,
            subtitle: r.description,
            meta: <Pill tone="muted">{r.icon}</Pill>,
          })}
          validate={(i) => {
            const e: Record<string, string> = {};
            if (!i.title.trim()) e.title = "Title is required.";
            if (!i.description.trim()) e.description = "Description is required.";
            if (!i.icon.trim()) e.icon = "Icon is required.";
            return e;
          }}
          create={createDashboardCapability}
          update={updateDashboardCapability}
          remove={deleteDashboardCapability}
          renderFields={(i, patch, errors) => (
            <>
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
                rows={3}
                required
                error={errors.description}
              />
              <TextField
                label="Icon"
                value={i.icon}
                onChange={(v) => patch({ icon: v })}
                required
                error={errors.icon}
                hint={ICON_HINT}
                placeholder="Gauge"
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
      ) : (
        <CollectionManager<CodeCapabilityRow, CodeInput>
          rows={codeCaps}
          title="Code Capabilities"
          description="The capability pills shown in the SQL & Python section."
          addLabel="Add Capability"
          itemNoun="Capability"
          emptyInput={{ title: "", icon: "", display_order: 0 }}
          toInput={(r) => ({
            title: r.title,
            icon: r.icon,
            display_order: r.display_order,
          })}
          card={(r) => ({
            title: r.title,
            meta: <Pill tone="muted">{r.icon}</Pill>,
          })}
          validate={(i) => {
            const e: Record<string, string> = {};
            if (!i.title.trim()) e.title = "Title is required.";
            if (!i.icon.trim()) e.icon = "Icon is required.";
            return e;
          }}
          create={createCodeCapability}
          update={updateCodeCapability}
          remove={deleteCodeCapability}
          renderFields={(i, patch, errors) => (
            <>
              <TextField
                label="Title"
                value={i.title}
                onChange={(v) => patch({ title: v })}
                required
                error={errors.title}
              />
              <TextField
                label="Icon"
                value={i.icon}
                onChange={(v) => patch({ icon: v })}
                required
                error={errors.icon}
                hint={ICON_HINT}
                placeholder="Database"
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
      )}
    </div>
  );
}
