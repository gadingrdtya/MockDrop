import React, { forwardRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useStudioStore } from '../../store/useStudioStore';
import { DeviceRenderer } from './DeviceRenderer';
import { SceneLighting } from './SceneLighting';
import { CameraRig } from './CameraRig';

interface StudioCanvasProps {
  interactive?: boolean;
  className?: string;
}

export const StudioCanvas = forwardRef<HTMLCanvasElement, StudioCanvasProps>(
  ({ interactive = true, className = '' }, ref) => {
    const {
      getActiveDevice,
      getActiveColor,
      screenTextureUrl,
      fitMode,
      lightingPreset,
      shadowsEnabled,
      floorReflection,
      cameraPreset,
      cameraTriggerCount,
      getActiveBackground,
      customBackgroundColor,
      noiseOverlay,
    } = useStudioStore();

    const device = getActiveDevice();
    const color = getActiveColor();
    const bgPreset = getActiveBackground();

    // Compute background style
    const getBgStyle = (): React.CSSProperties => {
      if (!bgPreset || bgPreset.id === 'custom') {
        return { backgroundColor: customBackgroundColor };
      }
      if (bgPreset.type === 'transparent') {
        return {
          backgroundImage:
            'linear-gradient(45deg, #181818 25%, transparent 25%), linear-gradient(-45deg, #181818 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #181818 75%), linear-gradient(-45deg, transparent 75%, #181818 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          backgroundColor: '#111111',
        };
      }
      if (bgPreset.type === 'solid') {
        return { backgroundColor: bgPreset.color };
      }
      if (bgPreset.type === 'gradient' && bgPreset.gradient) {
        const { type, angle = 135, stops } = bgPreset.gradient;
        const stopsStr = stops.map((s) => `${s.color} ${s.position * 100}%`).join(', ');
        if (type === 'radial') {
          return { background: `radial-gradient(circle at center, ${stopsStr})` };
        }
        return { background: `linear-gradient(${angle}deg, ${stopsStr})` };
      }
      return { backgroundColor: '#0A0A0A' };
    };

    return (
      <div
        className={`relative w-full h-full overflow-hidden select-none ${className}`}
        style={getBgStyle()}
      >
        {/* Subtle Noise Texture Overlay */}
        {noiseOverlay && (
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        <Canvas
          ref={ref}
          dpr={[1.5, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 3) : 2]}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{
            position: [3.4, 3.0, 3.8],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          shadows
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <SceneLighting preset={lightingPreset} shadowsEnabled={shadowsEnabled} />
          {interactive && (
            <CameraRig preset={cameraPreset} triggerCount={cameraTriggerCount} />
          )}
          <DeviceRenderer
            device={device}
            color={color}
            textureUrl={screenTextureUrl}
            fitMode={fitMode}
          />

          {/* Realistic Floor Contact Shadows & Reflection Plane */}
          {shadowsEnabled && (
            <mesh position={[0, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[16, 16]} />
              <shadowMaterial opacity={0.35} />
            </mesh>
          )}

          {floorReflection && (
            <mesh position={[0, -1.825, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[16, 16]} />
              <meshStandardMaterial
                color="#000000"
                roughness={0.15}
                metalness={0.8}
                transparent
                opacity={0.25}
              />
            </mesh>
          )}
        </Canvas>
      </div>
    );
  }
);

StudioCanvas.displayName = 'StudioCanvas';
