import React from 'react';
import { useStudioStore } from './store/useStudioStore';
import { LandingPage } from './components/landing/LandingPage';
import { StudioLayout } from './components/studio/StudioLayout';

export const App: React.FC = () => {
  const { currentView } = useStudioStore();

  return currentView === 'landing' ? <LandingPage /> : <StudioLayout />;
};

export default App;
