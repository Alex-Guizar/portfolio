import { StatLine, FFTPanel, FFTMenuItem, UtilityBar, FFTCharacter } from '@/components/FFTChrome';
import { PixelSprite } from '@/components/PixelSprite';
import { BattleMap } from '@/components/BattleMap';
import { PanelLinkChip } from './PanelLinkChip';
import { PROFILE } from '@/data/profile';
import { STATUS_STYLE } from '@/utils/status';
import type { TogglePlainProps } from '@/types/pages';

export function TacticsGame({ onTogglePlain }: TogglePlainProps) {
  return (
    <div className="bg-ft-bg text-ft-fg min-h-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:border focus:border-ft-accent focus:bg-ft-bg focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-semibold focus:text-ft-fg"
      >
        Skip to main content
      </a>

      <div className="fft-page pt-8 px-10 max-w-container mx-auto">
        <UtilityBar onTogglePlain={onTogglePlain} plain={false} />
      </div>

      <main id="main-content">
        <div className="fft-page px-10 max-w-container mx-auto">
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
              <span aria-hidden="true">━</span> Unit Deployed <span aria-hidden="true">━</span>
            </div>
          </div>
        </div>

        <div className="fft-page pt-8 px-10 max-w-container mx-auto">
          <BattleMap />
        </div>

        <div className="fft-page pt-8 px-10 pb-14 max-w-container mx-auto">

        <div id="profile" className="fft-grid-2col grid grid-cols-[320px_1fr] gap-4 mb-4">
          <FFTPanel title="Unit" cornerStat={`LV. ${new Date().getFullYear() - 2015}`}>
            <div className="flex gap-3 mb-3">
              <div
                className="bg-ft-bg border border-ft-panel-border-dk p-1"
                style={{ boxShadow: `inset 0 0 0 1px var(--color-ft-gold)` }}
              >
                <FFTCharacter scale={1.25} />
              </div>
              <div className="flex-1 text-[0.6875rem]">
                <h3 className="font-cinzel text-[1rem] font-semibold text-ft-panel-accent mb-2 tracking-[1px] uppercase">{PROFILE.name}</h3>
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

        <FFTPanel id="inventory" title={`Inventory · ${PROFILE.work.length} Items Deployed`} cornerStat={<span aria-hidden="true">◆ ◆ ◆</span>} className="mb-4">
          <div>
            {PROFILE.work.map((w) => (
              <FFTMenuItem key={w.id} badge={w.year} to={`/project/${w.id}`}>
                <div className="fft-grid-inv-row grid grid-cols-[auto_1fr_auto] gap-3 items-center">
                  <PixelSprite name="floppy" scale={3} />
                  <div>
                    <h3 className="font-semibold text-ft-panel-fg mb-1">{w.title}</h3>
                    <div className="text-[0.6875rem] text-ft-panel-fg-soft mb-1">{w.blurb}</div>
                    <div className="text-[0.625rem] text-ft-panel-accent tracking-[0.5px]">{w.stack}</div>
                  </div>
                  {w.status && (
                    <span
                      className="fft-status-pill font-cinzel text-[0.625rem] font-semibold tracking-[1.5px] px-2 py-1 border border-current rounded-full uppercase"
                      style={{ color: STATUS_STYLE[w.status].onPanel }}
                    >
                      <span aria-hidden="true">●</span> {w.status}
                    </span>
                  )}
                </div>
              </FFTMenuItem>
            ))}
          </div>
        </FFTPanel>

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

        <FFTPanel id="status" title="Status · Currently" className="mb-4">
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

        <footer className="text-center font-cinzel text-[0.6875rem] font-medium text-ft-dim tracking-[3px] mt-6 uppercase">
          <span
            className="text-ft-accent"
            style={{ animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px var(--color-ft-accent)` }}
            aria-hidden="true"
          >●</span>
          &nbsp;&nbsp;Save Game &nbsp;·&nbsp; {PROFILE.name} &nbsp;·&nbsp; {new Date().getFullYear()}&nbsp;&nbsp;
          <span
            className="text-ft-accent"
            style={{ animation: "ft-pulse 1.6s ease-in-out infinite", textShadow: `0 0 6px var(--color-ft-accent)` }}
            aria-hidden="true"
          >●</span>
        </footer>
        </div>
      </main>
    </div>
  );
}
