import React from 'react';
import { Link } from 'react-router-dom';
import { stFt, FFTPanel, FFTMenuItem, btnStyle, fftButtonStyle, UtilityBar } from './FFTChrome';
import { PROFILE } from '../data/profile';

function ScreenshotPlaceholder({ project }) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "16 / 9",
      background: stFt.bgPanel,
      border: `1px solid ${stFt.panelBorderDk}`,
      backgroundImage: `repeating-linear-gradient(
        135deg,
        transparent 0px,
        transparent 14px,
        rgba(74,112,200,0.08) 14px,
        rgba(74,112,200,0.08) 28px
      )`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      color: stFt.dim,
    }}>
      {[
        { top: 8, left: 8 }, { top: 8, right: 8 },
        { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos, width: 14, height: 14 }}>
          <div style={{ position: "absolute", inset: 0, borderTop: `1px solid ${stFt.panelInnerHi2}`, borderLeft: `1px solid ${stFt.panelInnerHi2}`, transform: (pos.right !== undefined ? "scaleX(-1)" : "") + (pos.bottom !== undefined ? " scaleY(-1)" : "") }} />
        </div>
      ))}

      <div style={{ fontFamily: stFt.pixel, fontSize: 10, color: stFt.accent, letterSpacing: 2 }}>◆ PREVIEW</div>
      <div style={{ fontFamily: stFt.mono, fontSize: 22, fontWeight: 600, color: stFt.fg, textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>{project.title}</div>
      <div style={{ fontFamily: stFt.mono, fontSize: 12, color: stFt.fgSoft, maxWidth: 380, textAlign: "center", padding: "0 16px", lineHeight: 1.5 }}>
        {project.tagline || project.blurb}
      </div>
      <div style={{ fontFamily: stFt.pixel, fontSize: 8, color: stFt.dim, letterSpacing: 1.5, marginTop: 8 }}>
        [ drop screenshot or demo gif here ]
      </div>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <div style={{
      background: stFt.bgPanel,
      border: `1px solid ${stFt.panelInnerHi2}40`,
      padding: "12px 16px",
      flex: 1,
    }}>
      <div style={{ fontFamily: stFt.pixel, fontSize: 8, color: stFt.accent, letterSpacing: 1.5, marginBottom: 8 }}>◆ {label}</div>
      <div style={{ fontFamily: stFt.mono, fontSize: 15, color: stFt.fg, fontWeight: 600 }}>{value || "—"}</div>
    </div>
  );
}

function MetricCallout({ label, value }) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${stFt.panelTop}20 0%, transparent 100%)`,
      border: `1px solid ${stFt.panelInnerHi2}50`,
      padding: "12px 14px",
      textAlign: "center",
      flex: 1,
      minWidth: 90,
    }}>
      <div style={{ fontFamily: stFt.mono, fontSize: 22, fontWeight: 800, color: stFt.accent, letterSpacing: -0.5, textShadow: `0 0 8px ${stFt.accent}40` }}>{value}</div>
      <div style={{ fontFamily: stFt.pixel, fontSize: 7, color: stFt.fgSoft, letterSpacing: 1.5, marginTop: 6 }}>{label}</div>
    </div>
  );
}

function ProjectSection({ title, num, children, empty }) {
  return (
    <FFTPanel title={title} cornerStat={num ? `${num}` : null} style={{ marginBottom: 16 }}>
      {empty ? (
        <div style={{ fontFamily: stFt.mono, fontSize: 12, color: stFt.fgSoft, fontStyle: "italic", padding: "8px 0" }}>
          — placeholder — fill in data for this project.
        </div>
      ) : children}
    </FFTPanel>
  );
}

function Paragraphs({ items }) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: stFt.fgSoft, margin: "0 0 12px", textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>
      <span style={{ color: stFt.accent, fontFamily: stFt.pixel, fontSize: 9, marginRight: 8, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
      {t}
    </p>
  ));
}

function StatusPill({ status }) {
  const colors = {
    LIVE:           { bg: stFt.hpGreen, fg: "#0a1a08" },
    "IN-PROGRESS":  { bg: stFt.ctYellow, fg: "#1a1408" },
    ARCHIVED:       { bg: "#7080a0", fg: "#0a0e18" },
  };
  const c = colors[status] || colors.LIVE;
  return (
    <span style={{
      display: "inline-block",
      fontFamily: stFt.pixel,
      fontSize: 9,
      letterSpacing: 1.5,
      padding: "5px 10px",
      background: c.bg,
      color: c.fg,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4)`,
    }}>● {status || "DRAFT"}</span>
  );
}

export function ProjectDetail({ project, onTogglePlain, plain, onBack }) {
  const i = PROFILE.work.findIndex((w) => w.id === project.id);
  const prev = PROFILE.work[(i - 1 + PROFILE.work.length) % PROFILE.work.length];
  const next = PROFILE.work[(i + 1) % PROFILE.work.length];

  const primary = project.projectLinks?.find((l) => l.kind === "primary") || (project.href ? { label: "Visit site", href: project.href } : null);
  const secondary = project.projectLinks?.filter((l) => l.kind !== "primary") || [];

  return (
    <div className="min-h-screen" style={{ background: stFt.bg, color: stFt.fg, fontFamily: stFt.mono }}>
      <div className="pt-8 px-10 pb-14 container-max mx-auto box-border">

        <div className="flex justify-between items-center gap-4 flex-wrap mb-5">
          <div className="flex items-center gap-4 text-sm" style={{ color: stFt.fgSoft }}>
            <button type="button" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ ...btnStyle(false), fontSize: 12, padding: "6px 12px" }}>
              <span style={{ fontFamily: stFt.pixel, fontSize: 8 }}>◀</span>
              Back to map
            </button>
            <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.dim, letterSpacing: 1.5 }}>
              INVENTORY <span style={{ margin: "0 8px" }}>▸</span> <span style={{ color: stFt.accent }}>{project.title.toUpperCase()}</span>
            </span>
          </div>
          <UtilityBar onTogglePlain={onTogglePlain} plain={plain} />
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-4 mb-4">
          <FFTPanel inset={2}>
            <div className="p-0.5">
              <ScreenshotPlaceholder project={project} />
            </div>
          </FFTPanel>

          <FFTPanel title="ITEM" cornerStat={`#${String(i + 1).padStart(2, "0")} OF ${String(PROFILE.work.length).padStart(2, "0")}`}>
            <div className="flex flex-col h-full gap-3">
              <div className="flex justify-between items-center">
                <StatusPill status={project.status} />
                <span style={{ fontFamily: stFt.pixel, fontSize: 11, color: stFt.accent, letterSpacing: 1 }}>{project.year}</span>
              </div>

              <h1 style={{ fontFamily: stFt.mono, fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -1, lineHeight: 1.1, color: stFt.fg, textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>
                {project.title}
              </h1>

              {project.tagline && (
                <p style={{ fontSize: 14, color: stFt.fgSoft, margin: 0, lineHeight: 1.6, textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>
                  {project.tagline}
                </p>
              )}

              <div className="flex flex-col gap-2 mt-auto">
                {primary && (
                  <a href={primary.href} style={{ ...fftButtonStyle(false), justifyContent: "center", padding: "10px 16px" }}>
                    <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent }}>▶</span>
                    {primary.label} <span style={{ color: stFt.accent }}>↗</span>
                  </a>
                )}
                {secondary.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {secondary.map((l) => (
                      <a key={l.label} href={l.href} style={{ ...btnStyle(false), padding: "6px 10px", fontSize: 11, flex: "1 1 0", minWidth: 0, justifyContent: "center" }}>
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FFTPanel>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <StatTile label="ROLE" value={project.role} />
          <StatTile label="DURATION" value={project.duration} />
          <StatTile label="TEAM" value={project.team} />
          <StatTile label="STACK" value={project.stack} />
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div>
            <ProjectSection title="DESCRIPTION · BLURB" empty={!project.blurb && !project.longBlurb}>
              <p style={{ fontSize: 15, color: stFt.fg, lineHeight: 1.7, margin: 0, textShadow: "1px 1px 0 rgba(0,0,0,0.5)" }}>{project.blurb}</p>
            </ProjectSection>

            <ProjectSection title="◆ I · THE PROBLEM" empty={!project.problem}>
              <Paragraphs items={project.problem} />
            </ProjectSection>

            <ProjectSection title="◆ II · THE APPROACH" empty={!project.approach}>
              <Paragraphs items={project.approach} />
            </ProjectSection>

            <ProjectSection title="◆ III · THE OUTCOME" empty={!project.outcome && !project.metrics}>
              <Paragraphs items={project.outcome} />
              {project.metrics?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${stFt.panelInnerHi2}40` }}>
                  {project.metrics.map((m, i) => <MetricCallout key={i} label={m.label} value={m.value} />)}
                </div>
              )}
            </ProjectSection>
          </div>

          <div>
            <ProjectSection title="ABILITIES · FEATURES" empty={!project.features}>
              <div>
                {project.features?.map((f, i) => (
                  <div key={i} className="grid grid-cols-[22px_1fr] gap-2 py-2 border-b" style={{ borderBottom: `1px dashed ${stFt.panelInnerHi2}30`, color: stFt.fg, textShadow: "1px 1px 0 rgba(0,0,0,0.5)", lineHeight: 1.5, fontSize: 12 }}>
                    <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="ENCHANTMENTS · STACK" empty={!project.stackDetail && !project.stack}>
              {project.stackDetail?.length > 0 ? (
                <div className="grid gap-2">
                  {project.stackDetail.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: stFt.pixel, fontSize: 10, color: stFt.accent, letterSpacing: 1, marginBottom: 4 }}>{s.tech}</div>
                      <div style={{ fontSize: 11, color: stFt.fgSoft, lineHeight: 1.5 }}>{s.reason}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {(project.stack || "").split(" · ").map((s) => (
                    <span key={s} style={{ fontFamily: stFt.mono, fontSize: 11, color: stFt.fg, padding: "4px 10px", background: stFt.panelOuter, border: `1px solid ${stFt.panelInnerHi2}` }}>{s}</span>
                  ))}
                </div>
              )}
            </ProjectSection>

            <ProjectSection title="WAYPOINTS · LINKS" empty={!project.projectLinks && !project.href}>
              <div className="grid gap-1">
                {project.projectLinks?.map((l) => (
                  <FFTMenuItem key={l.label} href={l.href} badge={l.kind === "primary" ? "primary" : null}>
                    <span className="flex items-center gap-2">{l.label}<span style={{ color: stFt.accent }}>↗</span></span>
                  </FFTMenuItem>
                ))}
              </div>
            </ProjectSection>
          </div>
        </div>

        {project.gallery?.length > 0 && (
          <ProjectSection title={`GALLERY · ${project.gallery.length} FRAMES`} style={{ marginTop: 16 }}>
            <div style={{ gridTemplateColumns: `repeat(${Math.min(project.gallery.length, 3)}, 1fr)` }} className="grid gap-3">
              {project.gallery.map((g, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div style={{
                    aspectRatio: "16 / 10",
                    background: stFt.bgPanel,
                    border: `1px solid ${stFt.panelInnerHi2}40`,
                    backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 10px, rgba(74,112,200,0.06) 10px, rgba(74,112,200,0.06) 20px)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: stFt.pixel,
                    fontSize: 8,
                    color: stFt.dim,
                    letterSpacing: 1.5,
                  }}>
                    [ {String(i + 1).padStart(2, "0")} ]
                  </div>
                  <div style={{ fontFamily: stFt.mono, fontSize: 11, color: stFt.fgSoft, lineHeight: 1.4 }}>{g.caption}</div>
                </div>
              ))}
            </div>
          </ProjectSection>
        )}

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mt-6">
          <Link to={`/project/${prev.id}`} style={{ ...btnStyle(false), justifyContent: "flex-start", padding: "12px 16px", fontSize: 12 }} className="flex items-center gap-3">
            <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent }}>◀</span>
            <div className="flex flex-col items-start text-left">
              <span style={{ fontFamily: stFt.pixel, fontSize: 7, color: stFt.dim, letterSpacing: 1 }}>PREV ITEM</span>
              <span style={{ color: stFt.fg, marginTop: 2 }}>{prev.title}</span>
            </div>
          </Link>
          <button type="button" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ ...btnStyle(true), padding: "12px 20px", fontSize: 12 }} className="mx-auto">
            <span style={{ fontFamily: stFt.pixel, fontSize: 9 }}>◆</span>
            Back to map
          </button>
          <Link to={`/project/${next.id}`} style={{ ...btnStyle(false), justifyContent: "flex-end", padding: "12px 16px", fontSize: 12 }} className="flex items-center gap-3 justify-end">
            <div className="flex flex-col items-end text-right">
              <span style={{ fontFamily: stFt.pixel, fontSize: 7, color: stFt.dim, letterSpacing: 1 }}>NEXT ITEM</span>
              <span style={{ color: stFt.fg, marginTop: 2 }}>{next.title}</span>
            </div>
            <span style={{ fontFamily: stFt.pixel, fontSize: 9, color: stFt.accent }}>▶</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
