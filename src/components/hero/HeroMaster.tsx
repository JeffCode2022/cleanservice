import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

/**
 * EFFECT-11: desktop-mobile-fork
 * matchMedia("(min-width: 1024px)") hook:
 * Starts at null to avoid hydration mismatch, syncs to true/false in useEffect,
 * and listens via mql.addEventListener("change").
 * Gating switch between EFFECT-03 (desktop pointer parallax) and EFFECT-04 (mobile scroll parallax).
 */
function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export const HeroMaster: React.FC = () => {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();

  // Desktop is the default while isDesktop is null to prevent layout flash on desktop first paint
  const renderMobile = isDesktop === false;

  return (
    <div id="hero" className="relative w-full">
      {renderMobile ? (
        <section className="w-full bg-slate-50">
          <HeroMobile reduceMotion={reduceMotion} />
        </section>
      ) : (
        <section className="h-dvh w-full overflow-hidden bg-slate-50">
          <HeroDesktop reduceMotion={reduceMotion} />
        </section>
      )}
    </div>
  );
};

export default HeroMaster;
