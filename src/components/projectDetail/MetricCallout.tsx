import type { MetricCalloutProps } from '@/types/projectDetail';

export function MetricCallout({ label, value }: MetricCalloutProps) {
  return (
    <div
      className="flex-1 min-w-[90px] rounded-[3px] px-3 py-4 text-center border border-ft-panel-border-md"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-header) 0%, var(--color-ft-panel-mid) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi)`,
      }}
    >
      <div className="font-cinzel text-[1.625rem] font-bold text-ft-panel-accent">{value}</div>
      <div className="font-cinzel text-[0.625rem] font-semibold uppercase tracking-[0.2em] mt-1 text-ft-panel-dim">{label}</div>
    </div>
  );
}
