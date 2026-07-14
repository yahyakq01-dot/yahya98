"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useToast } from "./ui/ToastProvider";
import { CollectionList } from "./CollectionList";
import { CollectionRowCard } from "./CollectionRowCard";
import { ConfirmDialog } from "./ui/ConfirmDialog";
import { FormActions } from "./ui/FormActions";

export interface RowCardMeta {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  imageUrl?: string | null;
}

export interface CollectionManagerProps<TRow extends { id: string }, TInput extends object> {
  rows: TRow[];
  title: string;
  description: string;
  addLabel: string;
  itemNoun: string;
  emptyInput: TInput;
  toInput: (row: TRow) => TInput;
  card: (row: TRow) => RowCardMeta;
  renderFields: (
    input: TInput,
    patch: (partial: Partial<TInput>) => void,
    errors: Record<string, string>
  ) => ReactNode;
  validate?: (input: TInput) => Record<string, string>;
  create: (input: TInput) => Promise<unknown>;
  update: (id: string, input: TInput) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
}

type EditState<TRow> = { mode: "new" } | { mode: "edit"; row: TRow } | null;

export function CollectionManager<TRow extends { id: string }, TInput extends object>(
  props: CollectionManagerProps<TRow, TInput>
) {
  const router = useRouter();
  const toast = useToast();

  const [editing, setEditing] = useState<EditState<TRow>>(null);
  const [input, setInput] = useState<TInput>(props.emptyInput);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmRow, setConfirmRow] = useState<TRow | null>(null);

  const noun = props.itemNoun;

  const patch = (partial: Partial<TInput>) =>
    setInput((prev) => ({ ...prev, ...partial }));

  const openNew = () => {
    setInput(props.emptyInput);
    setErrors({});
    setEditing({ mode: "new" });
  };

  const openEdit = (row: TRow) => {
    setInput(props.toInput(row));
    setErrors({});
    setEditing({ mode: "edit", row });
  };

  const close = () => {
    setEditing(null);
    setErrors({});
  };

  const handleSave = async () => {
    const v = props.validate ? props.validate(input) : {};
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSaving(true);
    try {
      if (editing?.mode === "edit") {
        await props.update(editing.row.id, input);
        toast.success(`${noun} updated.`);
      } else {
        await props.create(input);
        toast.success(`${noun} created.`);
      }
      close();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmRow) return;
    setDeleting(true);
    try {
      await props.remove(confirmRow.id);
      toast.success(`${noun} deleted.`);
      if (editing?.mode === "edit" && editing.row.id === confirmRow.id) close();
      setConfirmRow(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  if (editing) {
    return (
      <div className="max-w-2xl">
        <button
          type="button"
          onClick={close}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition mb-5"
        >
          <ArrowLeft size={14} />
          Back to list
        </button>

        <h1 className="text-2xl font-black tracking-tight mb-6">
          {editing.mode === "new" ? `New ${noun}` : `Edit ${noun}`}
        </h1>

        {props.renderFields(input, patch, errors)}

        <FormActions
          mode={editing.mode === "new" ? "create" : "edit"}
          onSave={handleSave}
          onCancel={close}
          onDelete={
            editing.mode === "edit"
              ? () => setConfirmRow(editing.row)
              : undefined
          }
          isSaving={saving}
          isDeleting={deleting}
        />

        <ConfirmDialog
          open={confirmRow !== null}
          onClose={() => setConfirmRow(null)}
          onConfirm={handleDelete}
          title={`Delete this ${noun.toLowerCase()}?`}
          description="This permanently removes it from the database and the live site. This cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          isConfirming={deleting}
        />
      </div>
    );
  }

  return (
    <>
      <CollectionList
        title={props.title}
        description={props.description}
        addLabel={props.addLabel}
        onAdd={openNew}
      >
        {props.rows.length === 0 ? (
          <div className="bg-background-surface border border-white/8 rounded-2xl p-10 text-center">
            <p className="text-sm text-ink-muted">
              Nothing here yet. Click &ldquo;{props.addLabel}&rdquo; to create
              your first {noun.toLowerCase()}.
            </p>
          </div>
        ) : (
          props.rows.map((row) => {
            const meta = props.card(row);
            return (
              <CollectionRowCard
                key={row.id}
                title={meta.title}
                subtitle={meta.subtitle}
                meta={meta.meta}
                imageUrl={meta.imageUrl}
                onEdit={() => openEdit(row)}
                onDelete={() => setConfirmRow(row)}
              />
            );
          })
        )}
      </CollectionList>

      <ConfirmDialog
        open={confirmRow !== null}
        onClose={() => setConfirmRow(null)}
        onConfirm={handleDelete}
        title={`Delete this ${noun.toLowerCase()}?`}
        description="This permanently removes it from the database and the live site. This cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        isConfirming={deleting}
      />
    </>
  );
}
