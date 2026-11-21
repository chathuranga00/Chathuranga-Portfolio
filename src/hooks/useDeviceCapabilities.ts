import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  canRender3D: boolean;
  isMobile: boolean;
  isTouch: boolean;
  hasWebGL: boolean;
  reducedMotion: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    return {
      canRender3D: false,
      isMobile: false,
      isTouch: false,
      hasWebGL: true,
      reducedMotion: false,
    };
  });

  useEffect(() => {
    // 1. Detect WebGL support
    let webglSupported = false;
    try {
      const canvas = document.createElement('canvas');
      webglSupported = Boolean(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      webglSupported = false;
    }

    // 2. Detect touch capability
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    // 3. Detect mobile viewport width
    const isMobileViewport = window.innerWidth < 768;

    // 4. Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 3D is enabled only on desktop non-touch screens with WebGL and no reduced motion request
    const enable3D =
      webglSupported &&
      !isMobileViewport &&
      !isTouchDevice &&
      !prefersReducedMotion;

    setCapabilities({
      canRender3D: enable3D,
      isMobile: isMobileViewport,
      isTouch: isTouchDevice,
      hasWebGL: webglSupported,
      reducedMotion: prefersReducedMotion,
    });

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setCapabilities((prev) => ({
        ...prev,
        isMobile: mobile,
        canRender3D: prev.hasWebGL && !mobile && !prev.isTouch && !prev.reducedMotion,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
