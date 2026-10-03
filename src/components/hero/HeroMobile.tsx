import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  asset,
  reveal,
  MENU_ITEMS,
  FEATURE_TABS,
} from "./hero-data";

interface HeroMobileProps {
  reduceMotion: boolean | null;
}

export const HeroMobile: React.FC<HeroMobileProps> = ({ reduceMotion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // EFFECT-04: scroll-parallax-mobile
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mobileBgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 50]
  );

  const mobileGlowY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 80]
  );

  return (
    <motion.div
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden px-5 pb-12 pt-6 text-slate-900"
      style={{
        background:
          "radial-gradient(circle at 60% 25%, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.5) 40%, rgba(248, 250, 252, 0.98) 75%, #f1f5f9 100%)",
      }}
    >
      {/* ═════════════════════════════════════════════════════════════
          BACKDROP (EFFECT-04 scroll-linked depth)
         ═════════════════════════════════════════════════════════════ */}
      {/* Sofa Visual */}
      <motion.div
        style={{ y: mobileBgY }}
        className="pointer-events-none absolute -right-20 -top-6 w-[400px] h-[340px] flex items-center justify-center opacity-80"
      >
        <img
          src="/images/sofa-float.png"
          alt="Sofá CleanMaster"
          className="w-full h-auto object-contain drop-shadow-xl"
        />
      </motion.div>

      {/* Glow blob */}
      <motion.div
        style={{ y: mobileGlowY }}
        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-200/40 blur-[80px]"
      />

      {/* ═════════════════════════════════════════════════════════════
          MOBILE CONTENT COLUMN (Staggered Entrance reveal(0..8))
         ═════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* 0. Nav Row with Executive Logo */}
        <motion.nav {...reveal(0, reduceMotion)} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {/* Executive Logo */}
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-xs border border-slate-800">
                <svg
                  className="w-4 h-4 text-sky-400"
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
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-display font-bold text-lg tracking-tight text-slate-950">
                    Clean<span className="text-sky-600">Master</span>
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 ml-0.5">®</span>
                </div>
                <span className="text-[8px] tracking-[0.16em] text-slate-500 font-semibold uppercase leading-tight font-display">
                  Cuidado Textil
                </span>
              </div>
            </a>

            {/* Mobile Burger (3 strokes folding into X) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="relative h-6 w-7 flex flex-col justify-center focus:outline-none"
            >
              <motion.span
                className="absolute left-0 h-[2px] rounded-full bg-slate-900 block"
                animate={
                  menuOpen
                    ? { top: "43%", width: "100%", rotate: 45 }
                    : { top: "18%", width: "60%", rotate: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <motion.span
                className="absolute left-0 top-[43%] h-[2px] w-full rounded-full bg-slate-900 block"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <motion.span
                className="absolute right-0 h-[2px] rounded-full bg-slate-900 block"
                animate={
                  menuOpen
                    ? { top: "43%", width: "100%", rotate: -45 }
                    : { top: "68%", width: "60%", rotate: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </button>
          </div>

          {/* Accordion Panel (EFFECT-07) */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 flex flex-col"
              >
                {MENU_ITEMS.map((item, idx) => (
                  <li
                    key={item.label}
                    className={`${
                      idx !== MENU_ITEMS.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-slate-900 text-sm">
                          {item.label}
                        </span>
                        <span className="font-display text-xs text-slate-500">
                          {item.hint}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* 1. Authority Badge */}
        <motion.div
          {...reveal(1, reduceMotion)}
          className="w-fit flex items-center rounded-full border border-white/90 bg-white/80 px-3.5 py-1.5 gap-2 shadow-xs"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-display font-bold text-xs text-slate-800 tracking-tight">
            Inyección Alemana · Vapor a 140°C
          </span>
        </motion.div>

        {/* 2. Editorial Headline */}
        <motion.h1
          {...reveal(2, reduceMotion)}
          className="font-display font-black tracking-tight text-slate-950 text-[clamp(2.1rem,9vw,2.9rem)] leading-[1.06]"
        >
          Devolvemos la vida <br />
          y pureza a tus <br />
          <span className="text-sky-600">muebles y cortinas.</span>
        </motion.h1>

        {/* 3. Paragraph */}
        <motion.p
          {...reveal(3, reduceMotion)}
          className="font-display font-medium text-slate-600 text-base leading-relaxed max-w-md"
        >
          Eliminamos hasta el <strong className="text-slate-950 font-semibold">99.9% de manchas profundas, ácaros y olores</strong>. Secado express en 2 horas y fórmulas 100% bio-ecológicas para niños y mascotas.
        </motion.p>

        {/* 4. CTA Row */}
        <motion.div
          {...reveal(4, reduceMotion)}
          className="flex items-center gap-2.5 h-[52px]"
        >
          <a
            href="#cotizador"
            className="flex-1 h-full flex items-center justify-center rounded-full bg-sky-600 hover:bg-sky-500 font-display font-bold text-white text-sm shadow-md shadow-sky-600/25 active:scale-95 transition-all"
          >
            Cotizar en 30 Seg
          </a>
          <a
            href="#antes-despues"
            className="flex-1 h-full flex items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 font-display font-semibold text-xs active:scale-95 transition-all"
          >
            Ver Resultados
          </a>
        </motion.div>

        {/* 5. Social Proof */}
        <motion.div
          {...reveal(5, reduceMotion)}
          className="flex items-center gap-3 pt-1 border-t border-slate-200/70"
        >
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700 font-display">M</div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-sky-200 flex items-center justify-center font-bold text-[10px] text-sky-800 font-display">C</div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-200 flex items-center justify-center font-bold text-[10px] text-emerald-800 font-display">J</div>
          </div>
          <div className="text-xs font-display">
            <span className="text-amber-500 font-bold">★★★★★ 4.9/5</span>
            <span className="text-slate-500 ml-1.5 text-[11px]">+1,400 muebles renovados</span>
          </div>
        </motion.div>

        {/* 6. Stat Cards Grid */}
        <motion.div
          {...reveal(6, reduceMotion)}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex flex-col justify-center rounded-2xl bg-white/80 p-4 border border-white shadow-sm">
            <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
              ★★★★★
              <span className="text-slate-600 font-bold text-[10px]">4.9</span>
            </div>
            <span className="font-numbers font-black text-2xl text-slate-950 tracking-tight">
              +1,400
            </span>
            <span className="font-display font-medium text-xs text-slate-600">
              Muebles renovados
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white/80 p-4 border border-white shadow-sm">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold w-fit mb-1">
              Fórmula Bio
            </div>
            <span className="font-numbers font-black text-2xl text-slate-950 tracking-tight">
              2 Horas
            </span>
            <span className="font-display font-medium text-xs text-slate-600">
              Secado express
            </span>
          </div>
        </motion.div>

        {/* 7. Stat Counter */}
        <motion.div
          {...reveal(7, reduceMotion)}
          className="flex items-center gap-3 pt-1"
        >
          <img
            src={asset("figma/globe.svg")}
            alt=""
            className="w-11 h-11 opacity-80 select-none"
          />
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="font-numbers font-black text-3xl text-slate-950">
                99.9
              </span>
              <span className="font-numbers font-light text-xl text-slate-600 ml-1">
                %
              </span>
            </div>
            <span className="font-display font-medium text-xs text-slate-600">
              Eficacia certificada en desinfección y manchas
            </span>
          </div>
        </motion.div>

        {/* 8. Feature Rows with 3D Extraction Tool */}
        <motion.div
          {...reveal(8, reduceMotion)}
          className="flex flex-col gap-2 pt-1"
        >
          {FEATURE_TABS.map((tab, idx) => (
            <div
              key={idx}
              className={`rounded-2xl px-4 py-3 flex items-center gap-3 ${
                tab.dark
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                  : "bg-sky-900/80 text-white backdrop-blur-md"
              }`}
            >
              {tab.dark ? (
                <img
                  src="/images/tool-float.png"
                  alt="Herramienta alemana"
                  className="w-10 h-10 object-contain shrink-0 drop-shadow-md"
                  style={{ transform: "rotate(-15deg)" }}
                />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-sky-300 shrink-0" />
              )}
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm">
                  {tab.title}
                </span>
                <span className="text-[11px] opacity-75 font-sans">
                  {tab.subtitle}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
