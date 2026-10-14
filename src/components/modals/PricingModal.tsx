import React from 'react';
import { X, Check } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentView } = useStudioStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Sticky/Fixed close button for mobile & tablet responsiveness */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="pr-2">
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">Transparent Pricing</h2>
            <p className="text-xs sm:text-sm text-[#A3A3A3] mt-0.5">
              100% Free for community & creators. No credit card required.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close pricing modal"
            className="shrink-0 p-2 rounded-full text-[#A3A3A3] hover:text-white bg-[#1A1A1A] hover:bg-[#262626] border border-[#262626] transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Free Tier */}
          <div className="p-5 sm:p-6 rounded-xl border border-white bg-[#171717] flex flex-col justify-between">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-mono font-semibold uppercase mb-3">
                Current Plan
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Community Edition</h3>
              <div className="mt-2 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-[#A3A3A3]"> / forever free</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#A3A3A3]">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={2} />
                  <span>Full access to 14+ 3D devices</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={2} />
                  <span>Unlimited PNG & WebP high-res exports</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={2} />
                  <span>Zero watermarks guaranteed</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={2} />
                  <span>100% client-side privacy protection</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onClose();
                setCurrentView('studio');
              }}
              className="mt-6 w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all"
            >
              Start Creating Now
            </button>
          </div>

          {/* Studio Pro */}
          <div className="p-5 sm:p-6 rounded-xl border border-[#262626] bg-[#0E0E0E] flex flex-col justify-between opacity-80">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#262626] text-[#A3A3A3] text-[10px] font-mono uppercase mb-3">
                Coming Soon
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Studio Pro Cloud</h3>
              <div className="mt-2 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">$12</span>
                <span className="text-xs text-[#A3A3A3]"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#A3A3A3]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3A3A3] shrink-0" strokeWidth={2} />
                  <span>Everything in Community</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3A3A3] shrink-0" strokeWidth={2} />
                  <span>4K 60FPS MP4 video animation export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3A3A3] shrink-0" strokeWidth={2} />
                  <span>Custom 3D GLB/GLTF model upload</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A3A3A3] shrink-0" strokeWidth={2} />
                  <span>Figma & Blender plugin integration</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="mt-6 w-full py-2.5 rounded-full border border-[#262626] text-[#A3A3A3] font-semibold text-xs cursor-not-allowed"
            >
              Early Access Q4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
