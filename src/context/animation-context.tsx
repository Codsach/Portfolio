
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

type AnimationContextType = {
  isHeroAnimationDone: boolean;
  setHeroAnimationDone: Dispatch<SetStateAction<boolean>>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isHeroAnimationDone, setHeroAnimationDone] = useState(false);

  return (
    <AnimationContext.Provider
      value={{ isHeroAnimationDone, setHeroAnimationDone }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
