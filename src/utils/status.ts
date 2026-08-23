import type { ProjectStatus } from '@/types/profile';

/**
 * Single source of truth for how a project status is colored. The same
 * status renders three different ways depending on where it sits:
 *  - `bg`/`fg`  — solid pill on the dark game-world backdrop (e.g. the
 *                 project detail page's status badge).
 *  - `onPanel`  — text/border color for outline badges sitting on the light
 *                 FFT parchment panels. Needs a darker shade than `bg` to
 *                 stay readable — see the panel-tuned tokens below.
 *  - `onDark`   — text/border color for outline badges sitting on the dark
 *                 Plain-mode background.
 */
export const STATUS_STYLE: Record<ProjectStatus, { bg: string; fg: string; onPanel: string; onDark: string }> = {
  LIVE: {
    bg: 'var(--color-ft-hp-green)',
    fg: '#0a1a08',
    onPanel: 'var(--color-ft-status-live-panel)',
    onDark: 'var(--color-ft-hp-green)',
  },
  'IN-PROGRESS': {
    bg: 'var(--color-ft-ct-yellow)',
    fg: '#1a1408',
    onPanel: 'var(--color-ft-status-progress-panel)',
    onDark: 'var(--color-ft-ct-yellow)',
  },
  ARCHIVED: {
    bg: 'var(--color-ft-status-archived)',
    fg: '#0a0e18',
    onPanel: 'var(--color-ft-panel-dim)',
    onDark: 'var(--color-ft-dim-plain)',
  },
};
