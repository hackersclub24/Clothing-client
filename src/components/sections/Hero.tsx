"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import TShirtSceneLoader from "@/components/ui/TShirtSceneLoader";
import KangarooSilhouette from "@/components/ui/KangarooSilhouette";

const CHROME = "calc(var(--announcement-h) + var(--header-h))";
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);

  /* ── Mouse (−1 → +1) ───────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 2;
    const y = ((e.clientY - top)  / height - 0.5) * 2;
    mouseX.set(x); mouseY.set(y);
    setMouse({ x, y });
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  /* ── Scroll springs ────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const shirtY    = useSpring(useTransform(scrollYProgress, [0,1], [0,-80]),  { stiffness:70, damping:20 });
  const shirtSc   = useSpring(useTransform(scrollYProgress, [0,1], [1,0.9]),  { stiffness:70, damping:20 });
  const pacY      = useSpring(useTransform(scrollYProgress, [0,1], [0,-20]),  { stiffness:50, damping:18 });
  const kangY     = useSpring(useTransform(scrollYProgress, [0,1], [0,-40]),  { stiffness:55, damping:18 });
  const bottomOp  = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* ── Mouse parallax ────────────────────────────────────────── */
  const kangMX = useSpring(useTransform(mouseX,[-1,1],["-1.5%","1.5%"]), { stiffness:28, damping:20 });
  const pacMX  = useSpring(useTransform(mouseX,[-1,1],["0.8%","-0.8%"]),{ stiffness:22, damping:20 });

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden hero-grain"
      style={{
        height: `calc(100dvh - ${CHROME})`,
        minHeight: 600,
        /* Exact background from reference image */
        backgroundColor: "#E8E2D0",
      }}
    >
      {/* ── Radial gradient — lighter center, darker edges ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex:0,
        background: "radial-gradient(ellipse 100% 90% at 52% 45%, #F0EAD8 0%, #E8E2D0 45%, #D8D0BC 100%)" }} />

      {/* ── Sunbeam shadow — CSS, from top-left ─────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex:1 }}>
        <div className="sunbeam" style={{ left:"-8%",  top:"-10%", opacity:0.10, animationDelay:"0s"   }} />
        <div className="sunbeam" style={{ left:"-2%",  top:"-10%", opacity:0.07, animationDelay:"1.8s" }} />
        <div className="sunbeam" style={{ left:" 5%",  top:"-10%", opacity:0.05, animationDelay:"3.2s" }} />
      </div>

      {/* ── Vignette ─────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex:2,
        background:"radial-gradient(ellipse 90% 88% at 50% 48%, transparent 38%, rgba(200,192,170,0.45) 100%)" }} />

      {/* ── Mouse-tracking inner container ──────────────────── */}
      <div ref={heroRef} className="absolute inset-0" style={{ zIndex:3 }}>

        {/* ─────────────────────────────────────────────────────
            LAYER 1 — Kangaroo silhouette
            HUGE — nearly full hero height, centered behind shirt.
            Reference: kangaroo spans from top-5% to bottom-5%,
            horizontally from ~15% to ~65% of hero width.
        ───────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            top: "-2%",
            left: "12%",
            width: "52%",
            height: "104%",
            x: kangMX,
            y: kangY,
            zIndex: 4,
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
        >
          <KangarooSilhouette
            opacity={0.55}
            width="100%"
            height="100%"
          />
        </motion.div>

        {/* ─────────────────────────────────────────────────────
            LAYER 2 — "pacific" oversized split typography
            "pac" from left edge, "ific" to right edge
            Both at z-index 5 (above kangaroo, below shirt)
            Vertically centered in the hero
        ───────────────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
          style={{ x: pacMX, y: pacY, zIndex: 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        >
          {/* "pac" — anchored to left, slight bleed */}
          <span
            className="absolute"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(8rem, 20vw, 20rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.28)",
              lineHeight: 1,
              left: "-1vw",
              top: "50%",
              transform: "translateY(-50%)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            pac
          </span>
          {/* "ific" — anchored to right, slight bleed */}
          <span
            className="absolute"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(8rem, 20vw, 20rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.28)",
              lineHeight: 1,
              right: "-1vw",
              top: "50%",
              transform: "translateY(-50%)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            ific
          </span>
        </motion.div>

        {/* ─────────────────────────────────────────────────────
            LAYER 3 — T-Shirt (highest z, center-stage)
            Positioned: left 15% → right 5%, overflows top/bottom
            This sits above kangaroo and "pacific" text
        ───────────────────────────────────────────────────── */}
        <motion.div
          className="absolute"
          style={{
            top: "-8%", bottom: "-8%",
            left: "14%", right: "4%",
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.65 }}
        >
          <motion.div
            className="w-full h-full"
            style={{ y: shirtY, scale: shirtSc }}
          >
            <TShirtSceneLoader mouse={mouse} />
          </motion.div>
        </motion.div>

        {/* ── Floor shadow beneath shirt ──────────────────── */}
        <div aria-hidden className="absolute pointer-events-none" style={{
          bottom: "5%", left: "22%", right: "8%",
          height: "5%", zIndex: 9,
          background: "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(150,130,90,0.32) 0%, transparent 100%)",
          filter: "blur(16px)",
        }} />

        {/* ─────────────────────────────────────────────────────
            TEXT LAYER — all UI elements above shirt
        ───────────────────────────────────────────────────── */}

        {/* Left editorial block — top-left quadrant */}
        <motion.div
          className="absolute flex flex-col gap-5"
          style={{ top: "28%", left: "4%", maxWidth: 220, zIndex: 20 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 1.0 }}
        >
          <p className="text-[12.5px] text-stone-600 leading-[1.7] font-light">
            Cut in Portugal from<br />
            320 gsm brushed cotton.<br />
            <br />
            Every silhouette engineered to<br />
            fall away from the body.
          </p>
        </motion.div>

        {/* CTA — bottom-left */}
        <motion.div
          className="absolute"
          style={{ bottom: "10%", left: "4%", zIndex: 20 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE, delay: 1.2 }}
        >
          <Link
            href="/collections"
            className="cta-btn inline-flex items-center gap-4 border border-stone-500/60 text-stone-700 text-[10.5px] tracking-[0.25em] uppercase font-light px-8 py-[14px] rounded-full"
          >
            Explore the Collection
            <ArrowRight size={11} className="cta-arrow" />
          </Link>
        </motion.div>

        {/* "Dust" gold italic — bottom right, large with tracking */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{ bottom: "16%", right: "5%", zIndex: 20 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.0 }}
        >
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#C9A84C",
            letterSpacing: "0.18em",
            opacity: 0.9,
          }}>
            Dust
          </span>
        </motion.div>

        {/* Drop counter — bottom right corner */}
        <motion.div
          className="absolute text-right"
          style={{ bottom: "6%", right: "5%", zIndex: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.4 }}
        >
          <p className="text-[8.5px] tracking-[0.28em] uppercase text-stone-400/80 mb-1 font-light">
            Drop 01 — Autumn / Winter
          </p>
          <p className="leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
            <span className="text-[2rem] font-light text-stone-700 italic">/026</span>
            <span className="text-[1.5rem] font-light text-stone-300">/500</span>
          </p>
        </motion.div>

        {/* Scroll indicator — far right, vertical */}
        <motion.div
          className="absolute hidden md:flex flex-col items-center gap-2"
          style={{ right: "1.2%", top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.8 }}
        >
          <span style={{
            writingMode: "vertical-rl",
            fontSize: "7.5px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(120,110,90,0.6)",
            fontWeight: 300,
          }}>
            Scroll to Discover
          </span>
          <motion.div
            style={{ width: 1, background: "rgba(180,165,130,0.5)" }}
            initial={{ height: 0 }}
            animate={{ height: 36 }}
            transition={{ duration: 1.2, ease: EASE, delay: 2.1 }}
          />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C" }} />
        </motion.div>

        {/* Bottom gradient fade on scroll */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "120px", zIndex: 15,
            opacity: bottomOp,
            background: "linear-gradient(to top, rgba(232,226,208,0.7), transparent)",
          }}
        />
      </div>
    </div>
  );
}
