import React from 'react';
import { LightingPreset } from '../../types';
import { ContactShadows } from '@react-three/drei';

interface SceneLightingProps {
  preset: LightingPreset;
  shadowsEnabled: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({ preset, shadowsEnabled }) => {
  return (
    <>
      {preset === 'studio' && (
        <>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} castShadow shadow-mapSize={1024} />
          <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#D8E2F0" />
          <pointLight position={[0, -2, 3]} intensity={0.5} />
        </>
      )}

      {preset === 'sunset' && (
        <>
          <ambientLight intensity={0.5} color="#592E83" />
          <directionalLight position={[5, 4, 3]} intensity={2.4} color="#FFA25B" castShadow />
          <directionalLight position={[-5, 2, -2]} intensity={1.2} color="#9D4EDD" />
          <pointLight position={[0, 4, -3]} intensity={1.0} color="#FF6384" />
        </>
      )}

      {preset === 'cyberpunk' && (
        <>
          <ambientLight intensity={0.3} color="#180033" />
          <directionalLight position={[4, 4, 3]} intensity={2.2} color="#00E5FF" castShadow />
          <directionalLight position={[-4, 2, -3]} intensity={2.0} color="#FF007F" />
          <pointLight position={[0, -3, 2]} intensity={1.2} color="#9D00FF" />
        </>
      )}

      {preset === 'daylight' && (
        <>
          <ambientLight intensity={1.1} color="#EDF2F7" />
          <directionalLight position={[6, 8, 5]} intensity={2.6} color="#FFFFFF" castShadow />
          <directionalLight position={[-4, 3, 2]} intensity={0.7} color="#BEE3F8" />
        </>
      )}

      {/* Realistic Ground Contact Shadows underneath device */}
      {shadowsEnabled && (
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.65}
          scale={10}
          blur={2.2}
          far={4.5}
        />
      )}
    </>
  );
};
