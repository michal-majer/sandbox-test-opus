"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Orb = ({
  color,
  size,
  initialX,
  initialY,
  delay,
}: {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30"
      style={{
        background: color,
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, 100, -50, 80, 0],
        y: [0, -80, 60, -40, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 25 + delay * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

const GridLine = ({ index, isVertical }: { index: number; isVertical: boolean }) => {
  return (
    <motion.div
      className={`absolute ${isVertical ? "w-px h-full" : "h-px w-full"}`}
      style={{
        background: `linear-gradient(${isVertical ? "180deg" : "90deg"}, transparent, rgba(255,255,255,0.03), transparent)`,
        [isVertical ? "left" : "top"]: `${(index + 1) * 10}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 1 }}
    />
  );
};

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      {/* Animated grid */}
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <GridLine key={`v-${i}`} index={i} isVertical />
        ))}
        {[...Array(9)].map((_, i) => (
          <GridLine key={`h-${i}`} index={i} isVertical={false} />
        ))}
      </div>

      {/* Floating orbs */}
      <Orb color="radial-gradient(circle, #00d4ff 0%, transparent 70%)" size={600} initialX={10} initialY={20} delay={0} />
      <Orb color="radial-gradient(circle, #7c3aed 0%, transparent 70%)" size={500} initialX={70} initialY={60} delay={2} />
      <Orb color="radial-gradient(circle, #f97316 0%, transparent 70%)" size={400} initialX={50} initialY={10} delay={4} />
      <Orb color="radial-gradient(circle, #00d4ff 0%, transparent 70%)" size={350} initialX={80} initialY={80} delay={1} />
      <Orb color="radial-gradient(circle, #7c3aed 0%, transparent 70%)" size={450} initialX={20} initialY={70} delay={3} />

      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 60%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Animated stars/particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

