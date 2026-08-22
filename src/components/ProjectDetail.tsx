import { Link } from 'react-router-dom';
import { FFTPanel, FFTMenuItem, UtilityBar, SectionPlain } from '@/components/FFTChrome';
import { PROFILE } from '@/data/profile';
import type { Project, ProjectStatus } from '@/types/profile';
import type {
  ScreenshotPlaceholderProps,
  StatTileProps,
  MetricCalloutProps,
  ProjectSectionProps,
  ParagraphsProps,
  ProjectDetailProps,
} from '@/types/projectDetail';
import { externalLinkProps, isExternal } from '@/utils/links';

interface ProjectDetailVariantProps {
  project: Project;
  onTogglePlain: () => void;
  onBack: () => void;
}

function ScreenshotPlaceholder({ project }: ScreenshotPlaceholderProps) {
  if (project.screenshot) {
    return (
      <img
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        className="w-full block"
      />
    );
  }

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
          <div
            className="absolute inset-0 border-t border-l border-ft-panel-inner-hi2"
            style={{ transform: (pos.right !== undefined ? "scaleX(-1)" : "") + (pos.bottom !== undefined ? " scaleY(-1)" : "") }} />
        </div>
      ))}

      <div className="font-cinzel text-[13px] font-semibold uppercase tracking-[0.35em] text-ft-accent" style={{ textShadow: `0 0 6px color-mix(in srgb, var(--color-ft-accent) 25%, transparent)` }}><span aria-hidden="true">◆</span> Preview</div>
      <div className="font-cinzel text-[26px] font-semibold text-ft-fg text-shadow-[1px_1px_0_rgba(0,0,0,0.6)]">{project.title}</div>
      <div className="text-[12px] text-ft-fg-soft max-w-[380px] text-center px-4 leading-[1.5]">
        {project.tagline || project.blurb}
      </div>
      <div className="text-[10px] italic tracking-[0.1em] text-ft-dim mt-2">
        [ drop screenshot or demo gif here ]
      </div>
    </div>
  );
}

function StatTile({ label, value }: StatTileProps) {
  return (
    <div
      className="flex-1 rounded-[3px] p-4 border border-ft-panel-border-md"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-header) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), 0 2px 0 rgba(90,48,24,0.18)`,
      }}
    >
      <div className="font-cinzel text-[0.6875rem] font-semibold uppercase tracking-[0.15em] mb-1 text-ft-panel-accent">{label}</div>
      <div className="text-[0.875rem] font-semibold text-ft-panel-fg">{value || "—"}</div>
    </div>
  );
}

function MetricCallout({ label, value }: MetricCalloutProps) {
  return (
    <div
      className="flex-1 min-w-[90px] rounded-[3px] px-3 py-4 text-center border border-ft-panel-border-md"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-header) 0%, var(--color-ft-panel-mid) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi)`,
      }}
    >
      <div className="font-cinzel text-[1.625rem] font-bold text-ft-panel-accent">{value}</div>
      <div className="font-cinzel text-[0.625rem] font-semibold uppercase tracking-[0.2em] mt-1 text-ft-panel-dim">{label}</div>
    </div>
  );
}

function ProjectSection({ title, num, children, empty, className }: ProjectSectionProps) {
  if (empty) return null;

  return (
    <FFTPanel title={title} cornerStat={num ? `${num}` : undefined} className={className}>
      {children}
    </FFTPanel>
  );
}

function Paragraphs({ items }: ParagraphsProps) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} className="mb-3 text-[0.9375rem] leading-[1.75] text-ft-panel-fg-soft">
      {t}
    </p>
  ));
}

function ParagraphsPlain({ items }: ParagraphsProps) {
  const arr = Array.isArray(items) ? items : items ? [items] : [];
  return arr.map((t, i) => (
    <p key={i} className="mb-3 text-[0.9375rem] leading-[1.8] text-ft-fg-plain-soft last:mb-0">
      {t}
    </p>
  ));
}

function StatusPill({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  const colors = {
    LIVE:           { bg: 'var(--color-ft-hp-green)', fg: "#0a1a08" },
    "IN-PROGRESS":  { bg: 'var(--color-ft-ct-yellow)', fg: "#1a1408" },
    ARCHIVED:       { bg: "#7080a0", fg: "#0a0e18" },
  } as const;
  const c = colors[status] ?? colors.LIVE;
  return (
    <span
      className="inline-block font-cinzel text-[11px] font-semibold tracking-[2px] px-3 py-[5px] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
      style={{
        background: c.bg,
        color: c.fg,
      }}
    ><span aria-hidden="true">●</span> {status}</span>
  );
}

function ProjectDetailGame({ project, onTogglePlain, onBack }: ProjectDetailVariantProps) {
  const i = PROFILE.work.findIndex((w) => w.id === project.id);
  const prev = PROFILE.work[(i - 1 + PROFILE.work.length) % PROFILE.work.length];
  const next = PROFILE.work[(i + 1) % PROFILE.work.length];

  const primary = project.projectLinks?.find((l) => l.kind === "primary") || (project.href ? { label: "Visit site", href: project.href } : null);
  const secondary = project.projectLinks?.filter((l) => l.kind !== "primary") || [];
  const metrics = project.metrics ?? [];
  const stackDetail = project.stackDetail ?? [];
  const gallery = project.gallery ?? [];

  return (
    <div className="min-h-full bg-ft-bg text-ft-fg">
      <div className="fft-page px-10 pt-8 pb-14 max-w-container mx-auto box-border">

        {/* Top bar: back + breadcrumb + utility */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 text-xs text-ft-fg-soft">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-semibold text-ft-fg transition cursor-pointer"
            >
              <span className="font-cinzel text-[0.75rem] font-semibold" aria-hidden="true">◀</span>
              Back to map
            </button>
            <span className="font-cinzel text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ft-fg-soft">
              Inventory <span className="mx-2" aria-hidden="true">▸</span> <span className="text-ft-accent">{project.title}</span>
            </span>
          </div>
          <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
        </div>

        <main>
        {/* HERO: screenshot + summary side-by-side */}
        <div className="fft-grid-project-hero grid grid-cols-[1.6fr_1fr] gap-4 mb-4">
          <FFTPanel>
            <div>
              <ScreenshotPlaceholder project={project} />
            </div>
          </FFTPanel>

          <FFTPanel title="Item" cornerStat={`#${String(i + 1).padStart(2, "0")} of ${String(PROFILE.work.length).padStart(2, "0")}`}>
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <StatusPill status={project.status} />
                <span className="font-cinzel text-[0.875rem] font-semibold tracking-[0.08em] text-ft-panel-accent">{project.year}</span>
              </div>

              <h1 className="fft-project-title font-cinzel text-[1.875rem] font-bold leading-[1.15] tracking-[0.01em] text-ft-panel-fg m-0">
                {project.title}
              </h1>

              {project.tagline && (
                <p className="text-[0.875rem] leading-[1.6] text-ft-panel-fg-soft m-0">
                  {project.tagline}
                </p>
              )}

              <div className="mt-auto flex flex-col gap-2">
                {primary && (
                  <a
                    href={primary.href}
                    {...externalLinkProps(primary.href)}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-ft-panel-border-md bg-transparent px-4 py-2 text-[0.75rem] font-semibold text-ft-panel-fg transition"
                  >
                    <span className="font-cinzel text-[0.75rem] font-semibold text-ft-gold" aria-hidden="true">▸</span>
                    {primary.label} <span className="text-ft-gold" aria-hidden="true">↗</span>
                    {isExternal(primary.href) && <span className="sr-only"> (opens in new tab)</span>}
                  </a>
                )}
                {secondary.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {secondary.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        {...externalLinkProps(l.href)}
                        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-sm border border-ft-panel-border-md bg-transparent px-2 py-2 text-[0.6875rem] font-semibold text-ft-panel-fg transition"
                      >
                        {l.label} <span aria-hidden="true">↗</span>
                        {isExternal(l.href) && <span className="sr-only"> (opens in new tab)</span>}
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
            <ProjectSection title="Description" empty={!project.blurb} className="mb-2">
              <p className="text-[0.9375rem] leading-[1.7] text-ft-panel-fg m-0">{project.blurb}</p>
            </ProjectSection>

            <ProjectSection title="I · The Problem" empty={!project.problem} className="mb-2">
              <Paragraphs items={project.problem} />
            </ProjectSection>

            <ProjectSection title="II · The Approach" empty={!project.approach} className="mb-2">
              <Paragraphs items={project.approach} />
            </ProjectSection>

            <ProjectSection title="III · The Outcome" empty={!project.outcome && metrics.length === 0} className="mb-2">
              <Paragraphs items={project.outcome} />
              {metrics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-ft-panel-inner-hi2">
                  {metrics.map((m, i) => <MetricCallout key={i} label={m.label} value={m.value} />)}
                </div>
              )}
            </ProjectSection>
          </div>

          <div>
            <ProjectSection title="Abilities · Features" empty={!project.features} className="mb-2">
              <div>
                {project.features?.map((f, i) => (
                  <div key={i} className="grid grid-cols-[22px_1fr] gap-2 px-1 py-2 border-b border-dashed border-ft-panel-inner-hi2 text-[0.75rem] leading-[1.5] text-ft-panel-fg">
                    <span className="font-cinzel text-[0.75rem] font-semibold tracking-[0.06em] text-ft-panel-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </ProjectSection>

            <ProjectSection title="Enchantments · Stack" empty={stackDetail.length === 0 && !project.stack} className="mb-2">
              {stackDetail.length > 0 ? (
                <div className="grid gap-3">
                  {stackDetail.map((s, i) => (
                    <div key={i}>
                      <h3 className="font-cinzel text-[0.875rem] font-semibold uppercase tracking-[0.12em] text-ft-panel-accent mb-1">{s.tech}</h3>
                      <div className="text-[0.6875rem] leading-6 text-ft-panel-fg-soft">{s.reason}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(project.stack || "").split(" · ").map((s) => (
                    <span key={s} className="rounded-full px-2.5 py-1 text-[0.6875rem] text-ft-panel-fg bg-ft-panel-header border border-ft-panel-border-md">{s}</span>
                  ))}
                </div>
              )}
            </ProjectSection>

            <ProjectSection title="Waypoints · Links" empty={!project.projectLinks && !project.href} className="mb-2">
              <div className="grid gap-1">
                {project.projectLinks?.map((l) => (
                  <FFTMenuItem key={l.label} href={l.href} badge={l.kind === "primary" ? "primary" : undefined}>
                    <span className="flex items-center gap-2">{l.label}<span className="text-ft-gold" aria-hidden="true">↗</span></span>
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
                <figure key={i} className="flex flex-col gap-2 m-0">
                  {g.src ? (
                    <div className="aspect-[16/10] overflow-hidden rounded-[3px] border border-ft-panel-border-md bg-ft-bg-panel flex items-center justify-center">
                      <img
                        src={g.src}
                        alt=""
                        className="w-full h-full object-contain block"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-[16/10] rounded-[3px] flex items-center justify-center text-[0.6875rem] font-cinzel font-semibold tracking-[0.16em] text-ft-dim bg-ft-panel-header border border-ft-panel-border-md"
                      style={{ backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 10px, rgba(90,48,24,0.06) 10px, rgba(90,48,24,0.06) 20px)` }}
                    >
                      [ {String(i + 1).padStart(2, "0")} ]
                    </div>
                  )}
                  <figcaption className="text-[0.6875rem] leading-[1.4] text-ft-panel-fg-soft">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </ProjectSection>
        )}

        {/* Footer nav: prev / back / next */}
        <div className="fft-prev-back-next grid grid-cols-[1fr_auto_1fr] gap-4 items-center mt-6">
          <Link
            to={`/project/${prev.id}`}
            className="inline-flex items-start gap-2 rounded-sm border border-ft-line bg-transparent px-4 py-3 text-[0.75rem] font-semibold text-ft-fg transition"
          >
            <span className="font-cinzel text-[0.8125rem] font-semibold text-ft-accent" aria-hidden="true">◀</span>
            <div className="flex flex-col items-start text-left">
              <span className="font-cinzel text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ft-dim">Prev Item</span>
              <span className="text-ft-fg mt-1">{prev.title}</span>
            </div>
          </Link>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm border border-ft-accent bg-transparent px-5 py-3 text-[0.75rem] font-semibold transition cursor-pointer"
          >
            <span className="font-cinzel text-[0.8125rem] font-semibold" aria-hidden="true">◆</span>
            Back to map
          </button>
          <Link
            to={`/project/${next.id}`}
            className="inline-flex items-start justify-end gap-2 rounded-sm border border-ft-line bg-transparent px-4 py-3 text-[0.75rem] font-semibold text-ft-fg transition"
          >
            <div className="flex flex-col items-end text-right">
              <span className="font-cinzel text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ft-dim">Next Item</span>
              <span className="text-ft-fg mt-1">{next.title}</span>
            </div>
            <span className="font-cinzel text-[0.8125rem] font-semibold text-ft-accent" aria-hidden="true">▶</span>
          </Link>
        </div>
        </main>
      </div>
    </div>
  );
}

function ProjectDetailPlain({ project, onTogglePlain, onBack }: ProjectDetailVariantProps) {
  const i = PROFILE.work.findIndex((w) => w.id === project.id);
  const prev = PROFILE.work[(i - 1 + PROFILE.work.length) % PROFILE.work.length];
  const next = PROFILE.work[(i + 1) % PROFILE.work.length];

  const primary = project.projectLinks?.find((l) => l.kind === "primary") || (project.href ? { label: "Visit site", href: project.href } : null);
  const secondary = project.projectLinks?.filter((l) => l.kind !== "primary") || [];
  const metrics = project.metrics ?? [];
  const stackDetail = project.stackDetail ?? [];
  const gallery = project.gallery ?? [];

  return (
    <div className="bg-ft-bg text-ft-fg-plain min-h-full">
      <div className="plain-page pt-8 px-10 pb-16 max-w-[55rem] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        {/* Top bar: back + position */}
        <div className="flex items-center justify-between gap-4 mb-8 text-[0.75rem] text-ft-dim-plain">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-semibold text-ft-fg-plain transition cursor-pointer"
          >
            <span aria-hidden="true">←</span> Back to work
          </button>
          <span className="uppercase tracking-[0.15em]">{String(i + 1).padStart(2, "0")} of {String(PROFILE.work.length).padStart(2, "0")}</span>
        </div>

        <main>
        {/* HERO: status, title, tagline, links */}
        <div className="pb-8 border-b border-ft-line mb-10">
          <div className="flex items-center gap-3 mb-3">
            {project.status && (
              <span
                className="text-[0.625rem] px-2 py-0.5 border border-current rounded-full uppercase tracking-[0.1em]"
                style={{ color: project.status === "LIVE" ? 'var(--color-ft-hp-green)' : project.status === "ARCHIVED" ? 'var(--color-ft-dim-plain)' : 'var(--color-ft-ct-yellow)' }}
              >
                {project.status}
              </span>
            )}
            <span className="text-[0.8125rem] text-ft-dim-plain">{project.year}</span>
          </div>

          <h1 className="text-[2.5rem] font-bold m-0 tracking-[-1px] text-ft-fg-plain leading-tight">{project.title}</h1>

          {project.tagline && (
            <p className="text-[1rem] text-ft-fg-plain-soft leading-[1.7] max-w-[40rem] mt-4 mb-0">{project.tagline}</p>
          )}

          {(primary || secondary.length > 0) && (
            <div className="flex flex-wrap gap-3 mt-5">
              {primary && (
                <a
                  href={primary.href}
                  {...externalLinkProps(primary.href)}
                  className="text-[0.875rem] font-medium text-ft-fg-plain no-underline px-4 py-2 border border-ft-line bg-ft-bg-panel"
                >
                  {primary.label} <span aria-hidden="true">↗</span>
                  {isExternal(primary.href) && <span className="sr-only"> (opens in new tab)</span>}
                </a>
              )}
              {secondary.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...externalLinkProps(l.href)}
                  className="text-[0.8125rem] text-ft-fg-plain-soft no-underline px-3 py-2 border border-ft-line"
                >
                  {l.label} <span aria-hidden="true">↗</span>
                  {isExternal(l.href) && <span className="sr-only"> (opens in new tab)</span>}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* SCREENSHOT */}
        {project.screenshot && (
          <div className="mb-10 overflow-hidden border border-ft-line bg-ft-bg-panel">
            <img src={project.screenshot} alt={`${project.title} screenshot`} className="w-full block" />
          </div>
        )}

        {/* META ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 border-b border-ft-line mb-10">
          {([
            ["Role", project.role],
            ["Duration", project.duration],
            ["Team", project.team],
            ["Stack", project.stack],
          ] as const).map(([label, value]) => (
            <div key={label}>
              <div className="text-[0.6875rem] uppercase tracking-[0.15em] text-ft-dim-plain mb-1">{label}</div>
              <div className="text-[0.875rem] text-ft-fg-plain">{value || "—"}</div>
            </div>
          ))}
        </div>

        <SectionPlain title="Description" empty={!project.blurb}>
          <p className="text-[0.9375rem] leading-[1.8] text-ft-fg-plain-soft m-0">{project.blurb}</p>
        </SectionPlain>

        <SectionPlain title="The Problem" empty={!project.problem}>
          <ParagraphsPlain items={project.problem} />
        </SectionPlain>

        <SectionPlain title="The Approach" empty={!project.approach}>
          <ParagraphsPlain items={project.approach} />
        </SectionPlain>

        <SectionPlain title="The Outcome" empty={!project.outcome && metrics.length === 0}>
          <ParagraphsPlain items={project.outcome} />
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-3 mt-4 pt-4 border-t border-ft-line">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-[1.375rem] font-bold text-ft-fg-plain">{m.value}</div>
                  <div className="text-[0.625rem] uppercase tracking-[0.15em] text-ft-dim-plain mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </SectionPlain>

        <SectionPlain title="Features" empty={!project.features}>
          <ul className="m-0 p-0 list-none grid gap-2">
            {project.features?.map((f, idx) => (
              <li key={idx} className="flex gap-3 text-[0.9375rem] text-ft-fg-plain-soft leading-[1.6]">
                <span className="text-ft-accent" aria-hidden="true">◆</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </SectionPlain>

        <SectionPlain title="Stack" empty={stackDetail.length === 0 && !project.stack}>
          {stackDetail.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {stackDetail.map((s, idx) => (
                <div key={idx}>
                  <h3 className="text-[0.875rem] font-semibold text-ft-fg-plain mb-1">{s.tech}</h3>
                  <div className="text-[0.8125rem] leading-[1.6] text-ft-fg-plain-soft">{s.reason}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(project.stack || "").split(" · ").map((s) => (
                <span key={s} className="text-[0.625rem] text-ft-fg-plain-soft px-2 py-0.5 border border-ft-line rounded-full">{s}</span>
              ))}
            </div>
          )}
        </SectionPlain>

        <SectionPlain title="Links" empty={!project.projectLinks && !project.href}>
          <div className="flex flex-wrap gap-3">
            {project.projectLinks?.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...externalLinkProps(l.href)}
                className="text-[0.875rem] font-medium text-ft-fg-plain no-underline px-4 py-2 border border-ft-line bg-ft-bg-panel"
              >
                {l.label} <span aria-hidden="true">↗</span>
                {isExternal(l.href) && <span className="sr-only"> (opens in new tab)</span>}
              </a>
            ))}
          </div>
        </SectionPlain>

        <SectionPlain title="Gallery" empty={gallery.length === 0}>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((g, idx) => (
              <figure key={idx} className="flex flex-col gap-2 m-0">
                {g.src ? (
                  <div className="aspect-[16/10] overflow-hidden border border-ft-line bg-ft-bg-panel flex items-center justify-center">
                    <img src={g.src} alt="" className="w-full h-full object-cover block" />
                  </div>
                ) : (
                  <div className="aspect-[16/10] border border-ft-line bg-ft-bg-panel" />
                )}
                <figcaption className="text-[0.75rem] leading-[1.4] text-ft-fg-plain-soft">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </SectionPlain>

        {/* Footer nav: prev / back / next */}
        <div className="mt-16 pt-6 border-t border-ft-line flex items-center justify-between gap-4 text-[0.75rem]">
          <Link to={`/project/${prev.id}`} className="text-ft-dim-plain no-underline"><span aria-hidden="true">←</span> {prev.title}</Link>
          <button onClick={onBack} className="bg-transparent border-none text-ft-dim-plain text-[0.75rem] cursor-pointer underline">
            Back to work
          </button>
          <Link to={`/project/${next.id}`} className="text-ft-dim-plain no-underline text-right">{next.title} <span aria-hidden="true">→</span></Link>
        </div>
        </main>
      </div>
    </div>
  );
}

export function ProjectDetail({ project, onTogglePlain, plain, onBack }: ProjectDetailProps) {
  return plain
    ? <ProjectDetailPlain project={project} onTogglePlain={onTogglePlain} onBack={onBack} />
    : <ProjectDetailGame project={project} onTogglePlain={onTogglePlain} onBack={onBack} />;
}
