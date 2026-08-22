import { Link } from 'react-router-dom';
import { FFTPanel, FFTMenuItem, UtilityBar } from '@/components/FFTChrome';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { StatTile } from './StatTile';
import { MetricCallout } from './MetricCallout';
import { ProjectSection } from './ProjectSection';
import { Paragraphs } from './Paragraphs';
import { StatusPill } from './StatusPill';
import { getProjectViewModel } from './projectViewModel';
import { PROFILE } from '@/data/profile';
import { externalLinkProps, isExternal } from '@/utils/links';
import type { ProjectDetailVariantProps } from '@/types/projectDetail';

export function ProjectDetailGame({ project, onTogglePlain, onBack }: ProjectDetailVariantProps) {
  const { index, prev, next, primary, secondary, metrics, stackDetail, gallery } = getProjectViewModel(project);

  return (
    <div className="min-h-full bg-ft-bg text-ft-fg">
      <div className="fft-page px-10 pt-8 pb-14 max-w-container mx-auto box-border">

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
        <div className="fft-grid-project-hero grid grid-cols-[1.6fr_1fr] gap-4 mb-4">
          <FFTPanel>
            <div>
              <ScreenshotPlaceholder project={project} />
            </div>
          </FFTPanel>

          <FFTPanel title="Item" cornerStat={`#${String(index + 1).padStart(2, "0")} of ${String(PROFILE.work.length).padStart(2, "0")}`}>
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

        <div className="fft-stat-strip flex flex-wrap gap-4 mb-4">
          <StatTile label="ROLE" value={project.role} />
          <StatTile label="DURATION" value={project.duration} />
          <StatTile label="TEAM" value={project.team} />
          <StatTile label="STACK" value={project.stack} />
        </div>

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
