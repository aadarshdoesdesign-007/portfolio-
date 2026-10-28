'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CompanionMode = 'spider' | 'dog' | 'ant-only';

interface CompanionContextType {
  mode: CompanionMode;
  setMode: (mode: CompanionMode) => void;
}

const CompanionContext = createContext<CompanionContextType>({
  mode: 'spider',
  setMode: () => {},
});

export const CompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<CompanionMode>('spider');

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('companion_mode') as CompanionMode | null;
      if (saved && (saved === 'spider' || saved === 'dog' || saved === 'ant-only')) {
        setModeState(saved);
      }
    }
  }, []);

  const setMode = (newMode: CompanionMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('companion_mode', newMode);
    }
  };

  return (
    <CompanionContext.Provider value={{ mode, setMode }}>
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = () => useContext(CompanionContext);
