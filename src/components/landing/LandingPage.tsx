import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Sliders,
  Box,
  Menu,
  X,
  Compass,
  CheckCircle2,
  Terminal,
  Share2,
} from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import { StudioCanvas } from '../3d/StudioCanvas';
import { MockupsModal } from '../modals/MockupsModal';
import { PricingModal } from '../modals/PricingModal';
import { HelpModal } from '../modals/HelpModal';
import { VideoModal } from '../modals/VideoModal';
import { LoginModal } from '../modals/LoginModal';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    setSelectedDeviceId,
    user,
    logout,
    isLoginModalOpen,
    setIsLoginModalOpen,
  } = useStudioStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [mockupsOpen, setMockupsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const handleNavClick = (key: string) => {
    setMobileMenuOpen(false);
    if (key === 'catalog') setMockupsOpen(true);
    else if (key === 'pricing') setPricingOpen(true);
    else if (key === 'docs' || key === 'resources') setHelpOpen(true);
    else if (key === 'features') {
      const el = document.getElementById('features');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white selection:text-black relative">
      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Top Floating Command Bar Navigation */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="backdrop-blur-xl bg-[#121212]/85 border border-[#262626] rounded-full px-5 h-14 flex items-center justify-between shadow-2xl">
          {/* Logo & Version Pill */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              MD
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight">MockDrop</span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#A3A3A3] px-2 py-0.5 rounded-full bg-[#1C1C1C] border border-[#2B2B2B]">
                v2.4 WebGL
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: 'catalog', label: 'Device Matrix' },
              { id: 'features', label: 'Engine Capabilities' },
              { id: 'pricing', label: 'Plans' },
              { id: 'docs', label: 'Documentation' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-xs font-medium text-[#A3A3A3] hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A3A3A3] font-mono">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-xs text-[#888] hover:text-white transition-colors px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-xs text-[#A3A3A3] hover:text-white transition-colors px-3 py-1.5"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setCurrentView('studio')}
              className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#E5E5E5] transition-all flex items-center gap-1.5"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setCurrentView('studio')}
              className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full sm:hidden"
            >
              Studio
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#A3A3A3] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl border border-[#262626] bg-[#121212] backdrop-blur-xl space-y-3">
            {[
              { id: 'catalog', label: 'Device Matrix' },
              { id: 'features', label: 'Engine Capabilities' },
              { id: 'pricing', label: 'Plans' },
              { id: 'docs', label: 'Documentation' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block text-left w-full text-xs text-[#A3A3A3] hover:text-white py-1.5"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#262626] flex gap-2">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex-1 py-2 text-xs border border-[#262626] rounded-full text-[#A3A3A3]"
                >
                  Sign Out ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="flex-1 py-2 text-xs border border-[#262626] rounded-full text-[#A3A3A3]"
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('studio');
                }}
                className="flex-1 py-2 text-xs bg-white text-black rounded-full font-semibold"
              >
                Launch Studio
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Workbench Style Asymmetric Split Grid */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Technical Pitch & Controls */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] text-[11px] font-mono text-[#A3A3A3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Curated Flagship 3D Studio • Privacy-First & 100% Client-Side</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Curated 3D device staging. Zero cloud upload.
            </h1>

            <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed">
              Stage UI designs into curated flagship hardware meshes. Instant 4K Retina export, 360° video loop recording, and studio lighting running 100% locally on your browser GPU.
            </p>

            {/* Quick Action Matrix Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('studio')}
                className="bg-white text-black text-xs font-semibold px-6 py-3.5 rounded-full hover:bg-[#E5E5E5] transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Mockup Studio</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => setVideoOpen(true)}
                className="border border-[#262626] bg-[#171717] text-white text-xs font-medium px-5 py-3.5 rounded-full hover:bg-[#222] transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Quick Tour (1m)</span>
              </button>
            </div>

            {/* Live Specs Terminal Strip */}
            <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] font-mono text-[11px] text-[#A3A3A3] space-y-1.5">
              <div className="flex justify-between items-center text-white">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Pipeline</span>
                </span>
                <span className="text-[#10B981]">100% Client-Side Render</span>
              </div>
              <div className="flex justify-between">
                <span>Viewport FPS:</span>
                <span className="text-white">60.0 Native WebGL</span>
              </div>
              <div className="flex justify-between">
                <span>Supported Ratios:</span>
                <span className="text-white">16:9 • 4:3 • 1:1 • 9:16</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive 3D Staging Bench */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-[#262626] bg-[#121212] p-2 sm:p-3 overflow-hidden shadow-2xl">
              {/* Studio Canvas Framed Viewport */}
              <div className="w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-xl overflow-hidden relative border border-[#1F1F1F]">
                {/* Overlay Top Bar inside the canvas */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                  <div className="bg-[#0A0A0A]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#262626] text-[11px] font-mono text-[#A3A3A3] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Free Orbit Camera • Drag & Rotate</span>
                  </div>

                  <button
                    onClick={() => setCurrentView('studio')}
                    className="pointer-events-auto bg-white text-black text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-[#E5E5E5] transition-all flex items-center gap-1.5"
                  >
                    <span>Full Studio</span>
                    <ArrowRight className="w-3 h-3" strokeWidth={2} />
                  </button>
                </div>

                {/* 3D Canvas */}
                <StudioCanvas interactive={true} />
              </div>

              {/* Quick Model Selector Pills underneath canvas */}
              <div className="mt-3 px-1 py-1 flex items-center justify-between text-xs overflow-x-auto gap-2">
                <span className="text-[11px] font-mono text-[#A3A3A3] uppercase shrink-0">
                  Quick Swap:
                </span>
                <div className="flex gap-2">
                  {[
                    { id: 'iphone-16-pro', label: 'iPhone 16 Pro' },
                    { id: 'galaxy-s24-ultra', label: 'Galaxy S24' },
                    { id: 'macbook-pro-16', label: 'MacBook Pro' },
                    { id: 'safari-glass', label: 'Safari Frame' },
                  ].map((dev) => (
                    <button
                      key={dev.id}
                      onClick={() => setSelectedDeviceId(dev.id)}
                      className="px-3 py-1 rounded-full text-[11px] bg-[#1A1A1A] border border-[#2B2B2B] text-[#A3A3A3] hover:text-white hover:border-white transition-all whitespace-nowrap"
                    >
                      {dev.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Metric Strip */}
      <section className="border-y border-[#262626] bg-[#0E0E0E] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">14+</div>
            <div className="text-xs text-[#A3A3A3] mt-1 font-mono uppercase">Precision Models</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">0ms</div>
            <div className="text-xs text-[#A3A3A3] mt-1 font-mono uppercase">Cloud Upload Latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">4K UHD</div>
            <div className="text-xs text-[#A3A3A3] mt-1 font-mono uppercase">Rasterization Scale</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">0$</div>
            <div className="text-xs text-[#A3A3A3] mt-1 font-mono uppercase">Free Community License</div>
          </div>
        </div>
      </section>

      {/* Engineering Capabilities: Interactive Feature Matrix */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-[11px] font-mono text-[#A3A3A3] uppercase tracking-wider mb-2">
              Architecture & Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built for precision showcase workflows
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('studio')}
            className="text-xs font-semibold text-white hover:underline flex items-center gap-1.5"
          >
            <span>Explore full studio interface</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Feature Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626] space-y-4 hover:border-[#383838] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] border border-[#2E2E2E] flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Curated Flagship Hardware & Local Privacy
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Target top devices: iPhone 16 Pro, S24 Ultra, iPad Pro M4, and MacBook Pro 16". Zero telemetry and zero cloud upload: all 3D passes render locally on your machine.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626] space-y-4 hover:border-[#383838] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] border border-[#2E2E2E] flex items-center justify-center text-white">
              <Sliders className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Studio Lighting & Soft Contact Shadows
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Toggle between Studio Clean, Warm Sunset, and Cyberpunk Neon lighting matrices. Integrated ground contact shadow calculation adds instant physical realism.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626] space-y-4 hover:border-[#383838] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] border border-[#2E2E2E] flex items-center justify-center text-white">
              <Zap className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Anisotropic Screen Projection
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Upload any aspect ratio screenshot. Automatic UV resampling ensures your typography remains crisp even under steep 45° perspective tilts.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#141414] border border-[#262626] space-y-4 hover:border-[#383838] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] border border-[#2E2E2E] flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Transparent Alpha & Retina HD Export
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Export straight to Figma or slide decks without background cutout chores. High-density canvas rasterization scales up to 4K resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-10 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
              MD
            </div>
            <span className="font-semibold text-white">MockDrop Studio</span>
            <span>— 3D Device Showcase Engine</span>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => setMockupsOpen(true)} className="hover:text-white transition-colors">
              Device Catalog
            </button>
            <button onClick={() => setHelpOpen(true)} className="hover:text-white transition-colors">
              Docs & FAQs
            </button>
            <button onClick={() => setPricingOpen(true)} className="hover:text-white transition-colors">
              Plans
            </button>
            <button
              onClick={() => setCurrentView('studio')}
              className="text-white hover:underline font-semibold"
            >
              Launch Studio
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <MockupsModal isOpen={mockupsOpen} onClose={() => setMockupsOpen(false)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};
