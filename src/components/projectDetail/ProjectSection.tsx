import { FFTPanel } from '@/components/FFTChrome';
import type { ProjectSectionProps } from '@/types/projectDetail';

export function ProjectSection({ title, num, children, empty, className }: ProjectSectionProps) {
  if (empty) return null;

  return (
    <FFTPanel title={title} cornerStat={num ? `${num}` : undefined} className={className}>
      {children}
    </FFTPanel>
  );
}
