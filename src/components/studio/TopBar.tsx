import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  Box,
  ChevronLeft,
  SlidersHorizontal,
  LogOut,
  User,
  Play,
  Pause,
  Copy,
  Check,
} from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import { AspectRatioType, CameraPreset } from '../../types';

interface TopBarProps {
  onExportClick: () => void;
  onToggleMobileSidebar?: () => void;
}

const RATIOS: AspectRatioType[] = ['16:9', '4:3', '1:1', '9:16'];

const CAMERA_PRESETS: { id: CameraPreset; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'isometric', label: 'Isometric' },
  { id: 'tilt', label: 'Tilt' },
  { id: 'side', label: 'Side' },
];

export const TopBar: React.FC<TopBarProps> = ({ onExportClick, onToggleMobileSidebar }) => {
  const {
    aspectRatio,
    setAspectRatio,
    cameraPreset,
    setCameraPreset,
    resetCamera,
    setCurrentView,
    user,
    logout,
    autoRotate,
    setAutoRotate,
  } = useStudioStore();

  const [copied, setCopied] = useState(false);

  const handleCopyClipboard = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  return (
    <header className="h-14 bg-[#0A0A0A] border-b border-[#262626] px-3 sm:px-6 flex items-center justify-between z-30 select-none">
      {/* Left: Brand Identity & Exit */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-white px-2 py-1.5 rounded-full border border-transparent hover:border-[#262626] transition-colors"
          title="Back to Landing Page"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Exit</span>
        </button>

        <div className="h-4 w-[1px] bg-[#262626] hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#171717] border border-[#262626] flex items-center justify-center text-white">
            <Box className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white hidden xs:inline">MockDrop</span>
          <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-[#171717] text-[#A3A3A3] border border-[#262626]">
            Studio
          </span>
        </div>
      </div>

      {/* Center: Controls (Aspect Ratio & Camera Quick Angles) */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Aspect Ratio Pills */}
        <div className="flex items-center bg-[#171717] border border-[#262626] rounded-full p-0.5">
          {RATIOS.map((r) => (
            <button
              key={r}
              onClick={() => setAspectRatio(r)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                aspectRatio === r
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Camera Preset Quick Pills */}
        <div className="flex items-center bg-[#171717] border border-[#262626] rounded-full p-0.5">
          {CAMERA_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setCameraPreset(p.id)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                cameraPreset === p.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Reset Camera Button */}
        <button
          onClick={resetCamera}
          className="p-1.5 rounded-full border border-[#262626] bg-[#171717] text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          title="Reset Camera Angle"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>

        {/* Auto-Rotate Turntable Button */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all ${
            autoRotate
              ? 'bg-white text-black border-white font-semibold'
              : 'bg-[#171717] text-[#A3A3A3] border-[#262626] hover:text-white'
          }`}
          title="Toggle 360° Auto Turntable"
        >
          {autoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>360°</span>
        </button>
      </div>

      {/* Right: Export Button, User Session & Mobile Menu */}
      <div className="flex items-center gap-2">
        {user && (
          <div className="hidden sm:flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs">
            <div className="flex items-center gap-1.5 text-[#A3A3A3]">
              <User className="w-3.5 h-3.5 text-white" />
              <span className="font-mono text-[11px] text-white max-w-[110px] truncate">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="p-1 rounded-full text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Copy to Clipboard CTA */}
        <button
          onClick={handleCopyClipboard}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#262626] bg-[#171717] text-[#A3A3A3] hover:text-white hover:bg-[#222] text-xs font-medium transition-all"
          title="Copy render directly to clipboard (Figma/Canva)"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#10B981]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          onClick={onExportClick}
          className="flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-3.5 py-2 rounded-full hover:bg-[#E5E5E5] transition-all"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">Export Showcase</span>
          <span className="sm:hidden">Export</span>
        </button>

        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-full border border-[#262626] bg-[#171717] text-[#A3A3A3] hover:text-white"
            title="Open Studio Panels"
          >
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </header>
  );
};
