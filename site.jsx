// Main site entry — assembles the Tactics + Plain views and handles routing.
// Depends on:
//   data.jsx       — window.PROFILE
//   pixel-art.jsx  — window.PixelSprite
//   fft-chrome.jsx — window.stFt + UI primitives
//   battle-map.jsx — window.BattleMap
//   project.jsx    — window.ProjectDetail

const {
  stFt: st,
  FFTPanel: FFTP, FFTMenuItem: FMI2, FFTCharacter: FFTC, StatLine: SL,
  btnStyle: btn, UtilityBar: UBar, SectionPlain: SPlain,
  BattleMap: BMap, ProjectDetail: PDetail,
  PixelSprite: PS,
} = window;

// ─── Hash routing ───────────────────────────────────────────────────────────

function useHashRoute() {
  const [hash, setHash] = React.useState(() => (typeof window !== "undefined" ? window.location.hash : ""));
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

function navigateBackHome() {
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  // smooth scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Tactics (game) view ────────────────────────────────────────────────────

function TacticsGame({ onTogglePlain }) {
  const p = window.PROFILE;
  return (
    <div style={{ background: st.bg, color: st.fg, fontFamily: st.mono, minHeight: "100%" }}>
      <style>{`
        @keyframes ft-bob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(4px)} }
        @keyframes ft-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ft-crystal { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      `}</style>

      {/* HERO */}
      <div className="fft-page" style={{ padding: "32px 40px 0", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <UBar onTogglePlain={onTogglePlain} plain={false} />
        <div className="fft-grid-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "end", marginBottom: 28 }}>
          <div>
            <h1 className="fft-hero-name" style={{ fontFamily: st.mono, fontSize: 56, fontWeight: 800, margin: 0, letterSpacing: -1.5, color: st.fg, lineHeight: 1 }}>{p.name}</h1>
            <div className="fft-hero-role" style={{ fontFamily: st.mono, fontSize: 18, color: st.fgSoft, marginTop: 8 }}>{p.role} · {p.location}</div>
            <p className="fft-hero-blurb" style={{ fontFamily: st.mono, fontSize: 14, color: st.fgSoft, lineHeight: 1.7, maxWidth: 620, marginTop: 16, marginBottom: 0 }}>{p.blurb}</p>
          </div>
          <div className="fft-unit-deployed" style={{ fontFamily: st.serif, fontSize: 13, fontWeight: 600, color: st.accent, letterSpacing: 4, textShadow: `0 0 8px ${st.accent}40, 1px 1px 0 #000`, whiteSpace: "nowrap", textTransform: "uppercase" }}>
            ━ Unit Deployed ━
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="fft-page" style={{ padding: "0 40px", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>
        <BMap />
      </div>

      {/* CONTENT */}
      <div className="fft-page" style={{ padding: "32px 40px 56px", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>

        {/* UNIT + DESCRIPTION row */}
        <div className="fft-grid-2col" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, marginBottom: 16 }}>
          <FFTP title="Unit" cornerStat={`LV. ${new Date().getFullYear() - 2015}`}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ background: st.bg, border: `1px solid ${st.panelBorderDk}`, padding: 4, boxShadow: `inset 0 0 0 1px ${st.gold}` }}>
                <FFTC scale={1.5} />
              </div>
              <div style={{ flex: 1, fontSize: 11 }}>
                <div style={{ fontFamily: st.serif, fontSize: 15, fontWeight: 600, color: st.panelAccent, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>{p.name}</div>
                <div style={{ marginBottom: 6 }}><span style={{ color: st.panelDim }}>Class</span> <span style={{ color: st.panelFg, fontWeight: 600 }}>Full-Stack</span></div>
                <div style={{ marginBottom: 6 }}><span style={{ color: st.panelDim }}>Region</span> <span style={{ color: st.panelFg, fontWeight: 600 }}>{p.location}</span></div>
                <div><span style={{ color: st.panelDim }}>EXP</span> <span style={{ color: st.panelFg, fontWeight: 600 }}>{(new Date().getFullYear() - 2015)}y</span></div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 4, paddingTop: 8, borderTop: `1px solid ${st.panelInnerHi2}` }}>
              <SL label="BUILD"  value={920} max={999} color={st.hpGreen} />
              <SL label="SHIP"   value={870} max={999} color={st.hpGreen} />
              <SL label="DEBUG"  value={950} max={999} color={st.mpBlue} />
              <SL label="DESIGN" value={680} max={999} color={st.ctYellow} />
            </div>
          </FFTP>

          <FFTP title="Description">
            {p.longBlurb.map((b, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: st.panelFgSoft, margin: "0 0 12px" }}>
                <span style={{ color: st.panelAccent, fontFamily: st.serif, fontSize: 14, fontWeight: 600, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                {b}
              </p>
            ))}
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${st.panelInnerHi2}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.links.map((l) => (
                <a key={l.label} href={l.href} style={{
                  fontFamily: st.serif, fontSize: 12, fontWeight: 600, color: st.panelFg, textDecoration: "none",
                  padding: "6px 12px",
                  background: `linear-gradient(180deg, ${st.panelTop} 0%, ${st.panelHeader} 100%)`,
                  border: `1px solid ${st.panelBorderMd}`,
                  borderRadius: 3,
                  boxShadow: `inset 0 1px 0 ${st.panelInnerHi}, 0 1px 0 rgba(90,48,24,0.2)`,
                  letterSpacing: 0.5,
                  transition: "all .15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = st.gold; e.currentTarget.style.color = st.panelAccent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = st.panelBorderMd; e.currentTarget.style.color = st.panelFg; }}
                >{l.label} <span style={{ color: st.gold }}>↗</span></a>
              ))}
            </div>
          </FFTP>
        </div>

        {/* INVENTORY */}
        <FFTP title={`Inventory · ${p.work.length} Items Deployed`} cornerStat="◆ ◆ ◆" style={{ marginBottom: 16 }}>
          <div>
            {p.work.map((w) => (
              <FMI2 key={w.id} badge={w.year} href={`#/project/${w.id}`}>
                <div className="fft-grid-inv-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
                  <PS name="floppy" scale={3} />
                  <div>
                    <div style={{ fontWeight: 600, color: st.panelFg, marginBottom: 2 }}>{w.title}</div>
                    <div style={{ fontSize: 11, color: st.panelFgSoft, marginBottom: 3 }}>{w.blurb}</div>
                    <div style={{ fontSize: 10, color: st.panelAccent, fontFamily: st.mono, letterSpacing: 0.5 }}>{w.stack}</div>
                  </div>
                  {w.status && (
                    <span className="fft-status-pill" style={{ fontFamily: st.serif, fontSize: 10, fontWeight: 600, color: w.status === "LIVE" ? "#3a7a18" : w.status === "ARCHIVED" ? st.panelDim : "#8a5e0a", letterSpacing: 1.5, padding: "3px 8px", border: `1px solid currentColor`, borderRadius: 99, textTransform: "uppercase" }}>
                      ● {w.status}
                    </span>
                  )}
                </div>
              </FMI2>
            ))}
          </div>
        </FFTP>

        {/* BATTLE LOG */}
        <FFTP title="Battle Log · Career" style={{ marginBottom: 16 }}>
          <div style={{ position: "relative", paddingLeft: 22 }}>
            <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: st.gold, boxShadow: `0 0 4px ${st.gold}80` }} />
            {p.experience.map((e) => (
              <div key={e.id} style={{ position: "relative", padding: "10px 0", borderBottom: `1px dashed ${st.panelInnerHi2}` }}>
                <span style={{ position: "absolute", left: -20, top: 16, width: 8, height: 8, background: st.gold, boxShadow: `0 0 6px ${st.gold}`, transform: "rotate(45deg)" }} />
                <div className="fft-grid-bm-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 16, fontSize: 12 }}>
                  <span style={{ fontFamily: st.serif, fontSize: 12, fontWeight: 600, color: st.panelAccent, letterSpacing: 1, textTransform: "uppercase" }}>{e.range}</span>
                  <span style={{ color: st.panelFg, fontWeight: 600 }}>{e.co}</span>
                  <span style={{ color: st.panelFgSoft }}>{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </FFTP>

        {/* STATUS */}
        <FFTP title="Status · Currently" style={{ marginBottom: 16 }}>
          <div className="fft-grid-status" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {p.now.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: `linear-gradient(180deg, ${st.panelTop} 0%, transparent 100%)`, border: `1px solid ${st.panelInnerHi2}`, borderRadius: 3 }}>
                <span style={{ fontFamily: st.serif, fontSize: 13, fontWeight: 600, color: st.panelAccent, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 13, color: st.panelFg, lineHeight: 1.5 }}>{n}</span>
              </div>
            ))}
          </div>
        </FFTP>

        <div style={{ textAlign: "center", fontFamily: st.serif, fontSize: 11, fontWeight: 500, color: st.dim, letterSpacing: 3, marginTop: 24, textTransform: "uppercase" }}>
          <span style={{ color: st.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${st.accent}` }}>●</span>
          &nbsp;&nbsp;Save Game &nbsp;·&nbsp; {p.name} &nbsp;·&nbsp; {new Date().getFullYear()}&nbsp;&nbsp;
          <span style={{ color: st.accent, animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px ${st.accent}` }}>●</span>
        </div>
      </div>
    </div>
  );
}

// ─── Plain mode (recruiter-friendly) ────────────────────────────────────────

function TacticsPlain({ onTogglePlain }) {
  const p = window.PROFILE;
  return (
    <div style={{ background: st.bg, color: st.fgPlain, fontFamily: st.mono, minHeight: "100%" }}>
      <div className="plain-page" style={{ padding: "40px 56px 64px", maxWidth: 880, margin: "0 auto", boxSizing: "border-box" }}>
        <UBar onTogglePlain={onTogglePlain} plain />

        <div className="plain-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end", paddingBottom: 32, borderBottom: `1px solid ${st.line}`, marginBottom: 40 }}>
          <div>
            <h1 className="fft-hero-name" style={{ fontFamily: st.mono, fontSize: 56, fontWeight: 700, margin: 0, letterSpacing: -1.5, color: st.fgPlain, lineHeight: 1 }}>{p.name}</h1>
            <div style={{ fontSize: 18, color: st.fgPlainSoft, marginTop: 8 }}>{p.role} · {p.location}</div>
            <p style={{ fontSize: 15, color: st.fgPlainSoft, lineHeight: 1.7, maxWidth: 620, marginTop: 18, marginBottom: 0 }}>{p.blurb}</p>
          </div>
          <img src="assets/character.png" width={66} height={117} style={{ imageRendering: "pixelated", opacity: 0.85 }} alt="" />
        </div>

        <SPlain title="About">
          {p.longBlurb.map((b, i) => <p key={i} style={{ fontSize: 15, lineHeight: 1.8, color: st.fgPlainSoft, margin: "0 0 14px" }}>{b}</p>)}
        </SPlain>

        <SPlain title="Selected Work">
          <div>
            {p.work.map((w, i) => (
              <a key={w.id} href={`#/project/${w.id}`} className="plain-work-row" style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 100px",
                gap: 20,
                padding: "18px 0",
                borderBottom: `1px solid ${st.line}`,
                textDecoration: "none",
                color: st.fgPlain,
                alignItems: "center",
              }}>
                <span style={{ fontFamily: st.mono, fontSize: 12, color: st.dimPlain, width: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{w.title}</span>
                    <span style={{ fontSize: 12, color: st.dimPlain }}>{w.year}</span>
                    {w.status && <span style={{ fontSize: 10, color: w.status === "LIVE" ? st.hpGreen : st.dimPlain, padding: "1px 6px", border: `1px solid currentColor`, borderRadius: 99 }}>{w.status}</span>}
                  </div>
                  <div style={{ fontSize: 13, color: st.fgPlainSoft, marginBottom: 6 }}>{w.blurb}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {w.stack.split(" · ").map((s) => (
                      <span key={s} style={{ fontSize: 10, color: st.fgPlainSoft, padding: "2px 8px", border: `1px solid ${st.line}`, borderRadius: 99 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <span className="plain-view-arrow" style={{ fontSize: 12, color: st.dimPlain, textAlign: "right" }}>view →</span>
              </a>
            ))}
          </div>
        </SPlain>

        <SPlain title="Experience">
          {p.experience.map((e) => (
            <div key={e.id} className="plain-exp-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 24, padding: "12px 0", borderBottom: `1px solid ${st.line}`, fontSize: 14 }}>
              <span style={{ color: st.dimPlain }}>{e.range}</span>
              <span style={{ color: st.fgPlain, fontWeight: 600 }}>{e.co}</span>
              <span style={{ color: st.fgPlainSoft }}>{e.role}</span>
            </div>
          ))}
        </SPlain>

        <SPlain title="Now" cornerNote={`Updated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
            {p.now.map((n, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, color: st.fgPlainSoft, lineHeight: 1.6 }}>
                <span style={{ color: st.accent, marginTop: 2 }}>◆</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </SPlain>

        <SPlain title="Contact">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {p.links.map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: st.fgPlain, textDecoration: "none", padding: "10px 16px", border: `1px solid ${st.line}`, background: st.bgPanel }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </SPlain>

        <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${st.line}`, fontSize: 12, color: st.dimPlain, display: "flex", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} {p.name}</span>
          <button onClick={onTogglePlain} style={{ background: "transparent", border: "none", color: st.dimPlain, fontFamily: st.mono, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>
            ▶ Switch to full version
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Top-level wrapper: handles routing + mode toggle ───────────────────────

const STORAGE_KEY = "alex-profile-mode";

function TacticsView() {
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

  const hash = useHashRoute();

  // Route: #/project/<id>
  const m = hash.match(/^#\/project\/(.+)$/);
  if (m) {
    const project = window.PROFILE.work.find((w) => w.id === m[1]);
    if (project) {
      return <PDetail project={project} onTogglePlain={onToggle} plain={plain} onBack={navigateBackHome} />;
    }
  }

  return plain
    ? <TacticsPlain onTogglePlain={onToggle} />
    : <TacticsGame onTogglePlain={onToggle} />;
}

window.TacticsView = TacticsView;
