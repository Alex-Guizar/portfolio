import { useState } from 'react';
import { externalLinkProps, isExternal } from '@/utils/links';
import type { ProfileLink } from '@/types/profile';

export function PanelLinkChip({ label, href }: ProfileLink) {
  const [hover, setHover] = useState(false);
  return (
    <a
      key={label}
      href={href}
      {...externalLinkProps(href)}
      className="font-cinzel text-[0.75rem] font-semibold no-underline px-3 py-2 border rounded-sm tracking-[0.5px] transition"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-header) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), 0 1px 0 rgba(90,48,24,0.2)`,
        borderColor: hover ? 'var(--color-ft-gold)' : 'var(--color-ft-panel-border-md)',
        color: hover ? 'var(--color-ft-panel-accent)' : 'var(--color-ft-panel-fg)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label} <span className="text-ft-gold" aria-hidden="true">↗</span>
      {isExternal(href) && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
