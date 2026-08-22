import type { ScreenshotPlaceholderProps } from '@/types/projectDetail';

export function ScreenshotPlaceholder({ project }: ScreenshotPlaceholderProps) {
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
