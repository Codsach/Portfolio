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
      {/* Top-left: vibrant indigo-violet bloom */}
      <div
        className="absolute -top-[15%] -left-[10%] h-[65vh] w-[55vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '0s',
        }}
      />

      {/* Top-right: energetic rose-coral bloom */}
      <div
        className="absolute -top-[10%] right-[0%] h-[60vh] w-[50vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.12) 0%, rgba(251, 146, 60, 0.06) 40%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '3s',
        }}
      />

      {/* Center: ocean cyan bloom */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 h-[45vh] w-[55vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.10) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)',
          filter: 'blur(110px)',
          animationDelay: '6s',
        }}
      />

      {/* Bottom-right: spring emerald bloom */}
      <div
        className="absolute bottom-[5%] -right-[5%] h-[55vh] w-[45vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.06) 45%, transparent 70%)',
          filter: 'blur(95px)',
          animationDelay: '4s',
        }}
      />

      {/* Bottom-left: warm amber-violet bloom */}
      <div
        className="absolute bottom-[10%] -left-[5%] h-[50vh] w-[45vw] rounded-full animate-ambient-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.10) 0%, rgba(139, 92, 246, 0.06) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

