import React from 'react';
import { useStudioStore } from '../../store/useStudioStore';
import { Smartphone, Image as ImageIcon, Video, Sparkles } from 'lucide-react';
import { DeviceTab } from './tabs/DeviceTab';
import { ScreenTab } from './tabs/ScreenTab';
import { CameraTab } from './tabs/CameraTab';
import { SceneTab } from './tabs/SceneTab';

const TABS: { id: 'device' | 'screen' | 'camera' | 'scene'; label: string; icon: React.ElementType }[] = [
  { id: 'device', label: 'Device', icon: Smartphone },
  { id: 'screen', label: 'Screen', icon: ImageIcon },
  { id: 'camera', label: 'Camera', icon: Video },
  { id: 'scene', label: 'Scene', icon: Sparkles },
];

export const Sidebar: React.FC = () => {
  const { activeSidebarTab, setActiveSidebarTab } = useStudioStore();

  return (
    <aside className="w-80 lg:w-96 bg-[#0A0A0A] border-l border-[#262626] flex flex-col h-full z-20 select-none">
      {/* Top Tab Navigation */}
      <div className="flex border-b border-[#262626] bg-[#121212]/50">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSidebarTab(tab.id)}
              className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 text-[11px] font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-white text-white font-semibold bg-[#171717]'
                  : 'border-transparent text-[#A3A3A3] hover:text-white hover:bg-[#171717]/50'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeSidebarTab === 'device' && <DeviceTab />}
        {activeSidebarTab === 'screen' && <ScreenTab />}
        {activeSidebarTab === 'camera' && <CameraTab />}
        {activeSidebarTab === 'scene' && <SceneTab />}
      </div>
    </aside>
  );
};
