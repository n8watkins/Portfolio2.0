import { useState, useEffect } from 'react';

export const usePageLoadComplete = () => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => setIsComplete(true), 1000);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(() => setIsComplete(true), 1000);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return isComplete;
};