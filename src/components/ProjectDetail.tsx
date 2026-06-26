import { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FFTPanel, FFTMenuItem, UtilityBar } from './FFTChrome';
import { PROFILE, type Project, type ProjectStatus } from '../data/profile';


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
  className?: string;
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
    <div
      className="relative w-full aspect-[16/9] flex flex-col items-center justify-center gap-3 overflow-hidden text-ft-dim bg-ft-bg-panel border border-ft-panel-border-dk"
      style={{
        backgroundImage: `repeating-linear-gradient(
          135deg,
          transparent 0px,
          transparent 14px,
          rgba(74,112,200,0.08) 14px,
          rgba(74,112,200,0.08) 28px
        )`,
      }}
    >
      {/* corner crosshairs */}
      {[
        { top: 8, left: 8 }, { top: 8, right: 8 },
        { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <div key={i} className="absolute w-[14px] h-[14px]" style={pos}>
          <div style={{ position: "absolute", inset: 0, borderTop: `1px solid var(--color-ft-panel-inner-hi2)`, borderLeft: `1px solid var(--color-ft-panel-inner-hi2)`, transform: (pos.right !== undefined ? "scaleX(-1)" : "") + (pos.bottom !== undefined ? " scaleY(-1)" : "") }} />
        </div>
      ))}

      <div className="font-cinzel text-[13px] font-semibold uppercase tracking-[0.35em] text-ft-accent" style={{ textShadow: `0 0 6px color-mix(in srgb, var(--color-ft-accent) 25%, transparent)` }}>◆ Preview</div>
      <div className="font-cinzel text-[26px] font-semibold text-ft-fg" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}>{project.title}</div>
      <div className="font-jetbrains text-[12px] text-ft-fg-soft max-w-[380px] text-center px-4 leading-[1.5]">
        {project.tagline || project.blurb}
      </div>
      <div className="font-jetbrains text-[10px] italic tracking-[0.1em] text-ft-dim mt-2">
        [ drop screenshot or demo gif here ]
      </div>
    </div>
  );
}

function StatTile({ label, value }: StatTileProps) {
  return (
    <div
      className="flex-1 rounded-[3px] p-4"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-header) 100%)`,
        border: `1px solid var(--color-ft-panel-border-md)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), 0 2px 0 rgba(90,48,24,0.18)`,
      }}
    >
      <div className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.15em] mb-1 text-ft-accent">{label}</div>
      <div className="font-jetbrains text-[14px] font-semibold text-ft-fg">{value || "—"}</div>
    </div>
  );
}

function MetricCallout({ label, value }: MetricCalloutProps) {
  return (
    <div
      className="flex-1 min-w-[90px] rounded-[3px] px-3 py-4 text-center"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-header) 0%, var(--color-ft-panel-mid) 100%)`,
        border: `1px solid var(--color-ft-panel-border-md)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi)`,
      }}
    >
      <div className="font-cinzel text-[26px] font-bold text-ft-accent">{value}</div>
      <div className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.2em] mt-1 text-ft-dim">{label}</div>
    </div>
  );
}

function ProjectSection({ title, num, children, empty, className, style }: ProjectSectionProps) {
  return (
    <FFTPanel title={title} cornerStat={num ? `${num}` : undefined} className={className} style={style}>
      {empty ? (
        <div className="font-jetbrains text-[12px] italic text-ft-dim py-2">
          — placeholder — fill in <code className="bg-ft-panel-header px-1 py-[1px] border border-ft-panel-inner-hi2 text-ft-panel-accent">data.ts</code> for this project.
        </div>
      ) : children}
    </FFTPanel>
  );
}

function Paragraphs({ items }: ParagraphsProps) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} className="mb-3 text-[14px] leading-[1.75] text-ft-fg-soft">
      <span className="font-cinzel text-[14px] font-semibold text-ft-accent mr-2 tracking-[0.05em]">{String(i + 1).padStart(2, "0")}</span>
      {t}
    </p>
  ));
}

function StatusPill({ status }: { status?: ProjectStatus }) {
  const colors = {
    LIVE:           { bg: 'var(--color-ft-hp-green)', fg: "#0a1a08" },
    "IN-PROGRESS":  { bg: 'var(--color-ft-ct-yellow)', fg: "#1a1408" },
    ARCHIVED:       { bg: "#7080a0", fg: "#0a0e18" },
  } as const;
  const c = status ? colors[status] ?? colors.LIVE : colors.LIVE;
  return (
    <span
      className="inline-block font-cinzel text-[11px] font-semibold tracking-[2px] px-3 py-[5px] uppercase"
      style={{
        background: c.bg,
        color: c.fg,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4)`,
      }}
    >● {status || "DRAFT"}</span>
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
    <div className="min-h-full bg-ft-bg text-ft-fg font-jetbrains">
      <div className="fft-page px-[40px] pt-[32px] pb-[56px] max-w-container mx-auto box-border">

        {/* Top bar: back + breadcrumb + utility */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 text-xs text-ft-fg-soft">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[12px] font-jetbrains font-semibold text-ft-fg transition"
            >
              <span className="font-cinzel text-[12px] font-semibold">◀</span>
              Back to map
            </button>
            <span className="font-cinzel text-[11px] font-medium uppercase tracking-[0.18em] text-ft-dim">
              Inventory <span className="mx-2">▸</span> <span className="text-ft-accent">{project.title}</span>
            </span>
          </div>
          <UtilityBar onTogglePlain={onTogglePlain} plain={plain} />
        </div>

        {/* HERO: screenshot + summary side-by-side */}
        <div className="fft-grid-project-hero grid grid-cols-[1.6fr_1fr] gap-4 mb-4">
          <FFTPanel inset={2}>
            <div className="p-[2px]">
              <ScreenshotPlaceholder project={project} />
            </div>
          </FFTPanel>

          <FFTPanel title="Item" cornerStat={`#${String(i + 1).padStart(2, "0")} of ${String(p.work.length).padStart(2, "0")}`}>
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <StatusPill status={project.status} />
                <span className="font-cinzel text-[14px] font-semibold tracking-[0.08em] text-ft-accent">{project.year}</span>
              </div>

              <h1 className="fft-project-title font-cinzel text-[30px] font-bold leading-[1.15] tracking-[0.01em] text-ft-fg m-0">
                {project.title}
              </h1>

              {project.tagline && (
                <p className="text-[14px] leading-[1.6] text-ft-fg-soft m-0">
                  {project.tagline}
                </p>
              )}

              <div className="mt-auto flex flex-col gap-2">
                {primary && (
                  <a
                    href={primary.href}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-ft-line bg-transparent px-4 py-2 text-[12px] font-jetbrains font-semibold text-ft-fg transition"
                  >
                    <span className="font-cinzel text-[12px] font-semibold text-ft-gold">▸</span>
                    {primary.label} <span className="text-ft-gold">↗</span>
                  </a>
                )}
                {secondary.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {secondary.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-sm border border-ft-line bg-transparent px-2.5 py-1.5 text-[11px] font-jetbrains font-semibold text-ft-fg transition"
                      >
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
        <div className="fft-stat-strip flex flex-wrap gap-4 mb-4">
          <StatTile label="ROLE" value={project.role} />
          <StatTile label="DURATION" value={project.duration} />
          <StatTile label="TEAM" value={project.team} />
          <StatTile label="STACK" value={project.stack} />
        </div>

        {/* TWO-COLUMN: narrative + side info */}
        <div className="fft-grid-2col-aside grid grid-cols-[2fr_1fr] gap-4">
          <div>
            <ProjectSection title="Description" empty={!project.blurb}>
              <p className="text-[15px] leading-[1.7] text-ft-fg m-0">{project.blurb}</p>
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
                <div className="mt-3 flex flex-wrap gap-2.5 pt-3 border-t border-ft-panel-inner-hi2">
                  {metrics.map((m, i) => <MetricCallout key={i} label={m.label} value={m.value} />)}
                </div>
              )}
            </ProjectSection>
          </div>

          <div>
            <ProjectSection title="Abilities · Features" empty={!project.features}>
              <div>
                {project.features?.map((f, i) => (
                  <div key={i} className="grid grid-cols-[22px_1fr] gap-2.5 px-1 py-2 border-b border-dashed border-ft-panel-inner-hi2 text-[12px] leading-[1.5] text-ft-fg">
                    <span className="font-cinzel text-[12px] font-semibold tracking-[0.06em] text-ft-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Enchantments · Stack" empty={stackDetail.length === 0 && !project.stack}>
              {stackDetail.length > 0 ? (
                <div className="grid gap-3">
                  {stackDetail.map((s, i) => (
                    <div key={i}>
                      <div className="font-cinzel text-[13px] font-semibold uppercase tracking-[0.12em] text-ft-accent mb-1">{s.tech}</div>
                      <div className="text-[11px] leading-6 text-ft-fg-soft">{s.reason}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(project.stack || "").split(" · ").map((s) => (
                    <span key={s} className="rounded-full px-2.5 py-1 text-[11px] text-ft-fg bg-ft-panel-header border border-ft-panel-border-md">{s}</span>
                  ))}
                </div>
              )}
            </ProjectSection>

            <ProjectSection title="Waypoints · Links" empty={!project.projectLinks && !project.href}>
              <div className="grid gap-1">
                {project.projectLinks?.map((l) => (
                  <FFTMenuItem key={l.label} href={l.href} badge={l.kind === "primary" ? "primary" : undefined}>
                    <span className="flex items-center gap-2">{l.label}<span className="text-ft-gold">↗</span></span>
                  </FFTMenuItem>
                ))}
              </div>
            </ProjectSection>
          </div>
        </div>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <ProjectSection title={`Gallery · ${gallery.length} Frames`} className="mt-4">
            <div
              className="fft-gallery-grid grid gap-3"
              style={{ gridTemplateColumns: `repeat(${Math.min(gallery.length, 3)}, 1fr)` }}
            >
              {gallery.map((g, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div
                    className="aspect-[16/10] rounded-[3px] flex items-center justify-center text-[11px] font-cinzel font-semibold tracking-[0.16em] text-ft-dim bg-ft-panel-header border border-ft-panel-border-md"
                    style={{ backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 10px, rgba(90,48,24,0.06) 10px, rgba(90,48,24,0.06) 20px)` }}
                  >
                    [ {String(i + 1).padStart(2, "0")} ]
                  </div>
                  <div className="text-[11px] leading-[1.4] text-ft-fg-soft">{g.caption}</div>
                </div>
              ))}
            </div>
          </ProjectSection>
        )}

        {/* Footer nav: prev / back / next */}
        <div className="fft-prev-back-next grid grid-cols-[1fr_auto_1fr] gap-4 items-center mt-6">
          <Link
            to={`/project/${prev.id}`}
            className="inline-flex items-start gap-2 rounded-sm border border-ft-line bg-transparent px-4 py-3 text-[12px] font-jetbrains font-semibold text-ft-fg transition"
          >
            <span className="font-cinzel text-[13px] font-semibold text-ft-accent">◀</span>
            <div className="flex flex-col items-start text-left">
              <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.16em] text-ft-dim">Prev Item</span>
              <span className="text-ft-fg mt-1">{prev.title}</span>
            </div>
          </Link>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm border border-ft-accent bg-transparent px-5 py-3 text-[12px] font-jetbrains font-semibold transition"
          >
            <span className="font-cinzel text-[13px] font-semibold">◆</span>
            Back to map
          </button>
          <Link
            to={`/project/${next.id}`}
            className="inline-flex items-start justify-end gap-2 rounded-sm border border-ft-line bg-transparent px-4 py-3 text-[12px] font-jetbrains font-semibold text-ft-fg transition"
          >
            <div className="flex flex-col items-end text-right">
              <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.16em] text-ft-dim">Next Item</span>
              <span className="text-ft-fg mt-1">{next.title}</span>
            </div>
            <span className="font-cinzel text-[13px] font-semibold text-ft-accent">▶</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
