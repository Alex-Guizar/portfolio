import React, { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { stFt, FFTPanel, FFTMenuItem, btnStyle, UtilityBar } from './FFTChrome';
import { PROFILE, type Project, type ProjectStatus } from '../data/profile';

const stP = stFt;

interface ScreenshotPlaceholderProps {
  project: Project;
}

interface StatTileProps {
  label: string;
  value?: string;
}

interface MetricCalloutProps {
  label: string;
  value?: string | number;
}

interface ProjectSectionProps {
  title: string;
  num?: number;
  children?: ReactNode;
  empty?: boolean;
  style?: CSSProperties;
}

interface ParagraphsProps {
  items?: string | string[];
}

interface ProjectDetailProps {
  project: Project;
  onTogglePlain: () => void;
  plain: boolean;
  onBack: () => void;
}

function ScreenshotPlaceholder({ project }: ScreenshotPlaceholderProps) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "16 / 9",
      background: stP.bgPanel,
      border: `1px solid ${stP.panelBorderDk}`,
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
      color: stP.dim,
    }}>
      {/* corner crosshairs */}
      {[
        { top: 8, left: 8 }, { top: 8, right: 8 },
        { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos, width: 14, height: 14 }}>
          <div style={{ position: "absolute", inset: 0, borderTop: `1px solid ${stP.panelInnerHi2}`, borderLeft: `1px solid ${stP.panelInnerHi2}`, transform: (pos.right !== undefined ? "scaleX(-1)" : "") + (pos.bottom !== undefined ? " scaleY(-1)" : "") }} />
        </div>
      ))}

      <div style={{ fontFamily: stP.serif, fontSize: 13, fontWeight: 600, color: stP.accent, letterSpacing: 3, textShadow: `0 0 6px ${stP.accent}40`, textTransform: "uppercase" }}>◆ Preview</div>
      <div style={{ fontFamily: stP.serif, fontSize: 26, fontWeight: 600, color: stP.fg, textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>{project.title}</div>
      <div style={{ fontFamily: stP.mono, fontSize: 12, color: stP.fgSoft, maxWidth: 380, textAlign: "center", padding: "0 16px", lineHeight: 1.5 }}>
        {project.tagline || project.blurb}
      </div>
      <div style={{ fontFamily: stP.mono, fontSize: 10, color: stP.dim, letterSpacing: 1, marginTop: 8, fontStyle: "italic" }}>
        [ drop screenshot or demo gif here ]
      </div>
    </div>
  );
}

function StatTile({ label, value }: StatTileProps) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${stP.panelTop} 0%, ${stP.panelHeader} 100%)`,
      border: `1px solid ${stP.panelBorderMd}`,
      borderRadius: 3,
      boxShadow: `inset 0 1px 0 ${stP.panelInnerHi}, 0 2px 0 rgba(90,48,24,0.18)`,
      padding: "12px 16px",
      flex: 1,
    }}>
      <div style={{ fontFamily: stP.serif, fontSize: 11, fontWeight: 600, color: stP.panelAccent, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: stP.mono, fontSize: 14, color: stP.panelFg, fontWeight: 600 }}>{value || "—"}</div>
    </div>
  );
}

function MetricCallout({ label, value }: MetricCalloutProps) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${stP.panelHeader} 0%, ${stP.panelMid} 100%)`,
      border: `1px solid ${stP.panelBorderMd}`,
      borderRadius: 3,
      boxShadow: `inset 0 1px 0 ${stP.panelInnerHi}`,
      padding: "14px 12px",
      textAlign: "center",
      flex: 1,
      minWidth: 90,
    }}>
      <div style={{ fontFamily: stP.serif, fontSize: 26, fontWeight: 700, color: stP.panelAccent, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontFamily: stP.serif, fontSize: 10, fontWeight: 600, color: stP.panelDim, letterSpacing: 2, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function ProjectSection({ title, num, children, empty }: ProjectSectionProps) {
  return (
    <FFTPanel title={title} cornerStat={num ? `${num}` : undefined} style={{ marginBottom: 16 }}>
      {empty ? (
        <div style={{ fontFamily: stP.mono, fontSize: 12, color: stP.panelDim, fontStyle: "italic", padding: "8px 0" }}>
          — placeholder — fill in <code style={{ background: stP.panelHeader, padding: "1px 5px", border: `1px solid ${stP.panelInnerHi2}`, color: stP.panelAccent }}>data.ts</code> for this project.
        </div>
      ) : children}
    </FFTPanel>
  );
}

function Paragraphs({ items }: ParagraphsProps) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: stP.panelFgSoft, margin: "0 0 12px" }}>
      <span style={{ color: stP.panelAccent, fontFamily: stP.serif, fontSize: 14, fontWeight: 600, marginRight: 8, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
      {t}
    </p>
  ));
}

function StatusPill({ status }: { status?: ProjectStatus }) {
  const colors = {
    LIVE:           { bg: stP.hpGreen, fg: "#0a1a08" },
    "IN-PROGRESS":  { bg: stP.ctYellow, fg: "#1a1408" },
    ARCHIVED:       { bg: "#7080a0", fg: "#0a0e18" },
  } as const;
  const c = status ? colors[status] ?? colors.LIVE : colors.LIVE;
  return (
    <span style={{
      display: "inline-block",
      fontFamily: stP.serif,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 2,
      padding: "5px 12px",
      background: c.bg,
      color: c.fg,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4)`,
      textTransform: "uppercase",
    }}>● {status || "DRAFT"}</span>
  );
}

export function ProjectDetail({ project, onTogglePlain, plain, onBack }: ProjectDetailProps) {
  const p = PROFILE;
  const i = p.work.findIndex((w) => w.id === project.id);
  const prev = p.work[(i - 1 + p.work.length) % p.work.length];
  const next = p.work[(i + 1) % p.work.length];

  const primary = project.projectLinks?.find((l) => l.kind === "primary") || (project.href ? { label: "Visit site", href: project.href } : null);
  const secondary = project.projectLinks?.filter((l) => l.kind !== "primary") || [];
  const metrics = project.metrics ?? [];
  const stackDetail = project.stackDetail ?? [];
  const gallery = project.gallery ?? [];

  return (
    <div style={{ background: stP.bg, color: stP.fg, fontFamily: stP.mono, minHeight: "100%" }}>
      <div className="fft-page" style={{ padding: "32px 40px 56px", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>

        {/* Top bar: back + breadcrumb + utility */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: stP.fgSoft }}>
            <button onClick={onBack} style={{ ...btnStyle(false), fontSize: 12, padding: "6px 12px", background: "transparent", border: `1px solid ${stP.line}` }}>
              <span style={{ fontFamily: stP.serif, fontSize: 12, fontWeight: 600 }}>◀</span>
              Back to map
            </button>
            <span style={{ fontFamily: stP.serif, fontSize: 11, fontWeight: 500, color: stP.dim, letterSpacing: 2, textTransform: "uppercase" }}>
              Inventory <span style={{ margin: "0 8px" }}>▸</span> <span style={{ color: stP.accent }}>{project.title}</span>
            </span>
          </div>
          <UtilityBar onTogglePlain={onTogglePlain} plain={plain} />
        </div>

        {/* HERO: screenshot + summary side-by-side */}
        <div className="fft-grid-project-hero" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
          <FFTPanel inset={2}>
            <div style={{ padding: 2 }}>
              <ScreenshotPlaceholder project={project} />
            </div>
          </FFTPanel>

          <FFTPanel title="Item" cornerStat={`#${String(i + 1).padStart(2, "0")} of ${String(p.work.length).padStart(2, "0")}`}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <StatusPill status={project.status} />
                <span style={{ fontFamily: stP.serif, fontSize: 14, fontWeight: 600, color: stP.panelAccent, letterSpacing: 1.5 }}>{project.year}</span>
              </div>

              <h1 className="fft-project-title" style={{ fontFamily: stP.serif, fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: 0.5, lineHeight: 1.15, color: stP.panelFg }}>
                {project.title}
              </h1>

              {project.tagline && (
                <p style={{ fontSize: 14, color: stP.panelFgSoft, margin: 0, lineHeight: 1.6 }}>
                  {project.tagline}
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
                {primary && (
                  <a href={primary.href} style={{ ...btnStyle(false), justifyContent: "center", padding: "10px 16px" }}>
                    <span style={{ fontFamily: stP.serif, fontSize: 12, fontWeight: 600, color: stP.gold }}>▸</span>
                    {primary.label} <span style={{ color: stP.gold }}>↗</span>
                  </a>
                )}
                {secondary.length > 0 && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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

        {/* STAT STRIP */}
        <div className="fft-stat-strip" style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <StatTile label="ROLE" value={project.role} />
          <StatTile label="DURATION" value={project.duration} />
          <StatTile label="TEAM" value={project.team} />
          <StatTile label="STACK" value={project.stack} />
        </div>

        {/* TWO-COLUMN: narrative + side info */}
        <div className="fft-grid-2col-aside" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div>
            <ProjectSection title="Description" empty={!project.blurb}>
              <p style={{ fontSize: 15, color: stP.panelFg, lineHeight: 1.7, margin: 0 }}>{project.blurb}</p>
            </ProjectSection>

            <ProjectSection title="I · The Problem" empty={!project.problem}>
              <Paragraphs items={project.problem} />
            </ProjectSection>

            <ProjectSection title="II · The Approach" empty={!project.approach}>
              <Paragraphs items={project.approach} />
            </ProjectSection>

            <ProjectSection title="III · The Outcome" empty={!project.outcome && metrics.length === 0}>
              <Paragraphs items={project.outcome} />
              {metrics.length > 0 && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${stP.panelInnerHi2}` }}>
                  {metrics.map((m, i) => <MetricCallout key={i} label={m.label} value={m.value} />)}
                </div>
              )}
            </ProjectSection>
          </div>

          <div>
            <ProjectSection title="Abilities · Features" empty={!project.features}>
              <div>
                {project.features?.map((f, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 8, padding: "8px 4px", borderBottom: `1px dashed ${stP.panelInnerHi2}`, fontSize: 12, color: stP.panelFg, lineHeight: 1.5 }}>
                    <span style={{ fontFamily: stP.serif, fontSize: 12, fontWeight: 600, color: stP.panelAccent, letterSpacing: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Enchantments · Stack" empty={stackDetail.length === 0 && !project.stack}>
              {stackDetail.length > 0 ? (
                <div style={{ display: "grid", gap: 12 }}>
                  {stackDetail.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: stP.serif, fontSize: 13, fontWeight: 600, color: stP.panelAccent, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" }}>{s.tech}</div>
                      <div style={{ fontSize: 11, color: stP.panelFgSoft, lineHeight: 1.5 }}>{s.reason}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(project.stack || "").split(" · ").map((s) => (
                    <span key={s} style={{ fontFamily: stP.mono, fontSize: 11, color: stP.panelFg, padding: "4px 10px", background: stP.panelHeader, border: `1px solid ${stP.panelBorderMd}`, borderRadius: 99 }}>{s}</span>
                  ))}
                </div>
              )}
            </ProjectSection>

            <ProjectSection title="Waypoints · Links" empty={!project.projectLinks && !project.href}>
              <div style={{ display: "grid", gap: 4 }}>
                {project.projectLinks?.map((l) => (
                  <FFTMenuItem key={l.label} href={l.href} badge={l.kind === "primary" ? "primary" : undefined}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>{l.label}<span style={{ color: stP.gold }}>↗</span></span>
                  </FFTMenuItem>
                ))}
              </div>
            </ProjectSection>
          </div>
        </div>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <ProjectSection title={`Gallery · ${gallery.length} Frames`} style={{ marginTop: 16 }}>
            <div className="fft-gallery-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(gallery.length, 3)}, 1fr)`, gap: 12 }}>
              {gallery.map((g, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{
                    aspectRatio: "16 / 10",
                    background: stP.panelHeader,
                    border: `1px solid ${stP.panelBorderMd}`,
                    borderRadius: 3,
                    backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 10px, rgba(90,48,24,0.06) 10px, rgba(90,48,24,0.06) 20px)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: stP.serif,
                    fontSize: 11,
                    fontWeight: 600,
                    color: stP.panelDim,
                    letterSpacing: 2,
                  }}>
                    [ {String(i + 1).padStart(2, "0")} ]
                  </div>
                  <div style={{ fontFamily: stP.mono, fontSize: 11, color: stP.panelFgSoft, lineHeight: 1.4 }}>{g.caption}</div>
                </div>
              ))}
            </div>
          </ProjectSection>
        )}

        {/* Footer nav: prev / back / next */}
        <div className="fft-prev-back-next" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center" }}>
          <Link to={`/project/${prev.id}`} style={{ ...btnStyle(false), justifyContent: "flex-start", padding: "12px 16px", fontSize: 12 }}>
            <span style={{ fontFamily: stP.serif, fontSize: 13, fontWeight: 600, color: stP.accent }}>◀</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
              <span style={{ fontFamily: stP.serif, fontSize: 10, fontWeight: 600, color: stP.dim, letterSpacing: 2, textTransform: "uppercase" }}>Prev Item</span>
              <span style={{ color: stP.fg, marginTop: 2 }}>{prev.title}</span>
            </div>
          </Link>
          <button onClick={onBack} style={{ ...btnStyle(true), padding: "12px 20px", fontSize: 12, background: "transparent", border: `1px solid ${stP.accent}` }}>
            <span style={{ fontFamily: stP.serif, fontSize: 13, fontWeight: 600 }}>◆</span>
            Back to map
          </button>
          <Link to={`/project/${next.id}`} style={{ ...btnStyle(false), justifyContent: "flex-end", padding: "12px 16px", fontSize: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
              <span style={{ fontFamily: stP.serif, fontSize: 10, fontWeight: 600, color: stP.dim, letterSpacing: 2, textTransform: "uppercase" }}>Next Item</span>
              <span style={{ color: stP.fg, marginTop: 2 }}>{next.title}</span>
            </div>
            <span style={{ fontFamily: stP.serif, fontSize: 13, fontWeight: 600, color: stP.accent }}>▶</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
