import React from 'react';
import { useStudioStore } from '../../../store/useStudioStore';
import { CameraPreset } from '../../../types';
import { Compass, RotateCw, Eye, Move3d } from 'lucide-react';

const PRESETS: {
  id: CameraPreset;
  title: string;
  description: string;
  badge: string;
}[] = [
  {
    id: 'front',
    title: 'Front Facing',
    description: 'Straight-on clean 2D presentation angle',
    badge: '0° Ortho',
  },
  {
    id: 'isometric',
    title: 'Isometric 45°',
    description: 'Industry-standard isometric Dribbble perspective',
    badge: '45° Classic',
  },
  {
    id: 'tilt',
    title: 'Perspective Tilt',
    description: 'Floating modern SaaS Hero showcase depth',
    badge: 'Dramatic',
  },
  {
    id: 'side',
    title: 'Side Angle',
    description: 'Ultra-thin profile highlighting chassis curves',
    badge: 'Edge-on',
  },
];

export const CameraTab: React.FC = () => {
  const { cameraPreset, setCameraPreset, resetCamera } = useStudioStore();

  return (
    <div className="space-y-6">
      {/* 1-Click Camera Presets */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          1-Click Angle Presets
        </label>
        <div className="space-y-2">
          {PRESETS.map((p) => {
            const isSelected = cameraPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCameraPreset(p.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#171717] border-white text-white'
                    : 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:border-[#383838] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">{p.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#262626] text-[#A3A3A3]">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Camera Action */}
      <button
        onClick={resetCamera}
        className="w-full py-2.5 px-4 rounded-full border border-[#262626] bg-[#171717] hover:bg-[#262626] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCw className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>Reset Camera Target</span>
      </button>

      {/* Orbit Gesture Cheatsheet */}
      <div className="p-4 rounded-lg bg-[#121212] border border-[#262626] space-y-2.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] flex items-center gap-1.5">
          <Move3d className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Interactive Orbit Gestures</span>
        </div>
        <div className="text-[11px] text-[#A3A3A3] space-y-1.5">
          <div className="flex justify-between">
            <span>Rotate freely</span>
            <span className="text-white font-mono">Left Click + Drag</span>
          </div>
          <div className="flex justify-between">
            <span>Pan viewport</span>
            <span className="text-white font-mono">Right Click + Drag</span>
          </div>
          <div className="flex justify-between">
            <span>Zoom In / Out</span>
            <span className="text-white font-mono">Scroll Wheel / Pinch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
