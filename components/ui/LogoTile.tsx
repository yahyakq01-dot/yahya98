interface LogoTileProps {
  name: string;
  monogram: string;
  category: string;
}

export default function LogoTile({ name, monogram, category }: LogoTileProps) {
  return (
    <div className="shrink-0 w-56 h-24 flex items-center gap-4 px-6 rounded-2xl bg-background-surface border border-white/8 hover:border-brand-primary/40 hover:bg-background-elevated transition-colors duration-300">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 border border-brand-primary/30">
        <span className="text-lg font-black text-brand-light tracking-tight">
          {monogram}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-ink-primary whitespace-nowrap">
          {name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-1">
          {category}
        </span>
      </div>
    </div>
  );
}
