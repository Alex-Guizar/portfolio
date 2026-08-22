import type { StatLineProps } from '@/types/fftChrome';

export function StatLine({ label, value, max, color }: StatLineProps) {
  const pct = Math.min(1, value / max);
  return (
    <div className="grid grid-cols-[4rem_1fr_4.5rem] gap-2.5 items-center text-[0.6875rem] py-[0.25rem]">
      <span className="font-cinzel text-[11px] font-semibold tracking-[0.15em] text-ft-panel-accent">
        {label}
      </span>
      <div
        className="h-[0.5625rem] rounded-[1px] bg-ft-panel-bot border border-ft-panel-border-md shadow-[inset_0_1px_0_rgba(90,48,24,0.18)]"
      >
        <div
          className="h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
          style={{
            width: `${pct * 100}%`,
            background: `linear-gradient(180deg, ${color} 0%, color-mix(in srgb, ${color} 80%, transparent) 100%)`,
          }}
        />
      </div>
      <span className="text-right text-[11px] font-semibold text-ft-panel-fg tabular-nums">
        {value}
        <span className="text-ft-panel-dim font-normal">/{max}</span>
      </span>
    </div>
  );
}
