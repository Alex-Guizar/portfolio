import type { FFTPanelProps } from '@/types/fftChrome';

export function FFTPanel({ children, style, className, title, cornerStat, id }: FFTPanelProps) {
  return (
    <div
      id={id}
      className={`bg-ft-panel-border-dk p-px rounded${className ? ` ${className}` : ''}`}
      style={{
        boxShadow: `0 8px 0 rgba(0,0,0,0.55), 0 0 0 1px var(--color-ft-panel-outer), 0 0 28px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      <div
        className="border border-ft-panel-border-md rounded-sm relative text-ft-panel-fg p-4"
        style={{
          background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-mid) 30%, var(--color-ft-panel-mid) 75%, var(--color-ft-panel-bot) 100%)`,
          boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), inset 0 -1px 0 rgba(90,48,24,0.3)`,
        }}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-ft-panel-inner-hi2 pb-3">
            <h2 className="flex items-center gap-3 font-cinzel text-[18px] font-semibold tracking-[0.12em] m-0">
              <span className="text-ft-gold text-[0.75rem]" aria-hidden="true">◆</span>
              <span>{title}</span>
              <span className="text-ft-gold text-[0.75rem]" aria-hidden="true">◆</span>
            </h2>
            {cornerStat && (
              <span className="text-[0.6875rem] text-ft-panel-dim tracking-[0.08em]">
                {cornerStat}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
