'use client';

/**
 * AmbientLight — multi-chromatic atmospheric background lighting layer.
 * Renders large blurred colorful radial gradients (Indigo, Rose, Cyan, Emerald, Violet)
 * to provide a rich, luminous, neat backdrop.
 */
export function AmbientLight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Top-left: subtle warm amber bloom */}
      <div
        className="absolute -top-[15%] -left-[10%] h-[65vh] w-[55vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.07) 0%, rgba(251, 146, 60, 0.03) 45%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '0s',
        }}
      />

      {/* Top-right: soft warm orange bloom */}
      <div
        className="absolute -top-[10%] right-[0%] h-[60vh] w-[50vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.07) 0%, rgba(251, 146, 60, 0.03) 45%, transparent 70%)',
          filter: 'blur(110px)',
          animationDelay: '3s',
        }}
      />

      {/* Center: delicate peach-orange bloom */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 h-[45vh] w-[55vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.06) 0%, rgba(245, 158, 11, 0.02) 50%, transparent 70%)',
          filter: 'blur(120px)',
          animationDelay: '6s',
        }}
      />

      {/* Bottom-right: gentle amber glow */}
      <div
        className="absolute bottom-[5%] -right-[5%] h-[55vh] w-[45vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.05) 0%, rgba(249, 115, 22, 0.02) 45%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '4s',
        }}
      />

      {/* Bottom-left: warm soft orange bloom */}
      <div
        className="absolute bottom-[10%] -left-[5%] h-[50vh] w-[45vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.05) 0%, rgba(251, 146, 60, 0.02) 45%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

