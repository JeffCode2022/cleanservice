import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FluidCursorProps {
  reduceMotion: boolean | null;
}

export const FluidCursor: React.FC<FluidCursorProps> = ({ reduceMotion }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring for the outer halo
  const springX = useSpring(rawX, { stiffness: 280, damping: 28 });
  const springY = useSpring(rawY, { stiffness: 280, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("[role='button']") ||
        target?.tagName === "BUTTON" ||
        target?.tagName === "A"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY, isVisible, reduceMotion]);

  if (!isVisible || reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Liquid Halo */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/40 bg-sky-400/10 backdrop-blur-[0.5px] transition-transform duration-200"
        style={{
          left: springX,
          top: springY,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isHovered ? 1.25 : 1,
          borderColor: isHovered ? "rgba(14, 165, 233, 0.7)" : "rgba(56, 189, 248, 0.4)",
          backgroundColor: isHovered ? "rgba(14, 165, 233, 0.15)" : "rgba(56, 189, 248, 0.08)",
        }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600 shadow-xs"
        style={{
          left: rawX,
          top: rawY,
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
        }}
      />
    </div>
  );
};
