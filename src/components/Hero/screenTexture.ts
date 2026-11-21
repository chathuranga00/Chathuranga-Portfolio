import * as THREE from 'three';

/**
 * Universal cross-browser rounded rectangle helper.
 * Uses standard quadraticCurveTo, ensuring 100% compatibility across all browsers.
 */
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const maxR = Math.min(w / 2, h / 2);
  const radius = Math.min(r, maxR);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Creates a high-fidelity placeholder CanvasTexture for the laptop screen
 * mimicking the CHATHURANGA portfolio hero interface.
 */
export function createPortfolioPlaceholderTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1200; // 16:10 aspect ratio
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // 1. Dark Background with subtle ambient gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1200);
  bgGrad.addColorStop(0, '#090B0A');
  bgGrad.addColorStop(0.5, '#0E1310');
  bgGrad.addColorStop(1, '#090B0A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1920, 1200);

  // 2. Subtle Background Engineering Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1.5;
  const gridSize = 60;
  for (let x = 0; x < 1920; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1200);
    ctx.stroke();
  }
  for (let y = 0; y < 1200; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1920, y);
    ctx.stroke();
  }

  // 3. Ambient Electric Lime Radial Glow on top right
  const glow = ctx.createRadialGradient(1450, 400, 50, 1450, 400, 600);
  glow.addColorStop(0, 'rgba(182, 255, 74, 0.14)');
  glow.addColorStop(1, 'rgba(182, 255, 74, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(800, 0, 1120, 900);

  // 4. Navigation Bar
  ctx.fillStyle = 'rgba(21, 26, 23, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, 120, 40, 1680, 72, 36);
  ctx.fill();
  ctx.stroke();

  // Brand Logo
  ctx.fillStyle = '#F5F7F2';
  ctx.font = 'bold 30px "Space Grotesk", system-ui, -apple-system, sans-serif';
  ctx.fillText('CHATHURANGA', 160, 87);

  // Pulsing Dot
  ctx.fillStyle = '#B6FF4A';
  ctx.beginPath();
  ctx.arc(390, 78, 6, 0, Math.PI * 2);
  ctx.fill();

  // Navigation Links
  const links = ['Home', 'About', 'Expertise', 'Projects', 'Code', 'Research', 'Contact'];
  let linkX = 700;
  links.forEach((link, idx) => {
    if (idx === 0) {
      // Active link pill
      ctx.fillStyle = '#B6FF4A';
      drawRoundRect(ctx, linkX - 16, 54, 76, 44, 22);
      ctx.fill();
      ctx.fillStyle = '#090B0A';
      ctx.font = 'bold 18px "Inter", system-ui, sans-serif';
      ctx.fillText(link, linkX, 82);
    } else {
      ctx.fillStyle = '#A0AAA0';
      ctx.font = '500 18px "Inter", system-ui, sans-serif';
      ctx.fillText(link, linkX, 82);
    }
    linkX += 105;
  });

  // Action CTA button on right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.strokeStyle = '#B6FF4A';
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, 1580, 52, 180, 48, 24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#B6FF4A';
  ctx.font = '600 16px "Inter", system-ui, sans-serif';
  ctx.fillText('Download CV', 1618, 82);

  // 5. Hero Badge
  ctx.fillStyle = 'rgba(182, 255, 74, 0.1)';
  ctx.strokeStyle = 'rgba(182, 255, 74, 0.35)';
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, 160, 220, 480, 46, 23);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#B6FF4A';
  ctx.beginPath();
  ctx.arc(188, 243, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#B6FF4A';
  ctx.font = 'bold 15px "Space Grotesk", monospace';
  ctx.fillText("HELLO, I'M CHATHURANGA SANDARUWAN", 208, 248);

  // 6. Large Editorial Headline
  ctx.fillStyle = '#F5F7F2';
  ctx.font = 'bold 72px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText('Building Digital Experiences', 160, 360);
  ctx.fillText('That Make a ', 160, 450);

  const measure = ctx.measureText('That Make a ');
  ctx.fillStyle = '#B6FF4A';
  ctx.fillText('Difference.', 160 + measure.width, 450);

  // Accent underline below "Difference."
  ctx.fillStyle = 'rgba(182, 255, 74, 0.5)';
  ctx.fillRect(160 + measure.width, 465, 380, 6);

  // 7. Hero Subtitle
  ctx.fillStyle = '#A0AAA0';
  ctx.font = '300 28px "Inter", system-ui, sans-serif';
  ctx.fillText('I design and develop modern web applications, intelligent', 160, 540);
  ctx.fillText('software solutions and intuitive digital experiences.', 160, 580);

  // 8. Info Badges
  ctx.fillStyle = 'rgba(21, 26, 23, 0.9)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  // Location
  drawRoundRect(ctx, 160, 640, 220, 48, 24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#F5F7F2';
  ctx.font = '500 18px "Inter", system-ui, sans-serif';
  ctx.fillText('📍 Based in Sri Lanka', 185, 671);

  // Education
  drawRoundRect(ctx, 400, 640, 380, 48, 24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#F5F7F2';
  ctx.fillText('🎓 Computer Science Undergraduate', 425, 671);

  // 9. Buttons
  // Primary CTA Button
  ctx.fillStyle = '#B6FF4A';
  drawRoundRect(ctx, 160, 730, 260, 64, 18);
  ctx.fill();
  ctx.fillStyle = '#090B0A';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText('Explore My Work  →', 195, 770);

  // Secondary CTA Button
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, 440, 730, 220, 64, 18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#F5F7F2';
  ctx.font = '600 20px "Space Grotesk", sans-serif';
  ctx.fillText("Let's Connect", 485, 770);

  // 10. Featured Project Preview Bento Blocks on Right
  ctx.fillStyle = 'rgba(21, 26, 23, 0.9)';
  ctx.strokeStyle = 'rgba(182, 255, 74, 0.3)';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, 1200, 240, 560, 560, 32);
  ctx.fill();
  ctx.stroke();

  // Project Card Header inside screen
  ctx.fillStyle = 'rgba(182, 255, 74, 0.15)';
  drawRoundRect(ctx, 1230, 270, 160, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#B6FF4A';
  ctx.font = 'bold 14px "Space Grotesk", monospace';
  ctx.fillText('FEATURED WORK', 1255, 294);

  ctx.fillStyle = '#F5F7F2';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText('LabAttend Platform', 1230, 360);

  ctx.fillStyle = '#A0AAA0';
  ctx.font = '400 18px "Inter", sans-serif';
  ctx.fillText('Academic laboratory attendance & session management', 1230, 400);
  ctx.fillText('actively running at NSBM Green University.', 1230, 428);

  // Mock code / metric tiles
  const metrics = [
    { label: 'STACK', val: 'React · Spring Boot · Supabase' },
    { label: 'METRIC', val: 'Real-time Student QR Scanning' },
    { label: 'STATUS', val: 'Production Ready' },
  ];
  let metricY = 475;
  metrics.forEach((m) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    drawRoundRect(ctx, 1230, metricY, 500, 58, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#B6FF4A';
    ctx.font = 'bold 12px "Space Grotesk", monospace';
    ctx.fillText(m.label, 1250, metricY + 24);

    ctx.fillStyle = '#F5F7F2';
    ctx.font = '500 16px "Inter", sans-serif';
    ctx.fillText(m.val, 1250, metricY + 46);
    metricY += 72;
  });

  // 11. Bottom Technical Terminal Line
  ctx.fillStyle = 'rgba(182, 255, 74, 0.7)';
  ctx.font = '14px monospace';
  ctx.fillText('// CHATHURANGA.DEV — LIVE WORKSPACE PREVIEW', 160, 1140);
  ctx.fillStyle = '#A0AAA0';
  ctx.fillText('REACT THREE FIBER · 1.5x DPR · GPU ACCELERATED', 1280, 1140);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Initializes screen texture synchronously with high-res procedural canvas,
 * and seamlessly swaps if a custom /images/portfolio-screen.webp image exists.
 */
export function getInitialScreenTexture(): THREE.Texture {
  return createPortfolioPlaceholderTexture();
}
