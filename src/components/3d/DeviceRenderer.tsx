import React from 'react';
import { DeviceSpec, DeviceColor, ScreenFitMode } from '../../types';
import { PhoneModel } from './devices/PhoneModel';
import { TabletModel } from './devices/TabletModel';
import { LaptopModel } from './devices/LaptopModel';
import { BrowserModel } from './devices/BrowserModel';

interface DeviceRendererProps {
  device: DeviceSpec;
  color: DeviceColor;
  textureUrl: string;
  fitMode: ScreenFitMode;
}

export const DeviceRenderer: React.FC<DeviceRendererProps> = ({
  device,
  color,
  textureUrl,
  fitMode,
}) => {
  switch (device.category) {
    case 'smartphones':
      return <PhoneModel device={device} color={color} textureUrl={textureUrl} fitMode={fitMode} />;
    case 'tablets':
      return <TabletModel device={device} color={color} textureUrl={textureUrl} fitMode={fitMode} />;
    case 'laptops':
      return <LaptopModel device={device} color={color} textureUrl={textureUrl} fitMode={fitMode} />;
    case 'browsers':
      return <BrowserModel device={device} color={color} textureUrl={textureUrl} fitMode={fitMode} />;
    default:
      return <PhoneModel device={device} color={color} textureUrl={textureUrl} fitMode={fitMode} />;
  }
};
