"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { type MouseEvent as ReactMouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

/** Couleurs du halo animé (souvent dérivées de la palette portfolio). */
export type CardSpotlightGlow = {
  primary: string;
  secondary: string;
  accent: string;
};

const DEFAULT_GLOW: CardSpotlightGlow = {
  primary: "rgba(59, 130, 246, 0.38)",
  secondary: "rgba(139, 92, 246, 0.3)",
  accent: "rgba(59, 130, 246, 0.22)",
};

const DEFAULT_RADIAL_A = "rgba(99, 102, 241, 0.55)";
const DEFAULT_RADIAL_B = "rgba(59, 130, 246, 0.5)";

/**
 * Spotlight type Aceternity (masque radial + suivi souris).
 * Sans WebGL : compatible Next. Fond / bordure : laisser au parent (ex. `var(--card-background)`).
 */
export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  glow,
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  glow?: CardSpotlightGlow;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const g = glow ?? DEFAULT_GLOW;
  const radialA = glow ? g.primary : DEFAULT_RADIAL_A;
  const radialB = glow ? g.secondary : DEFAULT_RADIAL_B;

  return (
    <div
      className={cn(
        "group/spotlight relative isolate rounded-3xl border border-neutral-800 bg-black p-10 dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-[inherit]">
            <motion.div
              className="aspect-square w-[240%] max-w-none shrink-0 opacity-[0.55] mix-blend-screen"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${g.primary} 55deg, transparent 115deg, ${g.secondary} 185deg, transparent 245deg, ${g.accent} 305deg, transparent 360deg)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 40% 30%, ${radialA} 0%, transparent 55%),
                  radial-gradient(ellipse 60% 55% at 78% 72%, ${radialB} 0%, transparent 50%)`,
              }}
            />
          </div>
        ) : null}
      </motion.div>
      {children}
    </div>
  );
};
