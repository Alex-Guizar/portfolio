import { Link } from 'react-router-dom';
import { UtilityBar, SectionPlain } from '@/components/FFTChrome';
import { Paragraphs } from './Paragraphs';
import { getProjectViewModel } from './projectViewModel';
import { PROFILE } from '@/data/profile';
import { externalLinkProps, isExternal } from '@/utils/links';
import { STATUS_STYLE } from '@/utils/status';
import type { ProjectDetailVariantProps } from '@/types/projectDetail';

export function ProjectDetailPlain({ project, onTogglePlain, onBack }: ProjectDetailVariantProps) {
  const { index, prev, next, primary, secondary, metrics, stackDetail, gallery } = getProjectViewModel(project);

  return (
    <div className="bg-ft-bg text-ft-fg-plain min-h-full">
      <div className="plain-page pt-8 px-10 pb-16 max-w-[55rem] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        <div className="flex items-center justify-between gap-4 mb-8 text-[0.75rem] text-ft-dim-plain">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm border border-ft-line bg-transparent px-3 py-2 text-[0.75rem] font-semibold text-ft-fg-plain transition cursor-pointer"
          >
            <span aria-hidden="true">←</span> Back to work
          </button>
          <span className="uppercase tracking-[0.15em]">{String(index + 1).padStart(2, "0")} of {String(PROFILE.work.length).padStart(2, "0")}</span>
        </div>

        <main>
        <div className="pb-8 border-b border-ft-line mb-10">
          <div className="flex items-center gap-3 mb-3">
            {project.status && (
              <span
                className="text-[0.625rem] px-2 py-0.5 border border-current rounded-full uppercase tracking-[0.1em]"
                style={{ color: STATUS_STYLE[project.status].onDark }}
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

        {project.screenshot && (
          <div className="mb-10 overflow-hidden border border-ft-line bg-ft-bg-panel">
            <img src={project.screenshot} alt={`${project.title} screenshot`} className="w-full block" />
          </div>
        )}

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
          <Paragraphs items={project.problem} variant="plain" />
        </SectionPlain>

        <SectionPlain title="The Approach" empty={!project.approach}>
          <Paragraphs items={project.approach} variant="plain" />
        </SectionPlain>

        <SectionPlain title="The Outcome" empty={!project.outcome && metrics.length === 0}>
          <Paragraphs items={project.outcome} variant="plain" />
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
