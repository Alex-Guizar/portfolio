import React from 'react';
import { Link } from 'react-router-dom';
import { stFt, StatLine, FFTPanel, FFTMenuItem, UtilityBar, SectionPlain, FFTCharacter } from '../components/FFTChrome';
import { IdleAvatar, PixelSprite } from '../components/PixelSprite';
import { BattleMap } from '../components/BattleMap';
import { PROFILE } from '../data/profile';

const STORAGE_KEY = "alex-profile-mode";

function TacticsGame({ onTogglePlain }) {
  return (
    <div className="min-h-screen font-mono" style={{ background: stFt.bg, color: stFt.fg }}>
      <style>{`
        @keyframes ft-bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(4px)} }
        @keyframes ft-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ft-crystal { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      `}</style>

      <div className="pt-8 px-10 container-max mx-auto box-border">
      <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
      <div className="grid grid-cols-[1fr_auto] gap-8 items-end mb-7">
          <div>
            <h1 style={{ fontFamily: stFt.mono, fontSize: 56, fontWeight: 800, margin: 0, letterSpacing: -1.5, color: stFt.fg, lineHeight: 1 }}>{PROFILE.name}</h1>
            <div style={{ fontFamily: stFt.mono, fontSize: 18, color: stFt.fgSoft, marginTop: 8 }}>{PROFILE.role} · {PROFILE.location}</div>
            <p style={{ fontFamily: stFt.mono, fontSize: 14, color: stFt.fgSoft, lineHeight: 1.7, maxWidth: 620, marginTop: 16, marginBottom: 0 }}>{PROFILE.blurb}</p>
          </div>
          <div style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent, letterSpacing: 2, textShadow: "1px 1px 0 #000", whiteSpace: "nowrap" }}>
            ━ UNIT DEPLOYED ━
          </div>
        </div>
      </div>

      <div className="px-10 container-max mx-auto box-border">
        <BattleMap />
      </div>

      <div className="pt-8 px-10 pb-14 container-max mx-auto box-border">

        <div className="grid lg:grid-cols-[320px_1fr] grid-cols-1 gap-4 mb-4">
          <FFTPanel title="UNIT" cornerStat={`LV. ${new Date().getFullYear() - 2015}`}>
            <div className="flex gap-3 mb-3">
              <div style={{ background: stFt.panelOuter, border: `1px solid ${stFt.panelBorderDk}`, padding: 4, boxShadow: `inset 0 0 0 1px ${stFt.panelInnerHi2}` }}>
                <FFTCharacter scale={1.5} />
              </div>
              <div className="flex-1 text-sm">
                <div style={{ fontFamily: stFt.pixel, fontSize: 10, color: stFt.accent, marginBottom: 6, letterSpacing: 1 }}>{PROFILE.name.toUpperCase()}</div>
                <div style={{ marginBottom: 6 }}><span style={{ color: stFt.fgSoft }}>CLASS</span> <span style={{ color: stFt.fg }}>FULL-STACK</span></div>
                <div style={{ marginBottom: 6 }}><span style={{ color: stFt.fgSoft }}>SIGN</span> <span style={{ color: stFt.fg }}>{PROFILE.location}</span></div>
                <div><span style={{ color: stFt.fgSoft }}>EXP</span> <span style={{ color: stFt.fg }}>{(new Date().getFullYear() - 2015)}y</span></div>
              </div>
            </div>
            <div className="grid gap-1 pt-2" style={{ borderTop: `1px solid ${stFt.panelInnerHi2}40` }}>
              <StatLine label="BUILD"  value={920} max={999} color={stFt.hpGreen} />
              <StatLine label="SHIP"   value={870} max={999} color={stFt.hpGreen} />
              <StatLine label="DEBUG"  value={950} max={999} color={stFt.mpBlue} />
              <StatLine label="DESIGN" value={680} max={999} color={stFt.ctYellow} />
            </div>
          </FFTPanel>

          <FFTPanel title="DESCRIPTION">
            {PROFILE.longBlurb.map((b, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: stFt.fgSoft, margin: "0 0 12px", textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>
                <span style={{ color: stFt.accent, fontFamily: stFt.pixel, fontSize: 10, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                {b}
              </p>
            ))}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${stFt.panelInnerHi2}40`, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PROFILE.links.map((l) => (
                <a key={l.label} href={l.href} style={{
                  fontFamily: stFt.mono, fontSize: 11, color: stFt.fg, textDecoration: "none",
                  padding: "5px 12px",
                  background: `linear-gradient(180deg, ${stFt.panelTop} 0%, ${stFt.panelMid} 100%)`,
                  border: `1px solid ${stFt.panelInnerHi2}`,
                  boxShadow: `inset 0 1px 0 ${stFt.panelInnerHi}60`,
                  textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
                }}>{l.label} ↗</a>
              ))}
            </div>
          </FFTPanel>
        </div>

        <FFTPanel title={`INVENTORY · ${PROFILE.work.length} ITEMS DEPLOYED`} cornerStat="◆ ◆ ◆" style={{ marginBottom: 16 }}>
          <div>
              {PROFILE.work.map((w) => (
              <FFTMenuItem key={w.id} badge={w.year} to={`/project/${w.id}`}>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
                  <PixelSprite name="floppy" scale={3} />
                  <div>
                    <div className="font-semibold" style={{ color: stFt.fg, marginBottom: 2 }}>{w.title}</div>
                    <div className="text-xs" style={{ color: stFt.fgSoft, marginBottom: 3 }}>{w.blurb}</div>
                    <div className="text-[9px]" style={{ color: stFt.accent, fontFamily: stFt.pixel, letterSpacing: 1 }}>{w.stack}</div>
                  </div>
                  {w.status && (
                    <span style={{ fontFamily: stFt.pixel, fontSize: 7, color: w.status === "LIVE" ? stFt.hpGreen : w.status === "ARCHIVED" ? stFt.dim : stFt.ctYellow, letterSpacing: 1, padding: "3px 6px", border: `1px solid currentColor` }}>
                      ● {w.status}
                    </span>
                  )}
                </div>
              </FFTMenuItem>
            ))}
          </div>
        </FFTPanel>

        <FFTPanel title="BATTLE LOG · CAREER" style={{ marginBottom: 16 }}>
          <div className="relative pl-5">
            <div className="absolute left-[6px] top-[4px] bottom-[4px] w-[2px]" style={{ background: stFt.accent, boxShadow: `0 0 4px ${stFt.accent}` }} />
            {PROFILE.experience.map((e) => (
              <div key={e.id} className="relative py-2 border-b" style={{ borderBottom: `1px dashed ${stFt.panelInnerHi2}30` }}>
                <span className="absolute left-[-20px] top-4 w-2 h-2 rotate-45" style={{ background: stFt.accent, boxShadow: `0 0 6px ${stFt.accent}` }} />
                <div className="grid grid-cols-[160px_1fr_1fr] gap-4 text-sm">
                  <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent, letterSpacing: 1 }}>{e.range}</span>
                  <span style={{ color: stFt.fg, fontWeight: 600 }}>{e.co}</span>
                  <span style={{ color: stFt.fgSoft }}>{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </FFTPanel>

        <FFTPanel title="STATUS · CURRENTLY" style={{ marginBottom: 16 }}>
          <div className="grid grid-cols-2 gap-2">
            {PROFILE.now.map((n, i) => (
              <div key={i} className="flex gap-2 p-2" style={{ background: `linear-gradient(180deg, ${stFt.panelMid}40 0%, transparent 100%)`, border: `1px solid ${stFt.panelInnerHi2}40` }}>
                <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 12, color: stFt.fg, textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>{n}</span>
              </div>
            ))}
          </div>
        </FFTPanel>

        <div className="text-center mt-6" style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.dim, letterSpacing: 2 }}>
          <span style={{ color: stFt.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${stFt.accent}` }}>●</span>
          &nbsp;&nbsp;SAVE GAME &nbsp;·&nbsp; {PROFILE.name.toUpperCase()} &nbsp;·&nbsp; {new Date().getFullYear()}&nbsp;&nbsp;
          <span style={{ color: stFt.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${stFt.accent}` }}>●</span>
        </div>
      </div>
    </div>
  );
}

function TacticsPlain({ onTogglePlain }) {
  return (
    <div className="min-h-screen font-mono" style={{ background: stFt.bg, color: stFt.fgPlain }}>
      <div className="pt-10 px-14 pb-16 max-w-[880px] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        <div className="flex justify-between items-end gap-6 pb-8 border-b mb-10" style={{ borderBottom: `1px solid ${stFt.line}` }}>
          <div>
            <h1 style={{ fontFamily: stFt.mono, fontSize: 56, fontWeight: 700, margin: 0, letterSpacing: -1.5, color: stFt.fgPlain, lineHeight: 1 }}>{PROFILE.name}</h1>
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
              <Link key={w.id} to={`/project/${w.id}`} style={{
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
                <span style={{ fontSize: 12, color: stFt.dimPlain, textAlign: "right" }}>view →</span>
              </Link>
            ))}
          </div>
        </SectionPlain>

        <SectionPlain title="Experience">
          {PROFILE.experience.map((e) => (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 24, padding: "12px 0", borderBottom: `1px solid ${stFt.line}`, fontSize: 14 }}>
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

export function HomePage({ onNavigateToProject }) {
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
