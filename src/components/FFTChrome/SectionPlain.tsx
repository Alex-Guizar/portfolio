import type { SectionPlainProps } from '@/types/fftChrome';

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
