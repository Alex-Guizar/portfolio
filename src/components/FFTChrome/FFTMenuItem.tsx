import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { externalLinkProps, isExternal } from '@/utils/links';
import type { FFTMenuItemProps } from '@/types/fftChrome';

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
