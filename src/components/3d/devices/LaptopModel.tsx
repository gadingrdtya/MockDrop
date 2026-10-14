import React, { useMemo } from 'react';
import * as THREE from 'three';
import { DeviceSpec, DeviceColor, ScreenFitMode } from '../../../types';

interface LaptopModelProps {
  device: DeviceSpec;
  color: DeviceColor;
  textureUrl: string;
  fitMode: ScreenFitMode;
}

export const LaptopModel: React.FC<LaptopModelProps> = ({ device, color, textureUrl }) => {
  const isDesktop = device.id === 'imac-24' || device.id === 'studio-monitor';
  const isUltraWide = device.id === 'studio-monitor';

  // Super crisp texture filtering preventing shimmering & blur on zoom out
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

  if (isDesktop) {
    const mWidth = isUltraWide ? 4.8 : 3.6;
    const mHeight = isUltraWide ? 2.1 : 2.3;
    const mDepth = 0.12;

    const screenWidth = mWidth - 0.12;
    const screenHeight = device.id === 'imac-24' ? mHeight - 0.58 : mHeight - 0.12;
    const screenY = device.id === 'imac-24' ? 0.22 : 0;

    return (
      <group position={[0, 0.2, 0]}>
        {/* Monitor Frame */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[mWidth, mHeight, mDepth]} />
          <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
        </mesh>

        {/* Chin for iMac */}
        {device.id === 'imac-24' && (
          <mesh position={[0, -mHeight / 2 + 0.25, mDepth / 2 + 0.005]}>
            <planeGeometry args={[mWidth - 0.05, 0.45]} />
            <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
          </mesh>
        )}

        {/* Screen Plane with Mipmapped High-Anisotropy Texture */}
        <mesh position={[0, screenY, mDepth / 2 + 0.006]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          {screenTexture ? (
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
          )}
        </mesh>

        {/* Anti-reflective front glass layer */}
        <mesh position={[0, screenY, mDepth / 2 + 0.007]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          <meshPhysicalMaterial transparent opacity={0.04} roughness={0.02} metalness={0.05} clearcoat={1} />
        </mesh>

        {/* Web Camera Lens */}
        <mesh position={[0, mHeight / 2 - 0.05, mDepth / 2 + 0.008]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.002, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Stand Neck */}
        <mesh position={[0, -1.2, -0.2]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 1.3, 0.08]} />
          <meshStandardMaterial color="#CFCFD2" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Stand Base */}
        <mesh position={[0, -1.75, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.04, 1.0]} />
          <meshStandardMaterial color="#CFCFD2" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
    );
  }

  // Laptop (MacBook Pro 16 / MacBook Air M3)
  const baseW = 3.4;
  const baseD = 2.3;
  const baseH = 0.08;

  const lidW = 3.4;
  const lidH = 2.2;
  const lidD = 0.045;

  const screenW = lidW - 0.16;
  const screenH = lidH - 0.16;

  // Deck center position
  const deckCenterZ = baseD / 2 - 0.2;

  return (
    <group position={[0, -0.5, 0]} rotation={[0.08, 0, 0]}>
      {/* Keyboard Base Deck (Horizontal Chassis) */}
      <mesh position={[0, 0, deckCenterZ]} castShadow receiveShadow>
        <boxGeometry args={[baseW, baseH, baseD]} />
        <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
      </mesh>

      {/* Trackpad (Rotated Horizontal to lay flat on top of the deck) */}
      <mesh
        position={[0, baseH / 2 + 0.002, deckCenterZ + 0.48]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.25, 0.82]} />
        <meshStandardMaterial color={color.hex} metalness={0.65} roughness={0.25} />
      </mesh>

      {/* Keyboard Area (Rotated Horizontal to lay flat on top of the deck) */}
      <mesh
        position={[0, baseH / 2 + 0.002, deckCenterZ - 0.32]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.75, 1.15]} />
        <meshStandardMaterial color="#141416" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Display Lid (Opens backward naturally from rear hinge) */}
      <group position={[0, baseH / 2, -0.2]} rotation={[-0.22, 0, 0]}>
        <mesh position={[0, lidH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[lidW, lidH, lidD]} />
          <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, lidH / 2, lidD / 2 + 0.002]}>
          <planeGeometry args={[screenW, screenH]} />
          {screenTexture ? (
            <meshBasicMaterial map={screenTexture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
          )}
        </mesh>

        {/* Screen Glass */}
        <mesh position={[0, lidH / 2, lidD / 2 + 0.004]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshPhysicalMaterial transparent opacity={0.05} roughness={0.03} metalness={0.05} clearcoat={1} />
        </mesh>

        {/* Top Notch for Camera */}
        <mesh position={[0, lidH - 0.11, lidD / 2 + 0.005]}>
          <boxGeometry args={[0.22, 0.045, 0.002]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
};
