import type { ReactNode } from 'react';

export type TerrainType = 'grass' | 'stone' | 'path' | 'water';
export type DetailKind = 'hi' | 'dk' | 'crack' | 'flower';
export type TileDetail = [number, number, number, number, DetailKind?];

export type TerrainPalette = {
  top: string;
  topHi: string;
  topDk: string;
  topAccent?: string;
  sideL: string;
  sideR: string;
};

export type IsoTileProps = {
  x: number;
  y: number;
  terrain: TerrainType;
  height?: number;
  variant?: number;
  children?: ReactNode;
};
