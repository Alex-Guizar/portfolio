import { ProjectDetailGame } from './ProjectDetailGame';
import { ProjectDetailPlain } from './ProjectDetailPlain';
import type { ProjectDetailProps } from '@/types/projectDetail';

export function ProjectDetail({ project, onTogglePlain, plain, onBack }: ProjectDetailProps) {
  return plain
    ? <ProjectDetailPlain project={project} onTogglePlain={onTogglePlain} onBack={onBack} />
    : <ProjectDetailGame project={project} onTogglePlain={onTogglePlain} onBack={onBack} />;
}
