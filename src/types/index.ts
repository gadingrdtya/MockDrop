export type DeviceCategory = 'smartphones' | 'tablets' | 'laptops' | 'browsers';

export interface DeviceColor {
  id: string;
  name: string;
  hex: string;
  metallic: number;
  roughness: number;
}

export interface DeviceSpec {
  id: string;
  name: string;
  category: DeviceCategory;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Nothing' | 'Generic';
  aspectRatio: number; // width / height of the screen
  screenWidth: number;
  screenHeight: number;
  colors: DeviceColor[];
  defaultColorId: string;
}

export type CameraPreset = 'front' | 'isometric' | 'tilt' | 'side';

export type LightingPreset = 'studio' | 'sunset' | 'cyberpunk' | 'daylight';

export type BackgroundType = 'solid' | 'gradient' | 'transparent';

export interface GradientStop {
  color: string;
  position: number;
}

export interface BackgroundPreset {
  id: string;
  name: string;
  type: BackgroundType;
  color?: string;
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number;
    stops: GradientStop[];
  };
}

export type AspectRatioType = '16:9' | '1:1' | '4:3' | '9:16';

export type ScreenFitMode = 'cover' | 'fit';

export type ExportFormat = 'png' | 'webp' | 'webm';

export type ExportScale = 1 | 2;

export interface UserSession {
  email: string;
  name: string;
  isLoggedIn: boolean;
}
