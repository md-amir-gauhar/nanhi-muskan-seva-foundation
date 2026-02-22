import { motion } from "framer-motion";

export const FlowerSVG = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <ellipse cx="16" cy="10" rx="5" ry="7" fill="hsl(24 95% 58% / 0.5)" transform="rotate(0 16 16)" />
    <ellipse cx="16" cy="10" rx="5" ry="7" fill="hsl(350 80% 60% / 0.4)" transform="rotate(72 16 16)" />
    <ellipse cx="16" cy="10" rx="5" ry="7" fill="hsl(45 100% 60% / 0.45)" transform="rotate(144 16 16)" />
    <ellipse cx="16" cy="10" rx="5" ry="7" fill="hsl(200 85% 55% / 0.4)" transform="rotate(216 16 16)" />
    <ellipse cx="16" cy="10" rx="5" ry="7" fill="hsl(145 45% 50% / 0.4)" transform="rotate(288 16 16)" />
    <circle cx="16" cy="16" r="3.5" fill="hsl(45 100% 60%)" />
  </svg>
);

export const ButterflySVG = ({ className = "", size = 28 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
    {/* Left wing */}
    <path d="M18 18C14 12 6 8 4 14C2 20 10 22 18 18Z" fill="hsl(200 85% 55% / 0.5)" />
    <path d="M18 18C14 22 8 28 6 24C4 20 12 16 18 18Z" fill="hsl(24 95% 58% / 0.45)" />
    {/* Right wing */}
    <path d="M18 18C22 12 30 8 32 14C34 20 26 22 18 18Z" fill="hsl(200 85% 55% / 0.5)" />
    <path d="M18 18C22 22 28 28 30 24C32 20 24 16 18 18Z" fill="hsl(24 95% 58% / 0.45)" />
    {/* Body */}
    <ellipse cx="18" cy="18" rx="1.2" ry="5" fill="hsl(220 30% 25%)" />
    {/* Antennae */}
    <path d="M17 13C15 10 14 8 13 7" stroke="hsl(220 30% 25%)" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M19 13C21 10 22 8 23 7" stroke="hsl(220 30% 25%)" strokeWidth="0.7" strokeLinecap="round" />
    <circle cx="13" cy="7" r="0.8" fill="hsl(24 95% 58%)" />
    <circle cx="23" cy="7" r="0.8" fill="hsl(24 95% 58%)" />
  </svg>
);

export const SmallFlowerSVG = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="6" r="3" fill="hsl(350 80% 70% / 0.5)" />
    <circle cx="14" cy="10" r="3" fill="hsl(24 95% 65% / 0.5)" />
    <circle cx="12" cy="15" r="3" fill="hsl(45 100% 65% / 0.5)" />
    <circle cx="8" cy="15" r="3" fill="hsl(200 85% 65% / 0.5)" />
    <circle cx="6" cy="10" r="3" fill="hsl(145 45% 60% / 0.5)" />
    <circle cx="10" cy="10" r="2" fill="hsl(45 100% 60%)" />
  </svg>
);

export const FloatingButterfly = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -15, 5, -10, 0],
      x: [0, 10, -5, 8, 0],
      rotate: [0, 5, -3, 4, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <ButterflySVG size={32} />
  </motion.div>
);

export const FloatingFlower = ({ className = "", delay = 0, size = 24 }: { className?: string; delay?: number; size?: number }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -8, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <FlowerSVG size={size} />
  </motion.div>
);
