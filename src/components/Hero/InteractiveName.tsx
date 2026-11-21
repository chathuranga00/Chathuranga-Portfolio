import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profileData } from '@/data/profile';

export const InteractiveName: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Words split for natural wrapping at the space on mobile
  const words = profileData.displayName.split(' ');

  useEffect(() => {
    // Proximity effect is desktop only with fine pointer and no reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!hasFinePointer || isTouch || shouldReduceMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let isHovering = false;
    let mouseX = -1000;
    let mouseY = -1000;

    // Current smoothed influence per letter
    const currentFactors = new Float32Array(lettersRef.current.length);

    const updatePhysics = () => {
      let isStillMoving = false;
      const radius = 120; // 120px interaction radius

      for (let i = 0; i < lettersRef.current.length; i++) {
        const letter = lettersRef.current[i];
        if (!letter) continue;

        let targetFactor = 0;
        if (isHovering) {
          const rect = letter.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;

          const dx = mouseX - letterCenterX;
          const dy = mouseY - letterCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            targetFactor = Math.pow(1 - dist / radius, 1.5);
          }
        }

        // Smoothly interpolate current factor to target factor
        currentFactors[i] += (targetFactor - currentFactors[i]) * 0.18;

        if (Math.abs(targetFactor - currentFactors[i]) > 0.002) {
          isStillMoving = true;
        }

        const factor = currentFactors[i];
        // Variable weight range: 500 at rest up to 700 on hover proximity
        const weight = Math.round(500 + factor * 200);
        // Vertical lift: up to 4px
        const lift = -factor * 4;

        letter.style.setProperty('--letter-weight', `${weight}`);
        letter.style.setProperty('--letter-lift', `${lift.toFixed(2)}px`);
      }

      if (isHovering || isStillMoving) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        // Reset and stop loop when mouse has left and animation settled
        for (let i = 0; i < lettersRef.current.length; i++) {
          const letter = lettersRef.current[i];
          if (letter) {
            letter.style.setProperty('--letter-weight', '500');
            letter.style.setProperty('--letter-lift', '0px');
            currentFactors[i] = 0;
          }
        }
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isHovering = true;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  // Keep track of the running letter index for staggered entrance
  let globalLetterIndex = 0;

  return (
    <div className="mb-8 w-full select-text">
      {/* Tiny Mono Intro Label */}
      <div className="flex items-center gap-2 mb-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-copy-secondary">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span>{profileData.heroGreeting}</span>
      </div>

      {/* Main Distinctive Display Name */}
      <div
        ref={containerRef}
        className="font-display font-medium text-copy tracking-[-0.02em] leading-[1.08] text-[clamp(28px,4vw,52px)] flex flex-wrap items-baseline gap-x-[0.32em] cursor-default"
        aria-label={profileData.displayName}
      >
        {/* Hidden SEO & Screen-Reader accessible plain text */}
        <span className="sr-only">{profileData.displayName}</span>

        {/* Word and Letter Staggered Spans */}
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => {
              const letterIndex = globalLetterIndex++;
              return (
                <span
                  key={charIndex}
                  className="inline-block overflow-hidden align-baseline py-1 -my-1"
                >
                  <motion.span
                    ref={(el) => {
                      lettersRef.current[letterIndex] = el;
                    }}
                    aria-hidden="true"
                    initial={{ y: shouldReduceMotion ? 0 : '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                      delay: shouldReduceMotion ? 0 : 0.08 + letterIndex * 0.04,
                    }}
                    style={{
                      fontVariationSettings: "'wght' var(--letter-weight, 500)",
                      fontWeight: 'var(--letter-weight, 500)',
                      transform: 'translateY(var(--letter-lift, 0px)) translateZ(0)',
                      willChange: 'transform, font-weight',
                    }}
                    className="inline-block transition-colors duration-200"
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InteractiveName;
