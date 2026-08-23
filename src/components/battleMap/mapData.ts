import type { TerrainType } from '@/types/battleMap';

// Legend: . empty · W water · P path · G grass · H hero (raised stone) ·
// T tree · L lamp · C chest
const MAP = [
  ".WWWWW.",
  "WWWPWWW",
  "GGPPPGG",
  "GPPHPGG",
  "GPPPPGC",
  "GGGTGGG",
  ".GLGGG.",
];

export interface MapTile {
  x: number;
  y: number;
  terrain: TerrainType;
  height: number;
  hasHero: boolean;
  hasTree: boolean;
  hasCrystal: boolean;
  hasLamp: boolean;
  hasChest: boolean;
  variant: number;
}

export const MAP_TILES: MapTile[] = (() => {
  const out: MapTile[] = [];
  for (let y = 0; y < MAP.length; y++) {
    for (let x = 0; x < MAP[y].length; x++) {
      const ch = MAP[y][x];
      if (ch === ".") continue;
      let terrain: TerrainType = "grass";
      let height = 0;
      let hasHero = false;
      let hasTree = false;
      let hasCrystal = false;
      let hasLamp = false;
      let hasChest = false;
      if (ch === "W") terrain = "water";
      else if (ch === "P") terrain = "path";
      else if (ch === "H") { terrain = "stone"; height = 1; hasHero = true; }
      else if (ch === "T") { terrain = "grass"; hasTree = true; }
      else if (ch === "L") { terrain = "stone"; hasLamp = true; }
      else if (ch === "C") { terrain = "grass"; hasChest = true; }
      if (x === 0 && y === 2) hasCrystal = true;
      out.push({ x, y, terrain, height, hasHero, hasTree, hasCrystal, hasLamp, hasChest, variant: (x * 3 + y * 7) });
    }
  }
  out.sort((a, b) => (a.x + a.y) - (b.x + b.y));
  return out;
})();
