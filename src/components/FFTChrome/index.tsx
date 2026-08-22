import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '@/data/profile';
import { externalLinkProps, isExternal } from '@/utils/links';
import type {
  FFTCharacterProps,
  FFTPanelProps,
  StatLineProps,
  FFTMenuItemProps,
  SectionPlainProps,
  UtilityBarProps,
} from '@/types/fftChrome';

export function FFTCharacter({ scale = 1, style }: FFTCharacterProps) {
  return (
    <img
      src="/assets/fft-serge-2x.png"
      width={44 * scale}
      height={78 * scale}
      alt="Chrono Cross's Serge in Final Fantasy Tactics style"
      className="block"
      style={{
        imageRendering: 'pixelated',
        filter: `drop-shadow(0 ${scale * 2}px 0 rgba(0,0,0,0.55))`,
        ...style,
      }}
    />
  );
}

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

export function FFTMenuItem({ children, badge, selected, href, to, onClick }: FFTMenuItemProps) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hover || focused || selected;

  const layout = (
    <>
      <span
        className="font-cinzel text-[0.875rem] font-semibold transition-all duration-150"
        style={{ color: active ? 'var(--color-ft-gold)' : 'transparent' }}
        aria-hidden="true"
      >
        ▸
      </span>
      {typeof children === 'string' ? <span>{children}</span> : children}
      {badge && (
        <span className="text-[0.625rem] text-ft-panel-dim tracking-[0.1rem]">
          {badge}
        </span>
      )}
    </>
  );

  const baseClassName = 'grid grid-cols-[0.5rem_1fr_auto] items-center gap-2.5 px-2 py-3 no-underline text-ft-panel-fg rounded-[2px] transition-all duration-150 text-[0.8125rem]';

  const style: CSSProperties = {
    background: active ? 'var(--color-ft-panel-hover)' : 'transparent',
    borderLeft: active ? `2px solid var(--color-ft-gold)` : '2px solid transparent',
    borderBottom: `1px solid color-mix(in srgb, var(--color-ft-panel-inner-hi2) 31%, transparent)`,
  };

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={baseClassName}
        style={style}
      >
        {layout}
      </Link>
    );
  }

  return (
    <a
      href={href || '#'}
      {...externalLinkProps(href || '')}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={baseClassName}
      style={style}
    >
      {layout}
      {isExternal(href || '') && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}

export function UtilityBar({ onTogglePlain, plain }: UtilityBarProps) {
  const { email, resume } = PROFILE;
  return (
    <div className="fft-utility-bar flex flex-wrap justify-end gap-3 mb-6">
      <a
        href={resume}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-accent bg-ft-accent px-3 py-2 text-[0.75rem] font-semibold text-ft-bg transition"
      >
        <span className="font-pixel text-[0.5rem] text-ft-bg" aria-hidden="true">↓</span>
        Resume
      </a>
      <a
        href={email}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-semibold text-ft-fg transition"
      >
        Contact
      </a>
      <button
        onClick={onTogglePlain}
        aria-pressed={plain}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-semibold text-ft-fg transition cursor-pointer"
      >
        <span aria-hidden="true">▶</span> {plain ? 'Full version' : 'Plain mode'}
      </button>
    </div>
  );
}

export function SectionPlain({ title, cornerNote, children, empty }: SectionPlainProps) {
  if (empty) return null;

  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-ft-line">
        <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.3em] text-ft-dim m-0">
          {title}
        </h2>
        {cornerNote && <span className="text-[0.6875rem] text-ft-dim">{cornerNote}</span>}
      </div>
      {children}
    </section>
  );
}
