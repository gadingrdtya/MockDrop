import React, { useState } from 'react';
import { useStudioStore } from '../../../store/useStudioStore';
import { X, Download, Film, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
import { exportStudioImage, recordCanvasLoopVideo } from '../../../utils/exportImage';

interface ExportModalProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  canvasRef,
  isOpen,
  onClose,
}) => {
  const {
    exportFormat,
    setExportFormat,
    exportScale,
    setExportScale,
    getActiveBackground,
    customBackgroundColor,
    getActiveDevice,
    getActiveColor,
    setAutoRotate,
  } = useStudioStore();

  const [isExporting, setIsExporting] = useState(false);
  const [videoCountdown, setVideoCountdown] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    const activeDev = getActiveDevice();
    const activeColor = getActiveColor();

    try {
      if (exportFormat === 'webm') {
        // Automatically activate turntable for animation recording
        setAutoRotate(true);
        setVideoCountdown(4);

        const timer = setInterval(() => {
          setVideoCountdown((prev) => (prev && prev > 1 ? prev - 1 : null));
        }, 1000);

        await recordCanvasLoopVideo(
          canvasRef.current,
          4,
          `mockdrop-360-loop-${activeDev.id}`
        );

        clearInterval(timer);
        setVideoCountdown(null);
      } else {
        const bgPreset = getActiveBackground();
        await exportStudioImage({
          canvas: canvasRef.current,
          format: exportFormat,
          scale: exportScale,
          bgPreset,
          customBgColor: customBackgroundColor,
          filename: `mockdrop-${activeDev.id}-${activeColor.id}`,
        });
      }
      onClose();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
      setVideoCountdown(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-md bg-[#121212] border border-[#262626] rounded-xl overflow-hidden p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Export 3D Showcase
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              Ultra crisp high-res render & video loop. Zero watermark.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Format Selection (PNG / WebP / WebM Video) */}
        <div>
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#171717] rounded-lg border border-[#262626]">
            <button
              onClick={() => setExportFormat('png')}
              className={`py-2 px-2.5 rounded-md text-xs font-medium transition-all text-center ${
                exportFormat === 'png'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              PNG
            </button>
            <button
              onClick={() => setExportFormat('webp')}
              className={`py-2 px-2.5 rounded-md text-xs font-medium transition-all text-center ${
                exportFormat === 'webp'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              WebP
            </button>
            <button
              onClick={() => setExportFormat('webm')}
              className={`py-2 px-2.5 rounded-md text-xs font-medium transition-all text-center flex items-center justify-center gap-1 ${
                exportFormat === 'webm'
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>360° Loop</span>
            </button>
          </div>
        </div>

        {/* Resolution Scale (for images) */}
        {exportFormat !== 'webm' && (
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
              Resolution Scale
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#171717] rounded-lg border border-[#262626]">
              <button
                onClick={() => setExportScale(1)}
                className={`py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  exportScale === 1
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                1x (Standard 1080p)
              </button>
              <button
                onClick={() => setExportScale(2)}
                className={`py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  exportScale === 2
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                2x (Retina 4K Ultra)
              </button>
            </div>
          </div>
        )}

        {/* Info for Video Mode */}
        {exportFormat === 'webm' && (
          <div className="p-3 rounded-lg bg-[#171717] border border-[#262626] text-xs text-[#A3A3A3] space-y-1">
            <div className="text-white font-medium flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#10B981]" />
              <span>4-Second 60 FPS Turntable Recording</span>
            </div>
            <p className="text-[11px] text-[#888]">
              Rotates mockup 360° and records a smooth video loop for Twitter, Dribbble, or web heroes.
            </p>
          </div>
        )}

        {/* Privacy badge */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#171717] border border-[#262626] text-[11px] text-[#A3A3A3]">
          <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={1.5} />
          <span>100% Client-side render. Your files never leave your browser.</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#262626] text-xs font-medium text-[#A3A3A3] hover:text-white hover:bg-[#171717] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>
                  {videoCountdown !== null
                    ? `Recording ${videoCountdown}s...`
                    : 'Exporting...'}
                </span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" strokeWidth={2} />
                <span>{exportFormat === 'webm' ? 'Record 360° Video' : 'Download Image'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
