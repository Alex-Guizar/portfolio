import { PROFILE } from '@/data/profile';
import type { Project } from '@/types/profile';

/**
 * Derives everything the game and plain project-detail layouts need beyond
 * the project itself: its position among PROFILE.work, its prev/next
 * neighbors for the footer nav, and its link/metric/stack/gallery lists
 * normalized to arrays so callers never have to guard against `undefined`.
 */
export function getProjectViewModel(project: Project) {
  const index = PROFILE.work.findIndex((w) => w.id === project.id);
  const prev = PROFILE.work[(index - 1 + PROFILE.work.length) % PROFILE.work.length];
  const next = PROFILE.work[(index + 1) % PROFILE.work.length];

  const primary = project.projectLinks?.find((l) => l.kind === "primary")
    || (project.href ? { label: "Visit site", href: project.href } : null);
  const secondary = project.projectLinks?.filter((l) => l.kind !== "primary") || [];

  return {
    index,
    prev,
    next,
    primary,
    secondary,
    metrics: project.metrics ?? [],
    stackDetail: project.stackDetail ?? [],
    gallery: project.gallery ?? [],
  };
}
