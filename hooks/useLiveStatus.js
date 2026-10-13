'use client';

import { useState, useEffect } from 'react';
import { getLiveServiceStatus, toggleLiveSimulation, isLiveSimulated } from '../lib/live-service';

export function useLiveStatus() {
  const [status, setStatus] = useState({
    isLive: false,
    isSimulated: false,
    activeService: null,
    nextService: null,
    countdown: null,
    watTime: '',
    mounted: false,
  });

  useEffect(() => {
    // Initial calculation on client mount to prevent SSR mismatch
    const update = () => {
      const current = getLiveServiceStatus();
      setStatus({ ...current, mounted: true });
    };

    update();
    const interval = setInterval(update, 1000);

    const onCustomEvent = () => update();
    window.addEventListener('cpc:live-status-changed', onCustomEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('cpc:live-status-changed', onCustomEvent);
    };
  }, []);

  return {
    ...status,
    toggleSimulation: toggleLiveSimulation,
  };
}

export default useLiveStatus;
