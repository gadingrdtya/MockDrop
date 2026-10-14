import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Check, Sparkles, Smartphone, Laptop, Tablet } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStudioStore } from '../../store/useStudioStore';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Interactive 3D Model specifically for the live demo walkthrough
const Demo3DChassis: React.FC<{
  deviceType: 'phone' | 'tablet' | 'laptop';
  isPlaying: boolean;
  lightingTheme: 'studio' | 'neon' | 'sunset';
}> = ({ deviceType, isPlaying, lightingTheme }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isPlaying && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0015) * 0.15;
    }
  });

  const getGeometry = () => {
    if (deviceType === 'phone') {
      return <boxGeometry args={[1.5, 3.1, 0.16]} />;
    }
    if (deviceType === 'tablet') {
      return <boxGeometry args={[2.5, 3.4, 0.12]} />;
    }
    return <boxGeometry args={[3.4, 2.2, 0.1]} />;
  };

  const getLightColor = () => {
    if (lightingTheme === 'neon') return '#EC4899';
    if (lightingTheme === 'sunset') return '#F59E0B';
    return '#FFFFFF';
  };

  return (
    <group ref={meshRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} color={getLightColor()} />
      <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#4F46E5" />
      <mesh castShadow receiveShadow>
        {getGeometry()}
        <meshStandardMaterial
          color="#1A1A1A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      {/* Screen Glowing Front Face */}
      <mesh position={[0, 0, deviceType === 'laptop' ? 0.06 : 0.09]}>
        {deviceType === 'phone' ? (
          <planeGeometry args={[1.36, 2.94]} />
        ) : deviceType === 'tablet' ? (
          <planeGeometry args={[2.3, 3.2]} />
        ) : (
          <planeGeometry args={[3.2, 2.0]} />
        )}
        <meshBasicMaterial color="#222225" />
      </mesh>
    </group>
  );
};

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentView } = useStudioStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeDevice, setActiveDevice] = useState<'phone' | 'tablet' | 'laptop'>('phone');
  const [lighting, setLighting] = useState<'studio' | 'neon' | 'sunset'>('studio');
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { title: '1. Select 3D Hardware Model', desc: 'Choose iPhone 16 Pro, Galaxy Tab, MacBook Pro, or browser window.' },
    { title: '2. Drop Your Design Image', desc: 'Upload your app screen with real-time UV auto-fitting and corner rounding.' },
    { title: '3. Orbit & Tune Studio Lights', desc: 'Rotate in 360°, change angles, toggle shadows, and set custom backdrops.' },
    { title: '4. Export 4K Lossless Mockup', desc: 'Instant high-DPI transparent PNG export without background cleanup.' },
  ];

  // Auto cycle walkthrough steps if playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-[#121212] border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] font-mono text-[#A3A3A3]">
              <Sparkles className="w-3 h-3 text-[#10B981]" />
              <span>Interactive 3D Walkthrough Engine</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              Quick Tour — How MockDrop Works
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              Live real-time 3D demo with zero external video loading
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tour modal"
            className="shrink-0 p-2 rounded-full text-[#A3A3A3] hover:text-white bg-[#1A1A1A] hover:bg-[#262626] border border-[#262626] transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Interactive 3D Demo Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Left Canvas: Live 3D Showcase Canvas */}
          <div className="lg:col-span-7 relative h-56 sm:h-72 md:h-80 lg:h-auto aspect-video rounded-xl border border-[#262626] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              style={{ width: '100%', height: '100%' }}
              gl={{ antialias: true, alpha: true }}
            >
              <Demo3DChassis
                deviceType={activeDevice}
                isPlaying={isPlaying}
                lightingTheme={lighting}
              />
            </Canvas>

            {/* Play/Pause Overlay Controls */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 sm:gap-2 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#262626]">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-[#10B981] transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-mono"
              >
                {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <div className="w-[1px] h-3 bg-[#333]" />
              <button
                onClick={() => {
                  setActiveDevice('phone');
                  setLighting('studio');
                  setStepIndex(0);
                  setIsPlaying(true);
                }}
                className="text-[#A3A3A3] hover:text-white transition-colors"
                title="Restart Tour"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Device Switcher Pills inside Demo Viewport */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10 bg-black/70 backdrop-blur-md p-1 rounded-full border border-[#262626]">
              <button
                onClick={() => setActiveDevice('phone')}
                className={`p-1.5 rounded-full text-xs transition-colors ${
                  activeDevice === 'phone' ? 'bg-white text-black' : 'text-[#A3A3A3] hover:text-white'
                }`}
                title="Smartphone"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveDevice('tablet')}
                className={`p-1.5 rounded-full text-xs transition-colors ${
                  activeDevice === 'tablet' ? 'bg-white text-black' : 'text-[#A3A3A3] hover:text-white'
                }`}
                title="Tablet"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveDevice('laptop')}
                className={`p-1.5 rounded-full text-xs transition-colors ${
                  activeDevice === 'laptop' ? 'bg-white text-black' : 'text-[#A3A3A3] hover:text-white'
                }`}
                title="Laptop"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lighting Pill Switcher */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 z-10 bg-black/70 backdrop-blur-md p-0.5 sm:p-1 rounded-full border border-[#262626]">
              {(['studio', 'neon', 'sunset'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLighting(l)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono capitalize transition-colors ${
                    lighting === l ? 'bg-white text-black font-semibold' : 'text-[#A3A3A3] hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Step by step walkthrough */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3]">
              Workflow Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {steps.map((st, idx) => {
                const isActive = stepIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setStepIndex(idx);
                      if (idx === 0) setActiveDevice('phone');
                      if (idx === 1) setActiveDevice('tablet');
                      if (idx === 2) setLighting('neon');
                    }}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1C1C1E] border-white/40 text-white'
                        : 'bg-[#141414] border-[#262626] text-[#888] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 ${
                          isActive ? 'bg-white text-black' : 'bg-[#222] text-[#888]'
                        }`}
                      >
                        {isActive ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </div>
                      <div className="min-w-0">
                        <h5 className={`text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-[#BBB]'}`}>
                          {st.title}
                        </h5>
                        <p className="text-[11px] mt-1 leading-snug text-[#888]">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#262626]">
          <span className="text-[11px] sm:text-xs text-[#A3A3A3] font-mono text-center sm:text-left">
            Direct WebGL hardware acceleration • Ready to use
          </span>
          <button
            onClick={() => {
              onClose();
              setCurrentView('studio');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all"
          >
            Launch MockDrop Studio
          </button>
        </div>
      </div>
    </div>
  );
};
