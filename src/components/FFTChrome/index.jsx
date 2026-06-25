import React from 'react';
import { Link } from 'react-router-dom';
import { stFt } from '../../styles/theme';
import { PROFILE } from '../../data/profile';

export { stFt };

export function FFTCharacter({ scale = 2, style }) {
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

export function FFTPanel({ children, style, title, cornerStat, inset = 14 }) {
  return (
    <div style={{
      background: stFt.panelOuter,
      padding: 2,
      boxShadow: "0 4px 0 rgba(0,0,0,0.5), 0 0 0 1px " + stFt.panelBorderDk,
      ...style,
    }}>
      <div style={{
        background: `linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelMid} 50%, ${stFt.panelBot} 100%)`,
        border: `1px solid ${stFt.panelInnerHi2}`,
        boxShadow: `inset 0 1px 0 ${stFt.panelInnerHi}80, inset 0 -2px 0 rgba(0,0,0,0.3)`,
        padding: inset,
        position: "relative",
        color: stFt.fg,
        textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
      }}>
        {title && (
          <div style={{
            fontFamily: stFt.pixel,
            fontSize: 9,
            color: stFt.accent,
            letterSpacing: 2,
            paddingBottom: 8,
            marginBottom: 10,
            borderBottom: `1px solid ${stFt.panelInnerHi2}80`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span>◆ {title}</span>
            {cornerStat && <span style={{ color: stFt.fgSoft, fontSize: 8 }}>{cornerStat}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function StatLine({ label, value, max, color }) {
  const pct = Math.min(1, value / max);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 70px", gap: 8, alignItems: "center", fontFamily: stFt.mono, fontSize: 11, padding: "2px 0" }}>
      <span style={{ fontFamily: stFt.pixel, fontSize: 8, color: stFt.accent, letterSpacing: 1 }}>{label}</span>
      <div style={{ height: 8, background: stFt.panelOuter, border: `1px solid ${stFt.panelBorderDk}` }}>
        <div style={{ height: "100%", width: `${pct * 100}%`, background: color, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4)` }} />
      </div>
      <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {value}<span style={{ color: stFt.fgSoft }}>/{max}</span>
      </span>
    </div>
  );
}

export function FFTMenuItem({ children, badge, selected, href, to, onClick }) {
  const [hover, setHover] = React.useState(false);
  const active = hover || selected;
  const sharedStyle = {
    display: "grid",
    gridTemplateColumns: "22px 1fr auto",
    gap: 10,
    padding: "8px 6px",
    textDecoration: "none",
    color: active ? stFt.accent : stFt.fg,
    background: active ? "rgba(255,224,122,0.08)" : "transparent",
    borderBottom: `1px solid ${stFt.panelInnerHi2}30`,
    fontFamily: stFt.mono,
    fontSize: 13,
    textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
    transition: "all .12s",
  };

  const content = (
    <>
      <span style={{ fontFamily: stFt.pixel, fontSize: 11, color: active ? stFt.accent : "transparent", textShadow: active ? `0 0 6px ${stFt.accent}` : "none" }}>▶</span>
      {typeof children === "string" ? <span>{children}</span> : children}
      {badge && <span style={{ fontFamily: stFt.pixel, fontSize: 8, color: stFt.fgSoft, letterSpacing: 1 }}>{badge}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={sharedStyle}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href || "#"} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={sharedStyle}>
      {content}
    </a>
  );
}

export function btnStyle(primary) {
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

export function fftButtonStyle(active) {
  return {
    fontFamily: stFt.mono,
    fontSize: 12,
    fontWeight: 600,
    color: active ? stFt.accent : stFt.fg,
    textDecoration: "none",
    padding: "8px 16px",
    background: `linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelMid} 100%)`,
    border: `1px solid ${active ? stFt.accent : stFt.panelInnerHi2}`,
    boxShadow: `inset 0 1px 0 ${stFt.panelInnerHi}60, 0 2px 0 rgba(0,0,0,0.4)`,
    textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
    cursor: "pointer",
    transition: "all .12s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
}

export function UtilityBar({ onTogglePlain, plain }) {
  const email = PROFILE.links.find((l) => l.label === "email")?.href || "mailto:";
  const resume = PROFILE.links.find((l) => l.label === "resume")?.href || "#";
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 20 }}>
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

export function SectionPlain({ title, cornerNote, children }) {
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
