import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { getInitialScreenTexture } from './screenTexture';

interface LaptopSceneProps {
  isDark: boolean;
  isVisible: boolean;
  reducedMotion?: boolean;
}

/**
 * 3D Developer Laptop Scene.
 * - Auto-centered & scaled to fit comfortably inside the hero card
 * - Screen oriented directly toward viewer at a slight 3/4 angle
 * - High-contrast graphite materials with subtle keyboard backlight
 * - Emissive screen that stays vivid and readable in all lighting
 * - Contact shadows with NO gray floor slabs
 */
export const LaptopScene: React.FC<LaptopSceneProps> = ({
  isDark,
  isVisible,
  reducedMotion = false,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const lidHingeRef = useRef<THREE.Group>(null);
  const openProgress = useRef<number>(0);
  const [hasTriggeredOpen, setHasTriggeredOpen] = useState(false);

  // Synchronously initialize the high-resolution portfolio canvas texture
  const [texture] = useState<THREE.Texture>(() => getInitialScreenTexture());

  // Optionally check if a custom user image exists without logging console 404
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.src = '/images/portfolio-screen.webp';
    img.onload = () => {
      if (!active) return;
      if (texture) {
        texture.image = img;
        texture.needsUpdate = true;
      }
    };
    img.onerror = () => {
      // Quietly continue with canvas placeholder
    };
    return () => {
      active = false;
    };
  }, [texture]);

  // Trigger opening animation when the card enters viewport
  useEffect(() => {
    if (isVisible) {
      setHasTriggeredOpen(true);
    }
  }, [isVisible]);

  // Materials with useMemo for performance & disposal
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? '#1C211D' : '#323A33',
        metalness: 0.6,
        roughness: 0.45,
      }),
    [isDark]
  );

  const keyboardWellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? '#111512' : '#202621',
        metalness: 0.5,
        roughness: 0.65,
      }),
    [isDark]
  );

  const keyCapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? '#262D28' : '#3A423B',
        roughness: 0.4,
        metalness: 0.35,
        emissive: new THREE.Color('#B6FF4A'),
        emissiveIntensity: isDark ? 0.05 : 0.02,
      }),
    [isDark]
  );

  const trackpadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? '#232924' : '#3B443D',
        metalness: 0.65,
        roughness: 0.35,
      }),
    [isDark]
  );

  // Screen material: emissiveIntensity=1.0 and toneMapped=false ensure screen is never dark!
  const screenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: new THREE.Color('#FFFFFF'),
      emissiveIntensity: 1.0,
      toneMapped: false,
      roughness: 0.2,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  // Clean up materials on unmount
  useEffect(() => {
    return () => {
      bodyMaterial.dispose();
      keyboardWellMaterial.dispose();
      keyCapMaterial.dispose();
      trackpadMaterial.dispose();
      screenMaterial.dispose();
      texture.dispose();
    };
  }, [bodyMaterial, keyboardWellMaterial, keyCapMaterial, trackpadMaterial, screenMaterial, texture]);

  // Frame loop: lid opening ease, idle float, clamped cursor tilt, and subtle screen pan
  useFrame((state, delta) => {
    const { pointer } = state;

    // 1. Lid opening animation: closed (0 rad) -> ~105 deg open (-1.8326 rad)
    if (hasTriggeredOpen && openProgress.current < 1) {
      openProgress.current = Math.min(1, openProgress.current + delta * 0.95);
    }

    // Cubic ease-out
    const t = openProgress.current;
    const easeOut = 1 - Math.pow(1 - t, 3);
    const targetAngle = -THREE.MathUtils.degToRad(105);

    if (lidHingeRef.current) {
      lidHingeRef.current.rotation.x = THREE.MathUtils.lerp(0, targetAngle, easeOut);
    }

    // 2. Cursor-reactive tilt & 3/4 angle default orientation
    // Default 3/4 view: yaw ~18° (0.31 rad), pitch ~7° (0.12 rad) down
    // Clamped motion: yaw within +/-12° (0.21 rad), pitch within +/-6° (0.10 rad)
    if (rootGroupRef.current) {
      const clampedPointerX = THREE.MathUtils.clamp(pointer.x, -1, 1);
      const clampedPointerY = THREE.MathUtils.clamp(pointer.y, -1, 1);

      const targetRotY = 0.31 + clampedPointerX * 0.18;
      const targetRotX = 0.12 - clampedPointerY * 0.09;

      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        0.05
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        0.05
      );
    }

    // 3. Subtle vertical webpage pan to simulate live browsing (skipped if reduced motion)
    if (!reducedMotion && texture) {
      texture.offset.y -= 0.00025;
    }
  });

  return (
    <>
      {/* Low Ambient Light */}
      <ambientLight intensity={isDark ? 0.7 : 0.9} />

      {/* Soft Key Directional Light from upper front-left */}
      <directionalLight
        position={[-3, 4, 3]}
        color="#FFFFFF"
        intensity={isDark ? 1.6 : 2.0}
      />

      {/* Opposite Fill Light for metallic chassis definition */}
      <directionalLight
        position={[3, 1, 2]}
        color={isDark ? '#3A483E' : '#B8C2B4'}
        intensity={0.6}
      />

      {/* Electric Lime Accent Rim Light from behind-right */}
      <pointLight
        position={[3, 2.5, -2]}
        color="#B6FF4A"
        intensity={isDark ? 2.8 : 2.0}
        distance={9}
        decay={2}
      />

      {/* Faint Lime Screen Glow onto Keyboard */}
      <pointLight
        position={[0, 0.4, 0.5]}
        color="#B6FF4A"
        intensity={isDark ? 1.0 : 0.6}
        distance={3}
        decay={2}
      />

      {/* Float Physics */}
      <Float
        speed={1.4}
        rotationIntensity={0.08}
        floatIntensity={0.16}
        floatingRange={[-0.03, 0.03]}
      >
        <Bounds fit observe margin={1.15}>
          {/* Main Laptop Scaling & Placement */}
          <group ref={rootGroupRef} position={[0, -0.15, 0]} scale={[1, 1, 1]}>
            {/* ================= LOWER BASE CHASSIS ================= */}
          <group position={[0, 0, 0]}>
            {/* Main Base Plate */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[3.1, 0.08, 2.05]} />
              <primitive object={bodyMaterial} attach="material" />
            </mesh>

            {/* Front Opening Notch */}
            <mesh position={[0, 0.038, 1.02]}>
              <boxGeometry args={[0.45, 0.015, 0.02]} />
              <meshStandardMaterial color={isDark ? '#0D100E' : '#1A1E1B'} roughness={0.6} />
            </mesh>

            {/* Keyboard Recessed Well */}
            <mesh position={[0, 0.041, -0.3]}>
              <boxGeometry args={[2.64, 0.006, 1.06]} />
              <primitive object={keyboardWellMaterial} attach="material" />
            </mesh>

            {/* Keyboard Keycap Rows */}
            {[-0.68, -0.5, -0.32, -0.14, 0.04].map((z, rowIdx) => (
              <mesh key={rowIdx} position={[0, 0.046, z]}>
                <boxGeometry args={[2.56, 0.008, 0.14]} />
                <primitive object={keyCapMaterial} attach="material" />
              </mesh>
            ))}

            {/* Trackpad */}
            <mesh position={[0, 0.042, 0.58]}>
              <boxGeometry args={[0.96, 0.006, 0.58]} />
              <primitive object={trackpadMaterial} attach="material" />
            </mesh>

            {/* Trackpad Outline Glow Accent */}
            <lineSegments position={[0, 0.046, 0.58]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.965, 0.007, 0.585)]} />
              <lineBasicMaterial
                color="#B6FF4A"
                transparent
                opacity={isDark ? 0.35 : 0.2}
              />
            </lineSegments>

            {/* Bottom Rubber Feet */}
            {[
              [-1.35, -0.045, -0.85],
              [1.35, -0.045, -0.85],
              [-1.35, -0.045, 0.85],
              [1.35, -0.045, 0.85],
            ].map(([x, y, z], idx) => (
              <mesh key={idx} position={[x, y, z]}>
                <cylinderGeometry args={[0.04, 0.04, 0.015, 16]} />
                <meshStandardMaterial color="#0A0D0B" roughness={0.9} />
              </mesh>
            ))}
          </group>

          {/* ================= HINGE & ROTATING DISPLAY LID ================= */}
          {/* Pivot located at the back edge of the base: [0, 0.04, -0.98] */}
          <group ref={lidHingeRef} position={[0, 0.04, -0.98]}>
            {/* Cylindrical Hinge Axis */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 2.3, 16]} />
              <meshStandardMaterial
                color={isDark ? '#0D100E' : '#1A1E1B'}
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>

            {/* Lid Assembly (Extends from Hinge z=0 to z=+2.05 when closed) */}
            <group position={[0, 0.024, 1.025]}>
              {/* Outer Lid Shell */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3.1, 0.048, 2.05]} />
                <primitive object={bodyMaterial} attach="material" />
              </mesh>

              {/* Inner Bezel Background Border (Dark matte frame) */}
              <mesh position={[0, -0.0245, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.96, 1.9]} />
                <meshStandardMaterial color="#0A0C0A" roughness={0.7} />
              </mesh>

              {/* Web Camera Lens Dot (Top Bezel) */}
              <mesh position={[0, -0.026, 0.9]}>
                <cylinderGeometry args={[0.015, 0.015, 0.005, 12]} />
                <meshStandardMaterial
                  color="#000000"
                  roughness={0.1}
                  emissive="#B6FF4A"
                  emissiveIntensity={0.3}
                />
              </mesh>

              {/* Screen Plane: Positioned proud at y=-0.0255 with DoubleSide & toneMapped=false */}
              <mesh position={[0, -0.0255, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.76, 1.725]} />
                <primitive object={screenMaterial} attach="material" />
              </mesh>
            </group>
          </group>
        </group>
        </Bounds>
      </Float>

      {/* Clean Contact Shadow Directly Under Base - NO floor slab */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.35}
        scale={4.5}
        blur={2.5}
        far={2}
        resolution={256}
        color={isDark ? '#000000' : '#202621'}
      />
    </>
  );
};

export default LaptopScene;
