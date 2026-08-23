import type { StatTileProps } from '@/types/projectDetail';

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div
      className="flex-1 rounded-[3px] p-4 border border-ft-panel-border-md"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-header) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), 0 2px 0 rgba(90,48,24,0.18)`,
      }}
    >
      <div className="font-cinzel text-[0.6875rem] font-semibold uppercase tracking-[0.15em] mb-1 text-ft-panel-accent">{label}</div>
      <div className="text-[0.875rem] font-semibold text-ft-panel-fg">{value || "—"}</div>
    </div>
  );
}
