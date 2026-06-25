// ─── Buttons ────────────────────────────────────────────────────────────────

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

// FFT-blue gradient button (used for primary CTAs inside panels)
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