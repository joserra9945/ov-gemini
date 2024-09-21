import { useEffect, useState } from 'react';

import useWindowSize from '@shared/hooks/useWindowsSize';

import { detectDevice } from '../utils/screens';

export const useDevice = () => {
  const { width } = useWindowSize();
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
    detectDevice(window.innerWidth)
  );

  useEffect(() => {
    setDevice(detectDevice(width || window.innerWidth));
  }, [width]);

  return {
    device,
  };
};
