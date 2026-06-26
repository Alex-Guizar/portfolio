import React from 'react';

const SPRITES = {
  // 16x16 developer avatar — hoodie + headphones, palette: skin, hood, hair, screen, outline
  avatar: {
    w: 16, h: 16,
    palette: [null, "#1a1c20", "#3a3f48", "#e8c098", "#5a3920", "#7ee787", "#e8e6df"],
    pixels: [
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
      [0,0,0,1,2,4,4,4,4,4,4,2,1,0,0,0],
      [0,0,1,2,4,4,4,4,4,4,4,4,2,1,0,0],
      [0,1,2,2,4,3,3,4,4,3,3,4,2,2,1,0],
      [0,1,2,4,3,1,1,3,3,1,1,3,4,2,1,0],
      [0,1,2,4,3,3,3,3,3,3,3,3,4,2,1,0],
      [0,1,2,4,3,3,1,3,3,1,3,3,4,2,1,0],
      [0,0,1,2,3,3,3,3,3,3,3,3,2,1,0,0],
      [0,0,1,2,2,3,3,3,3,3,3,2,2,1,0,0],
      [0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    ],
  },
  // 8x8 cursor — chunky pointer
  cursor: {
    w: 8, h: 8,
    palette: [null, "#0b0d10", "#e8e6df"],
    pixels: [
      [1,0,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0],
      [1,2,1,0,0,0,0,0],
      [1,2,2,1,0,0,0,0],
      [1,2,2,2,1,0,0,0],
      [1,2,2,1,1,0,0,0],
      [1,1,1,2,1,0,0,0],
      [0,0,0,1,1,0,0,0],
    ],
  },
  // 8x8 floppy disk
  floppy: {
    w: 8, h: 8,
    palette: [null, "#0b0d10", "#7ee787", "#3a3f48", "#e8e6df"],
    pixels: [
      [0,1,1,1,1,1,1,0],
      [1,4,4,4,4,4,1,1],
      [1,4,3,3,3,4,1,1],
      [1,4,3,3,3,4,1,1],
      [1,4,4,4,4,4,1,1],
      [1,4,1,1,1,4,4,1],
      [1,4,1,2,1,4,4,1],
      [0,1,1,1,1,1,1,0],
    ],
  },
  // 8x8 mail
  mail: {
    w: 8, h: 8,
    palette: [null, "#0b0d10", "#7ee787"],
    pixels: [
      [1,1,1,1,1,1,1,1],
      [1,2,1,2,2,1,2,1],
      [1,2,2,1,1,2,2,1],
      [1,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,1],
      [1,1,1,1,1,1,1,1],
    ],
  },
  // 8x8 heart
  heart: {
    w: 8, h: 8,
    palette: [null, "#0b0d10", "#ff6b9d"],
    pixels: [
      [0,1,1,0,0,1,1,0],
      [1,2,2,1,1,2,2,1],
      [1,2,2,2,2,2,2,1],
      [1,2,2,2,2,2,2,1],
      [0,1,2,2,2,2,1,0],
      [0,0,1,2,2,1,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
  },
  // 8x8 arrow right
  arrow: {
    w: 8, h: 8,
    palette: [null, "#7ee787"],
    pixels: [
      [0,0,0,1,0,0,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,1,1,0,0],
      [1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,0],
      [0,0,0,1,1,1,0,0],
      [0,0,0,1,1,0,0,0],
      [0,0,0,1,0,0,0,0],
    ],
  },
  // 8x8 terminal/window glyph
  term: {
    w: 8, h: 8,
    palette: [null, "#0b0d10", "#7ee787"],
    pixels: [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,2,0,0,0,0,1],
      [1,2,2,0,0,0,0,1],
      [1,0,2,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1],
    ],
  },
  // 16x12 small pixel landscape for hero corner (mountains + sun)
  landscape: {
    w: 16, h: 12,
    palette: [null, "#0b0d10", "#3a3f48", "#7ee787", "#e8c098", "#ff6b9d"],
    pixels: [
      [0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0],
      [0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,5,5,0,0,0],
      [0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,2,2,2,2,0,0,0,0,2,2,0,0],
      [0,0,0,2,2,2,2,2,2,0,0,2,2,2,2,0],
      [0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
      [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    ],
  },
};

export function PixelSprite({ name, scale = 4, style }: { name: keyof typeof SPRITES; scale?: number; style?: React.CSSProperties }) {
  const s = SPRITES[name];
  if (!s) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${s.w}, ${scale}px)`,
        gridTemplateRows: `repeat(${s.h}, ${scale}px)`,
        width: s.w * scale,
        height: s.h * scale,
        imageRendering: "pixelated",
        flex: "0 0 auto",
        ...style,
      }}
      aria-hidden="true"
    >
      {s.pixels.flat().map((p, i) => {
        const background = s.palette[p] ?? "transparent";
        return <div key={i} style={{ background: p ? background : "transparent" }} />;
      })}
    </div>
  );
}

export function IdleAvatar({ scale = 6, style }: { scale?: number; style?: React.CSSProperties }) {
  const [blink, setBlink] = React.useState(false);
  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    function loop() {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      t = setTimeout(loop, 2500 + Math.random() * 2500);
    }
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, []);
  const s = SPRITES.avatar;
  // overwrite the eye row (index 7) with closed eyes when blinking
  const pixels = blink
    ? s.pixels.map((row, i) =>
        i === 7 ? [0, 1, 2, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 2, 1, 0] : row
      )
    : s.pixels;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${s.w}, ${scale}px)`,
        gridTemplateRows: `repeat(${s.h}, ${scale}px)`,
        width: s.w * scale,
        height: s.h * scale,
        imageRendering: "pixelated",
        flex: "0 0 auto",
        ...style,
      }}
      aria-hidden="true"
    >
      {pixels.flat().map((p, i) => {
        const background = s.palette[p] ?? "transparent";
        return <div key={i} style={{ background: p ? background : "transparent" }} />;
      })}
    </div>
  );
}
