import React from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { ShieldCheck, Activity } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { getActiveDevice, getActiveColor } = useStudioStore();
  const device = getActiveDevice();
  const color = getActiveColor();

  return (
    <footer className="h-8 bg-[#0A0A0A] border-t border-[#262626] px-4 flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] select-none z-20">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-white font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Ready
        </span>
        <span className="text-[#262626]">•</span>
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#A3A3A3]" strokeWidth={1.5} />
          60.0 FPS
        </span>
        <span className="text-[#262626]">•</span>
        <span className="truncate">
          Model: <span className="text-white">{device.name}</span> ({color.name})
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-[10px]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={1.5} />
        <span>100% Client-Side Engine</span>
      </div>
    </footer>
  );
};
