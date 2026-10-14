import React, { useRef, useState } from 'react';
import { useStudioStore } from '../../../store/useStudioStore';
import { UploadCloud, Image as ImageIcon, Sparkles, RefreshCw, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { createDefaultScreen } from '../../../utils/defaultScreens';
import { processScreenImage } from '../../../utils/imageProcessor';

export const ScreenTab: React.FC = () => {
  const {
    screenTextureUrl,
    setScreenTextureUrl,
    fitMode,
    setFitMode,
    getActiveDevice,
  } = useStudioStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rawUploadedSrc, setRawUploadedSrc] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const device = getActiveDevice();

  const handleFetchUrlScreenshot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    let targetUrl = urlInput.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsFetchingUrl(true);
    setUrlError(null);

    try {
      // Use Microlink screenshot API for real website screenshot rendering
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(
        targetUrl
      )}&screenshot=true&meta=false&embed=screenshot.url`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to capture URL');
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = async (ev) => {
        if (typeof ev.target?.result === 'string') {
          const raw = ev.target.result;
          setRawUploadedSrc(raw);
          const processed = await processScreenImage(
            raw,
            device.screenWidth,
            device.screenHeight,
            fitMode
          );
          setScreenTextureUrl(processed);
          setIsFetchingUrl(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setUrlError('Gagal memuat tangkapan layar website. Coba URL lain.');
      setIsFetchingUrl(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (typeof e.target?.result === 'string') {
        const raw = e.target.result;
        setRawUploadedSrc(raw);
        const processed = await processScreenImage(
          raw,
          device.screenWidth,
          device.screenHeight,
          fitMode
        );
        setScreenTextureUrl(processed);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFitModeChange = async (newMode: 'cover' | 'fit') => {
    setFitMode(newMode);
    if (rawUploadedSrc) {
      const processed = await processScreenImage(
        rawUploadedSrc,
        device.screenWidth,
        device.screenHeight,
        newMode
      );
      setScreenTextureUrl(processed);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const loadPresetScreen = (type: 'mobile-dark' | 'desktop-dashboard') => {
    const url = createDefaultScreen(type);
    setRawUploadedSrc(null);
    setScreenTextureUrl(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Screen Capture
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-white bg-[#171717]'
              : 'border-[#262626] bg-[#121212] hover:border-[#383838]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <div className="w-10 h-10 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center mb-3">
            <UploadCloud className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold text-white mb-1">
            Click or drag & drop screenshot
          </p>
          <p className="text-[11px] text-[#A3A3A3]">
            Supports PNG, JPEG, WebP (up to 20MB)
          </p>
        </div>
      </div>

      {/* Fitting Mode */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Fitting Mode
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#171717] rounded-lg border border-[#262626]">
          <button
            onClick={() => handleFitModeChange('cover')}
            className={`py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
              fitMode === 'cover'
                ? 'bg-white text-black font-semibold'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Cover (Fill Frame)
          </button>
          <button
            onClick={() => handleFitModeChange('fit')}
            className={`py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
              fitMode === 'fit'
                ? 'bg-white text-black font-semibold'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Fit / Contain
          </button>
        </div>
      </div>

      {/* URL Screenshot Fetcher */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Fetch From Live URL
        </label>
        <form onSubmit={handleFetchUrlScreenshot} className="space-y-2">
          <div className="relative">
            <Globe className="w-4 h-4 text-[#A3A3A3] absolute left-3 top-2.5" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. github.com or dribbble.com"
              className="w-full bg-[#171717] border border-[#262626] rounded-lg pl-9 pr-20 py-2 text-xs text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={isFetchingUrl || !urlInput.trim()}
              className="absolute right-1 top-1 bottom-1 px-3 bg-white text-black text-[11px] font-semibold rounded-md hover:bg-[#E5E5E5] transition-all flex items-center gap-1 disabled:opacity-40"
            >
              {isFetchingUrl ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Capture</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
          {urlError && <p className="text-[10px] text-red-400 font-mono">{urlError}</p>}
        </form>
      </div>

      {/* Demo Screen Presets */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Or Load Sample Mockups
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => loadPresetScreen('mobile-dark')}
            className="p-2.5 rounded-lg border border-[#262626] bg-[#171717] hover:border-white transition-colors text-left"
          >
            <div className="text-xs font-medium text-white mb-0.5">Mobile Analytics</div>
            <div className="text-[10px] text-[#A3A3A3]">Dark Minimal SaaS</div>
          </button>
          <button
            onClick={() => loadPresetScreen('desktop-dashboard')}
            className="p-2.5 rounded-lg border border-[#262626] bg-[#171717] hover:border-white transition-colors text-left"
          >
            <div className="text-xs font-medium text-white mb-0.5">Desktop Studio</div>
            <div className="text-[10px] text-[#A3A3A3]">Full Width Dashboard</div>
          </button>
        </div>
      </div>

      {/* Active Thumbnail Preview */}
      {screenTextureUrl && (
        <div className="pt-2 border-t border-[#262626]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#A3A3A3]">Active Screen Texture</span>
            <span className="text-[10px] text-[#10B981] font-mono">
              {device.screenWidth} × {device.screenHeight} px
            </span>
          </div>
          <div className="h-28 rounded-lg border border-[#262626] overflow-hidden bg-[#171717] flex items-center justify-center p-2">
            <img
              src={screenTextureUrl}
              alt="Active screen preview"
              className="max-h-full max-w-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};
