import { Link } from 'react-router-dom';
import { FFTPanel, UtilityBar } from '@/components/FFTChrome';
import type { TogglePlainProps } from '@/types/pages';

export function NotFoundGame({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="min-h-full bg-ft-bg text-ft-fg">
      <div className="fft-page px-10 pt-8 pb-14 max-w-container mx-auto box-border">
        <div className="flex flex-wrap items-center justify-end gap-4 mb-5">
          <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
        </div>
        <main className="flex items-center justify-center py-24">
          <FFTPanel title="Unit Not Found" className="max-w-[28rem]">
            <p className="text-[0.9375rem] leading-[1.7] text-ft-panel-fg m-0 mb-4">
              Nothing's deployed at this location on the map.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-sm border border-ft-panel-border-md bg-transparent px-4 py-2 text-[0.75rem] font-semibold text-ft-panel-fg transition"
            >
              <span className="font-cinzel text-[0.75rem] font-semibold text-ft-gold" aria-hidden="true">◀</span>
              Back to map
            </Link>
          </FFTPanel>
        </main>
      </div>
    </div>
  );
}
