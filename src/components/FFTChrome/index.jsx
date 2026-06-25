import React from 'react';
import { Link } from 'react-router-dom';
import { stFt } from '../../styles/theme';
import { PROFILE } from '../../data/profile';

export { stFt };

export function FFTCharacter({ scale = 1, style }) {
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

export function FFTPanel({ children, style, title, cornerStat, inset = 18 }) {
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

export function StatLine({ label, value, max, color }) {
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

export function FFTMenuItem({ children, badge, selected, href, onClick }) {
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

export function UtilityBar({ onTogglePlain, plain }) {
  const email = PROFILE.links.find((l) => l.label === "email")?.href || "mailto:";
  const resume = PROFILE.links.find((l) => l.label === "resume")?.href || "#";
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
