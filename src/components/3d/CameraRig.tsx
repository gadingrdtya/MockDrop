import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { CameraPreset } from '../../types';
import { useStudioStore } from '../../store/useStudioStore';

interface CameraRigProps {
  preset: CameraPreset;
  triggerCount: number;
}

const PRESET_COORDINATES: Record<CameraPreset, [number, number, number]> = {
  front: [0, 0, 4.6],
  isometric: [3.4, 3.0, 3.8],
  tilt: [1.8, 1.1, 4.0],
  side: [4.2, 0.4, 1.8],
};

export const CameraRig: React.FC<CameraRigProps> = ({ preset, triggerCount }) => {
  const { camera } = useThree();
  const { autoRotate, autoRotateSpeed } = useStudioStore();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(...PRESET_COORDINATES[preset]));
  const isTransitioning = useRef<boolean>(false);

  useEffect(() => {
    const coords = PRESET_COORDINATES[preset];
    targetPos.current.set(coords[0], coords[1], coords[2]);
    isTransitioning.current = true;
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, [preset, triggerCount]);

  useFrame(() => {
    if (isTransitioning.current) {
      camera.position.lerp(targetPos.current, 0.08);
      if (camera.position.distanceTo(targetPos.current) < 0.01) {
        camera.position.copy(targetPos.current);
        isTransitioning.current = false;
      }
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.8}
      maxDistance={9.5}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      makeDefault
    />
  );
};
