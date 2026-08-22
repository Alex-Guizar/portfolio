export type ProjectStatus = 'LIVE' | 'IN-PROGRESS' | 'ARCHIVED';

export interface ProjectLink {
  label: string;
  href: string;
  kind?: 'primary' | 'secondary';
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectStackDetail {
  tech: string;
  reason: string;
}

export interface ProjectGalleryItem {
  caption: string;
  src?: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  stack: string;
  blurb: string;
  status?: ProjectStatus;
  tagline?: string;
  role?: string;
  duration?: string;
  team?: string;
  href?: string | null;
  screenshot?: string;
  problem?: string[];
  approach?: string[];
  outcome?: string[];
  metrics?: ProjectMetric[];
  features?: string[];
  stackDetail?: ProjectStackDetail[];
  gallery?: ProjectGalleryItem[];
  projectLinks?: ProjectLink[];
}

export interface ExperienceItem {
  id: string;
  co: string;
  role: string;
  range: string;
}

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  location: string;
  blurb: string;
  longBlurb: string[];
  now: string[];
  work: Project[];
  experience: ExperienceItem[];
  links: ProfileLink[];
  email: string;
  resume: string;
}
