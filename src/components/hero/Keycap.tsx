import React from "react";

export interface KeycapProps {
  cap: string;
  base: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  onClick?: () => void;
  active?: boolean;
}

/**
 * SETUP-KEYCAP: Reusable 4-layer mechanical switch component.
 * Sized purely in percentages of caller's box so it scales identically at any dimension.
 */
export const Keycap: React.FC<KeycapProps> = ({
  cap,
  base,
  className = "",
  style,
  title,
  onClick,
  active = false,
}) => {
  return (
    <div
      title={title}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group select-none cursor-pointer transition-transform duration-200 active:translate-y-0.5 hover:brightness-110 ${className}`}
      style={{
        position: "relative",
        ...style,
      }}
      aria-hidden={!onClick}
    >
      {/* 1. Switch housing (drawn behind) */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-[38%] rounded-[14%] transition-colors duration-300"
        style={{ background: base }}
      />

      {/* 2. Cap skirt (trapezoid clip for truncated pyramid perspective) */}
      <div
        className="absolute inset-x-[7%] top-[30%] h-[38%]"
        style={{
          background: `linear-gradient(180deg, ${cap} 0%, color-mix(in srgb, ${cap} 68%, black) 100%)`,
          clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)",
        }}
      />

      {/* 3. Cap top */}
      <div
        className="absolute inset-x-0 top-0 h-[34%] rounded-[22%]"
        style={{
          background: `linear-gradient(150deg, color-mix(in srgb, ${cap} 72%, white) 0%, ${cap} 62%, color-mix(in srgb, ${cap} 80%, black) 100%)`,
          boxShadow: active ? `0 0 12px ${cap}` : undefined,
        }}
      />

      {/* 4. Specular highlight */}
      <div
        className="absolute left-1/2 top-[8%] h-[12%] w-[46%] -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.32)",
        }}
      />
    </div>
  );
};
