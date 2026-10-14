import React from 'react';
import { useStudioStore, BACKGROUND_PRESETS } from '../../../store/useStudioStore';
import { LightingPreset } from '../../../types';
import { Sun, Sunset, Zap, CloudSun, Eye, Layers, Sparkles } from 'lucide-react';

const LIGHT_PRESETS: { id: LightingPreset; name: string; icon: React.ElementType }[] = [
  { id: 'studio', name: 'Studio Clean', icon: Sun },
  { id: 'sunset', name: 'Sunset Warm', icon: Sunset },
  { id: 'cyberpunk', name: 'Cyber Neon', icon: Zap },
  { id: 'daylight', name: 'Daylight', icon: CloudSun },
];

export const SceneTab: React.FC = () => {
  const {
    lightingPreset,
    setLightingPreset,
    shadowsEnabled,
    setShadowsEnabled,
    floorReflection,
    setFloorReflection,
    activeBackgroundPresetId,
    setActiveBackgroundPresetId,
    customBackgroundColor,
    setCustomBackgroundColor,
    noiseOverlay,
    setNoiseOverlay,
  } = useStudioStore();

  return (
    <div className="space-y-6">
      {/* Studio Lighting Presets */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Studio Lighting Environment
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LIGHT_PRESETS.map((lp) => {
            const Icon = lp.icon;
            const isSelected = lightingPreset === lp.id;
            return (
              <button
                key={lp.id}
                onClick={() => setLightingPreset(lp.id)}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#171717] border-white text-white'
                    : 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:border-[#383838] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs font-medium">{lp.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Shadow Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#171717] border border-[#262626]">
        <div>
          <div className="text-xs font-semibold text-white">Realistic Contact Shadows</div>
          <div className="text-[11px] text-[#A3A3A3]">Soft ambient floor contact shadow</div>
        </div>
        <button
          onClick={() => setShadowsEnabled(!shadowsEnabled)}
          className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
            shadowsEnabled ? 'bg-white' : 'bg-[#262626]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-black transition-transform ${
              shadowsEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Floor Mirror Reflection Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#171717] border border-[#262626]">
        <div>
          <div className="text-xs font-semibold text-white">Floor Studio Reflection</div>
          <div className="text-[11px] text-[#A3A3A3]">Luxury ground specular reflection</div>
        </div>
        <button
          onClick={() => setFloorReflection(!floorReflection)}
          className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
            floorReflection ? 'bg-white' : 'bg-[#262626]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-black transition-transform ${
              floorReflection ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Backdrop Presets */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Studio Backdrop & Gradients
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BACKGROUND_PRESETS.map((bg) => {
            const isCurrent = activeBackgroundPresetId === bg.id;

            // Generate thumbnail CSS for the button
            let thumbStyle: React.CSSProperties = {};
            if (bg.type === 'solid') thumbStyle = { backgroundColor: bg.color };
            else if (bg.type === 'transparent') {
              thumbStyle = {
                backgroundImage:
                  'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
                backgroundSize: '8px 8px',
                backgroundColor: '#111',
              };
            } else if (bg.type === 'gradient' && bg.gradient) {
              const { type, stops, angle = 135 } = bg.gradient;
              const stopsStr = stops.map((s) => `${s.color} ${s.position * 100}%`).join(', ');
              thumbStyle =
                type === 'radial'
                  ? { background: `radial-gradient(circle, ${stopsStr})` }
                  : { background: `linear-gradient(${angle}deg, ${stopsStr})` };
            }

            return (
              <button
                key={bg.id}
                onClick={() => setActiveBackgroundPresetId(bg.id)}
                className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? 'border-white bg-[#171717]'
                    : 'border-[#262626] bg-[#121212] hover:border-[#383838]'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                  style={thumbStyle}
                />
                <span className="text-[11px] font-medium text-white line-clamp-1 truncate">
                  {bg.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Picker */}
      <div className="p-3 rounded-lg bg-[#171717] border border-[#262626] space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] block">
          Custom Solid Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={customBackgroundColor}
            onChange={(e) => setCustomBackgroundColor(e.target.value)}
            className="w-8 h-8 rounded-full border border-[#262626] bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={customBackgroundColor}
            onChange={(e) => setCustomBackgroundColor(e.target.value)}
            className="bg-[#121212] border border-[#262626] text-white text-xs px-3 py-1.5 rounded-full font-mono flex-1 focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Noise Texture Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#171717] border border-[#262626]">
        <div>
          <div className="text-xs font-semibold text-white">Grain / Film Noise Overlay</div>
          <div className="text-[11px] text-[#A3A3A3]">Subtle aesthetic texture overlay</div>
        </div>
        <button
          onClick={() => setNoiseOverlay(!noiseOverlay)}
          className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
            noiseOverlay ? 'bg-white' : 'bg-[#262626]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-black transition-transform ${
              noiseOverlay ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
