import { Link } from 'react-router-dom';
import { UtilityBar, SectionPlain } from '@/components/FFTChrome';
import { PROFILE } from '@/data/profile';
import { STATUS_STYLE } from '@/utils/status';
import type { TogglePlainProps } from '@/types/pages';

export function TacticsPlain({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="bg-ft-bg text-ft-fg-plain min-h-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:border focus:border-ft-accent focus:bg-ft-bg focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-semibold focus:text-ft-fg-plain"
      >
        Skip to main content
      </a>

      <div className="plain-page pt-8 px-10 pb-16 max-w-[55rem] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        <main id="main-content">
        <div className="plain-hero grid grid-cols-[1fr_auto] gap-6 items-end pb-8 border-b border-ft-line mb-10">
          <div>
            <h1 className="fft-hero-name text-[3.5rem] font-bold m-0 tracking-[-1.5px] text-ft-fg-plain leading-none">{PROFILE.name}</h1>
            <div className="text-[1.125rem] text-ft-fg-plain-soft mt-2">{PROFILE.role} · {PROFILE.location}</div>
            <p className="text-[0.9375rem] text-ft-fg-plain-soft leading-[1.7] max-w-[38.75rem] mt-4 mb-0">{PROFILE.blurb}</p>
          </div>
          <img
            src="/assets/alex-portrait.jpg"
            width={108}
            height={140}
            className="rounded-sm border border-ft-line object-cover"
            alt="Alex Guizar"
          />
        </div>

        <SectionPlain title="About">
          {PROFILE.longBlurb.map((b, i) => <p key={i} className="text-[0.9375rem] leading-[1.8] text-ft-fg-plain-soft mt-0 mb-3">{b}</p>)}
        </SectionPlain>

        <SectionPlain title="Selected Work">
          <div>
            {PROFILE.work.map((w, i) => (
              <Link
                key={w.id}
                to={`/project/${w.id}`}
                className="plain-work-row grid grid-cols-[auto_1fr_100px] gap-5 py-[18px] border-b border-ft-line no-underline text-ft-fg-plain items-center"
              >
                <span className="text-[0.75rem] text-ft-dim-plain w-6">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-[1.125rem] font-semibold m-0">{w.title}</h3>
                    <span className="text-[0.75rem] text-ft-dim-plain">{w.year}</span>
                    {w.status && (
                      <span
                        className="text-[0.625rem] px-2 py-0.5 border border-current rounded-full"
                        style={{ color: STATUS_STYLE[w.status].onDark }}
                      >{w.status}</span>
                    )}
                  </div>
                  <div className="text-[0.8125rem] text-ft-fg-plain-soft mb-2">{w.blurb}</div>
                  <div className="flex gap-2 flex-wrap">
                    {w.stack.split(" · ").map((s) => (
                      <span key={s} className="text-[0.625rem] text-ft-fg-plain-soft px-2 py-0.5 border border-ft-line rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="plain-view-arrow text-[0.75rem] text-ft-dim-plain text-right">view →</span>
              </Link>
            ))}
          </div>
        </SectionPlain>

        <SectionPlain title="Experience">
          {PROFILE.experience.map((e) => (
            <div key={e.id} className="plain-exp-row grid grid-cols-[160px_1fr_1fr] gap-6 py-3 border-b border-ft-line text-[0.875rem]">
              <span className="text-ft-dim-plain">{e.range}</span>
              <span className="text-ft-fg-plain font-semibold">{e.co}</span>
              <span className="text-ft-fg-plain-soft">{e.role}</span>
            </div>
          ))}
        </SectionPlain>

        <SectionPlain title="Now" cornerNote={`Updated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}>
          <ul className="m-0 p-0 list-none grid gap-2">
            {PROFILE.now.map((n, i) => (
              <li key={i} className="flex gap-3 text-[0.9375rem] text-ft-fg-plain-soft leading-[1.6]">
                <span className="text-ft-accent" aria-hidden="true">◆</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </SectionPlain>

        <SectionPlain title="Contact">
          <div className="flex flex-wrap gap-3">
            {PROFILE.links.map((l) => (
              <a key={l.label} href={l.href} className="text-[0.875rem] font-medium text-ft-fg-plain no-underline px-4 py-2 border border-ft-line bg-ft-bg-panel">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </SectionPlain>
        </main>

        <footer className="mt-16 pt-6 border-t border-ft-line text-[0.75rem] text-ft-dim-plain flex justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button onClick={onTogglePlain} className="bg-transparent border-none text-ft-dim-plain text-[0.75rem] cursor-pointer underline">
            <span aria-hidden="true">▶</span> Switch to full version
          </button>
        </footer>
      </div>
    </div>
  );
}
