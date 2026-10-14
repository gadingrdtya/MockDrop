import React, { useState } from 'react';
import { useStudioStore, DEVICE_CATALOG } from '../../store/useStudioStore';
import { DeviceCategory } from '../../types';
import { Smartphone, Tablet, Laptop, Globe, ArrowRight, X } from 'lucide-react';

interface MockupsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockupsModal: React.FC<MockupsModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedDeviceId, setCurrentView } = useStudioStore();
  const [activeCat, setActiveCat] = useState<DeviceCategory>('smartphones');

  if (!isOpen) return null;

  const filtered = DEVICE_CATALOG.filter((d) => d.category === activeCat);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#121212] border border-[#262626] rounded-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#262626] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Device Mockup Catalog</h2>
            <p className="text-xs text-[#A3A3A3]">
              Select any 3D model to launch instantly in studio viewport
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-[#262626] bg-[#0A0A0A] flex gap-2 overflow-x-auto">
          {[
            { id: 'smartphones', label: 'Phones' },
            { id: 'tablets', label: 'Tablets' },
            { id: 'laptops', label: 'Laptops & Monitors' },
            { id: 'browsers', label: 'Browser Frames' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id as DeviceCategory)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCat === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#A3A3A3] hover:text-white bg-[#171717] border border-[#262626]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Catalog */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((device) => (
            <div
              key={device.id}
              onClick={() => {
                setSelectedDeviceId(device.id);
                setCurrentView('studio');
                onClose();
              }}
              className="p-4 rounded-xl border border-[#262626] bg-[#171717] hover:border-white transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#262626] text-[#A3A3A3]">
                    {device.brand}
                  </span>
                  <span className="text-[10px] text-[#A3A3A3]">
                    {device.colors.length} Finishes
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-white mb-1">
                  {device.name}
                </h3>
                <p className="text-[11px] text-[#A3A3A3]">
                  Native resolution: {device.screenWidth} × {device.screenHeight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-semibold text-white">
                <span className="group-hover:translate-x-0.5 transition-transform">Customize 3D</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
