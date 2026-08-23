import type { FFTCharacterProps } from '@/types/fftChrome';

export function FFTCharacter({ scale = 1, style }: FFTCharacterProps) {
  return (
    <img
      src="/assets/fft-serge-2x.png"
      width={44 * scale}
      height={78 * scale}
      alt="Chrono Cross's Serge in Final Fantasy Tactics style"
      className="block"
      style={{
        imageRendering: 'pixelated',
        filter: `drop-shadow(0 ${scale * 2}px 0 rgba(0,0,0,0.55))`,
        ...style,
      }}
    />
  );
}
