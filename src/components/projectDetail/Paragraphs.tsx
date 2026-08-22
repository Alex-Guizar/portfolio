import type { ParagraphsProps } from '@/types/projectDetail';

const VARIANT_CLASS = {
  game: 'mb-3 text-[0.9375rem] leading-[1.75] text-ft-panel-fg-soft',
  plain: 'mb-3 text-[0.9375rem] leading-[1.8] text-ft-fg-plain-soft last:mb-0',
} as const;

/** Renders a list of body paragraphs. `variant` picks the game-mode or
 *  plain-mode text treatment — the only thing that differed between the two
 *  previously-separate implementations of this component. */
export function Paragraphs({ items, variant = 'game' }: ParagraphsProps) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} className={VARIANT_CLASS[variant]}>
      {t}
    </p>
  ));
}
