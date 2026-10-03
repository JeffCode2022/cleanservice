import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  asset,
  u,
  uy,
  reveal,
  NAV_LINKS,
  MENU_ITEMS,
  FEATURE_TABS,
} from "./hero-data";

interface HeroDesktopProps {
  reduceMotion: boolean | null;
}

export const HeroDesktop: React.FC<HeroDesktopProps> = ({ reduceMotion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  // EFFECT-03: Pointer Parallax Desktop with Spring Physics
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 20, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 20, mass: 0.7 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Parallax Depths
  const sofaX = useTransform(springX, [-1, 1], reduceMotion ? [0, 0] : [-22, 22]);
  const sofaY = useTransform(springY, [-1, 1], reduceMotion ? [0, 0] : [-16, 16]);

  const glowX = useTransform(springX, [-1, 1], reduceMotion ? [0, 0] : [-32, 32]);
  const glowY = useTransform(springY, [-1, 1], reduceMotion ? [0, 0] : [-22, 22]);

  const cardsX = useTransform(springX, [-1, 1], reduceMotion ? [0, 0] : [-12, 12]);
  const cardsY = useTransform(springY, [-1, 1], reduceMotion ? [0, 0] : [-8, 8]);

  // Close menu on Escape & return focus (EFFECT-06)
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        burgerButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Stroke common style for 3-stroke burger morph (EFFECT-05)
  const strokeCommon: React.CSSProperties = {
    position: "absolute",
    height: "13.38%",
    background: "#0F172A",
    borderRadius: "9999px",
    display: "block",
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-full w-full overflow-hidden select-none"
      style={{
        containerType: "inline-size",
        background:
          "radial-gradient(circle at 72% 38%, rgba(224, 242, 254, 0.8) 0%, rgba(240, 249, 255, 0.6) 30%, rgba(248, 250, 252, 0.98) 65%, #f1f5f9 100%)",
      }}
    >
      {/* ═════════════════════════════════════════════════════════════
          DOM ORDER = STACKING ORDER (Strictly matches prompt sequence):
          1. Backdrop (SECTION-02)
          2. Feature tabs (SECTION-11)
          3. Left Editorial Column: Authority Badge, Headline, Paragraph, CTAs, Social Proof
          4. Stat cards (SECTION-10)
          5. Stat counter (SECTION-09)
          6. Navigation (SECTION-03, overlays everything)
         ═════════════════════════════════════════════════════════════ */}

      {/* 1. BACKDROP (SECTION-02) */}
      {/* 1.1 Centerpiece Visual: CleanMaster Luxury Floating Sofa */}
      <motion.div
        style={{
          x: sofaX,
          y: sofaY,
          right: u(20),
          top: uy(80),
          width: u(760),
          height: uy(680),
        }}
        className="absolute flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Soft ambient aura around sofa */}
          <div
            className="absolute rounded-full pointer-events-none blur-[95px]"
            style={{
              width: u(520),
              height: u(380),
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 80%)",
            }}
          />

          {/* Sofa Image with natural ground shadow */}
          <div className="relative w-[94%] h-auto flex items-center justify-center pointer-events-auto">
            <img
              src="/images/sofa-float.png"
              alt="Sofá impecable CleanMaster"
              className="w-full h-auto object-contain select-none transition-transform duration-700 hover:scale-[1.015]"
              style={{
                filter:
                  "drop-shadow(0 42px 55px rgba(2, 132, 199, 0.2)) drop-shadow(0 15px 22px rgba(15, 23, 42, 0.07))",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* 1.2 Ambient Glow Blobs */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          left: u(-180),
          top: uy(-100),
          width: u(780),
          height: uy(780),
        }}
        className="pointer-events-none absolute rounded-full blur-[100px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(16, 185, 129, 0.1) 45%, transparent 75%)",
        }}
      />

      <motion.div
        style={{
          x: glowX,
          y: glowY,
          right: u(-80),
          bottom: uy(-60),
          width: u(700),
          height: uy(700),
        }}
        className="pointer-events-none absolute rounded-full blur-[100px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(99, 102, 241, 0.07) 50%, transparent 75%)",
        }}
      />

      {/* 2. FEATURE TABS (SECTION-11) */}
      <motion.div {...reveal(8, reduceMotion)} className="pointer-events-none absolute inset-0">
        {FEATURE_TABS.map((tab, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: u(tab.left),
              top: uy(703.476),
              width: u(tab.width),
              height: uy(106.524),
            }}
          >
            {/* Cut-corner Shape SVG */}
            <img
              src={asset(tab.shape)}
              alt=""
              className="absolute inset-0 h-full w-full object-fill select-none"
            />

            {/* Tab 1: Real 3D German Extraction Tool (No keyboards!) */}
            {tab.dark && (
              <div
                className="absolute flex items-center justify-center pointer-events-auto"
                style={{
                  left: u(691.84 - tab.left),
                  top: uy(615 - 703.476),
                  width: u(154.115),
                  height: u(156.921),
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-sky-400/20 blur-xl pointer-events-none" />
                  <img
                    src="/images/tool-float.png"
                    alt="Boquilla alemana de inyección-extracción"
                    className="w-[105px] h-[105px] object-contain select-none transition-transform duration-500 hover:scale-110"
                    style={{
                      transform: "rotate(-18deg)",
                      filter: "drop-shadow(0 15px 20px rgba(2, 132, 199, 0.35))",
                    }}
                    title="Boquilla de Inyección-Extracción Alemana"
                  />
                </div>
              </div>
            )}

            {/* Tab Title */}
            <div
              className={`tbox absolute font-display pointer-events-auto leading-[1.2] flex flex-col ${
                tab.dark ? "text-slate-900" : "text-white"
              }`}
              style={{
                left: u(tab.textLeft - tab.left),
                top: uy(732 - 703.476),
                width: u(125),
              }}
            >
              <span className="font-bold text-sm tracking-tight">{tab.title}</span>
              <span
                className={`text-[10px] tracking-normal font-sans font-medium mt-0.5 ${
                  tab.dark ? "text-slate-500" : "text-sky-100"
                }`}
              >
                {tab.subtitle}
              </span>
            </div>

            {/* 3 Alignment Dots */}
            {[
              { dx: 16.82, dy: 5.61 },
              { dx: 5.6, dy: 5.61 },
              { dx: 5.6, dy: 16.83 },
            ].map((dot, dIdx) => (
              <span
                key={dIdx}
                className="absolute block pointer-events-none"
                style={{
                  left: u(tab.dotsLeft - tab.left + dot.dx),
                  top: uy(12.5 + dot.dy),
                  width: u(4.085),
                  height: u(4.085),
                  transform: "rotate(135deg)",
                  backgroundColor: tab.dark ? "#060606" : "#ffffff",
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      {/* 3. LEFT EDITORIAL CONTENT (ORDENADO, CERO SOLAPAMIENTOS, MÁXIMA CONVERSIÓN) */}
      <div
        className="absolute flex flex-col pointer-events-auto"
        style={{
          left: u(70),
          top: uy(130),
          width: u(540),
          gap: uy(20),
        }}
      >
        {/* Authority Badge */}
        <motion.div
          {...reveal(1, reduceMotion)}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-white/95 shadow-xs backdrop-blur-md w-fit"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 font-display">
            Tecnología Alemana de Inyección-Succión
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-sky-600 font-display">
            Vapor a 140°C
          </span>
        </motion.div>

        {/* Clean, Majestic Editorial Headline (No collision, No brackets breaking the text) */}
        <motion.h1
          {...reveal(2, reduceMotion)}
          className="font-display font-black tracking-tight text-slate-950 leading-[1.05]"
          style={{
            fontSize: u(48),
            letterSpacing: u(-1.2),
          }}
        >
          Devolvemos la vida <br />
          y pureza a tus <br />
          <span className="text-sky-600 relative inline-block">
            muebles y cortinas.
          </span>
        </motion.h1>

        {/* Value Proposition Description */}
        <motion.p
          {...reveal(3, reduceMotion)}
          className="font-display font-medium text-slate-600 leading-relaxed"
          style={{
            fontSize: u(16),
            lineHeight: 1.5,
            maxWidth: u(480),
          }}
        >
          Eliminamos hasta el <strong className="text-slate-950 font-semibold">99.9% de manchas profundas, ácaros y olores</strong>. Secado express en solo 2 a 3 horas con fórmulas bio-ecológicas 100% seguras para niños y mascotas.
        </motion.p>

        {/* High Conversion CTA Row */}
        <motion.div
          {...reveal(4, reduceMotion)}
          className="flex items-center gap-3 pt-1"
        >
          {/* Primary CTA: Cotizar Servicio en 30s */}
          <a
            href="#cotizador"
            className="group relative overflow-hidden flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-sky-600 hover:bg-sky-500 font-display font-bold text-white shadow-lg shadow-sky-600/25 hover:shadow-sky-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            style={{
              fontSize: u(15),
            }}
          >
            <span className="relative z-10">Cotizar Servicio en 30 Seg</span>
            <svg
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </a>

          {/* Secondary CTA: Ver Antes / Después */}
          <a
            href="#antes-despues"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-slate-800 font-display font-semibold border border-white/90 shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all duration-300 backdrop-blur-sm"
            style={{
              fontSize: u(15),
            }}
          >
            <span>Ver Antes / Después</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          </a>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          {...reveal(5, reduceMotion)}
          className="flex items-center gap-4 pt-2 border-t border-slate-200/70"
          style={{ maxWidth: u(480) }}
        >
          {/* Avatars */}
          <div className="flex -space-x-2.5 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 font-display">M</div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-sky-200 flex items-center justify-center font-bold text-xs text-sky-800 font-display">C</div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-200 flex items-center justify-center font-bold text-xs text-emerald-800 font-display">J</div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-200 flex items-center justify-center font-bold text-xs text-amber-800 font-display">V</div>
          </div>

          <div className="flex flex-col text-xs font-display">
            <div className="flex items-center text-amber-400 gap-1 font-bold">
              ★★★★★
              <span className="text-slate-900 ml-1 font-numbers">4.9 / 5.0</span>
            </div>
            <span className="text-slate-500 text-[11px] font-medium">
              +1,400 sofás y cortinas renovados este año
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. STAT CARDS (SECTION-10: Framed Around Sofa) */}
      <motion.div
        {...reveal(6, reduceMotion)}
        style={{ x: cardsX, y: cardsY }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Card 1: Top-Right (+1,400 Muebles renovados) */}
        <div
          className="absolute flex flex-col justify-center bg-white/75 text-slate-900 backdrop-blur-xl border border-white/95 shadow-xl shadow-sky-950/5 pointer-events-auto rounded-3xl transition-transform hover:scale-[1.02]"
          style={{
            right: u(45),
            top: uy(110),
            width: u(230),
            height: u(130),
            padding: u(22),
            gap: u(4),
          }}
        >
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            ★★★★★
            <span className="text-slate-700 font-bold ml-1 text-[11px]">4.9 / 5</span>
          </div>
          <span
            className="font-numbers font-black text-slate-950 tracking-tight"
            style={{
              fontSize: u(40),
              lineHeight: 1,
            }}
          >
            +1,400
          </span>
          <span className="font-display font-semibold text-slate-600 text-xs tracking-tight">
            Muebles renovados este año
          </span>
        </div>

        {/* Card 2: Lower-Left of Sofa (2 Horas Secado Express) */}
        <div
          className="absolute flex flex-col justify-center bg-white/75 text-slate-900 backdrop-blur-xl border border-white/95 shadow-xl shadow-sky-950/5 pointer-events-auto rounded-3xl transition-transform hover:scale-[1.02]"
          style={{
            left: u(590),
            top: uy(495),
            width: u(225),
            height: u(130),
            padding: u(22),
            gap: u(4),
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>Fórmula Bio</span>
          </div>
          <span
            className="font-numbers font-black text-slate-950 tracking-tight"
            style={{
              fontSize: u(38),
              lineHeight: 1,
            }}
          >
            2 Horas
          </span>
          <span className="font-display font-semibold text-slate-600 text-xs tracking-tight">
            Secado express garantizado
          </span>
        </div>
      </motion.div>

      {/* 5. STAT COUNTER (SECTION-09) */}
      <motion.div {...reveal(7, reduceMotion)} className="pointer-events-none absolute inset-0">
        <div
          className="absolute flex items-center gap-3.5 pointer-events-auto"
          style={{
            left: u(70),
            top: uy(715),
          }}
        >
          <img
            src={asset("figma/globe.svg")}
            alt=""
            className="select-none pointer-events-none opacity-80"
            style={{
              width: u(52),
              height: u(52),
            }}
          />

          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span
                className="font-numbers font-black text-slate-950 tracking-tight"
                style={{
                  fontSize: u(44),
                  lineHeight: 1,
                  letterSpacing: u(-1),
                }}
              >
                99.9
              </span>
              <span
                className="font-numbers font-light text-slate-600 ml-1"
                style={{
                  fontSize: u(28),
                  lineHeight: 1,
                }}
              >
                %
              </span>
            </div>

            <span
              className="font-display font-medium text-slate-600 leading-tight"
              style={{
                fontSize: u(12),
                letterSpacing: u(-0.1),
              }}
            >
              Eficacia certificada en desinfección y manchas
            </span>
          </div>
        </div>
      </motion.div>

      {/* 6. NAVIGATION (SECTION-03: Real Executive Brand Identity) */}
      <motion.nav {...reveal(0, reduceMotion)} className="pointer-events-none absolute inset-0">
        {/* Brand Mark with Executive Nozzle & Clean Typography (Matches Navbar.astro!) */}
        <a
          href="#hero"
          className="absolute pointer-events-auto flex items-center gap-3 group"
          style={{
            left: u(70),
            top: u(20),
          }}
          aria-label="CleanMaster Inicio"
        >
          {/* Executive Nozzle Box */}
          <div
            className="rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-sm group-hover:bg-sky-600 transition-all duration-300 relative overflow-hidden shrink-0 border border-slate-800"
            style={{
              width: u(40),
              height: u(40),
            }}
          >
            <svg
              className="text-sky-400 group-hover:text-white transition-colors duration-300"
              style={{ width: u(20), height: u(20) }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 19h18L16 11H8L3 19Z" fill="currentColor" fillOpacity="0.18" />
              <path d="M7 15h10" />
              <path d="M12 11V3" />
              <path d="M9 3h6" />
              <path d="M12 6.5h3" />
            </svg>
          </div>

          {/* CleanMaster Logotype */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span
                className="font-display font-bold tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors"
                style={{ fontSize: u(20) }}
              >
                Clean<span className="text-sky-600 group-hover:text-slate-950 transition-colors">Master</span>
              </span>
              <span className="text-slate-400 font-semibold ml-0.5" style={{ fontSize: u(9) }}>®</span>
            </div>
            <span
              className="font-display font-semibold uppercase text-slate-500 leading-tight"
              style={{ fontSize: u(9), letterSpacing: "0.18em" }}
            >
              Cuidado Textil &amp; Muebles
            </span>
          </div>
        </a>

        {/* "Inicio" Active Pill */}
        <a
          href="#hero"
          className="tbox absolute flex items-center justify-center rounded-full bg-white font-display text-slate-900 font-bold shadow-xs hover:bg-slate-50 transition-colors pointer-events-auto border border-slate-200/60"
          style={{
            left: u(520),
            top: u(24),
            height: u(34),
            paddingLeft: u(18),
            paddingRight: u(18),
            fontSize: u(12.5),
          }}
        >
          Inicio
        </a>

        {/* 4 Nav links right-anchored */}
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="tbox absolute flex items-center justify-center font-display font-semibold text-slate-600 hover:text-slate-950 transition-colors pointer-events-auto"
            style={{
              right: u(1440 - link.edge),
              top: u(24),
              height: u(34),
              fontSize: u(12.5),
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Burger Button Trigger (Standalone Disc) */}
        <button
          ref={burgerButtonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          className="absolute z-40 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-[1.05] transition-transform pointer-events-auto cursor-pointer border border-slate-200/80"
          style={{
            right: u(45),
            top: u(15),
            width: u(52),
            height: u(52),
          }}
        >
          <div
            className="relative"
            style={{
              width: u(28),
              height: u(14),
            }}
          >
            {/* Top Stroke */}
            <motion.span
              style={{ ...strokeCommon, left: 0 }}
              animate={
                menuOpen
                  ? { top: "43.3%", width: "100%", rotate: 45 }
                  : { top: "0%", width: "50%", rotate: 0 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {/* Middle Stroke */}
            <motion.span
              style={{
                ...strokeCommon,
                top: "43.3%",
                width: "100%",
                left: 0,
              }}
              animate={
                menuOpen
                  ? { opacity: 0, scaleX: 0.2 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {/* Bottom Stroke */}
            <motion.span
              style={{ ...strokeCommon, right: 0 }}
              animate={
                menuOpen
                  ? { top: "43.3%", width: "100%", rotate: -45 }
                  : { top: "86.6%", width: "50%", rotate: 0 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </button>

        {/* Dropdown Menu Panel & Backdrop (EFFECT-06) */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4 }}
                onClick={() => setMenuOpen(false)}
                className="pointer-events-auto absolute inset-0 z-20 bg-slate-950/20 backdrop-blur-[6px]"
              />

              {/* Panel */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -14,
                  scale: reduceMotion ? 1 : 0.97,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -10,
                  scale: reduceMotion ? 1 : 0.98,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-auto absolute z-30 flex flex-col bg-white/95 backdrop-blur-[30px] shadow-[0_30px_70px_-25px_rgba(15,23,42,0.35)] border border-white"
                style={{
                  right: u(45),
                  top: u(76),
                  width: u(360),
                  borderRadius: u(28),
                  padding: u(24),
                  gap: u(4),
                }}
              >
                {MENU_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : 0.05 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center justify-between rounded-2xl transition-colors hover:bg-slate-100/80"
                    style={{
                      padding: `${u(10)} ${u(16)}`,
                      gap: u(12),
                    }}
                  >
                    <div className="flex flex-col" style={{ gap: u(2) }}>
                      <span className="font-display font-bold text-slate-950 text-base leading-tight">
                        {item.label}
                      </span>
                      <span className="font-display font-medium text-slate-500 text-xs">
                        {item.hint}
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-center rounded-full bg-sky-100 text-sky-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        width: u(30),
                        height: u(30),
                      }}
                    >
                      <ArrowUpRight
                        style={{ width: u(15), height: u(15) }}
                        strokeWidth={2.2}
                      />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
