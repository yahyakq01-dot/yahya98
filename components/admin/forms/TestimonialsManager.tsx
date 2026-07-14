"use client";

import type { TestimonialRow } from "@/lib/supabase/database.types";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/admin/_actions/testimonials";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { Pill } from "@/components/admin/ui/Pill";
import { TextField } from "@/components/admin/ui/TextField";
import { SelectField } from "@/components/admin/ui/SelectField";
import { SwitchField } from "@/components/admin/ui/SwitchField";

type Input = Omit<TestimonialRow, "id" | "created_at" | "updated_at">;

const empty: Input = {
  name: "",
  initials: "",
  country: "",
  flag: "",
  source: "Fiverr",
  rating: 5,
  quote: "",
  service: "",
  is_repeat_client: false,
  display_order: 0,
};

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: TestimonialRow[];
}) {
  return (
    <CollectionManager<TestimonialRow, Input>
      rows={testimonials}
      title="Manage Testimonials"
      description="Add and update client reviews, ratings, and repeat-client badges."
      addLabel="Add Testimonial"
      itemNoun="Testimonial"
      emptyInput={empty}
      toInput={(r) => ({
        name: r.name,
        initials: r.initials,
        country: r.country,
        flag: r.flag,
        source: r.source,
        rating: r.rating,
        quote: r.quote,
        service: r.service,
        is_repeat_client: r.is_repeat_client,
        display_order: r.display_order,
      })}
      card={(r) => ({
        title: `${r.name} — ${r.rating}★`,
        subtitle: r.quote,
        meta: (
          <>
            <Pill tone="muted">
              {r.flag} {r.source}
            </Pill>
            {r.is_repeat_client && <Pill tone="brand">Repeat</Pill>}
          </>
        ),
      })}
      validate={(i) => {
        const e: Record<string, string> = {};
        if (!i.name.trim()) e.name = "Name is required.";
        if (!i.initials.trim()) e.initials = "Initials are required.";
        if (!i.quote.trim()) e.quote = "Quote is required.";
        if (i.rating < 1 || i.rating > 5) e.rating = "Rating must be 1–5.";
        return e;
      }}
      create={createTestimonial}
      update={updateTestimonial}
      remove={deleteTestimonial}
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
            label="Initials"
            value={i.initials}
            onChange={(v) => patch({ initials: v })}
            required
            error={errors.initials}
            placeholder="R"
          />
          <TextField
            label="Country"
            value={i.country}
            onChange={(v) => patch({ country: v })}
            placeholder="United States"
          />
          <TextField
            label="Flag"
            value={i.flag}
            onChange={(v) => patch({ flag: v })}
            hint="emoji flag"
            placeholder="🇺🇸"
          />
          <SelectField
            label="Source"
            value={i.source}
            onChange={(v) =>
              patch({ source: v as TestimonialRow["source"] })
            }
            options={[
              { value: "Fiverr", label: "Fiverr" },
              { value: "Web Client", label: "Web Client" },
            ]}
          />
          <TextField
            label="Rating"
            type="number"
            value={String(i.rating)}
            onChange={(v) => patch({ rating: Number(v) || 0 })}
            error={errors.rating}
            hint="1 to 5"
          />
          <TextField
            label="Quote"
            value={i.quote}
            onChange={(v) => patch({ quote: v })}
            multiline
            rows={4}
            required
            error={errors.quote}
          />
          <TextField
            label="Service"
            value={i.service}
            onChange={(v) => patch({ service: v })}
            placeholder="Power BI Dashboard"
          />
          <SwitchField
            label="Repeat client"
            checked={i.is_repeat_client}
            onChange={(c) => patch({ is_repeat_client: c })}
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
