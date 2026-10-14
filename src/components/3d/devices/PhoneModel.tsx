import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { DeviceSpec, DeviceColor, ScreenFitMode } from '../../../types';

interface PhoneModelProps {
  device: DeviceSpec;
  color: DeviceColor;
  textureUrl: string;
  fitMode: ScreenFitMode;
}

export const PhoneModel: React.FC<PhoneModelProps> = ({ device, color, textureUrl, fitMode }) => {
  const { gl } = useThree();
  const width = 1.58;
  const height = 3.28;
  const depth = 0.16;
  const cornerRadius = 0.28;

  // Body chassis shape
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
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    }),
    [depth]
  );

  // Screen inner bounds - precise rounded screen geometry to stay completely within bezel
  const screenBezel = 0.08;
  const screenW = width - screenBezel * 2;
  const screenH = height - screenBezel * 2;
  const screenR = cornerRadius - 0.07;

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

  // Sharp texture with custom UV assignment on rounded screen geometry
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

  // Custom UV mapping for rounded screen ShapeGeometry so texture covers exactly (0..1)
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

  // Device model flags
  const isIPhone16Pro = device.id.includes('iphone-16-pro');
  const isIPhone15 = device.id === 'iphone-15';
  const isIPhoneSE = device.id === 'iphone-se';
  const isGalaxy = device.brand === 'Samsung';
  const isPixel = device.brand === 'Google';
  const isNothing = device.brand === 'Nothing';
  const isApplePill = isIPhone16Pro || isIPhone15;

  return (
    <group position={[0, 0, 0]}>
      {/* Phone Chassis / Frame */}
      <mesh position={[0, 0, -depth / 2]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrudeSettings]} />
        <meshStandardMaterial
          color={color.hex}
          metalness={color.metallic}
          roughness={color.roughness}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Screen Display Face (Rounded Shape inside bezel - no corner overflow) */}
      <mesh geometry={screenGeometry} position={[0, 0, depth / 2 + 0.041]} receiveShadow>
        {screenTexture ? (
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.1} />
        )}
      </mesh>

      {/* Glass Screen Reflection Layer */}
      <mesh geometry={screenGeometry} position={[0, 0, depth / 2 + 0.042]}>
        <meshPhysicalMaterial
          transparent
          opacity={0.06}
          roughness={0.04}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* ================= FRONT CAMERA / DYNAMIC ISLAND ================= */}
      {/* iPhone 15 & 16 Pro Dynamic Island (Wajib Melebar Horizontal Khas Apple) */}
      {isApplePill && (
        <group position={[0, height / 2 - 0.20, depth / 2 + 0.043]}>
          {/* Capsule pill diputar Z: 90 deg agar HORIZONTAL persis seperti iPhone aslinya */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.038, 0.22, 16, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          {/* Lensa selfie front camera di sisi kanan pill */}
          <mesh position={[0.08, 0, 0.001]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color="#111122" />
          </mesh>
        </group>
      )}

      {/* Punch hole camera for Android (Galaxy & Pixel) */}
      {(isPixel || isGalaxy) && (
        <mesh position={[0, height / 2 - 0.16, depth / 2 + 0.043]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.005, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      )}

      {/* ================= REAR CAMERA SYSTEMS (MENGIKUTI IPHONE ASLI) ================= */}
      {/* 1. iPhone 16 Pro Asli: Pulau Kamera Segitiga Pro Klasik (2 Vertikal di Kiri, 1 di Kanan Tengah + LiDAR + Flash) */}
      {isIPhone16Pro && (
        <group position={[-width / 2 + 0.45, height / 2 - 0.45, -depth / 2 - 0.05]}>
          {/* Pulau Kamera Persegi Membulat Besar */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.68, 0.04]} />
            <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
          </mesh>

          {/* Lensa 1: Kiri Atas (Main Camera) */}
          <mesh position={[-0.15, 0.15, -0.035]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Lensa 2: Kiri Bawah (Ultra Wide) */}
          <mesh position={[-0.15, -0.15, -0.035]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Lensa 3: Kanan Tengah (Telephoto - Segitiga khas Apple Pro Asli) */}
          <mesh position={[0.15, 0.0, -0.035]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* True Tone Flash (Kanan Atas) */}
          <mesh position={[0.15, 0.18, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.03, 24]} />
            <meshStandardMaterial color="#FFF5D6" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* LiDAR Scanner Hitam (Kanan Bawah) */}
          <mesh position={[0.15, -0.18, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 24]} />
            <meshBasicMaterial color="#1A1A1A" />
          </mesh>
        </group>
      )}

      {/* 2. iPhone 15 Asli: Dua Lensa DIAGONAL (Kiri Atas & Kanan Bawah) */}
      {isIPhone15 && (
        <group position={[-width / 2 + 0.42, height / 2 - 0.42, -depth / 2 - 0.05]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.60, 0.60, 0.04]} />
            <meshStandardMaterial color={color.hex} metalness={color.metallic} roughness={color.roughness} />
          </mesh>
          {/* Lensa 1: Kiri Atas */}
          <mesh position={[-0.14, 0.14, -0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.115, 0.045, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Lensa 2: Kanan Bawah (Diagonal Asli iPhone 15) */}
          <mesh position={[0.14, -0.14, -0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.115, 0.045, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Flash: Kanan Atas */}
          <mesh position={[0.14, 0.14, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 24]} />
            <meshStandardMaterial color="#FFF5D6" />
          </mesh>
        </group>
      )}

      {/* 3. iPhone SE: Lensa Tunggal Classic */}
      {isIPhoneSE && (
        <group position={[-width / 2 + 0.30, height / 2 - 0.30, -depth / 2 - 0.04]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.18, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
            <meshStandardMaterial color="#FFF5D6" />
          </mesh>
        </group>
      )}

      {/* 4. Samsung Galaxy S24 Ultra: Cincin Kamera Mengambang Vertikal */}
      {isGalaxy && (
        <group position={[-width / 2 + 0.35, height / 2 - 0.40, -depth / 2 - 0.04]}>
          <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.10, 0.10, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.10, 0.10, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.10, 0.10, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.22, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.065, 0.035, 24]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.22, -0.11, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.065, 0.035, 24]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* 5. Google Pixel 8 Pro: Visor Bar Horizontal */}
      {isPixel && (
        <group position={[0, height / 2 - 0.55, -depth / 2 - 0.05]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[width + 0.02, 0.38, 0.06]} />
            <meshStandardMaterial color={color.hex} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[-0.20, 0, -0.032]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.09, 0.32, 16, 16]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[0.22, 0, -0.032]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 32]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
        </group>
      )}

      {/* 6. Nothing Phone (2): Dual Lens & Glyphs */}
      {isNothing && (
        <group position={[-width / 2 + 0.38, height / 2 - 0.42, -depth / 2 - 0.04]}>
          <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.38, 0.12, 0]} rotation={[0, Math.PI, 0]}>
            <ringGeometry args={[0.35, 0.37, 32]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.65} />
          </mesh>
        </group>
      )}

      {/* Physical Hardware Buttons */}
      <mesh position={[width / 2 + 0.045, 0.35, 0]} castShadow>
        <boxGeometry args={[0.015, 0.35, 0.06]} />
        <meshStandardMaterial color={color.hex} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-width / 2 - 0.045, 0.55, 0]} castShadow>
        <boxGeometry args={[0.015, 0.22, 0.06]} />
        <meshStandardMaterial color={color.hex} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-width / 2 - 0.045, 0.25, 0]} castShadow>
        <boxGeometry args={[0.015, 0.22, 0.06]} />
        <meshStandardMaterial color={color.hex} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};
