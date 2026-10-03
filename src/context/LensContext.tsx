'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DesignLens } from '@/types';

interface LensContextType {
  lens: DesignLens;
  setLens: (lens: DesignLens) => void;
}

const LensContext = createContext<LensContextType>({
  lens: 'default',
  setLens: () => {}
});

export const LensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lens, setLensState] = useState<DesignLens>('default');

  const setLens = useCallback((newLens: DesignLens) => {
    setLensState(newLens);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-lens', newLens);
    }
  }, []);

  useEffect(() => {
    // Initial load must always start in DEFAULT lens
    setLens('default');
  }, [setLens]);

  return (
    <LensContext.Provider value={{ lens, setLens }}>
      {children}
    </LensContext.Provider>
  );
};

export const useLens = () => useContext(LensContext);
