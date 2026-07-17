import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatLine, FFTPanel, FFTMenuItem, UtilityBar, SectionPlain, FFTCharacter } from '@/components/FFTChrome';
import { PixelSprite } from '@/components/PixelSprite';
import { BattleMap } from '@/components/BattleMap';
import { PROFILE } from '@/data/profile';
import type { ProfileLink } from '@/types/profile';
import type { TogglePlainProps } from '@/types/pages';
import { usePlainMode } from '@/hooks/usePlainMode';
import { externalLinkProps } from '@/utils/links';

function PanelLinkChip({ label, href }: ProfileLink) {
  const [hover, setHover] = useState(false);
  return (
    <a
      key={label}
      href={href}
      {...externalLinkProps(href)}
      className="font-cinzel text-[0.75rem] font-semibold no-underline px-3 py-2 border rounded-sm tracking-[0.5px] transition"
      style={{
        background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, var(--color-ft-panel-header) 100%)`,
        boxShadow: `inset 0 1px 0 var(--color-ft-panel-inner-hi), 0 1px 0 rgba(90,48,24,0.2)`,
        borderColor: hover ? 'var(--color-ft-gold)' : 'var(--color-ft-panel-border-md)',
        color: hover ? 'var(--color-ft-panel-accent)' : 'var(--color-ft-panel-fg)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label} <span className="text-ft-gold">↗</span>
    </a>
  );
}

function TacticsGame({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="bg-ft-bg text-ft-fg min-h-full">
      {/* HERO */}
      <div className="fft-page pt-8 px-10 max-w-container mx-auto">
        <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
        <div className="fft-grid-hero grid grid-cols-[1fr_auto] gap-[2rem] items-end">
          <div>
            <h1 className="fft-hero-name text-[3.5rem] font-extrabold m-0 tracking-[-1.5px] text-ft-fg leading-none">{PROFILE.name}</h1>
            <div className="fft-hero-role text-[1.125rem] text-ft-fg-soft mt-2">{PROFILE.role} · {PROFILE.location}</div>
            <p className="fft-hero-blurb text-[0.875rem] text-ft-fg-soft leading-[1.7] max-w-[38.75rem] mt-4 mb-0">{PROFILE.blurb}</p>
          </div>
          <div
            className="fft-unit-deployed font-cinzel text-[0.8125rem] font-semibold text-ft-accent tracking-[4px] whitespace-nowrap uppercase"
            style={{ textShadow: `0 0 8px color-mix(in srgb, var(--color-ft-accent) 25%, transparent), 1px 1px 0 #000` }}
          >
            ━ Unit Deployed ━
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="fft-page pt-8 px-10 max-w-container mx-auto">
        <BattleMap />
      </div>

      {/* CONTENT */}
      <div className="fft-page pt-8 px-10 pb-14 max-w-container mx-auto">

        {/* UNIT + DESCRIPTION row */}
        <div className="fft-grid-2col grid grid-cols-[320px_1fr] gap-4 mb-4">
          <FFTPanel title="Unit" cornerStat={`LV. ${new Date().getFullYear() - 2015}`}>
            <div className="flex gap-3 mb-3">
              <div
                className="bg-ft-bg border border-ft-panel-border-dk p-1"
                style={{ boxShadow: `inset 0 0 0 1px var(--color-ft-gold)` }}
              >
                <FFTCharacter />
              </div>
              <div className="flex-1 text-[0.6875rem]">
                <div className="font-cinzel text-[1rem] font-semibold text-ft-panel-accent mb-2 tracking-[1px] uppercase">{PROFILE.name}</div>
                <div className="mb-1">
                  <span className="text-ft-panel-dim">Class</span> <span className="text-ft-panel-fg font-semibold">Full-Stack</span>
                </div>
                <div className="mb-1">
                  <span className="text-ft-panel-dim">Region</span> <span className="text-ft-panel-fg font-semibold">{PROFILE.location}</span>
                </div>
                <div>
                  <span className="text-ft-panel-dim">EXP</span> <span className="text-ft-panel-fg font-semibold">{(new Date().getFullYear() - 2015)}y</span>
                </div>
              </div>
            </div>

            <div className="grid gap-1 pt-2 border-t border-ft-panel-inner-hi2">
              <StatLine label="BUILD"  value={920} max={999} color="var(--color-ft-hp-green)" />
              <StatLine label="SHIP"   value={870} max={999} color="var(--color-ft-hp-green)" />
              <StatLine label="DEBUG"  value={950} max={999} color="var(--color-ft-mp-blue)" />
              <StatLine label="DESIGN" value={680} max={999} color="var(--color-ft-ct-yellow)" />
            </div>
          </FFTPanel>

          <FFTPanel title="Description">
            {PROFILE.longBlurb.map((b, i) => (
              <p key={i} className="text-[0.875rem] leading-[1.75] text-ft-panel-fg-soft mt-0 mb-2">
                {b}
              </p>
            ))}
            <div
              className="mt-4 pt-4 border-t border-ft-panel-inner-hi2 flex gap-2 flex-wrap"
            >
              {PROFILE.links.map((l) => (
                <PanelLinkChip key={l.label} {...l} />
              ))}
            </div>
          </FFTPanel>
        </div>

        {/* INVENTORY */}
        <FFTPanel title={`Inventory · ${PROFILE.work.length} Items Deployed`} cornerStat="◆ ◆ ◆" className="mb-4">
          <div>
            {PROFILE.work.map((w) => (
              <FFTMenuItem key={w.id} badge={w.year} to={`/project/${w.id}`}>
                <div className="fft-grid-inv-row grid grid-cols-[auto_1fr_auto] gap-3 items-center">
                  <PixelSprite name="floppy" scale={3} />
                  <div>
                    <div className="font-semibold text-ft-panel-fg mb-1">{w.title}</div>
                    <div className="text-[0.6875rem] text-ft-panel-fg-soft mb-1">{w.blurb}</div>
                    <div className="text-[0.625rem] text-ft-panel-accent tracking-[0.5px]">{w.stack}</div>
                  </div>
                  {w.status && (
                    <span
                      className="fft-status-pill font-cinzel text-[0.625rem] font-semibold tracking-[1.5px] px-2 py-1 border border-current rounded-full uppercase"
                      style={{ color: w.status === "LIVE" ? "#3a7a18" : w.status === "ARCHIVED" ? 'var(--color-ft-panel-dim)' : "#8a5e0a" }}
                    >
                      ● {w.status}
                    </span>
                  )}
                </div>
              </FFTMenuItem>
            ))}
          </div>
        </FFTPanel>

        {/* BATTLE LOG */}
        <FFTPanel title="Battle Log · Career" className="mb-4">
          <div className="relative pl-6">
            <div
              className="absolute left-2 top-1 bottom-1 w-0.5 bg-ft-gold"
              style={{ boxShadow: `0 0 4px color-mix(in srgb, var(--color-ft-gold) 50%, transparent)` }}
            />
            {PROFILE.experience.map((e) => (
              <div key={e.id} className="relative py-3 border-b border-dashed border-ft-panel-inner-hi2">
                <span
                  className="absolute -left-5 top-4 w-2 h-2 bg-ft-gold rotate-45"
                  style={{ boxShadow: `0 0 6px var(--color-ft-gold)` }}
                />
                <div className="fft-grid-bm-row grid grid-cols-[160px_1fr_1fr] gap-4 text-[0.75rem]">
                  <span className="font-cinzel text-[0.75rem] font-semibold text-ft-panel-accent tracking-[1px] uppercase">{e.range}</span>
                  <span className="text-ft-panel-fg font-semibold">{e.co}</span>
                  <span className="text-ft-panel-fg-soft">{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </FFTPanel>

        {/* STATUS */}
        <FFTPanel title="Status · Currently" className="mb-4">
          <div className="fft-grid-status grid grid-cols-2 gap-2">
            {PROFILE.now.map((n, i) => (
              <div
                key={i}
                className="flex gap-2 px-3 py-3 border border-ft-panel-inner-hi2 rounded-sm"
                style={{ background: `linear-gradient(180deg, var(--color-ft-panel-top) 0%, transparent 100%)` }}
              >
                <span className="font-cinzel text-[0.8125rem] font-semibold text-ft-panel-accent tracking-[1px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.875rem] text-ft-panel-fg leading-[1.5]">{n}</span>
              </div>
            ))}
          </div>
        </FFTPanel>

        <div className="text-center font-cinzel text-[0.6875rem] font-medium text-ft-dim tracking-[3px] mt-6 uppercase">
          <span
            className="text-ft-accent"
            style={{ animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px var(--color-ft-accent)` }}
          >●</span>
          &nbsp;&nbsp;Save Game &nbsp;·&nbsp; {PROFILE.name} &nbsp;·&nbsp; {new Date().getFullYear()}&nbsp;&nbsp;
          <span
            className="text-ft-accent"
            style={{ animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px var(--color-ft-accent)` }}
          >●</span>
        </div>
      </div>
    </div>
  );
}

function TacticsPlain({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="bg-ft-bg text-ft-fg-plain min-h-full">
      <div className="plain-page pt-8 px-10 pb-16 max-w-[55rem] mx-auto box-border">
        <UtilityBar onTogglePlain={onTogglePlain} plain />

        <div className="plain-hero grid grid-cols-[1fr_auto] gap-6 items-end pb-8 border-b border-ft-line mb-10">
          <div>
            <h1 className="fft-hero-name text-[3.5rem] font-bold m-0 tracking-[-1.5px] text-ft-fg-plain leading-none">{PROFILE.name}</h1>
            <div className="text-[1.125rem] text-ft-fg-plain-soft mt-2">{PROFILE.role} · {PROFILE.location}</div>
            <p className="text-[0.9375rem] text-ft-fg-plain-soft leading-[1.7] max-w-[38.75rem] mt-4 mb-0">{PROFILE.blurb}</p>
          </div>
          <img src="/assets/character.png" width={66} height={117} style={{ imageRendering: "pixelated", opacity: 0.85 }} alt="" />
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
                    <span className="text-[1.125rem] font-semibold">{w.title}</span>
                    <span className="text-[0.75rem] text-ft-dim-plain">{w.year}</span>
                    {w.status && (
                      <span
                        className="text-[0.625rem] px-2 py-0.5 border border-current rounded-full"
                        style={{ color: w.status === "LIVE" ? 'var(--color-ft-hp-green)' : 'var(--color-ft-dim-plain)' }}
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
                <span className="text-ft-accent">◆</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </SectionPlain>

        <SectionPlain title="Contact">
          <div className="flex flex-wrap gap-3">
            {PROFILE.links.map((l) => (
              <a key={l.label} href={l.href} className="text-[0.875rem] font-medium text-ft-fg-plain no-underline px-4 py-2 border border-ft-line bg-ft-bg-panel">
                {l.label} ↗
              </a>
            ))}
          </div>
        </SectionPlain>

        <div className="mt-16 pt-6 border-t border-ft-line text-[0.75rem] text-ft-dim-plain flex justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <button onClick={onTogglePlain} className="bg-transparent border-none text-ft-dim-plain text-[0.75rem] cursor-pointer underline">
            ▶ Switch to full version
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const { plain, toggle } = usePlainMode();
  return plain
    ? <TacticsPlain onTogglePlain={toggle} />
    : <TacticsGame onTogglePlain={toggle} />;
}
