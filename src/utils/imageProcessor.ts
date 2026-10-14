// Process and scale uploaded texture with precise cover / fit mapping onto target native resolution
export function processScreenImage(
  imageSrc: string,
  targetWidth: number,
  targetHeight: number,
  fitMode: 'cover' | 'fit'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Ensure high minimum pixel dimension so textures never pixelate
      const minDimension = 2048;
      let finalW = targetWidth;
      let finalH = targetHeight;

      if (finalW < minDimension && finalH < minDimension) {
        const factor = Math.max(minDimension / finalW, minDimension / finalH);
        finalW = Math.round(finalW * factor);
        finalH = Math.round(finalH * factor);
      }

      const canvas = document.createElement('canvas');
      canvas.width = finalW;
      canvas.height = finalH;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clean dark canvas backing
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, finalW, finalH);

      const srcW = img.width;
      const srcH = img.height;
      const targetAspect = finalW / finalH;
      const srcAspect = srcW / srcH;

      let renderW = finalW;
      let renderH = finalH;
      let offsetX = 0;
      let offsetY = 0;

      if (fitMode === 'cover') {
        if (srcAspect > targetAspect) {
          renderH = finalH;
          renderW = finalH * srcAspect;
          offsetX = (finalW - renderW) / 2;
        } else {
          renderW = finalW;
          renderH = finalW / srcAspect;
          offsetY = (finalH - renderH) / 2;
        }
      } else {
        // Fit / Contain with smart letterbox background
        if (srcAspect > targetAspect) {
          renderW = finalW;
          renderH = finalW / srcAspect;
          offsetY = (finalH - renderH) / 2;
        } else {
          renderH = finalH;
          renderW = finalH * srcAspect;
          offsetX = (finalW - renderW) / 2;
        }
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      resolve(canvas.toDataURL('image/png', 1.0));
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}
