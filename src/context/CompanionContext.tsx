'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CompanionMode = 'leo' | 'dora' | 'none' | 'spider';

interface CompanionContextType {
  mode: CompanionMode;
  setMode: (mode: CompanionMode) => void;
}

const CompanionContext = createContext<CompanionContextType>({
  mode: 'leo',
  setMode: () => {},
});

export const CompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<CompanionMode>('leo');

  // Load from localStorage on mount with migration support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('companion_mode');
      if (saved === 'dog') {
        setModeState('dora');
        localStorage.setItem('companion_mode', 'dora');
      } else if (saved === 'ant-only') {
        setModeState('none');
        localStorage.setItem('companion_mode', 'none');
      } else if (saved && ['leo', 'dora', 'none', 'spider'].includes(saved)) {
        setModeState(saved as CompanionMode);
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
