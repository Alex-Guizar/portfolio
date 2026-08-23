import { FFTCharacter, FFTPanel, FFTMenuItem } from '@/components/FFTChrome';
import { PixelSprite } from '@/components/PixelSprite';
import { IsoTile } from '@/components/battleMap/IsoTile';
import { PixelLamp } from '@/components/battleMap/PixelLamp';
import { MAP_TILES } from '@/components/battleMap/mapData';
import { PROFILE } from '@/data/profile';

export function BattleMap() {
  return (
    <div className="bm-frame relative w-full rounded border border-ft-panel-border-dk">
      <div
        className="bm-stage relative overflow-hidden rounded-sm shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]"
        style={{
          height: "var(--bm-h, 360px)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, #1a2548 0%, #2a3068 35%, #4a3868 65%, #6a4868 85%, var(--color-ft-bg) 100%)` }}
        />
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 379) % 100;
          const y = ((i * 217) % 30);
          const sz = i % 6 === 0 ? 2 : 1;
          return <div
            key={i}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: sz,
              height: sz,
              background: "#e8f0ff", opacity: 0.45 + (i % 3) * 0.18
            }}
          />;
        })}
        <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="absolute inset-x-0 top-[30%] h-[56px] w-full" shapeRendering="crispEdges">
          <polygon points="0,18 0,10 6,6 12,11 20,4 28,9 36,3 44,8 52,2 60,7 68,5 76,9 84,4 92,8 100,5 100,18" fill="#1a2244" />
          <polygon points="0,18 0,14 8,11 16,13 24,9 32,12 40,8 48,11 56,7 64,11 72,9 80,12 88,8 96,11 100,9 100,18" fill="#0e1530" />
        </svg>

        <div
          className="bm-iso-layer absolute inset-x-0 bottom-0 top-20 origin-[50%_0]"
        >
          {MAP_TILES.map((t, i) => (
            <IsoTile key={i} x={t.x} y={t.y} terrain={t.terrain} height={t.height} variant={t.variant}>
              {t.hasHero && (
                <div className="relative">
                  <div
                    className="absolute left-1/2 font-pixel text-[13px] text-ft-accent -top-6"
                    style={{ textShadow: `0 0 8px var(--color-ft-accent), 1px 1px 0 #000`, animation: "ft-bob 0.8s ease-in-out infinite" }}
                    aria-hidden="true"
                  >▼</div>
                  <FFTCharacter />
                </div>
              )}
              {t.hasTree && (
                <PixelSprite name="tree" scale={3} style={{ filter: `drop-shadow(0 3px 0 rgba(0,0,0,0.5))` }} />
              )}
              {t.hasCrystal && (
                <PixelSprite
                  name="crystal"
                  scale={3}
                  style={{ filter: `drop-shadow(0 0 6px var(--color-ft-mp-blue))`, animation: "ft-crystal 3s ease-in-out infinite" }}
                />
              )}
              {t.hasLamp && <PixelLamp scale={3} />}
              {t.hasChest && (
                <PixelSprite name="chest" scale={3} style={{ filter: `drop-shadow(0 3px 0 rgba(0,0,0,0.5))` }} />
              )}
            </IsoTile>
          ))}
        </div>
      </div>

      <div className="bm-act absolute left-6 bottom-4 z-20 w-[12.5rem]">
        <FFTPanel>
          <h2 className="font-cinzel text-[0.875rem] font-semibold text-ft-panel-fg tracking-[2px] mb-3 flex items-center gap-2 m-0">
            <span className="text-ft-gold text-[0.625rem]" aria-hidden="true">◆</span>
            <span>Act</span>
          </h2>
          {[
            ["About", "#profile", "→ profile"],
            ["Work", "#inventory", "→ inventory"],
            ["Now", "#status", "→ status"],
            ["Contact", PROFILE.email, "→ talk"],
          ].map(([k, href, v]) => (
            <FFTMenuItem key={k} href={href} badge={v}>{k}</FFTMenuItem>
          ))}
        </FFTPanel>
      </div>

      <div className="bm-ct absolute right-6 top-4 z-20 w-[11.5rem]">
        <FFTPanel>
          <h2 className="font-cinzel text-[0.875rem] font-semibold text-ft-panel-fg tracking-[2px] mb-3 flex items-center gap-2 m-0">
            <span className="text-ft-gold text-[0.625rem]" aria-hidden="true">◆</span>
            <span>CT</span>
          </h2>
          <div className="grid gap-2 text-[0.75rem]">
            {[["Brave", 70], ["Faith", 52], ["Speed", 14], ["Move", 4]].map(([k, v]) => (
              <div key={k} className="flex justify-between items-baseline">
                <span className="text-ft-panel-accent font-cinzel text-[0.75rem] font-semibold tracking-[1px] uppercase">{k}</span>
                <span className="tabular-nums text-ft-panel-fg font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </FFTPanel>
      </div>
    </div>
  );
}
