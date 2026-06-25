// FFT-style chrome — palette + shared UI primitives.
// Loaded before site.jsx and project.jsx; everything is exposed on window
// so both consumer scripts can pick up the same components.

const stFt = {
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

// ─── Character sprite (user's image) ────────────────────────────────────────

function FFTCharacter({ scale = 2, style }) {
  return (
    <img
      src="assets/character.png"
      width={44 * scale}
      height={78 * scale}
      alt="character"
      style={{
        imageRendering: "pixelated",
        filter: `drop-shadow(0 ${scale * 2}px 0 rgba(0,0,0,0.55))`,
        display: "block",
        ...style,
      }}
    />
  );
}

// ─── FFT panel (the iconic blue gradient box) ───────────────────────────────

// Ivalice Chronicles chrome — parchment/cream panel on dark page bg.
// Cream interior with subtle warm gradient, gold inner divider under the
// title, dark-brown serif title with small gold ornaments on each side.
function FFTPanel({ children, style, title, cornerStat, inset = 18 }) {
  return (
    <div style={{
      background: stFt.panelBorderDk,
      padding: 1,
      borderRadius: 4,
      boxShadow: `
        0 8px 0 rgba(0,0,0,0.55),
        0 0 0 1px ${stFt.panelOuter},
        0 0 28px rgba(0,0,0,0.4)
      `,
      ...style,
    }}>
      <div style={{
        background: `
          linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelMid} 30%, ${stFt.panelMid} 75%, ${stFt.panelBot} 100%)
        `,
        border: `1px solid ${stFt.panelBorderMd}`,
        borderRadius: 3,
        boxShadow: `
          inset 0 1px 0 ${stFt.panelInnerHi},
          inset 0 -1px 0 rgba(90,48,24,0.3)
        `,
        padding: inset,
        position: "relative",
        color: stFt.panelFg,
      }}>
        {title && (
          <div style={{
            paddingBottom: 12,
            marginBottom: 16,
            borderBottom: `1px solid ${stFt.panelInnerHi2}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              fontFamily: stFt.serif,
              fontSize: 18,
              fontWeight: 600,
              color: stFt.panelFg,
              letterSpacing: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <span style={{ color: stFt.gold, fontSize: 12 }}>◆</span>
              <span>{title}</span>
              <span style={{ color: stFt.gold, fontSize: 12 }}>◆</span>
            </div>
            {cornerStat && (
              <span style={{
                fontFamily: stFt.mono,
                fontSize: 11,
                color: stFt.panelDim,
                letterSpacing: 1,
              }}>{cornerStat}</span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function StatLine({ label, value, max, color }) {
  const pct = Math.min(1, value / max);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 72px", gap: 10, alignItems: "center", fontFamily: stFt.mono, fontSize: 11, padding: "3px 0" }}>
      <span style={{ fontFamily: stFt.serif, fontSize: 11, fontWeight: 600, color: stFt.panelAccent, letterSpacing: 1.5 }}>{label}</span>
      <div style={{ height: 9, background: stFt.panelBot, border: `1px solid ${stFt.panelBorderMd}`, borderRadius: 1, boxShadow: "inset 0 1px 0 rgba(90,48,24,0.18)" }}>
        <div style={{ height: "100%", width: `${pct * 100}%`, background: `linear-gradient(180deg, ${color} 0%, ${color}cc 100%)`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4)` }} />
      </div>
      <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: stFt.panelFg, fontWeight: 600 }}>
        {value}<span style={{ color: stFt.panelDim, fontWeight: 400 }}>/{max}</span>
      </span>
    </div>
  );
}

function FFTMenuItem({ children, badge, selected, href, onClick }) {
  const [hover, setHover] = React.useState(false);
  const active = hover || selected;
  return (
    <a href={href || "#"} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid",
      gridTemplateColumns: "22px 1fr auto",
      gap: 10,
      padding: "10px 8px",
      textDecoration: "none",
      color: stFt.panelFg,
      background: active ? stFt.panelHover : "transparent",
      borderLeft: active ? `2px solid ${stFt.gold}` : `2px solid transparent`,
      borderBottom: `1px solid ${stFt.panelInnerHi2}50`,
      borderRadius: 2,
      fontFamily: stFt.mono,
      fontSize: 13,
      transition: "all .15s",
    }}>
      <span style={{
        fontFamily: stFt.serif,
        fontSize: 14,
        fontWeight: 600,
        color: active ? stFt.gold : "transparent",
        transition: "all .15s",
      }}>▸</span>
      {typeof children === "string" ? <span>{children}</span> : children}
      {badge && <span style={{
        fontFamily: stFt.mono,
        fontSize: 10,
        color: stFt.panelDim,
        letterSpacing: 1,
      }}>{badge}</span>}
    </a>
  );
}

// ─── Buttons ────────────────────────────────────────────────────────────────

function btnStyle(primary) {
  return {
    fontFamily: stFt.mono,
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 14px",
    textDecoration: "none",
    color: primary ? stFt.bg : stFt.fg,
    background: primary ? stFt.accent : "transparent",
    border: `1px solid ${primary ? stFt.accent : stFt.line}`,
    borderRadius: 0,
    cursor: "pointer",
    transition: "all .12s",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  };
}

// Action button INSIDE a parchment panel — cream face, gold border, dark
// brown text. Tonally matches the FFT menu commands ("Equip", "Visit", etc.).
function fftButtonStyle(active) {
  return {
    fontFamily: stFt.serif,
    fontSize: 13,
    fontWeight: 600,
    color: stFt.panelFg,
    textDecoration: "none",
    padding: "8px 16px",
    background: `linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelHeader} 100%)`,
    border: `1px solid ${active ? stFt.gold : stFt.panelBorderMd}`,
    borderRadius: 3,
    boxShadow: `inset 0 1px 0 ${stFt.panelInnerHi}, 0 2px 0 rgba(90,48,24,0.25)`,
    cursor: "pointer",
    transition: "all .15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    letterSpacing: 0.5,
  };
}

// ─── Utility bar (top-right: Resume / Contact / Plain Mode toggle) ──────────

function UtilityBar({ onTogglePlain, plain }) {
  const p = window.PROFILE;
  const email = p.links.find((l) => l.label === "email")?.href || "mailto:";
  const resume = p.links.find((l) => l.label === "resume")?.href || "#";
  return (
    <div className="fft-utility-bar" style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 20, flexWrap: "wrap" }}>
      <a href={resume} style={btnStyle(true)}>
        <span style={{ fontFamily: stFt.pixel, fontSize: 8, color: stFt.bg }}>↓</span>
        Resume
      </a>
      <a href={email} style={btnStyle(false)}>Contact</a>
      <button onClick={onTogglePlain} style={{ ...btnStyle(false), cursor: "pointer" }}>
        {plain ? "▶ Full version" : "▶ Plain mode"}
      </button>
    </div>
  );
}

// ─── Plain-mode section header ──────────────────────────────────────────────

function SectionPlain({ title, cornerNote, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${stFt.line}` }}>
        <h2 style={{ fontFamily: stFt.mono, fontSize: 12, color: stFt.dimPlain, textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 500, margin: 0 }}>{title}</h2>
        {cornerNote && <span style={{ fontFamily: stFt.mono, fontSize: 11, color: stFt.dimPlain }}>{cornerNote}</span>}
      </div>
      {children}
    </section>
  );
}

Object.assign(window, {
  stFt,
  FFTCharacter, FFTPanel, StatLine, FFTMenuItem,
  btnStyle, fftButtonStyle,
  UtilityBar, SectionPlain,
});
