import React from 'react';
import { stFt, FFTCharacter, FFTPanel, FFTMenuItem } from './FFTChrome';

// ─── Iso tile primitives ────────────────────────────────────────────────────
const TW = 64;
const TH = 32;
const TD = 12;
const NW = 32;
const NH = 16;
const ND = 6;

function detailsFor(terrain, variant) {
  const v = variant % 4;
  if (terrain === "grass") {
    const sets = [
      [[10, 5, 2, 1], [18, 9, 2, 1], [14, 7, 1, 1, "hi"], [22, 6, 1, 1, "hi"]],
      [[12, 4, 2, 1], [16, 10, 3, 1], [20, 5, 1, 1, "hi"]],
      [[9, 6, 3, 1], [21, 8, 2, 1], [13, 9, 1, 1, "hi"], [25, 6, 1, 1, "hi"]],
      [[11, 5, 2, 1], [19, 8, 2, 2], [15, 6, 1, 1, "hi"], [12, 10, 1, 1, "flower"]],
    ];
    return sets[v];
  }
  if (terrain === "stone") {
    const sets = [
      [[12, 5, 4, 1, "crack"], [20, 8, 1, 1, "hi"], [10, 9, 1, 1, "dk"]],
      [[14, 4, 1, 3, "crack"], [18, 9, 3, 1, "dk"]],
      [[10, 6, 2, 1, "dk"], [22, 7, 2, 1, "dk"], [15, 8, 1, 1, "hi"]],
      [[16, 5, 1, 1, "hi"], [12, 8, 5, 1, "crack"], [20, 6, 1, 1, "hi"]],
    ];
    return sets[v];
  }
  if (terrain === "path") {
    const sets = [
      [[10, 6, 1, 1, "dk"], [18, 8, 1, 1, "dk"], [22, 5, 2, 1], [14, 9, 1, 1, "hi"]],
      [[12, 5, 1, 1, "dk"], [20, 7, 1, 1, "dk"], [16, 9, 2, 1]],
      [[14, 6, 2, 1, "dk"], [20, 8, 1, 1, "dk"], [11, 8, 1, 1, "hi"]],
      [[16, 5, 1, 1, "dk"], [10, 8, 1, 1, "dk"], [22, 7, 2, 1, "hi"]],
    ];
    return sets[v];
  }
  if (terrain === "water") {
    return [
      [10, 6, 6, 1, "hi"],
      [18, 9, 5, 1, "hi"],
      [13, 10, 3, 1, "hi"],
    ];
  }
  return [];
}

function detailColor(pal, kind) {
  if (kind === "hi") return pal.topAccent;
  if (kind === "dk") return pal.topDk;
  if (kind === "crack") return pal.topDk;
  if (kind === "flower") return "#ffe070";
  return pal.topDk;
}

function IsoTile({ x, y, terrain, height = 0, children, variant = 0 }) {
  const pal = stFt[terrain] || stFt.grass;
  const screenX = (x - y) * (TW / 2);
  const screenY = (x + y) * (TH / 2) - height * TD;
  const sideD = ND + height * ND;

  const details = detailsFor(terrain, variant);

  return (
    <div style={{
      position: "absolute",
      left: `calc(50% + ${screenX - TW / 2}px)`,
      top: screenY,
      width: TW,
      height: TH + (sideD * (TH / NH)),
    }}>
      <svg
        viewBox={`0 0 ${NW} ${NH + sideD}`}
        width={TW}
        height={TH + (sideD * (TH / NH))}
        shapeRendering="crispEdges"
        style={{ display: "block" }}
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
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translate(-50%, -100%)",
          zIndex: 10,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function PixelTree({ scale = 3 }) {
  const c = { o: "#0a0e08", t: "#1a4a18", T: "#3a7a30", th: "#5a9a40", w: "#5a3818", W: "#3a2410" };
  const rows = [
    "   ttt   ",
    "  tTTTt  ",
    " tTtTtTt ",
    " TThTTTT ",
    "tTTtTTTtT",
    " tTTTTTt ",
    "  tThTt  ",
    "   www   ",
    "   wWw   ",
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(9, ${scale}px)`, gridTemplateRows: `repeat(9, ${scale}px)`, imageRendering: "pixelated", filter: `drop-shadow(0 ${scale}px 0 rgba(0,0,0,0.5))` }}>
      {rows.flatMap((row, y) => row.split("").map((ch, x) => (
        <div key={`${x}-${y}`} style={{ background: ch === " " ? "transparent" : c[ch] }} />
      )))}
    </div>
  );
}

function PixelCrystal({ scale = 3 }) {
  const c = { o: "#102050", b: "#5a98e8", B: "#3068c0", h: "#b8d8f8", H: "#ffffff" };
  const rows = [
    "  oo  ",
    " oHbo ",
    "oHhbBo",
    "obhbBo",
    "obhBBo",
    " obBo ",
    "  oo  ",
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(6, ${scale}px)`,
      gridTemplateRows: `repeat(7, ${scale}px)`,
      imageRendering: "pixelated",
      filter: `drop-shadow(0 0 6px ${stFt.mpBlue})`,
      animation: "ft-crystal 3s ease-in-out infinite",
    }}>
      {rows.flatMap((row, y) => row.split("").map((ch, x) => (
        <div key={`${x}-${y}`} style={{ background: ch === " " ? "transparent" : c[ch] }} />
      )))}
    </div>
  );
}

function PixelLamp({ scale = 3 }) {
  const c = { o: "#0a0e08", p: "#2a2018", f: "#ffd060", F: "#fff0a0", g: "#6a5a40" };
  const rows = [
    "  ooo  ",
    " ofFFo ",
    " oFFfo ",
    "  ofo  ",
    "  ogo  ",
    "  ogo  ",
    "  ogo  ",
    "  ogo  ",
    " ooooo ",
  ];
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{
        position: "absolute",
        inset: -scale * 3,
        background: `radial-gradient(circle, rgba(255,208,96,0.5) 0%, rgba(255,208,96,0.15) 35%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(7, ${scale}px)`, gridTemplateRows: `repeat(9, ${scale}px)`, imageRendering: "pixelated", position: "relative", filter: `drop-shadow(0 ${scale}px 0 rgba(0,0,0,0.5))` }}>
        {rows.flatMap((row, y) => row.split("").map((ch, x) => (
          <div key={`${x}-${y}`} style={{ background: ch === " " ? "transparent" : c[ch] }} />
        )))}
      </div>
    </div>
  );
}

function PixelChest({ scale = 3 }) {
  const c = { o: "#0a0e08", w: "#8a5828", W: "#6a3818", h: "#c08c48", g: "#d4a838", y: "#ffe070" };
  const rows = [
    " ooooooo ",
    "ohhWhhWho",
    "oWwwwwwWo",
    "ohWhhWhho",
    " oooooo  ",
    "oWwwgwwWo",
    "oWwwywwWo",
    "oWwwgwwWo",
    " ooooooo ",
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(9, ${scale}px)`, gridTemplateRows: `repeat(9, ${scale}px)`, imageRendering: "pixelated", filter: `drop-shadow(0 ${scale}px 0 rgba(0,0,0,0.5))` }}>
      {rows.flatMap((row, y) => row.split("").map((ch, x) => (
        <div key={`${x}-${y}`} style={{ background: ch === " " ? "transparent" : c[ch] }} />
      )))}
    </div>
  );
}

// ─── Map data
const MAP = [
  ".WWWWW.",
  "WWWPWWW",
  "GGPPPGG",
  "GPPHPGG",
  "GPPPPGC",
  "GGGTGGG",
  ".GLGGG.",
];

const MAP_TILES = (() => {
  const out = [];
  for (let y = 0; y < MAP.length; y++) {
    for (let x = 0; x < MAP[y].length; x++) {
      const ch = MAP[y][x];
      if (ch === ".") continue;
      let terrain = "grass", height = 0;
      let hasHero = false, hasTree = false, hasCrystal = false, hasLamp = false, hasChest = false;
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

export function BattleMap() {
  return (
    <div className="bm-frame" style={{ position: "relative", width: "100%", borderRadius: 4, border: `1px solid ${stFt.panelBorderDk}` }}>
      {/* Stage holds the iso scene. On desktop fills bm-frame; on mobile its
          height comes from --bm-h while ACT/CT flow as siblings below it. */}
      <div className="bm-stage" style={{
        position: "relative",
        height: "var(--bm-h, 360px)",
        overflow: "hidden",
        borderRadius: 3,
        boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, #1a2548 0%, #2a3068 35%, #4a3868 65%, #6a4868 85%, ${stFt.bg} 100%)` }} />
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 379) % 100;
          const y = ((i * 217) % 30);
          const sz = i % 6 === 0 ? 2 : 1;
          return <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: sz, height: sz, background: "#e8f0ff", opacity: 0.45 + (i % 3) * 0.18 }} />;
        })}
        <svg viewBox="0 0 100 18" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, top: "30%", height: 56, width: "100%" }} shapeRendering="crispEdges">
          <polygon points="0,18 0,10 6,6 12,11 20,4 28,9 36,3 44,8 52,2 60,7 68,5 76,9 84,4 92,8 100,5 100,18" fill="#1a2244" />
          <polygon points="0,18 0,14 8,11 16,13 24,9 32,12 40,8 48,11 56,7 64,11 72,9 80,12 88,8 96,11 100,9 100,18" fill="#0e1530" />
        </svg>

        <div className="bm-iso-layer" style={{ position: "absolute", left: 0, right: 0, top: 80, bottom: 0, transformOrigin: "50% 0" }}>
          {MAP_TILES.map((t, i) => (
            <IsoTile key={i} x={t.x} y={t.y} terrain={t.terrain} height={t.height} variant={t.variant}>
              {t.hasHero && (
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "50%", top: -16, transform: "translateX(-50%)", fontFamily: stFt.pixel, fontSize: 13, color: stFt.accent, textShadow: `0 0 8px ${stFt.accent}, 1px 1px 0 #000`, animation: "ft-bob 0.8s ease-in-out infinite" }}>▼</div>
                  <FFTCharacter />
                </div>
              )}
              {t.hasTree && <PixelTree scale={3} />}
              {t.hasCrystal && <PixelCrystal scale={3} />}
              {t.hasLamp && <PixelLamp scale={3} />}
              {t.hasChest && <PixelChest scale={3} />}
            </IsoTile>
          ))}
        </div>
      </div>

      {/* Floating ACT menu — absolute over stage on desktop, stacked below on mobile */}
      <div className="bm-act" style={{ position: "absolute", left: 20, bottom: 14, zIndex: 20, width: 200 }}>
        <FFTPanel>
          <div style={{ fontFamily: stFt.serif, fontSize: 14, fontWeight: 600, color: stFt.panelFg, letterSpacing: 2, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: stFt.gold, fontSize: 10 }}>◆</span>
            <span>Act</span>
          </div>
          {[
            ["About", "→ profile"],
            ["Work", "→ inventory"],
            ["Now", "→ status"],
            ["Contact", "→ talk"],
          ].map(([k, v]) => (
            <FFTMenuItem key={k} badge={v}>{k}</FFTMenuItem>
          ))}
        </FFTPanel>
      </div>

      {/* Floating CT panel — absolute over stage on desktop, stacked below on mobile */}
      <div className="bm-ct" style={{ position: "absolute", right: 20, top: 14, zIndex: 20, width: 184 }}>
        <FFTPanel>
          <div style={{ fontFamily: stFt.serif, fontSize: 14, fontWeight: 600, color: stFt.panelFg, letterSpacing: 2, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: stFt.gold, fontSize: 10 }}>◆</span>
            <span>CT</span>
          </div>
          <div style={{ display: "grid", gap: 5, fontFamily: stFt.mono, fontSize: 12 }}>
            {[["Brave", 70], ["Faith", 52], ["Speed", 14], ["Move", 4]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ color: stFt.panelAccent, fontFamily: stFt.serif, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
                <span style={{ fontVariantNumeric: "tabular-nums", color: stFt.panelFg, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </FFTPanel>
      </div>
    </div>
  );
}
