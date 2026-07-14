"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import { Upload, Loader2, X, AlertCircle, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { FormLabel } from "./FormLabel";

interface ImageUploadFieldProps {
  label: string;
  currentUrl?: string | null;
  onChange: (url: string | null) => void;
  bucket: "portfolio-images" | "portfolio-documents";
  accept?: string;
  hint?: string;
}

const MAX_BYTES = 5 * 1024 * 1024;

function isImageUrl(url: string): boolean {
  return /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(url);
}

export function ImageUploadField({
  label,
  currentUrl,
  onChange,
  bucket,
  accept = "image/png,image/jpeg,image/webp",
  hint,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);

    if (file.size > MAX_BYTES) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const safeName = file.name.replace(/\s+/g, "-");
      const path = `${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: false, cacheControl: "3600" });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="mb-5">
      <FormLabel hint={hint}>{label}</FormLabel>

      {currentUrl ? (
        <div className="flex flex-col gap-3">
          {isImageUrl(currentUrl) ? (
            <div className="relative w-full max-w-xs">
              <Image
                src={currentUrl}
                alt={label}
                width={400}
                height={300}
                className="w-full max-w-xs h-auto rounded-xl border border-white/10"
              />
            </div>
          ) : (
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink-secondary hover:text-ink-primary hover:border-brand-primary/40 transition max-w-xs"
            >
              <FileText size={16} className="text-brand-light shrink-0" />
              <span className="truncate">View uploaded file</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-ink-secondary hover:text-red-400 transition"
          >
            <X size={13} />
            Remove
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !uploading) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`border-dashed border-2 rounded-2xl p-8 text-center transition cursor-pointer ${
            dragging
              ? "border-brand-primary/60 bg-brand-primary/5"
              : "border-white/15 hover:border-brand-primary/40"
          } ${uploading ? "opacity-70 pointer-events-none" : ""}`}
        >
          {uploading ? (
            <Loader2 size={32} className="text-brand-light animate-spin mx-auto" />
          ) : (
            <Upload size={32} className="text-ink-muted mx-auto" />
          )}
          <p className="text-sm text-ink-secondary mt-3">
            {uploading ? "Uploading…" : "Click or drag to upload"}
          </p>
          <p className="text-[10px] text-ink-muted mt-1">
            {bucket === "portfolio-documents"
              ? "PDF up to 5MB"
              : "PNG, JPG, WEBP up to 5MB"}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onInputChange}
        className="hidden"
      />

      {error && (
        <div className="mt-2 flex items-start gap-2 text-xs text-red-400">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
