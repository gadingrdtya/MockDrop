import { ExportFormat, ExportScale, BackgroundPreset } from '../types';

interface ExportOptions {
  canvas: HTMLCanvasElement;
  format: ExportFormat;
  scale: ExportScale;
  bgPreset?: BackgroundPreset;
  customBgColor?: string;
  filename?: string;
}

export async function exportStudioImage({
  canvas,
  format,
  scale,
  bgPreset,
  customBgColor = '#0A0A0A',
  filename = 'mockdrop-showcase',
}: ExportOptions): Promise<void> {
  // Directly export from native canvas preserving its high-DPI rasterization
  // Scale 2x uses high-quality supersampling step without pixel blur
  const srcW = canvas.width;
  const srcH = canvas.height;

  const targetWidth = Math.round(srcW * (scale === 2 ? 1.5 : 1));
  const targetHeight = Math.round(srcH * (scale === 2 ? 1.5 : 1));

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = targetWidth;
  exportCanvas.height = targetHeight;

  const ctx = exportCanvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const isTransparent = bgPreset?.type === 'transparent';

  if (!isTransparent) {
    if (!bgPreset || bgPreset.id === 'custom') {
      ctx.fillStyle = customBgColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    } else if (bgPreset.type === 'solid' && bgPreset.color) {
      ctx.fillStyle = bgPreset.color;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    } else if (bgPreset.type === 'gradient' && bgPreset.gradient) {
      const { type, stops } = bgPreset.gradient;
      if (type === 'radial') {
        const rad = Math.max(targetWidth, targetHeight) / 1.4;
        const grad = ctx.createRadialGradient(
          targetWidth / 2,
          targetHeight / 2,
          0,
          targetWidth / 2,
          targetHeight / 2,
          rad
        );
        stops.forEach((s) => grad.addColorStop(s.position, s.color));
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      } else {
        const grad = ctx.createLinearGradient(0, 0, targetWidth, targetHeight);
        stops.forEach((s) => grad.addColorStop(s.position, s.color));
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }
    }
  }

  // Draw native WebGL buffer directly onto composite canvas
  ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

  // Convert to high-quality lossless PNG or WebP
  const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
  const dataUrl = exportCanvas.toDataURL(mimeType, 1.0);

  const link = document.createElement('a');
  link.download = `${filename}-${targetWidth}x${targetHeight}-${Date.now()}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 360° Ultra HD WebM Video Recorder from Three.js WebGL canvas
export function recordCanvasLoopVideo(
  canvas: HTMLCanvasElement,
  durationSeconds: number = 4,
  filename: string = 'mockdrop-loop'
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // 60 FPS stream directly from canvas buffer
      const stream = canvas.captureStream(60);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      // 30 Mbps high-bitrate recording for studio-grade HD output
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 30000000,
      });

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, durationSeconds * 1000);
    } catch (err) {
      reject(err);
    }
  });
}
