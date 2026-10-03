import React from "react";
import type { CleanServiceItem } from "./hero-data";

interface ServiceCapsuleProps {
  service: CleanServiceItem;
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const ServiceCapsule: React.FC<ServiceCapsuleProps> = ({
  service,
  isActive,
  onClick,
  style,
  className = "",
}) => {
  // Render precision vector icon based on service type
  const renderIcon = () => {
    switch (service.icon) {
      case "sofa":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
            <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/>
            <path d="M4 18v2"/>
            <path d="M20 18v2"/>
          </svg>
        );
      case "curtain":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h18"/>
            <path d="M4 4v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4"/>
            <path d="M13 4v16a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4"/>
          </svg>
        );
      case "mattress":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="12" x="3" y="6" rx="2"/>
            <path d="M3 10h18"/>
            <path d="M7 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M17 14h.01"/>
          </svg>
        );
      case "chair":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/>
            <path d="M3 13v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
            <path d="M5 13v7"/>
            <path d="M19 13v7"/>
            <path d="M5 17h14"/>
          </svg>
        );
      case "carpet":
      default:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <path d="M8 4v16"/>
            <path d="M16 4v16"/>
            <path d="M4 12h16"/>
          </svg>
        );
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? "bg-white text-slate-900 shadow-md shadow-sky-500/20 scale-105 border border-sky-400"
          : "bg-white/70 hover:bg-white/95 text-slate-700 hover:text-slate-950 border border-white/80 hover:shadow-xs"
      } ${className}`}
      title={`${service.label}: ${service.tag}`}
    >
      {/* Icon with service color */}
      <span
        className="transition-colors duration-300"
        style={{ color: isActive ? service.color : undefined }}
      >
        {renderIcon()}
      </span>

      {/* Label */}
      <span className="font-display font-semibold text-xs tracking-tight">
        {service.label}
      </span>

      {/* Glowing status dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          isActive ? "animate-pulse scale-125" : "opacity-40 group-hover:opacity-80"
        }`}
        style={{ backgroundColor: service.color }}
      />
    </button>
  );
};
