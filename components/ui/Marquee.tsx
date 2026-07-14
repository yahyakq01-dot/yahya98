"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  fadeEdges = true,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const initialized = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useAnimationFrame((_t, delta) => {
    const node = trackRef.current;
    if (!node) return;
    const halfWidth = node.scrollWidth / 2;
    if (halfWidth === 0) return;

    if (!initialized.current) {
      x.set(direction === "right" ? -halfWidth : 0);
      initialized.current = true;
      return;
    }

    if (isPaused) return;

    const pixelsPerSecond = halfWidth / speed;
    const moveBy = (direction === "left" ? -1 : 1) * pixelsPerSecond * (delta / 1000);
    let next = x.get() + moveBy;

    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;

    x.set(next);
  });

  const handleEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };
  const handleLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {fadeEdges && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-background-base to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-background-base to-transparent" />
        </>
      )}
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-8 shrink-0" aria-hidden={i === 1}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
