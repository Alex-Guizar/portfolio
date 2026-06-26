import React from 'react';
import { Link } from 'react-router-dom';
import { stFt, StatLine, FFTPanel, FFTMenuItem, UtilityBar, SectionPlain, FFTCharacter } from '../components/FFTChrome';
import { IdleAvatar, PixelSprite } from '../components/PixelSprite';
import { BattleMap } from '../components/BattleMap';
import { PROFILE } from '../data/profile';

const STORAGE_KEY = "alex-profile-mode";

interface TogglePlainProps {
  onTogglePlain: () => void;
}

interface HomePageProps {
  onNavigateToProject?: () => void;
}

function TacticsGame({ onTogglePlain }: TogglePlainProps) {
  return (
    <div style={{ background: stFt.bg, color: stFt.fg, fontFamily: stFt.mono, minHeight: "100%" }}>
      <style>{`
        @keyframes ft-bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(4px)} }
        @keyframes ft-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ft-crystal { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      `}</style>

      {/* HERO */}
      <div className="fft-page" style={{ padding: "32px 40px 0", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
        <div className="fft-grid-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "end", marginBottom: 28 }}>
          <div>
            <h1 className="fft-hero-name" style={{ fontFamily: stFt.mono, fontSize: 56, fontWeight: 800, margin: 0, letterSpacing: -1.5, color: stFt.fg, lineHeight: 1 }}>{PROFILE.name}</h1>
            <div className="fft-hero-role" style={{ fontFamily: stFt.mono, fontSize: 18, color: stFt.fgSoft, marginTop: 8 }}>{PROFILE.role} · {PROFILE.location}</div>
            <p className="fft-hero-blurb" style={{ fontFamily: stFt.mono, fontSize: 14, color: stFt.fgSoft, lineHeight: 1.7, maxWidth: 620, marginTop: 16, marginBottom: 0 }}>{PROFILE.blurb}</p>
          </div>
          <div className="fft-unit-deployed" style={{ fontFamily: stFt.serif, fontSize: 13, fontWeight: 600, color: stFt.accent, letterSpacing: 4, textShadow: `0 0 8px ${stFt.accent}40, 1px 1px 0 #000`, whiteSpace: "nowrap", textTransform: "uppercase" }}>
            ━ Unit Deployed ━
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="fft-page" style={{ padding: "0 40px", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <BattleMap />
      </div>

      {/* CONTENT */}
      <div className="fft-page" style={{ padding: "32px 40px 56px", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>

        {/* UNIT + DESCRIPTION row */}
        <div className="fft-grid-2col" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, marginBottom: 16 }}>
          <FFTPanel title="Unit" cornerStat={`LV. ${new Date().getFullYear() - 2015}`}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ background: stFt.bg, border: `1px solid ${stFt.panelBorderDk}`, padding: 4, boxShadow: `inset 0 0 0 1px ${stFt.gold}` }}>
                <FFTCharacter />
              </div>
              <div style={{ flex: 1, fontSize: 11 }}>
                <div style={{ fontFamily: stFt.serif, fontSize: 15, fontWeight: 600, color: stFt.panelAccent, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>{PROFILE.name}</div>
                <div style={{ marginBottom: 6 }}><span style={{ color: stFt.panelDim }}>Class</span> <span style={{ color: stFt.panelFg, fontWeight: 600 }}>Full-Stack</span></div>
                <div style={{ marginBottom: 6 }}><span style={{ color: stFt.panelDim }}>Region</span> <span style={{ color: stFt.panelFg, fontWeight: 600 }}>{PROFILE.location}</span></div>
                <div><span style={{ color: stFt.panelDim }}>EXP</span> <span style={{ color: stFt.panelFg, fontWeight: 600 }}>{(new Date().getFullYear() - 2015)}y</span></div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 4, paddingTop: 8, borderTop: `1px solid ${stFt.panelInnerHi2}` }}>
              <StatLine label="BUILD"  value={920} max={999} color={stFt.hpGreen} />
              <StatLine label="SHIP"   value={870} max={999} color={stFt.hpGreen} />
              <StatLine label="DEBUG"  value={950} max={999} color={stFt.mpBlue} />
              <StatLine label="DESIGN" value={680} max={999} color={stFt.ctYellow} />
            </div>
          </FFTPanel>

          <FFTPanel title="Description">
            {PROFILE.longBlurb.map((b, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: stFt.panelFgSoft, margin: "0 0 12px" }}>
                <span style={{ color: stFt.panelAccent, fontFamily: stFt.serif, fontSize: 14, fontWeight: 600, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                {b}
              </p>
            ))}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${stFt.panelInnerHi2}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PROFILE.links.map((l) => (
                <a key={l.label} href={l.href} style={{
                  fontFamily: stFt.serif, fontSize: 12, fontWeight: 600, color: stFt.panelFg, textDecoration: "none",
                  padding: "6px 12px",
                  background: `linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelHeader} 100%)`,
                  border: `1px solid ${stFt.panelBorderMd}`,
                  borderRadius: 3,
                  boxShadow: `inset 0 1px 0 ${stFt.panelInnerHi}, 0 1px 0 rgba(90,48,24,0.2)`,
                  letterSpacing: 0.5,
                  transition: "all .15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = stFt.gold; e.currentTarget.style.color = stFt.panelAccent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = stFt.panelBorderMd; e.currentTarget.style.color = stFt.panelFg; }}
                >{l.label} <span style={{ color: stFt.gold }}>↗</span></a>
              ))}
            </div>
          </FFTPanel>
        </div>

        {/* INVENTORY */}
        <FFTPanel title={`Inventory · ${PROFILE.work.length} Items Deployed`} cornerStat="◆ ◆ ◆" style={{ marginBottom: 16 }}>
          <div>
            {PROFILE.work.map((w) => (
              <FFTMenuItem key={w.id} badge={w.year} to={`/project/${w.id}`}>
                <div className="fft-grid-inv-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
                  <PixelSprite name="floppy" scale={3} />
                  <div>
                    <div style={{ fontWeight: 600, color: stFt.panelFg, marginBottom: 2 }}>{w.title}</div>
                    <div style={{ fontSize: 11, color: stFt.panelFgSoft, marginBottom: 3 }}>{w.blurb}</div>
                    <div style={{ fontSize: 10, color: stFt.panelAccent, fontFamily: stFt.mono, letterSpacing: 0.5 }}>{w.stack}</div>
                  </div>
                  {w.status && (
                    <span className="fft-status-pill" style={{ fontFamily: stFt.serif, fontSize: 10, fontWeight: 600, color: w.status === "LIVE" ? "#3a7a18" : w.status === "ARCHIVED" ? stFt.panelDim : "#8a5e0a", letterSpacing: 1.5, padding: "3px 8px", border: `1px solid currentColor`, borderRadius: 99, textTransform: "uppercase" }}>
                      ● {w.status}
                    </span>
                  )}
                </div>
              </FFTMenuItem>
            ))}
          </div>
        </FFTPanel>

        {/* BATTLE LOG */}
        <FFTPanel title="Battle Log · Career" style={{ marginBottom: 16 }}>
          <div style={{ position: "relative", paddingLeft: 22 }}>
            <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: stFt.gold, boxShadow: `0 0 4px ${stFt.gold}80` }} />
            {PROFILE.experience.map((e) => (
              <div key={e.id} style={{ position: "relative", padding: "10px 0", borderBottom: `1px dashed ${stFt.panelInnerHi2}` }}>
                <span style={{ position: "absolute", left: -20, top: 16, width: 8, height: 8, background: stFt.gold, boxShadow: `0 0 6px ${stFt.gold}`, transform: "rotate(45deg)" }} />
                <div className="fft-grid-bm-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 16, fontSize: 12 }}>
                  <span style={{ fontFamily: stFt.serif, fontSize: 12, fontWeight: 600, color: stFt.panelAccent, letterSpacing: 1, textTransform: "uppercase" }}>{e.range}</span>
                  <span style={{ color: stFt.panelFg, fontWeight: 600 }}>{e.co}</span>
                  <span style={{ color: stFt.panelFgSoft }}>{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </FFTPanel>

        {/* STATUS */}
        <FFTPanel title="Status · Currently" style={{ marginBottom: 16 }}>
          <div className="fft-grid-status" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {PROFILE.now.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: `linear-gradient(180deg, ${stFt.panelTop} 0%, transparent 100%)`, border: `1px solid ${stFt.panelInnerHi2}`, borderRadius: 3 }}>
                <span style={{ fontFamily: stFt.serif, fontSize: 13, fontWeight: 600, color: stFt.panelAccent, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 13, color: stFt.panelFg, lineHeight: 1.5 }}>{n}</span>
              </div>
            ))}
          </div>
        </FFTPanel>

        <div style={{ textAlign: "center", fontFamily: stFt.serif, fontSize: 11, fontWeight: 500, color: stFt.dim, letterSpacing: 3, marginTop: 24, textTransform: "uppercase" }}>
          <span style={{ color: stFt.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${stFt.accent}` }}>●</span>
          &nbsp;&nbsp;Save Game &nbsp;·&nbsp; {PROFILE.name} &nbsp;·&nbsp; {new Date().getFullYear()}&nbsp;&nbsp;
          <span style={{ color: stFt.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${stFt.accent}` }}>●</span>
        </div>
      </div>
    </div>
  );
}

function TacticsPlain({ onTogglePlain }: TogglePlainProps) {
  return (
    <div style={{ background: stFt.bg, color: stFt.fgPlain, fontFamily: stFt.mono, minHeight: "100%" }}>
      <div className="plain-page" style={{ padding: "40px 56px 64px", maxWidth: 880, margin: "0 auto", boxSizing: "border-box" }}>
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        <div className="plain-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end", paddingBottom: 32, borderBottom: `1px solid ${stFt.line}`, marginBottom: 40 }}>
          <div>
            <h1 className="fft-hero-name" style={{ fontFamily: stFt.mono, fontSize: 56, fontWeight: 700, margin: 0, letterSpacing: -1.5, color: stFt.fgPlain, lineHeight: 1 }}>{PROFILE.name}</h1>
            <div style={{ fontSize: 18, color: stFt.fgPlainSoft, marginTop: 8 }}>{PROFILE.role} · {PROFILE.location}</div>
            <p style={{ fontSize: 15, color: stFt.fgPlainSoft, lineHeight: 1.7, maxWidth: 620, marginTop: 18, marginBottom: 0 }}>{PROFILE.blurb}</p>
          </div>
          <img src="assets/character.png" width={66} height={117} style={{ imageRendering: "pixelated", opacity: 0.85 }} alt="" />
        </div>

        <SectionPlain title="About">
          {PROFILE.longBlurb.map((b, i) => <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: stFt.fgPlainSoft, margin: "0 0 14px" }}>{b}</p>)}
        </SectionPlain>

        <SectionPlain title="Selected Work">
          <div>
            {PROFILE.work.map((w, i) => (
              <Link key={w.id} to={`/project/${w.id}`} className="plain-work-row" style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 100px",
                gap: 20,
                padding: "18px 0",
                borderBottom: `1px solid ${stFt.line}`,
                textDecoration: "none",
                color: stFt.fgPlain,
                alignItems: "center",
              }}>
                <span style={{ fontFamily: stFt.mono, fontSize: 12, color: stFt.dimPlain, width: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{w.title}</span>
                    <span style={{ fontSize: 12, color: stFt.dimPlain }}>{w.year}</span>
                    {w.status && <span style={{ fontSize: 10, color: w.status === "LIVE" ? stFt.hpGreen : stFt.dimPlain, padding: "1px 6px", border: `1px solid currentColor`, borderRadius: 99 }}>{w.status}</span>}
                  </div>
                  <div style={{ fontSize: 13, color: stFt.fgPlainSoft, marginBottom: 6 }}>{w.blurb}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {w.stack.split(" · ").map((s) => (
                      <span key={s} style={{ fontSize: 10, color: stFt.fgPlainSoft, padding: "2px 8px", border: `1px solid ${stFt.line}`, borderRadius: 99 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <span className="plain-view-arrow" style={{ fontSize: 12, color: stFt.dimPlain, textAlign: "right" }}>view →</span>
              </Link>
            ))}
          </div>
        </SectionPlain>

        <SectionPlain title="Experience">
          {PROFILE.experience.map((e) => (
            <div key={e.id} className="plain-exp-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 24, padding: "12px 0", borderBottom: `1px solid ${stFt.line}`, fontSize: 14 }}>
              <span style={{ color: stFt.dimPlain }}>{e.range}</span>
              <span style={{ color: stFt.fgPlain, fontWeight: 600 }}>{e.co}</span>
              <span style={{ color: stFt.fgPlainSoft }}>{e.role}</span>
            </div>
          ))}
        </SectionPlain>

        <SectionPlain title="Now" cornerNote={`Updated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
            {PROFILE.now.map((n, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: stFt.fgPlainSoft, lineHeight: 1.6 }}>
                <span style={{ color: stFt.accent, marginTop: 2 }}>◆</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </SectionPlain>

        <SectionPlain title="Contact">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {PROFILE.links.map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: stFt.fgPlain, textDecoration: "none", padding: "10px 16px", border: `1px solid ${stFt.line}`, background: stFt.bgPanel }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </SectionPlain>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${stFt.line}`, fontSize: 12, color: stFt.dimPlain, display: "flex", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button onClick={onTogglePlain} style={{ background: "transparent", border: "none", color: stFt.dimPlain, fontFamily: stFt.mono, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>
            ▶ Switch to full version
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomePage({ onNavigateToProject }: HomePageProps) {
  const [plain, setPlain] = React.useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "plain"; } catch { return false; }
  });

  const onToggle = React.useCallback(() => {
    setPlain((cur) => {
      const next = !cur;
      try { localStorage.setItem(STORAGE_KEY, next ? "plain" : "full"); } catch {}
      return next;
    });
  }, []);

  return plain
    ? <TacticsPlain onTogglePlain={onToggle} />
    : <TacticsGame onTogglePlain={onToggle} />;
}
