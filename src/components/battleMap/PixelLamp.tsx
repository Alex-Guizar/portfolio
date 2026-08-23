import { PixelSprite } from '@/components/PixelSprite';

/**
 * The battle-map lamp is a plain PixelSprite plus a warm ambient glow behind
 * it — the one map prop that needs more than just a pixel grid + filter.
 */
export function PixelLamp({ scale = 3 }: { scale?: number }) {
  return (
    <div className="relative inline-block">
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -scale * 3,
          background: `radial-gradient(circle, rgba(255,208,96,0.5) 0%, rgba(255,208,96,0.15) 35%, transparent 65%)`,
        }}
      />
      <PixelSprite
        name="lamp"
        scale={scale}
        style={{ filter: `drop-shadow(0 ${scale}px 0 rgba(0,0,0,0.5))` }}
      />
    </div>
  );
}
