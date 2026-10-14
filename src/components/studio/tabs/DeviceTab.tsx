import React, { useState } from 'react';
import { useStudioStore, DEVICE_CATALOG } from '../../../store/useStudioStore';
import { DeviceCategory } from '../../../types';
import { Smartphone, Tablet, Laptop, Globe, Check } from 'lucide-react';

const CATEGORIES: { id: DeviceCategory; label: string; icon: React.ElementType }[] = [
  { id: 'smartphones', label: 'Phones', icon: Smartphone },
  { id: 'tablets', label: 'Tablets', icon: Tablet },
  { id: 'laptops', label: 'Laptops', icon: Laptop },
  { id: 'browsers', label: 'Frames', icon: Globe },
];

export const DeviceTab: React.FC = () => {
  const {
    selectedDeviceId,
    setSelectedDeviceId,
    selectedColorId,
    setSelectedColorId,
    getActiveDevice,
  } = useStudioStore();

  const [activeCategory, setActiveCategory] = useState<DeviceCategory>('smartphones');

  const activeDevice = getActiveDevice();
  const filteredDevices = DEVICE_CATALOG.filter((d) => d.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Category
        </label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#171717] rounded-lg border border-[#262626]">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs transition-colors ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" strokeWidth={1.5} />
                <span className="text-[10px]">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Device Selection Grid */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-2 block">
          Select Model
        </label>
        <div className="space-y-2">
          {filteredDevices.map((dev) => {
            const isCurrent = dev.id === selectedDeviceId;
            return (
              <button
                key={dev.id}
                onClick={() => setSelectedDeviceId(dev.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? 'bg-[#171717] border-white text-white'
                    : 'bg-[#171717] border-[#262626] text-[#A3A3A3] hover:border-[#383838] hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-white">{dev.name}</div>
                  <div className="text-[10px] text-[#A3A3A3]">{dev.brand}</div>
                </div>
                {isCurrent && (
                  <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Device Body Colors */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3]">
            Finish / Color
          </label>
          <span className="text-[11px] text-[#A3A3A3]">
            {activeDevice.colors.find((c) => c.id === selectedColorId)?.name}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {activeDevice.colors.map((c) => {
            const isColorSelected = c.id === selectedColorId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedColorId(c.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  isColorSelected
                    ? 'border-white bg-[#171717]'
                    : 'border-[#262626] bg-[#121212] hover:border-[#383838]'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-black/40 flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  {isColorSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#e2e2df'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                      strokeWidth={2.5}
                    />
                  )}
                </div>
                <span className="text-[9px] text-[#A3A3A3] text-center line-clamp-1 truncate w-full">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
