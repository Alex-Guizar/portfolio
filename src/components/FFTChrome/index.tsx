import { useState, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../data/profile';

interface FFTCharacterProps {
  scale?: number;
  style?: CSSProperties;
}

export function FFTCharacter({ scale = 1, style }: FFTCharacterProps) {
  return (
    <img
      src="assets/character.png"
      width={44 * scale}
      height={78 * scale}
      alt="character"
      style={{
        imageRendering: 'pixelated',
        filter: `drop-shadow(0 ${scale * 2}px 0 rgba(0,0,0,0.55))`,
        display: 'block',
        ...style,
      }}
    />
  );
}

interface FFTPanelProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  title?: string;
  cornerStat?: string | number;
  inset?: number;
}

export function FFTPanel({ children, style, className, title, cornerStat, inset = 18 }: FFTPanelProps) {
  return (
    <div
      className={`bg-ft-panel-border-dk p-px rounded${className ? ` ${className}` : ''}`}
      style={{
        boxShadow: `0 8px 0 rgba(0,0,0,0.55), 0 0 0 1px var(--color-ft-panel-outer), 0 0 28px rgba(0,0,0,0.4)`,
        ...style,
      }}
    >
      <div
        className="border border-ft-panel-border-md rounded-sm relative text-ft-panel-fg"
        style={{
          background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-mid) 30%, var(--color-ft-panel-mid) 75%, var(--color-ft-panel-bot) 100%)`,
          boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), inset 0 -1px 0 rgba(90,48,24,0.3)`,
          padding: inset,
        }}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-ft-panel-inner-hi2 pb-3">
            <div className="flex items-center gap-3 font-cinzel text-[18px] font-semibold tracking-[0.12em] text-ft-fg">
              <span className="text-ft-gold text-[12px]">◆</span>
              <span>{title}</span>
              <span className="text-ft-gold text-[12px]">◆</span>
            </div>
            {cornerStat && (
              <span className="font-jetbrains text-[11px] text-ft-panel-dim tracking-[0.08em]">
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

interface StatLineProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export function StatLine({ label, value, max, color }: StatLineProps) {
  const pct = Math.min(1, value / max);
  return (
    <div className="grid grid-cols-[4rem_1fr_4.5rem] gap-2.5 items-center font-jetbrains text-[0.6875rem] py-[0.25rem]">
      <span className="font-cinzel text-[11px] font-semibold tracking-[0.15em] text-ft-panel-accent">
        {label}
      </span>
      <div
        className="h-[0.5625rem] rounded-[1px] bg-ft-panel-bot border border-ft-panel-border-md"
        style={{ boxShadow: 'inset 0 1px 0 rgba(90,48,24,0.18)' }}
      >
        <div
          className="h-full"
          style={{
            width: `${pct * 100}%`,
            background: `linear-gradient(180deg, ${color} 0%, color-mix(in srgb, ${color} 80%, transparent) 100%)`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        />
      </div>
      <span className="text-right font-jetbrains text-[11px] font-semibold text-ft-panel-fg tabular-nums">
        {value}
        <span className="text-ft-panel-dim font-normal">/{max}</span>
      </span>
    </div>
  );
}

interface FFTMenuItemProps {
  children?: ReactNode;
  badge?: string | number;
  selected?: boolean;
  href?: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function FFTMenuItem({ children, badge, selected, href, to, onClick }: FFTMenuItemProps) {
  const [hover, setHover] = useState(false);
  const active = hover || selected;

  const layout = (
    <>
      <span
        className="font-cinzel text-[14px] font-semibold transition-all duration-150"
        style={{ color: active ? 'var(--color-ft-gold)' : 'transparent' }}
      >
        ▸
      </span>
      {typeof children === 'string' ? <span>{children}</span> : children}
      {badge && (
        <span className="font-jetbrains text-[0.625rem] text-ft-panel-dim tracking-[0.1rem]">
          {badge}
        </span>
      )}
    </>
  );

  const baseClassName = 'grid grid-cols-[1.375rem_1fr_auto] gap-2.5 px-2.5 py-2.5 no-underline text-ft-panel-fg rounded-[2px] transition-all duration-150 font-jetbrains text-[0.8125rem]';

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
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={baseClassName}
      style={style}
    >
      {layout}
    </a>
  );
}

interface UtilityBarProps {
  onTogglePlain: () => void;
  plain: boolean;
}

export function UtilityBar({ onTogglePlain, plain }: UtilityBarProps) {
  const { email, resume } = PROFILE;
  return (
    <div className="fft-utility-bar flex flex-wrap justify-end gap-2.5 mb-5">
      <a
        href={resume}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-accent bg-ft-accent px-3 py-2 text-[0.75rem] font-jetbrains font-semibold text-ft-bg transition"
      >
        <span className="font-pixel text-[0.5rem] text-ft-bg">↓</span>
        Resume
      </a>
      <a
        href={email}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-jetbrains font-semibold text-ft-fg transition"
      >
        Contact
      </a>
      <button
        onClick={onTogglePlain}
        className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-jetbrains font-semibold text-ft-fg transition cursor-pointer"
      >
        {plain ? '▶ Full version' : '▶ Plain mode'}
      </button>
    </div>
  );
}

interface SectionPlainProps {
  title: string;
  cornerNote?: string;
  children?: ReactNode;
}

export function SectionPlain({ title, cornerNote, children }: SectionPlainProps) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-ft-line">
        <h2 className="font-jetbrains text-[0.75rem] font-medium uppercase tracking-[0.3em] text-ft-panel-dim m-0">
          {title}
        </h2>
        {cornerNote && <span className="font-jetbrains text-[0.6875rem] text-ft-panel-dim">{cornerNote}</span>}
      </div>
      {children}
    </section>
  );
}
