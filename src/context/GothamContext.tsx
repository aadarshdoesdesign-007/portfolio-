'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type GothamTransitionStage = 'idle' | 'dim' | 'flash' | 'sweep' | 'settle';

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

    // Run Cinematic Transition Sequence (approx 1.3s total)
    setIsTransitioning(true);
    const nextState = !isGotham;

    if (nextState) {
      // Entering Gotham:
      // Stage 1: Dim (0 - 200ms) - sudden brownout
      setTransitionStage('dim');

      setTimeout(() => {
        // Stage 2: Lightning Flash (200 - 450ms)
        setTransitionStage('flash');
        // Apply gotham class during flash so the dark theme is revealed
        document.documentElement.classList.add('gotham');
        setIsGotham(true);
        localStorage.setItem('portfolio_gotham_mode', 'true');
      }, 200);

      setTimeout(() => {
        // Stage 3: Bat-Signal Sweep across screen (450 - 1050ms)
        setTransitionStage('sweep');
      }, 450);

      setTimeout(() => {
        // Stage 4: Settle (1050 - 1350ms)
        setTransitionStage('settle');
      }, 1050);

      setTimeout(() => {
        // Complete
        setIsTransitioning(false);
        setTransitionStage('idle');
      }, 1350);
    } else {
      // Exiting Gotham:
      // Stage 1: Sweep out with warm light pass (0 - 500ms)
      setTransitionStage('sweep');

      setTimeout(() => {
        setTransitionStage('flash');
        document.documentElement.classList.remove('gotham');
        setIsGotham(false);
        localStorage.setItem('portfolio_gotham_mode', 'false');
      }, 350);

      setTimeout(() => {
        setTransitionStage('settle');
      }, 650);

      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStage('idle');
      }, 900);
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
