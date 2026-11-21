import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { useTheme } from '@/hooks/useTheme';

// Lazy load the 3D canvas so it doesn't block initial paint
const Hero3DCanvas = lazy(() => import('./Hero3DCanvas'));

interface HeroVisualProps {
  className?: string;
}

class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('3D Canvas encountered an issue, falling back to vector view:', error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ className = '' }) => {
  const { canRender3D, reducedMotion } = useDeviceCapabilities();
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Listen for WebGL context loss
  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasError(true);
    };
    window.addEventListener('webglcontextlost', handleContextLost);
    return () => window.removeEventListener('webglcontextlost', handleContextLost);
  }, []);

  // Pause 3D frame rendering when the Hero is scrolled out of the viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Lightweight CSS/SVG laptop mockup fallback for mobile, reduced-motion, or low-power devices
  const renderFallback = () => (
    <div className="w-full h-full pt-12 pb-10 px-4 md:px-6 flex items-center justify-center pointer-events-none select-none">
      <div className="w-full max-w-[270px] sm:max-w-[340px] flex flex-col items-center">
        {/* Screen Lid Assembly */}
        <div className="w-full aspect-[16/10] rounded-t-xl bg-[#0F1210] border-2 border-[#242C26] p-2 relative shadow-2xl overflow-hidden flex flex-col justify-between">
          {/* Top Bezel Webcam */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-[#B6FF4A]/60" />

          {/* Inner Screen Display (Portfolio Mockup) */}
          <div className="w-full h-full rounded-lg bg-[#090B0A] border border-border/40 p-3 flex flex-col justify-between overflow-hidden relative">
            {/* Screen Top Bar */}
            <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-[9px] text-copy">CHATHURANGA</span>
                <span className="w-1 h-1 rounded-full bg-accent" />
              </div>
              <div className="flex gap-1">
                <span className="w-6 h-1.5 rounded bg-card border border-border/60" />
                <span className="w-6 h-1.5 rounded bg-card border border-border/60" />
              </div>
            </div>

            {/* Screen Hero Headline Mockup */}
            <div className="my-auto space-y-1.5">
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[7px] font-mono text-accent">
                <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                <span>HELLO, I'M CHATHURANGA</span>
              </div>
              <div className="font-display font-bold text-[11px] text-copy leading-tight">
                Building Digital <span className="text-accent">Experiences.</span>
              </div>
              <div className="h-1 w-24 bg-copy-secondary/40 rounded" />
            </div>

            {/* Screen Action Buttons Mockup */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-accent text-[8px] font-bold text-[#090B0A]">
                Explore
              </span>
              <span className="px-2 py-0.5 rounded bg-card border border-border text-[8px] text-copy-secondary">
                Connect
              </span>
            </div>
          </div>
        </div>

        {/* Lower Base Chassis */}
        <div className="w-[108%] h-3.5 rounded-b-xl bg-[#1C211D] border-t border-[#2D3630] border-b-2 border-b-black/80 shadow-md relative flex justify-center">
          {/* Front Opening Notch */}
          <div className="w-10 h-1 rounded-b bg-[#0E110F]" />
        </div>
        {/* Subtle Base Shadow */}
        <div className="w-[90%] h-2 bg-black/40 blur-md rounded-full mt-1" />
      </div>
    </div>
  );

  const is3DActive = canRender3D && !hasError;
  const pillLabel = is3DActive ? '3D Active' : (reducedMotion ? '2D View' : 'Vector Core');

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[640px] aspect-[5/4] sm:aspect-[4/3] self-center overflow-visible select-none ${className}`}
    >
      {/* Outer Atmospheric Glow extending softly past the frame */}
      <div className="absolute inset-4 rounded-3xl bg-[#B6FF4A]/5 blur-3xl -z-10 pointer-events-none" />

      {/* Frame Base Plate & Decorative Backdrop (Clipped only for the subtle grid & corner marks) */}
      <div className="absolute inset-0 rounded-3xl bg-[#141914]/60 backdrop-blur-md border border-[#252C26] overflow-hidden pointer-events-none shadow-2xl">
        {/* Subtle internal grid texture (low opacity, clipped inside frame) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #B6FF4A 1px, transparent 1px),
              linear-gradient(to bottom, #B6FF4A 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        {/* 4 Faint Lime L-bracket Corner Marks */}
        <svg className="absolute top-3 left-3 w-3 h-3 text-[#B6FF4A]/35" viewBox="0 0 12 12" fill="none">
          <path d="M1 11V1H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg className="absolute top-3 right-3 w-3 h-3 text-[#B6FF4A]/35" viewBox="0 0 12 12" fill="none">
          <path d="M11 11V1H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-3 left-3 w-3 h-3 text-[#B6FF4A]/35" viewBox="0 0 12 12" fill="none">
          <path d="M1 1V11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg className="absolute bottom-3 right-3 w-3 h-3 text-[#B6FF4A]/35" viewBox="0 0 12 12" fill="none">
          <path d="M11 1V11H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating Top Label Row (No divider lines, absolute, z-10, pointer-events-none) */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF4A] shadow-[0_0_6px_rgba(182,255,74,0.8)] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#929A91] whitespace-nowrap">
            Developer Workspace
          </span>
        </div>
        <span className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.08em] text-[#B6FF4A] border border-[#B6FF4A]/40 bg-[#B6FF4A]/10 px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
          {pillLabel}
        </span>
      </div>

      {/* 3D Canvas / Content Layer */}
      {is3DActive ? (
        <div className="absolute inset-0 pt-12 pb-10 px-4 md:px-6 overflow-visible flex items-center justify-center">
          <CanvasErrorBoundary
            fallback={renderFallback()}
            onError={() => setHasError(true)}
          >
            <Suspense fallback={renderFallback()}>
              <Hero3DCanvas
                isDark={isDark}
                isVisible={isVisible}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      ) : (
        renderFallback()
      )}

      {/* Floating Bottom Label Row (No divider lines, absolute, z-10, pointer-events-none, hidden below 400px) */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 hidden min-[400px]:flex items-center justify-between z-10 pointer-events-none">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#929A91] whitespace-nowrap">
          Cursor Reactive
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#929A91] whitespace-nowrap">
          Scroll to pause
        </span>
      </div>
    </div>
  );
};

export default HeroVisual;
