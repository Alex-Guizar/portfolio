import { STATUS_STYLE } from '@/utils/status';
import type { ProjectStatus } from '@/types/profile';

/** Solid status pill for the game-mode project detail hero. For the
 *  outline-style badges used elsewhere (Plain mode, the home page), read
 *  colors straight from `STATUS_STYLE` instead — the visual treatment
 *  differs too much per context to share one component. */
export function StatusPill({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  const c = STATUS_STYLE[status];
  return (
    <span
      className="inline-block font-cinzel text-[11px] font-semibold tracking-[2px] px-3 py-[5px] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
      style={{
        background: c.bg,
        color: c.fg,
      }}
    ><span aria-hidden="true">●</span> {status}</span>
  );
}
