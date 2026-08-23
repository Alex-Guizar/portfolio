import { PROFILE } from '@/data/profile';
import type { UtilityBarProps } from '@/types/fftChrome';

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
