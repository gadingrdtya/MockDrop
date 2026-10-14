// Generates crisp canvas screenshots as data URLs for offline defaults

export function createDefaultScreen(
  theme: 'mobile-dark' | 'tablet-portrait' | 'tablet-landscape' | 'desktop-dark' | 'desktop-dashboard'
): string {
  const canvas = document.createElement('canvas');
  let w = 2064;
  let h = 2752;

  if (theme === 'mobile-dark') {
    w = 1179;
    h = 2556;
  } else if (theme === 'tablet-landscape') {
    // Galaxy Tab S9 Ultra 16:10
    w = 2960;
    h = 1848;
  } else if (theme === 'tablet-portrait') {
    // iPad Pro M4 / iPad Air 3:4 portrait
    w = 2064;
    h = 2752;
  } else {
    w = 2560;
    h = 1600;
  }

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return '';

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (theme === 'mobile-dark') {
    // Elegant Dark SaaS Mobile app
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Status bar time
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${Math.floor(w * 0.045)}px -apple-system, Inter, sans-serif`;
    ctx.fillText('9:41', w * 0.09, h * 0.05);

    // Header greeting
    ctx.fillStyle = '#A3A3A3';
    ctx.font = `500 ${Math.floor(w * 0.038)}px Inter, sans-serif`;
    ctx.fillText('WELCOME BACK', w * 0.08, h * 0.12);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.07)}px Inter, sans-serif`;
    ctx.fillText('MockDrop Analytics', w * 0.08, h * 0.17);

    // Card 1: Balance / Stats
    ctx.fillStyle = '#171717';
    roundRect(ctx, w * 0.08, h * 0.21, w * 0.84, h * 0.22, 32);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `500 ${Math.floor(w * 0.035)}px Inter, sans-serif`;
    ctx.fillText('TOTAL REACH', w * 0.14, h * 0.26);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.09)}px Inter, sans-serif`;
    ctx.fillText('148,290', w * 0.14, h * 0.32);

    ctx.fillStyle = '#10B981';
    ctx.font = `600 ${Math.floor(w * 0.038)}px Inter, sans-serif`;
    ctx.fillText('+24.8% vs last month', w * 0.14, h * 0.38);

    // Chart mock
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6;
    ctx.beginPath();
    const points = [
      [w * 0.14, h * 0.54],
      [w * 0.28, h * 0.50],
      [w * 0.42, h * 0.52],
      [w * 0.56, h * 0.46],
      [w * 0.70, h * 0.48],
      [w * 0.84, h * 0.42]
    ];
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt[0], pt[1]);
      else ctx.lineTo(pt[0], pt[1]);
    });
    ctx.stroke();

    // List items
    for (let i = 0; i < 3; i++) {
      const y = h * (0.60 + i * 0.11);
      ctx.fillStyle = '#171717';
      roundRect(ctx, w * 0.08, y, w * 0.84, h * 0.09, 24);
      ctx.fill();
      ctx.strokeStyle = '#262626';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `600 ${Math.floor(w * 0.04)}px Inter, sans-serif`;
      ctx.fillText(i === 0 ? 'Dribbble Showcase 3D' : i === 1 ? 'Product Hunt Launch' : 'GitHub Star Tracker', w * 0.14, y + h * 0.045);

      ctx.fillStyle = '#A3A3A3';
      ctx.font = `400 ${Math.floor(w * 0.032)}px Inter, sans-serif`;
      ctx.fillText(i === 0 ? '60 FPS WebGL Stage' : i === 1 ? 'Top 1 Product of Day' : '1.4k new stargazers', w * 0.14, y + h * 0.07);
    }
  } else if (theme === 'tablet-portrait') {
    // iPad Pro M4 & iPad Air (Portrait 3:4 Clean UI)
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Top Header Status
    ctx.fillStyle = '#A3A3A3';
    ctx.font = `600 ${Math.floor(w * 0.024)}px Inter, sans-serif`;
    ctx.fillText('9:41 AM', w * 0.08, h * 0.04);
    ctx.fillText('100% ⚡', w * 0.84, h * 0.04);

    // Big Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.048)}px Inter, sans-serif`;
    ctx.fillText('Procreate & Studio Canvas', w * 0.08, h * 0.10);

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `400 ${Math.floor(w * 0.022)}px Inter, sans-serif`;
    ctx.fillText('Retina XDR • 3:4 Aspect Ratio Perfectly Centered', w * 0.08, h * 0.13);

    // Two Top Cards Side by Side
    const cardW = w * 0.40;
    const cardH = h * 0.22;
    // Card 1
    ctx.fillStyle = '#171717';
    roundRect(ctx, w * 0.08, h * 0.16, cardW, cardH, 24);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `500 ${Math.floor(w * 0.018)}px Inter, sans-serif`;
    ctx.fillText('ACTIVE PROJECT', w * 0.12, h * 0.21);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.042)}px Inter, sans-serif`;
    ctx.fillText('3D Showcase', w * 0.12, h * 0.27);
    ctx.fillStyle = '#10B981';
    ctx.font = `500 ${Math.floor(w * 0.020)}px Inter, sans-serif`;
    ctx.fillText('● 120 FPS Retina Live', w * 0.12, h * 0.33);

    // Card 2
    ctx.fillStyle = '#171717';
    roundRect(ctx, w * 0.52, h * 0.16, cardW, cardH, 24);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `500 ${Math.floor(w * 0.018)}px Inter, sans-serif`;
    ctx.fillText('COLOR PROFILE', w * 0.56, h * 0.21);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.042)}px Inter, sans-serif`;
    ctx.fillText('Display P3', w * 0.56, h * 0.27);
    ctx.fillStyle = '#10B981';
    ctx.font = `500 ${Math.floor(w * 0.020)}px Inter, sans-serif`;
    ctx.fillText('● 1,600 nits Peak', w * 0.56, h * 0.33);

    // Large Center Showcase Stage
    const stageY = h * 0.42;
    const stageH = h * 0.48;
    ctx.fillStyle = '#141414';
    roundRect(ctx, w * 0.08, stageY, w * 0.84, stageH, 32);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.032)}px Inter, sans-serif`;
    ctx.fillText('Real-Time WebGL Hardware Stage', w * 0.14, stageY + h * 0.08);

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `400 ${Math.floor(w * 0.020)}px Inter, sans-serif`;
    ctx.fillText('Touch gestures and Apple Pencil hover tracking ready.', w * 0.14, stageY + h * 0.13);

    // Centered artwork waveform
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w * 0.14, stageY + h * 0.30);
    ctx.bezierCurveTo(w * 0.35, stageY + h * 0.20, w * 0.60, stageY + h * 0.40, w * 0.82, stageY + h * 0.26);
    ctx.stroke();
  } else if (theme === 'tablet-landscape') {
    // Galaxy Tab S9 Ultra (Landscape 16:10 WQXGA+ Clean Desktop Dashboard)
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Left Navigation Column (Tablet Native Layout)
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, w * 0.20, h);
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.20, 0);
    ctx.lineTo(w * 0.20, h);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.018)}px Inter, sans-serif`;
    ctx.fillText('Galaxy Tab Studio', w * 0.03, h * 0.08);

    const tabletNav = ['Dashboard', 'Canvas Editor', 'Media Library', 'Color Grading', 'Cloud Sync'];
    tabletNav.forEach((item, idx) => {
      const y = h * (0.18 + idx * 0.09);
      if (idx === 1) {
        ctx.fillStyle = '#262626';
        roundRect(ctx, w * 0.02, y - 28, w * 0.16, 56, 12);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 ${Math.floor(w * 0.013)}px Inter, sans-serif`;
      } else {
        ctx.fillStyle = '#A3A3A3';
        ctx.font = `500 ${Math.floor(w * 0.013)}px Inter, sans-serif`;
      }
      ctx.fillText(item, w * 0.04, y + 8);
    });

    // Main Header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.024)}px Inter, sans-serif`;
    ctx.fillText('Dynamic AMOLED 2X Canvas', w * 0.25, h * 0.10);

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `400 ${Math.floor(w * 0.012)}px Inter, sans-serif`;
    ctx.fillText('Native 2960 × 1848 Resolution • WQXGA+ 16:10 Wide Aspect Ratio', w * 0.25, h * 0.15);

    // Stat Cards (3 Columns)
    for (let c = 0; c < 3; c++) {
      const cx = w * (0.25 + c * 0.235);
      const cy = h * 0.21;
      const cw = w * 0.215;
      const ch = h * 0.28;

      ctx.fillStyle = '#171717';
      roundRect(ctx, cx, cy, cw, ch, 20);
      ctx.fill();
      ctx.strokeStyle = '#262626';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#A3A3A3';
      ctx.font = `600 ${Math.floor(w * 0.010)}px Inter, sans-serif`;
      ctx.fillText(c === 0 ? 'PANEL RESOLUTION' : c === 1 ? 'REFRESH RATE' : 'S-PEN LATENCY', cx + 24, cy + 42);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 ${Math.floor(w * 0.024)}px Inter, sans-serif`;
      ctx.fillText(c === 0 ? '2.9K WQXGA+' : c === 1 ? '120 Hz' : '2.8 ms Ultra', cx + 24, cy + 95);

      ctx.fillStyle = '#10B981';
      ctx.font = `500 ${Math.floor(w * 0.011)}px Inter, sans-serif`;
      ctx.fillText('● Zero Pixel Aliasing', cx + 24, cy + 130);
    }

    // Wide Lower Canvas Panel
    const bigY = h * 0.54;
    ctx.fillStyle = '#141414';
    roundRect(ctx, w * 0.25, bigY, w * 0.70, h * 0.38, 24);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${Math.floor(w * 0.016)}px Inter, sans-serif`;
    ctx.fillText('Live Interactive High-DPI Tablet Stage', w * 0.28, bigY + 60);

    ctx.fillStyle = '#10B981';
    ctx.font = `500 ${Math.floor(w * 0.011)}px Inter, sans-serif`;
    ctx.fillText('● P3 Wide Gamut • WebGL 60 FPS Stage Active', w * 0.28, bigY + 95);

    // Decorative waveform
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.28, bigY + 160);
    ctx.bezierCurveTo(w * 0.45, bigY + 120, w * 0.65, bigY + 200, w * 0.90, bigY + 140);
    ctx.stroke();
  } else {
    // Desktop Dashboard - High Contrast Anti-Aliased Lines
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, w, h);

    // Sidebar
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, w * 0.22, h);
    ctx.strokeStyle = '#262626';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.22, 0);
    ctx.lineTo(w * 0.22, h);
    ctx.stroke();

    // Sidebar logo
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.02)}px Inter, sans-serif`;
    ctx.fillText('MockDrop Studio', w * 0.03, h * 0.07);

    // Sidebar items
    const navItems = ['Dashboard', '3D Showcases', 'Devices', 'Lighting Presets', 'Settings'];
    navItems.forEach((item, idx) => {
      const y = h * (0.15 + idx * 0.06);
      if (idx === 1) {
        ctx.fillStyle = '#262626';
        roundRect(ctx, w * 0.02, y - 25, w * 0.18, 50, 10);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 ${Math.floor(w * 0.013)}px Inter, sans-serif`;
      } else {
        ctx.fillStyle = '#A3A3A3';
        ctx.font = `500 ${Math.floor(w * 0.013)}px Inter, sans-serif`;
      }
      ctx.fillText(item, w * 0.04, y + 8);
    });

    // Main header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 ${Math.floor(w * 0.025)}px Inter, sans-serif`;
    ctx.fillText('3D Device Showcases', w * 0.26, h * 0.08);

    ctx.fillStyle = '#A3A3A3';
    ctx.font = `400 ${Math.floor(w * 0.012)}px Inter, sans-serif`;
    ctx.fillText('Real-time WebGL canvas with zero watermark and instant high-res export.', w * 0.26, h * 0.12);

    // Main cards grid (3 cols)
    for (let c = 0; c < 3; c++) {
      const cx = w * (0.26 + c * 0.235);
      const cy = h * 0.18;
      const cw = w * 0.215;
      const ch = h * 0.32;

      ctx.fillStyle = '#171717';
      roundRect(ctx, cx, cy, cw, ch, 16);
      ctx.fill();
      ctx.strokeStyle = '#262626';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#A3A3A3';
      ctx.font = `500 ${Math.floor(w * 0.01)}px Inter, sans-serif`;
      ctx.fillText(c === 0 ? 'TOTAL RENDERS' : c === 1 ? 'AVG FPS' : 'CLIENT-SIDE PRIVACY', cx + 24, cy + 40);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 ${Math.floor(w * 0.026)}px Inter, sans-serif`;
      ctx.fillText(c === 0 ? '12,480' : c === 1 ? '60.0 FPS' : '100% Local', cx + 24, cy + 90);
    }

    // Big central showcase card
    const bigY = h * 0.54;
    ctx.fillStyle = '#141414';
    roundRect(ctx, w * 0.26, bigY, w * 0.69, h * 0.40, 20);
    ctx.fill();
    ctx.strokeStyle = '#262626';
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${Math.floor(w * 0.018)}px Inter, sans-serif`;
    ctx.fillText('Live Interactive Viewport Active', w * 0.29, bigY + 60);

    ctx.fillStyle = '#10B981';
    ctx.font = `500 ${Math.floor(w * 0.012)}px Inter, sans-serif`;
    ctx.fillText('● Three.js WebGL Engine Ready', w * 0.29, bigY + 95);
  }

  return canvas.toDataURL('image/png', 1.0);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
