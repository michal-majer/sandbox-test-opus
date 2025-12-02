"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

interface AgentCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  glowColor: string;
  delay: number;
}

export default function AgentCard({
  name,
  description,
  icon,
  features,
  gradient,
  glowColor,
  delay,
}: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: glowColor }}
      />

      {/* Card */}
      <div className="relative h-full p-8 rounded-3xl glass-strong border border-white/10 group-hover:border-white/20 transition-all duration-500 overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor.replace("0.3", "0.5")}, transparent)`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mb-6 shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
            {name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.1 * index }}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <motion.span
                  className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <svg
                    className="w-3 h-3 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Hover indicator */}
          <motion.div
            className="mt-8 flex items-center gap-2 text-sm font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span>Dołączony do pakietu</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className={`absolute inset-0 ${gradient} blur-3xl`} />
        </div>
      </div>
    </motion.div>
  );
}

