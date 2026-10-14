import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { DeviceSpec, DeviceColor, ScreenFitMode } from '../../../types';

interface BrowserModelProps {
  device: DeviceSpec;
  color: DeviceColor;
  textureUrl: string;
  fitMode: ScreenFitMode;
}

export const BrowserModel: React.FC<BrowserModelProps> = ({ device, color, textureUrl }) => {
  const { gl } = useThree();
  const isSafari = device.id === 'safari-glass';
  const width = 3.6;
  const height = 2.4;
  const depth = 0.08;
  const headerHeight = 0.32;
  const screenHeight = height - headerHeight;

  const screenTexture = useMemo(() => {
    if (!textureUrl) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(textureUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, [textureUrl]);

  return (
    <group position={[0, 0, 0]}>
      {/* Frame Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        {isSafari ? (
          <meshPhysicalMaterial
            color={color.hex}
            roughness={color.roughness}
            metalness={color.metallic}
            transmission={0.4}
            transparent
            opacity={0.92}
          />
        ) : (
          <meshStandardMaterial
            color={color.hex}
            roughness={color.roughness}
            metalness={color.metallic}
          />
        )}
      </mesh>

      {/* Header Bar */}
      <mesh position={[0, height / 2 - headerHeight / 2, depth / 2 + 0.001]}>
        <planeGeometry args={[width - 0.04, headerHeight]} />
        <meshStandardMaterial color="#1C1C1E" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Window Controls (Red / Yellow / Green dots) */}
      <group position={[-width / 2 + 0.28, height / 2 - headerHeight / 2, depth / 2 + 0.005]}>
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.045, 32]} />
          <meshBasicMaterial color="#FF5F56" />
        </mesh>
        <mesh position={[0.13, 0, 0]}>
          <circleGeometry args={[0.045, 32]} />
          <meshBasicMaterial color="#FFBD2E" />
        </mesh>
        <mesh position={[0.26, 0, 0]}>
          <circleGeometry args={[0.045, 32]} />
          <meshBasicMaterial color="#27C93F" />
        </mesh>
      </group>

      {/* Address Bar Pill */}
      <mesh position={[0.1, height / 2 - headerHeight / 2, depth / 2 + 0.004]}>
        <planeGeometry args={[1.6, 0.16]} />
        <meshStandardMaterial color="#2A2A2E" roughness={0.5} />
      </mesh>

      {/* Web Content / Screen Display */}
      <mesh position={[0, -headerHeight / 2 + 0.02, depth / 2 + 0.002]}>
        <planeGeometry args={[width - 0.04, screenHeight - 0.04]} />
        {screenTexture ? (
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
        )}
      </mesh>

      {/* Hairline Border */}
      <lineSegments position={[0, 0, depth / 2 + 0.003]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial color="#383838" />
      </lineSegments>
    </group>
  );
};
