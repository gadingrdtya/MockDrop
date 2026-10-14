import React, { useMemo } from 'react';
import * as THREE from 'three';
import { DeviceSpec, DeviceColor, ScreenFitMode } from '../../../types';

interface TabletModelProps {
  device: DeviceSpec;
  color: DeviceColor;
  textureUrl: string;
  fitMode: ScreenFitMode;
}

export const TabletModel: React.FC<TabletModelProps> = ({ device, color, textureUrl }) => {
  // Compute true 3D dimensions based on physical device aspect ratio
  // iPad Pro M4 & iPad Air: Portrait 3:4 (width: 2.55, height: 3.4)
  // Galaxy Tab S9 Ultra: Landscape 16:10 (width: 3.7, height: 2.31)
  const isLandscape = device.aspectRatio > 1;
  const width = isLandscape ? 3.7 : 2.55;
  const height = isLandscape ? 2.31 : 3.4;
  const depth = 0.10;
  const cornerRadius = 0.20;

  const bodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    const w = width;
    const h = height;
    const r = cornerRadius;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    return shape;
  }, [width, height, cornerRadius]);

  const extrudeSettings = useMemo(
    () => ({
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    }),
    [depth]
  );

  // Exact rounded inner screen geometry perfectly aligned with screen aspect ratio
  const screenBezel = 0.10;
  const screenW = width - screenBezel * 2;
  const screenH = height - screenBezel * 2;
  const screenR = cornerRadius - 0.05;

  const screenShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -screenW / 2;
    const y = -screenH / 2;
    const w = screenW;
    const h = screenH;
    const r = screenR;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);

    return shape;
  }, [screenW, screenH, screenR]);

  const screenGeometry = useMemo(() => {
    const geom = new THREE.ShapeGeometry(screenShape);
    const pos = geom.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + screenW / 2) / screenW;
      const v = (pos.getY(i) + screenH / 2) / screenH;
      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
    }
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    return geom;
  }, [screenShape, screenW, screenH]);

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
      {/* Tablet Metal Body */}
      <mesh position={[0, 0, -depth / 2]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrudeSettings]} />
        <meshStandardMaterial
          color={color.hex}
          metalness={color.metallic}
          roughness={color.roughness}
        />
      </mesh>

      {/* Screen Face (Rounded corners conforming to bezel) */}
      <mesh geometry={screenGeometry} position={[0, 0, depth / 2 + 0.026]} receiveShadow>
        {screenTexture ? (
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.1} />
        )}
      </mesh>

      {/* Glass Layer */}
      <mesh geometry={screenGeometry} position={[0, 0, depth / 2 + 0.027]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.06}
          roughness={0.04}
          metalness={0.05}
          clearcoat={1}
        />
      </mesh>

      {/* Front FaceTime Camera dot */}
      <mesh
        position={[
          isLandscape ? 0 : 0,
          isLandscape ? height / 2 - 0.05 : height / 2 - 0.05,
          depth / 2 + 0.028,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.002, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Rear Camera Island */}
      <group position={[-width / 2 + 0.35, height / 2 - 0.35, -depth / 2 - 0.03]}>
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.42, 0.03]} />
          <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
        </mesh>
        <mesh position={[0, 0.08, -0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 32]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};
