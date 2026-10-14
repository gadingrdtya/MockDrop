import { create } from 'zustand';
import {
  DeviceSpec,
  DeviceColor,
  CameraPreset,
  LightingPreset,
  BackgroundPreset,
  AspectRatioType,
  ScreenFitMode,
  ExportFormat,
  ExportScale,
  UserSession,
} from '../types';
import { createDefaultScreen } from '../utils/defaultScreens';

export const DEVICE_CATALOG: DeviceSpec[] = [
  // SMARTPHONES
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'smartphones',
    brand: 'Apple',
    aspectRatio: 9 / 19.5,
    screenWidth: 1179,
    screenHeight: 2556,
    defaultColorId: 'natural-titanium',
    colors: [
      { id: 'natural-titanium', name: 'Natural Titanium', hex: '#8B8883', metallic: 0.85, roughness: 0.25 },
      { id: 'black-titanium', name: 'Black Titanium', hex: '#262627', metallic: 0.9, roughness: 0.22 },
      { id: 'white-titanium', name: 'White Titanium', hex: '#E2E2DF', metallic: 0.8, roughness: 0.28 },
      { id: 'desert-titanium', name: 'Desert Titanium', hex: '#CBB29C', metallic: 0.85, roughness: 0.24 },
    ],
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    category: 'smartphones',
    brand: 'Apple',
    aspectRatio: 9 / 19.5,
    screenWidth: 1179,
    screenHeight: 2556,
    defaultColorId: 'midnight',
    colors: [
      { id: 'midnight', name: 'Black', hex: '#1C1D1F', metallic: 0.5, roughness: 0.4 },
      { id: 'blue', name: 'Blue', hex: '#D1DCE3', metallic: 0.4, roughness: 0.4 },
      { id: 'green', name: 'Green', hex: '#D7DFD5', metallic: 0.4, roughness: 0.4 },
      { id: 'pink', name: 'Pink', hex: '#EBD2CE', metallic: 0.4, roughness: 0.4 },
    ],
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    category: 'smartphones',
    brand: 'Apple',
    aspectRatio: 9 / 16,
    screenWidth: 750,
    screenHeight: 1334,
    defaultColorId: 'midnight',
    colors: [
      { id: 'midnight', name: 'Midnight', hex: '#1C1F22', metallic: 0.6, roughness: 0.35 },
      { id: 'starlight', name: 'Starlight', hex: '#F0ECE4', metallic: 0.5, roughness: 0.4 },
      { id: 'red', name: 'Product Red', hex: '#B81324', metallic: 0.6, roughness: 0.3 },
    ],
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    category: 'smartphones',
    brand: 'Samsung',
    aspectRatio: 9 / 19.5,
    screenWidth: 1440,
    screenHeight: 3120,
    defaultColorId: 'titanium-gray',
    colors: [
      { id: 'titanium-gray', name: 'Titanium Gray', hex: '#7D7B7A', metallic: 0.85, roughness: 0.25 },
      { id: 'titanium-black', name: 'Titanium Black', hex: '#2B2B2C', metallic: 0.9, roughness: 0.2 },
      { id: 'titanium-violet', name: 'Titanium Violet', hex: '#4B4254', metallic: 0.8, roughness: 0.3 },
      { id: 'titanium-yellow', name: 'Titanium Yellow', hex: '#C2B895', metallic: 0.75, roughness: 0.35 },
    ],
  },
  {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    category: 'smartphones',
    brand: 'Google',
    aspectRatio: 9 / 20,
    screenWidth: 1344,
    screenHeight: 2992,
    defaultColorId: 'obsidian',
    colors: [
      { id: 'obsidian', name: 'Obsidian', hex: '#212224', metallic: 0.7, roughness: 0.3 },
      { id: 'porcelain', name: 'Porcelain', hex: '#E4DFD6', metallic: 0.6, roughness: 0.35 },
      { id: 'bay', name: 'Bay Blue', hex: '#8FB4D9', metallic: 0.65, roughness: 0.35 },
    ],
  },
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    category: 'smartphones',
    brand: 'Nothing',
    aspectRatio: 9 / 20,
    screenWidth: 1080,
    screenHeight: 2412,
    defaultColorId: 'dark-gray',
    colors: [
      { id: 'dark-gray', name: 'Dark Gray', hex: '#2E2F32', metallic: 0.6, roughness: 0.3 },
      { id: 'white', name: 'White Glyphs', hex: '#E8E8E8', metallic: 0.5, roughness: 0.4 },
    ],
  },

  // TABLETS
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro M4',
    category: 'tablets',
    brand: 'Apple',
    aspectRatio: 3 / 4,
    screenWidth: 2064,
    screenHeight: 2752,
    defaultColorId: 'space-black',
    colors: [
      { id: 'space-black', name: 'Space Black', hex: '#252628', metallic: 0.85, roughness: 0.25 },
      { id: 'silver', name: 'Silver', hex: '#DCDCDC', metallic: 0.8, roughness: 0.3 },
    ],
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    category: 'tablets',
    brand: 'Apple',
    aspectRatio: 3 / 4,
    screenWidth: 1640,
    screenHeight: 2360,
    defaultColorId: 'space-gray',
    colors: [
      { id: 'space-gray', name: 'Space Gray', hex: '#58595B', metallic: 0.75, roughness: 0.3 },
      { id: 'starlight', name: 'Starlight', hex: '#E9E4D7', metallic: 0.65, roughness: 0.35 },
      { id: 'purple', name: 'Purple', hex: '#C9C0D3', metallic: 0.65, roughness: 0.35 },
      { id: 'blue', name: 'Blue', hex: '#BFCCD6', metallic: 0.65, roughness: 0.35 },
    ],
  },
  {
    id: 'galaxy-tab-s9',
    name: 'Galaxy Tab S9 Ultra',
    category: 'tablets',
    brand: 'Samsung',
    aspectRatio: 16 / 10,
    screenWidth: 2960,
    screenHeight: 1848,
    defaultColorId: 'graphite',
    colors: [
      { id: 'graphite', name: 'Graphite', hex: '#37383A', metallic: 0.8, roughness: 0.25 },
      { id: 'beige', name: 'Beige', hex: '#E6E1D8', metallic: 0.65, roughness: 0.35 },
    ],
  },

  // LAPTOPS & DESKTOPS
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16"',
    category: 'laptops',
    brand: 'Apple',
    aspectRatio: 16 / 10,
    screenWidth: 3456,
    screenHeight: 2234,
    defaultColorId: 'space-black',
    colors: [
      { id: 'space-black', name: 'Space Black', hex: '#232427', metallic: 0.9, roughness: 0.25 },
      { id: 'silver', name: 'Silver Aluminum', hex: '#DEDFDE', metallic: 0.85, roughness: 0.28 },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    category: 'laptops',
    brand: 'Apple',
    aspectRatio: 16 / 10,
    screenWidth: 2880,
    screenHeight: 1864,
    defaultColorId: 'midnight',
    colors: [
      { id: 'midnight', name: 'Midnight Blue', hex: '#1E232B', metallic: 0.8, roughness: 0.3 },
      { id: 'starlight', name: 'Starlight', hex: '#E8E4DA', metallic: 0.7, roughness: 0.32 },
      { id: 'space-gray', name: 'Space Gray', hex: '#636569', metallic: 0.8, roughness: 0.28 },
      { id: 'silver', name: 'Silver', hex: '#DFE0E2', metallic: 0.85, roughness: 0.25 },
    ],
  },
  {
    id: 'imac-24',
    name: 'iMac 24"',
    category: 'laptops',
    brand: 'Apple',
    aspectRatio: 16 / 9,
    screenWidth: 4480,
    screenHeight: 2520,
    defaultColorId: 'silver',
    colors: [
      { id: 'silver', name: 'Silver', hex: '#E1E2E4', metallic: 0.8, roughness: 0.25 },
      { id: 'blue', name: 'Pacific Blue', hex: '#4B739B', metallic: 0.75, roughness: 0.28 },
      { id: 'green', name: 'Sage Green', hex: '#587B6D', metallic: 0.75, roughness: 0.28 },
      { id: 'pink', name: 'Blush Pink', hex: '#B85D6C', metallic: 0.75, roughness: 0.28 },
    ],
  },
  {
    id: 'studio-monitor',
    name: 'Studio Display Ultra-wide',
    category: 'laptops',
    brand: 'Generic',
    aspectRatio: 21 / 9,
    screenWidth: 5120,
    screenHeight: 2160,
    defaultColorId: 'matte-black',
    colors: [
      { id: 'matte-black', name: 'Matte Stealth Black', hex: '#1E1E20', metallic: 0.7, roughness: 0.4 },
      { id: 'silver', name: 'Silver Stand', hex: '#CFCFD2', metallic: 0.85, roughness: 0.25 },
    ],
  },

  // BROWSER WINDOW FRAMES
  {
    id: 'safari-glass',
    name: 'Safari Glass Window',
    category: 'browsers',
    brand: 'Generic',
    aspectRatio: 16 / 10,
    screenWidth: 2560,
    screenHeight: 1600,
    defaultColorId: 'dark-glass',
    colors: [
      { id: 'dark-glass', name: 'Dark Glassmorphism', hex: '#171717', metallic: 0.3, roughness: 0.2 },
      { id: 'pure-black', name: 'Solid Stealth', hex: '#0A0A0A', metallic: 0.2, roughness: 0.3 },
    ],
  },
  {
    id: 'chrome-flat',
    name: 'Chrome Minimal Window',
    category: 'browsers',
    brand: 'Generic',
    aspectRatio: 16 / 10,
    screenWidth: 2560,
    screenHeight: 1600,
    defaultColorId: 'dark-charcoal',
    colors: [
      { id: 'dark-charcoal', name: 'Dark Charcoal', hex: '#202124', metallic: 0.1, roughness: 0.5 },
      { id: 'clean-border', name: 'Hairline Border', hex: '#2F3033', metallic: 0.2, roughness: 0.4 },
    ],
  },
];

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'dark-studio',
    name: 'Dark Studio Clean',
    type: 'gradient',
    gradient: {
      type: 'radial',
      stops: [
        { color: '#1A1A1E', position: 0 },
        { color: '#0A0A0A', position: 1 },
      ],
    },
  },
  {
    id: 'pure-black',
    name: 'Pure Black',
    type: 'solid',
    color: '#0A0A0A',
  },
  {
    id: 'transparent',
    name: 'Transparent (Figma/Canva)',
    type: 'transparent',
  },
  {
    id: 'deep-slate',
    name: 'Deep Slate Minimal',
    type: 'solid',
    color: '#141416',
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    type: 'gradient',
    gradient: {
      type: 'radial',
      stops: [
        { color: '#FF5E62', position: 0 },
        { color: '#2A0B3D', position: 1 },
      ],
    },
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    type: 'gradient',
    gradient: {
      type: 'linear',
      angle: 135,
      stops: [
        { color: '#8A2387', position: 0 },
        { color: '#E94057', position: 0.5 },
        { color: '#F27121', position: 1 },
      ],
    },
  },
  {
    id: 'clean-daylight',
    name: 'Clean Daylight',
    type: 'gradient',
    gradient: {
      type: 'radial',
      stops: [
        { color: '#F1F5F9', position: 0 },
        { color: '#CBD5E1', position: 1 },
      ],
    },
  },
  {
    id: 'emerald-gradient',
    name: 'Emerald Aurora',
    type: 'gradient',
    gradient: {
      type: 'radial',
      stops: [
        { color: '#064E3B', position: 0 },
        { color: '#051912', position: 1 },
      ],
    },
  },
];

interface StudioState {
  currentView: 'landing' | 'studio';
  setCurrentView: (view: 'landing' | 'studio') => void;

  // User Auth Session
  user: UserSession | null;
  login: (email: string) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Active Device
  selectedDeviceId: string;
  setSelectedDeviceId: (id: string) => void;
  selectedColorId: string;
  setSelectedColorId: (id: string) => void;

  // Screen texture
  screenTextureUrl: string;
  setScreenTextureUrl: (url: string) => void;
  fitMode: ScreenFitMode;
  setFitMode: (mode: ScreenFitMode) => void;

  // Studio lighting & shadows
  lightingPreset: LightingPreset;
  setLightingPreset: (preset: LightingPreset) => void;
  shadowsEnabled: boolean;
  setShadowsEnabled: (val: boolean) => void;
  floorReflection: boolean;
  setFloorReflection: (val: boolean) => void;

  // Auto Rotate Turntable
  autoRotate: boolean;
  setAutoRotate: (val: boolean) => void;
  autoRotateSpeed: number;
  setAutoRotateSpeed: (speed: number) => void;

  // Camera presets & controls
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  cameraTriggerCount: number;
  resetCamera: () => void;

  // Background / Backdrop
  activeBackgroundPresetId: string;
  setActiveBackgroundPresetId: (id: string) => void;
  customBackgroundColor: string;
  setCustomBackgroundColor: (color: string) => void;
  noiseOverlay: boolean;
  setNoiseOverlay: (val: boolean) => void;

  // Aspect Ratio & Export
  aspectRatio: AspectRatioType;
  setAspectRatio: (ratio: AspectRatioType) => void;
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  exportScale: ExportScale;
  setExportScale: (scale: ExportScale) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;

  // Active Sidebar Tab
  activeSidebarTab: 'device' | 'screen' | 'camera' | 'scene';
  setActiveSidebarTab: (tab: 'device' | 'screen' | 'camera' | 'scene') => void;

  // Helper getters
  getActiveDevice: () => DeviceSpec;
  getActiveColor: () => DeviceColor;
  getActiveBackground: () => BackgroundPreset | undefined;
}

const defaultMobileScreen = typeof window !== 'undefined' ? createDefaultScreen('mobile-dark') : '';
const defaultTabletPortraitScreen = typeof window !== 'undefined' ? createDefaultScreen('tablet-portrait') : '';
const defaultTabletLandscapeScreen = typeof window !== 'undefined' ? createDefaultScreen('tablet-landscape') : '';
const defaultDesktopScreen = typeof window !== 'undefined' ? createDefaultScreen('desktop-dashboard') : '';

const getStoredUser = (): UserSession | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('mockdrop_user');
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const useStudioStore = create<StudioState>((set, get) => ({
  currentView: 'landing',
  setCurrentView: (view) => {
    // Gated access: If entering studio and not logged in, enforce login modal
    if (view === 'studio') {
      const currentUser = get().user;
      if (!currentUser || !currentUser.isLoggedIn) {
        set({ isLoginModalOpen: true });
        return;
      }
    }
    set({ currentView: view });
  },

  user: getStoredUser(),
  login: (email: string) => {
    const name = email.split('@')[0] || 'User';
    const userSession: UserSession = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      isLoggedIn: true,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockdrop_user', JSON.stringify(userSession));
    }
    set({ user: userSession, isLoginModalOpen: false, currentView: 'studio' });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockdrop_user');
    }
    set({ user: null, currentView: 'landing' });
  },
  isLoginModalOpen: false,
  setIsLoginModalOpen: (open) => set({ isLoginModalOpen: open }),

  selectedDeviceId: 'iphone-16-pro',
  setSelectedDeviceId: (id) => {
    const dev = DEVICE_CATALOG.find((d) => d.id === id);
    if (!dev) return;
    
    // Choose appropriate crisp native default texture based on device category and orientation
    let initialScreen = defaultDesktopScreen;
    if (dev.category === 'smartphones') {
      initialScreen = defaultMobileScreen;
    } else if (dev.category === 'tablets') {
      initialScreen = dev.aspectRatio > 1 ? defaultTabletLandscapeScreen : defaultTabletPortraitScreen;
    }

    set({
      selectedDeviceId: id,
      selectedColorId: dev.defaultColorId,
      screenTextureUrl: initialScreen,
    });
  },
  selectedColorId: 'natural-titanium',
  setSelectedColorId: (id) => set({ selectedColorId: id }),

  screenTextureUrl: defaultMobileScreen,
  setScreenTextureUrl: (url) => set({ screenTextureUrl: url }),
  fitMode: 'cover',
  setFitMode: (mode) => set({ fitMode: mode }),

  lightingPreset: 'studio',
  setLightingPreset: (preset) => set({ lightingPreset: preset }),
  shadowsEnabled: true,
  setShadowsEnabled: (val) => set({ shadowsEnabled: val }),
  floorReflection: true,
  setFloorReflection: (val) => set({ floorReflection: val }),

  autoRotate: false,
  setAutoRotate: (val) => set({ autoRotate: val }),
  autoRotateSpeed: 1.5,
  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),

  cameraPreset: 'isometric',
  setCameraPreset: (preset) => set((s) => ({ cameraPreset: preset, cameraTriggerCount: s.cameraTriggerCount + 1 })),
  cameraTriggerCount: 0,
  resetCamera: () => set((s) => ({ cameraPreset: 'front', cameraTriggerCount: s.cameraTriggerCount + 1 })),

  activeBackgroundPresetId: 'dark-studio',
  setActiveBackgroundPresetId: (id) => set({ activeBackgroundPresetId: id }),
  customBackgroundColor: '#0A0A0A',
  setCustomBackgroundColor: (color) => set({ customBackgroundColor: color, activeBackgroundPresetId: 'custom' }),
  noiseOverlay: false,
  setNoiseOverlay: (val) => set({ noiseOverlay: val }),

  aspectRatio: '16:9',
  setAspectRatio: (ratio) => set({ aspectRatio: ratio }),
  exportFormat: 'png',
  setExportFormat: (format) => set({ exportFormat: format }),
  exportScale: 2,
  setExportScale: (scale) => set({ exportScale: scale }),
  isExportModalOpen: false,
  setIsExportModalOpen: (open) => set({ isExportModalOpen: open }),

  activeSidebarTab: 'device',
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),

  getActiveDevice: () => {
    const s = get();
    return DEVICE_CATALOG.find((d) => d.id === s.selectedDeviceId) || DEVICE_CATALOG[0];
  },
  getActiveColor: () => {
    const dev = get().getActiveDevice();
    const color = dev.colors.find((c) => c.id === get().selectedColorId);
    return color || dev.colors[0];
  },
  getActiveBackground: () => {
    const s = get();
    return BACKGROUND_PRESETS.find((b) => b.id === s.activeBackgroundPresetId);
  },
}));
