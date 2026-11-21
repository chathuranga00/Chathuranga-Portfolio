import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const isVisibleRef = useRef(false);

  // Smooth springs for cursor followers
  const cursorX = useSpring(-100, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(-100, { damping: 28, stiffness: 350 });
  const ringX = useSpring(-100, { damping: 22, stiffness: 200 });
  const ringY = useSpring(-100, { damping: 22, stiffness: 200 });

  useEffect(() => {
    // Only enable on desktop pointer devices with fine pointer and no reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!hasFinePointer || prefersReducedMotion || isTouch || window.innerWidth < 1024) {
      setIsPointerDevice(false);
      return;
    }

    setIsPointerDevice(true);

    const setVisibleState = (visible: boolean) => {
      if (isVisibleRef.current !== visible) {
        isVisibleRef.current = visible;
        setIsVisible(visible);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check if mouse is within viewport boundaries
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setVisibleState(false);
      } else {
        setVisibleState(true);
      }

      // Check interactive element hover state
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => setVisibleState(false);
    const handleMouseEnter = () => setVisibleState(true);
    const handleBlur = () => setVisibleState(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleBlur);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isPointerDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Floating Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? '#B6FF4A' : 'rgba(182, 255, 74, 0.4)',
          backgroundColor: isHovered ? 'rgba(182, 255, 74, 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-8 h-8 rounded-full border border-accent/40 backdrop-blur-[0.5px]"
      />

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
        }}
        className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#B6FF4A]"
      />
    </div>
  );
};

export default CustomCursor;
