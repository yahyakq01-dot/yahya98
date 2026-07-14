"use client";

import { FormEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";

type FormField = "name" | "email" | "subject" | "message";

interface ContactFormProps {
  email?: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: FormState): Partial<Record<FormField, string>> {
  const errors: Partial<Record<FormField, string>> = {};
  if (!state.name.trim()) errors.name = "Please enter your name.";
  if (!state.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(state.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!state.subject.trim()) errors.subject = "Please add a subject.";
  if (!state.message.trim()) errors.message = "Please write a message.";
  return errors;
}

export default function ContactForm({
  email: contactEmail = "yahyaqureshi012@gmail.com",
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = attempted ? validate(form) : {};
  const isEmpty = !form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim();

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setForm(INITIAL_STATE);
      setAttempted(false);
      setSubmitted(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

  function handleChange(field: FormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const validation = validate(form);
    if (Object.keys(validation).length > 0) return;

    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      `From: ${form.name.trim()} (${form.email.trim()})\n\n${form.message.trim()}`,
    );
    const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  const inputBase =
    "bg-background-base border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 w-full transition";
  const labelClass =
    "text-xs font-semibold uppercase tracking-wider text-ink-muted";

  function fieldBorder(field: FormField) {
    return errors[field] ? "border-red-400/50" : "border-white/10";
  }

  return (
    <div className="bg-background-surface border border-white/[0.08] rounded-3xl p-7 lg:p-8 h-full flex flex-col">
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-light">
          SEND A MESSAGE
        </span>
        <h3 className="mt-2 text-xl md:text-2xl font-bold text-ink-primary">
          Email Me
        </h3>
        <p className="text-sm text-ink-secondary mt-2">
          Quick form. I&apos;ll get back within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your name"
            className={`${inputBase} ${fieldBorder("name")}`}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@company.com"
            className={`${inputBase} ${fieldBorder("email")}`}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-subject" className={labelClass}>
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            placeholder="Project inquiry"
            className={`${inputBase} ${fieldBorder("subject")}`}
          />
          {errors.subject && (
            <p className="text-xs text-red-400 mt-1">{errors.subject}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Tell me about your project, dataset, or goal..."
            className={`${inputBase} ${fieldBorder("message")} resize-none`}
          />
          {errors.message && (
            <p className="text-xs text-red-400 mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isEmpty}
          className={`mt-2 bg-brand-primary hover:bg-violet-500 text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            isEmpty ? "opacity-60 cursor-not-allowed hover:bg-brand-primary" : ""
          }`}
        >
          Send Message
          <Send size={16} />
        </button>

        {submitted && (
          <p className="text-xs text-success">
            ✓ Opening your email client...
          </p>
        )}
      </form>
    </div>
  );
}
