import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export interface FFTCharacterProps {
  scale?: number;
  style?: CSSProperties;
}

export interface FFTPanelProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  title?: string;
  cornerStat?: ReactNode;
  id?: string;
}

export interface StatLineProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface FFTMenuItemProps {
  children?: ReactNode;
  badge?: string | number;
  selected?: boolean;
  href?: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface SectionPlainProps {
  title: string;
  cornerNote?: string;
  children?: ReactNode;
  empty?: boolean;
}

export interface UtilityBarProps {
  onTogglePlain: () => void;
  plain: boolean;
}
