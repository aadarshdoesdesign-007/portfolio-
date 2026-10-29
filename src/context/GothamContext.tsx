'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type GothamTransitionStage =
  | 'idle'
  | 'dim'
  | 'searchlight'
  | 'beam'
  | 'bat'
  | 'emerge'
  | 'settle';

interface GothamContextType {
  isGotham: boolean;
  toggleGotham: () => void;
  isTransitioning: boolean;
  transitionStage: GothamTransitionStage;
}

const GothamContext = createContext<GothamContextType>({
  isGotham: false,
  toggleGotham: () => {},
  isTransitioning: false,
  transitionStage: 'idle',
});

export const GothamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGotham, setIsGotham] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionStage, setTransitionStage] = useState<GothamTransitionStage>('idle');

  // Load persisted theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_gotham_mode');
      if (saved === 'true') {
        setIsGotham(true);
        document.documentElement.classList.add('gotham');
      }
    }
  }, []);

  const toggleGotham = useCallback(() => {
    if (isTransitioning) return; // Prevent double trigger

    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Instant transition without cinematic sequence
      const nextState = !isGotham;
      setIsGotham(nextState);
      localStorage.setItem('portfolio_gotham_mode', nextState ? 'true' : 'false');
      if (nextState) {
        document.documentElement.classList.add('gotham');
      } else {
        document.documentElement.classList.remove('gotham');
      }
      return;
    }

    // Run 2.0s Cinematic Transition Sequence
    setIsTransitioning(true);
    const nextState = !isGotham;

    if (nextState) {
      // 1. Screen briefly fades to near-black (0 - 300ms)
      setTransitionStage('dim');

      setTimeout(() => {
        // 2. Distant searchlight switches on with visible sweep (300 - 750ms)
        setTransitionStage('searchlight');
        document.documentElement.classList.add('gotham');
        setIsGotham(true);
        localStorage.setItem('portfolio_gotham_mode', 'true');
      }, 300);

      setTimeout(() => {
        // 3. Beam travels upward through atmospheric fog (750 - 1200ms)
        setTransitionStage('beam');
      }, 750);

      setTimeout(() => {
        // 4. Bat emblem materializes in the sky (1200 - 1650ms)
        setTransitionStage('bat');
      }, 1200);

      setTimeout(() => {
        // 5. Gotham skyline & hero typography emerge from the darkness (1650 - 2100ms)
        setTransitionStage('emerge');
      }, 1650);

      setTimeout(() => {
        // 6. Complete transition & settle into ambient animation (2100ms)
        setTransitionStage('settle');
        setIsTransitioning(false);
        setTransitionStage('idle');
      }, 2100);
    } else {
      // Reverse sequence to restore light paper theme cleanly
      setTransitionStage('dim');

      setTimeout(() => {
        document.documentElement.classList.remove('gotham');
        setIsGotham(false);
        localStorage.setItem('portfolio_gotham_mode', 'false');
        setTransitionStage('emerge');
      }, 400);

      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStage('idle');
      }, 850);
    }
  }, [isGotham, isTransitioning]);

  return (
    <GothamContext.Provider
      value={{
        isGotham,
        toggleGotham,
        isTransitioning,
        transitionStage,
      }}
    >
      {children}
    </GothamContext.Provider>
  );
};

export const useGotham = () => useContext(GothamContext);
