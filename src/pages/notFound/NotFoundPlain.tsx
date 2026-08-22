import { Link } from 'react-router-dom';
import { UtilityBar } from '@/components/FFTChrome';
import type { TogglePlainProps } from '@/types/pages';

export function NotFoundPlain({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="bg-ft-bg text-ft-fg-plain min-h-full">
      <div className="plain-page pt-8 px-10 pb-16 max-w-[55rem] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />
        <main className="flex flex-col items-start gap-4 py-24">
          <h1 className="text-[2rem] font-bold m-0 text-ft-fg-plain">Page not found</h1>
          <p className="text-[0.9375rem] leading-[1.7] text-ft-fg-plain-soft m-0 max-w-[32rem]">
            There's nothing at this address.
          </p>
          <Link
            to="/"
            className="text-[0.875rem] font-medium text-ft-fg-plain no-underline px-4 py-2 border border-ft-line bg-ft-bg-panel"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </main>
      </div>
    </div>
  );
}
