import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LaptopScene } from './LaptopScene';

export interface Hero3DCanvasProps {
  isDark: boolean;
  isVisible: boolean;
  reducedMotion?: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  isDark,
  isVisible,
  reducedMotion = false,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.5], fov: 35 }}
      dpr={[1, 1.5]} // Capped DPR to ensure smooth 60fps across high-resolution displays
      frameloop={isVisible ? 'always' : 'never'} // Pauses draw loop when scrolled out of view
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full select-none"
    >
      <Suspense fallback={null}>
        <LaptopScene isDark={isDark} isVisible={isVisible} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
};

export default Hero3DCanvas;
