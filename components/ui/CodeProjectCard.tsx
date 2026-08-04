"use client";

import { motion } from "framer-motion";
import type { CodeProjectRow } from "@/lib/supabase/database.types";

interface CodeProjectCardProps {
  project: CodeProjectRow;
  index: number;
}

type CodeLang = "python" | "sql";

const SQL_KEYWORDS = new Set([
  "WITH", "AS", "SELECT", "SUM", "COUNT", "DISTINCT", "AVG", "MIN", "MAX",
  "FROM", "GROUP", "BY", "CASE", "WHEN", "THEN", "ELSE", "END", "ORDER",
  "DESC", "ASC", "WHERE", "AND", "OR", "ON", "JOIN", "INNER", "LEFT",
  "RIGHT", "HAVING", "LIMIT", "NOT", "NULL", "IN",
]);

const PY_KEYWORDS = new Set([
  "import", "as", "from", "def", "return", "for", "in", "if", "else",
  "elif", "while", "with", "lambda", "and", "or", "not", "None", "True",
  "False", "class", "try", "except", "finally", "raise", "pass",
]);

interface Token {
  text: string;
  cls: string;
}

function tokenizeLine(line: string, lang: CodeLang): Token[] {
  const trimmed = line.trimStart();
  const commentMarker = lang === "python" ? "#" : "--";
  if (trimmed.startsWith(commentMarker)) {
    return [{ text: line, cls: "text-ink-muted italic" }];
  }

  const tokens: Token[] = [];
  const re =
    /('(?:[^']|'')*')|(\d+(?:\.\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_']+)/g;
  const keywords = lang === "python" ? PY_KEYWORDS : SQL_KEYWORDS;
  let prevChar = "";
  let match: RegExpExecArray | null;

  while ((match = re.exec(line)) !== null) {
    const [full, str, num, word, ws] = match;
    if (str !== undefined) {
      tokens.push({ text: full, cls: "text-yellow-300/80" });
      prevChar = "'";
    } else if (num !== undefined) {
      tokens.push({ text: full, cls: "text-orange-300/80" });
      prevChar = num[num.length - 1];
    } else if (word !== undefined) {
      const isKeyword =
        lang === "sql"
          ? keywords.has(word.toUpperCase())
          : keywords.has(word);
      let cls = "";
      if (isKeyword) cls = "text-brand-light";
      else if (prevChar === ".") cls = "text-ink-primary";
      tokens.push({ text: full, cls });
      prevChar = word[word.length - 1];
    } else if (ws !== undefined) {
      tokens.push({ text: full, cls: "" });
    } else {
      tokens.push({ text: full, cls: "" });
      prevChar = full[full.length - 1];
    }
  }

  return tokens;
}

function CodeBlock({ snippet, lang }: { snippet: string; lang: CodeLang }) {
  // Seed data stores newlines as literal "\n" sequences — normalise them.
  const normalized = snippet.replace(/\\n/g, "\n");
  const lines = normalized.split("\n");

  return (
    <div className="font-mono text-xs lg:text-sm leading-relaxed text-ink-secondary min-h-[280px]">
      {lines.map((line, i) => {
        const tokens = tokenizeLine(line, lang);
        return (
          <div key={i} className="whitespace-pre">
            {tokens.length === 0
              ? " "
              : tokens.map((token, j) =>
                  token.cls ? (
                    <span key={j} className={token.cls}>
                      {token.text}
                    </span>
                  ) : (
                    <span key={j}>{token.text}</span>
                  )
                )}
          </div>
        );
      })}
    </div>
  );
}

export default function CodeProjectCard({ project, index }: CodeProjectCardProps) {
  // `features` and `stats` are stored as free-form JSON, so a malformed
  // value (object, string, null) could otherwise reach `.map` and crash the
  // whole page. Guard to an array before rendering.
  const features = Array.isArray(project.features)
    ? (project.features as { icon: string; label: string }[])
    : [];
  const stats = Array.isArray(project.stats)
    ? (project.stats as { value: string; label: string }[])
    : [];

  const filename =
    project.code_filename ??
    (index === 0 ? "customer_segmentation.sql" : "retention_analysis.py");
  const lang: CodeLang = filename.endsWith(".py") ? "python" : "sql";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative bg-background-surface border border-white/8 rounded-3xl p-8 lg:p-10 overflow-hidden hover:border-brand-primary/40 transition-all duration-500"
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Number + category row */}
          <div className="flex items-center gap-3">
            <span className="text-7xl font-black gradient-text leading-none">
              {`0${index + 1}`}
            </span>
            <span className="w-px h-12 bg-white/15 flex-shrink-0" />
            <span className="text-xs font-semibold text-brand-light">{project.category}</span>
          </div>

          {/* Title block */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-ink-primary tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-brand-light mt-1">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Features 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="bg-background-elevated border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-xl flex-shrink-0">{feature.icon}</span>
                <span className="text-xs font-semibold text-ink-primary">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted">
              BUILT WITH
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-brand-primary/10 text-brand-light border border-brand-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          {(project.github_url || project.live_preview_url) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-violet-500 transition"
                >
                  View Code on GitHub →
                </a>
              )}
              {project.live_preview_url && (
                <a
                  href={project.live_preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 bg-white/5 rounded-full px-6 py-3 font-semibold text-sm text-ink-primary hover:bg-white/10 transition"
                >
                  Live Preview ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right column — code window */}
        <div className="bg-background-base rounded-2xl border border-white/8 overflow-hidden shadow-2xl relative">
          {/* Window chrome */}
          <div className="bg-background-elevated px-4 py-3 border-b border-white/8 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-ink-muted ml-3">{filename}</span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              live
            </span>
          </div>

          {/* Code area */}
          <div className="p-5 lg:p-6 overflow-x-auto">
            <CodeBlock snippet={project.code_snippet ?? ""} lang={lang} />
          </div>

          {/* Stats strip */}
          <div className="bg-background-elevated border-t border-white/8 px-5 py-4 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-black gradient-text">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-widest text-ink-muted mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
