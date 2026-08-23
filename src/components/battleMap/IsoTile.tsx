import type {
  TerrainType,
  DetailKind,
  TileDetail,
  TerrainPalette,
  IsoTileProps,
} from '@/types/battleMap';

const TW = 64;
const TH = 32;
const TD = 12;
const NW = 32;
const NH = 16;
const ND = 6;

function detailsFor(terrain: TerrainType, variant: number): TileDetail[] {
  const v = variant % 4;
  if (terrain === "grass") {
    const sets: TileDetail[][] = [
      [[10, 5, 2, 1], [18, 9, 2, 1], [14, 7, 1, 1, "hi"], [22, 6, 1, 1, "hi"]],
      [[12, 4, 2, 1], [16, 10, 3, 1], [20, 5, 1, 1, "hi"]],
      [[9, 6, 3, 1], [21, 8, 2, 1], [13, 9, 1, 1, "hi"], [25, 6, 1, 1, "hi"]],
      [[11, 5, 2, 1], [19, 8, 2, 2], [15, 6, 1, 1, "hi"], [12, 10, 1, 1, "flower"]],
    ];
    return sets[v];
  }
  if (terrain === "stone") {
    const sets: TileDetail[][] = [
      [[12, 5, 4, 1, "crack"], [20, 8, 1, 1, "hi"], [10, 9, 1, 1, "dk"]],
      [[14, 4, 1, 3, "crack"], [18, 9, 3, 1, "dk"]],
      [[10, 6, 2, 1, "dk"], [22, 7, 2, 1, "dk"], [15, 8, 1, 1, "hi"]],
      [[16, 5, 1, 1, "hi"], [12, 8, 5, 1, "crack"], [20, 6, 1, 1, "hi"]],
    ];
    return sets[v];
  }
  if (terrain === "path") {
    const sets: TileDetail[][] = [
      [[10, 6, 1, 1, "dk"], [18, 8, 1, 1, "dk"], [22, 5, 2, 1], [14, 9, 1, 1, "hi"]],
      [[12, 5, 1, 1, "dk"], [20, 7, 1, 1, "dk"], [16, 9, 2, 1]],
      [[14, 6, 2, 1, "dk"], [20, 8, 1, 1, "dk"], [11, 8, 1, 1, "hi"]],
      [[16, 5, 1, 1, "dk"], [10, 8, 1, 1, "dk"], [22, 7, 2, 1, "hi"]],
    ];
    return sets[v];
  }
  if (terrain === "water") {
    const sets: TileDetail[] = [
      [10, 6, 6, 1, "hi"],
      [18, 9, 5, 1, "hi"],
      [13, 10, 3, 1, "hi"],
    ];
    return sets;
  }
  return [];
}

function detailColor(pal: TerrainPalette, kind?: DetailKind): string {
  if (kind === "hi") return pal.topAccent || pal.topDk;
  if (kind === "dk") return pal.topDk;
  if (kind === "crack") return pal.topDk;
  if (kind === "flower") return "#ffe070";
  return pal.topDk;
}

const TERRAIN_PALETTES: Record<TerrainType, TerrainPalette> = {
  grass: { top: "#5a8a3a", topHi: "#7ab050", topDk: "#3a5a20", topAccent: "#9ad068", sideL: "#2a4a18", sideR: "#142a0a" },
  stone: { top: "#8c94a0", topHi: "#b0b8c0", topDk: "#5a626c", topAccent: "#d0d8e0", sideL: "#4a525c", sideR: "#2a3038" },
  path:  { top: "#a08868", topHi: "#c0a888", topDk: "#705840", topAccent: "#d8b890", sideL: "#604830", sideR: "#382818" },
  water: { top: "#3a78a8", topHi: "#5a98c8", topDk: "#1a4878", topAccent: "#8ab8e0", sideL: "#1a3858", sideR: "#0a2040" },
};

export function IsoTile({ x, y, terrain, height = 0, children, variant = 0 }: IsoTileProps) {
  const pal = TERRAIN_PALETTES[terrain];
  const screenX = (x - y) * (TW / 2);
  const screenY = (x + y) * (TH / 2) - height * TD;
  const sideD = ND + height * ND;

  const details = detailsFor(terrain, variant);

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${screenX - TW / 2}px)`,
        top: screenY,
        width: TW,
        height: TH + (sideD * (TH / NH)),
      }}
    >
      <svg
        viewBox={`0 0 ${NW} ${NH + sideD}`}
        width={TW}
        height={TH + (sideD * (TH / NH))}
        shapeRendering="crispEdges"
        className="block"
      >
        <polygon points={`0,8 16,16 16,${16 + sideD} 0,${8 + sideD}`} fill={pal.sideL} />
        {Array.from({ length: Math.floor(sideD / 2) }).map((_, i) => (
          <rect key={`ls${i}`} x={2 + i * 0.3} y={9 + i * 0.5} width={1} height={sideD - i} fill={pal.sideR} opacity={0.4} />
        ))}
        <polygon points={`16,16 32,8 32,${8 + sideD} 16,${16 + sideD}`} fill={pal.sideR} />
        <polygon points={`24,12 32,8 32,${8 + sideD} 24,${12 + sideD}`} fill="rgba(0,0,0,0.18)" />

        <polygon points="16,0 32,8 16,16 0,8" fill={pal.top} />
        <polygon points="16,0 32,8 16,16" fill="rgba(0,0,0,0.08)" />
        <polyline points="0,8 16,0 32,8" fill="none" stroke={pal.topHi} strokeWidth="1" opacity="0.85" />

        {details.map((d, i) => {
          const [dx, dy, dw, dh, kind] = d;
          return <rect key={i} x={dx} y={dy} width={dw} height={dh} fill={detailColor(pal, kind)} />;
        })}

        <polyline points={`0,8 16,16 32,8`} fill="none" stroke={pal.topDk} strokeWidth="0.5" opacity="0.6" />
      </svg>

      {children && (
        <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-full z-10">
          {children}
        </div>
      )}
    </div>
  );
}
