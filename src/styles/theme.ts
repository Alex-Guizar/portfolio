// FFT-style theme — palette + shared UI primitives
// Ivalice Chronicles palette — parchment/cream menu chrome over dark game-world backdrop
export const stFt = {
  bg: "#06080e",
  bgPanel: "#0a0e18",

  // Terrain palettes (native pixel units inside SVG)
  grass: { top: "#5a8a3a", topHi: "#7ab050", topDk: "#3a5a20", topAccent: "#9ad068", sideL: "#2a4a18", sideR: "#142a0a" },
  stone: { top: "#8c94a0", topHi: "#b0b8c0", topDk: "#5a626c", topAccent: "#d0d8e0", sideL: "#4a525c", sideR: "#2a3038" },
  path:  { top: "#a08868", topHi: "#c0a888", topDk: "#705840", topAccent: "#d8b890", sideL: "#604830", sideR: "#382818" },
  water: { top: "#3a78a8", topHi: "#5a98c8", topDk: "#1a4878", topAccent: "#8ab8e0", sideL: "#1a3858", sideR: "#0a2040" },

  // FFT · Ivalice Chronicles palette — parchment / cream menu chrome over a
  // dark game-world backdrop. Panel interiors are warm cream; titles + body
  // text are dark brown; gold ornament accents.
  panelOuter:     "#3a2010",            // dark brown outer drop shadow
  panelBorderDk:  "#5a3018",            // dark brown outer border
  panelBorderMd:  "#8a5c2a",            // gold-brown mid-band border
  panelTop:       "#fbf3da",            // top of cream gradient (lit)
  panelMid:       "#f0e3c0",            // mid cream (main panel)
  panelBot:       "#e2cf99",            // bottom of cream gradient (shadow)
  panelInnerHi:   "#fff9e4",            // inner top highlight
  panelInnerHi2:  "#c8a868",            // gold divider color
  panelHeader:    "#e8d9b0",            // darker cream header band
  panelHover:     "#f7eccd",            // hover highlight on cream

  // Text colors INSIDE parchment panels
  panelFg:        "#2a1a08",            // near-black brown (titles + body)
  panelFgSoft:    "#5a3a1c",            // medium brown (secondary)
  panelDim:       "#8a6e4a",            // muted brown (tertiary)
  panelAccent:    "#8a3018",            // dark muted red (category labels)
  panelAccentDp:  "#5a1808",            // even deeper red (rare accent)

  // Gold ornaments
  gold:           "#c89030",
  goldDk:         "#8a5e1c",
  goldHi:         "#e8b860",

  // Hero text (OUTSIDE panels, on dark page bg)
  accent:         "#d4b574",            // parchment gold for dark-bg headings
  accentHi:       "#e8d4a0",
  accentDeep:     "#8a6e3a",
  fg:             "#f0ede4",            // off-white for dark page bg
  fgSoft:         "#c8c4b8",
  fgPlain:        "#e8e6df",
  fgPlainSoft:    "#a8b0bd",
  dim:            "#6a7088",
  dimPlain:       "#6b7280",
  line:           "#1d232e",

  // Stat-bar fills
  hpGreen:        "#5fa83a",
  mpBlue:         "#3a78c8",
  ctYellow:       "#c89030",

  mono:   '"JetBrains Mono", ui-monospace, Menlo, monospace',
  pixel:  '"Press Start 2P", monospace',
  serif:  '"Cinzel", "Cormorant Garamond", Georgia, serif',
  body:   '"Cormorant Garamond", Georgia, serif',
};
