import React, { useRef, useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { StudioCanvas } from '../3d/StudioCanvas';
import { ExportModal } from './tabs/ExportModal';
import { useStudioStore } from '../../store/useStudioStore';
import { SlidersHorizontal, Eye } from 'lucide-react';

export const StudioLayout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { aspectRatio } = useStudioStore();

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-[16/9] max-w-full max-h-[85vh]';
      case '4:3':
        return 'aspect-[4/3] max-w-[85vw] max-h-[82vh]';
      case '1:1':
        return 'aspect-square max-w-[80vw] max-h-[75vh]';
      case '9:16':
        return 'aspect-[9/16] max-w-[50vw] max-h-[82vh]';
      default:
        return 'aspect-[16/9] max-w-full max-h-[85vh]';
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0A0A] text-white">
      {/* Top Header */}
      <TopBar
        onExportClick={() => setIsExportOpen(true)}
        onToggleMobileSidebar={() => setMobileDrawerOpen(!mobileDrawerOpen)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Central 3D Canvas Stage Viewport */}
        <main className="flex-1 h-full relative overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
          {/* Framed Canvas Container matching aspect ratio with responsive constraint */}
          <div
            className={`w-full h-full rounded-xl overflow-hidden border border-[#262626] relative flex items-center justify-center transition-all duration-300 ${getAspectRatioClasses()}`}
          >
            <StudioCanvas ref={canvasRef} interactive={true} />
          </div>

          {/* Mobile Bottom Floating Control Button */}
          <div className="md:hidden absolute bottom-4 right-4 z-30">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="bg-white text-black font-semibold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#E5E5E5]"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              <span>Studio Controls</span>
            </button>
          </div>
        </main>

        {/* Desktop & Tablet Right Sidebar */}
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        {/* Mobile Slide-over Drawer */}
        {mobileDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-[85vw] max-w-sm h-full bg-[#0A0A0A] border-l border-[#262626] flex flex-col">
              <div className="p-3 border-b border-[#262626] flex justify-between items-center">
                <span className="text-xs font-semibold text-white">Studio Panel</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="text-xs text-[#A3A3A3] hover:text-white px-2 py-1 rounded border border-[#262626]"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="hidden sm:block">
        <StatusBar />
      </div>

      {/* Export Modal */}
      <ExportModal
        canvasRef={canvasRef}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};
