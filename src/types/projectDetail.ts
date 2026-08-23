import type { ReactNode } from 'react';
import type { Project } from '@/types/profile';

export interface ScreenshotPlaceholderProps {
  project: Project;
}

export interface StatTileProps {
  label: string;
  value?: string;
}

export interface MetricCalloutProps {
  label: string;
  value?: string | number;
}

export interface ProjectSectionProps {
  title: string;
  num?: number;
  children?: ReactNode;
  empty?: boolean;
  className?: string;
}

export interface ParagraphsProps {
  items?: string | string[];
  variant?: 'game' | 'plain';
}

export interface ProjectDetailProps {
  project: Project;
  onTogglePlain: () => void;
  plain: boolean;
  onBack: () => void;
}

export interface ProjectDetailVariantProps {
  project: Project;
  onTogglePlain: () => void;
  onBack: () => void;
}
