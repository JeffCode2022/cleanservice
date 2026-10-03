export const ASSET_BASE = "https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/28-onekey/public";
export const asset = (path: string) => `${ASSET_BASE}/${path}`;

/**
 * EFFECT-01: design-canvas-units
 * 1440x810 Figma artboard coordinate helpers:
 * - u(px): container-query-width percentage for every horizontal coordinate, width, font-size, padding, radius
 * - uy(px): vertical percentage of the stage's rendered height for vertical positioning and full-bleed layers
 */
export const u = (px: number) => `${((px / 1440) * 100).toFixed(4)}cqw`;
export const uy = (px: number) => `${((px / 810) * 100).toFixed(4)}%`;

/**
 * EFFECT-02: staggered-entrance-reveal
 * Shared reveal helper for indices 0 to 8
 */
export const reveal = (index: number, reduceMotion: boolean | null) =>
  reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.65,
          delay: 0.08 + index * 0.07,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      };

/**
 * 5 CleanMaster Specialized Service Programs
 */
export interface CleanServiceItem {
  id: string;
  label: string;
  subtitle: string;
  tag: string;
  color: string;
  icon: "sofa" | "curtain" | "mattress" | "chair" | "carpet";
}

export const CLEAN_SERVICES: CleanServiceItem[] = [
  {
    id: "sofas",
    label: "Sofás",
    subtitle: "Seccionales & Cuero",
    tag: "Inyección Alemana",
    color: "#0284C7",
    icon: "sofa",
  },
  {
    id: "cortinas",
    label: "Cortinas",
    subtitle: "Roller & Estores",
    tag: "Vapor 140°C",
    color: "#10B981",
    icon: "curtain",
  },
  {
    id: "colchones",
    label: "Colchones",
    subtitle: "Box Spring & Sommier",
    tag: "Anti-Ácaros 99.9%",
    color: "#8B5CF6",
    icon: "mattress",
  },
  {
    id: "sillas",
    label: "Sillas",
    subtitle: "Comedor & Oficina",
    tag: "Desmanchado Express",
    color: "#0EA5E9",
    icon: "chair",
  },
  {
    id: "alfombras",
    label: "Alfombras",
    subtitle: "Lana & Sintéticas",
    tag: "Secado 2 Horas",
    color: "#F59E0B",
    icon: "carpet",
  },
];

/**
 * Navigation links
 */
export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios", edge: 700 },
  { label: "Resultados", href: "#antes-despues", edge: 800 },
  { label: "El Método", href: "#proceso", edge: 885 },
  { label: "Cotizador", href: "#cotizador", edge: 970 },
];

/**
 * Menu dropdown items (EFFECT-06)
 */
export const MENU_ITEMS = [
  { label: "Inicio", hint: "Tu espacio renovado hoy", href: "#hero" },
  { label: "Servicios Especializados", hint: "Sofás, cortinas, colchones y más", href: "#servicios" },
  { label: "Antes y Después", hint: "Casos y resultados 100% reales", href: "#antes-despues" },
  { label: "El Método Impecable", hint: "Inyección-succión alemana", href: "#proceso" },
  { label: "Cotizador Online", hint: "Calcula tu presupuesto en 30s", href: "#cotizador" },
  { label: "Contacto & Citas", hint: "Atención inmediata por WhatsApp", href: "#contacto" },
];

/**
 * Feature tabs (SECTION-11)
 */
export const FEATURE_TABS = [
  {
    shape: "figma/card1.svg",
    left: 632.37,
    width: 407.235,
    textLeft: 819.14,
    dotsLeft: 965.44,
    dark: true,
    title: "Inyección Alemana, cero humedad",
    subtitle: "Extracción profunda a 4 bar",
  },
  {
    shape: "figma/card2.svg",
    left: 929.14,
    width: 307.235,
    textLeft: 1053.72,
    dotsLeft: 1167.07,
    dark: false,
    title: "Vapor a 140°C, cero gérmenes",
    subtitle: "Desinfección térmica total",
  },
  {
    shape: "figma/card3.svg",
    left: 1131.52,
    width: 307.235,
    textLeft: 1254.68,
    dotsLeft: 1369.8,
    dark: false,
    title: "Fórmula Bio, 100% ecológica",
    subtitle: "Pet-friendly y sin químicos tóxicos",
  },
];
