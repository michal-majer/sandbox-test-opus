"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FloatingBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-8"
  >
    <motion.span
      className="w-2 h-2 bg-cyan-400 rounded-full"
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span className="text-sm font-medium text-cyan-400">Nowa generacja AI dla SAP</span>
  </motion.div>
);

const AnimatedTitle = () => {
  const words = ["Transformuj", "swój", "SAP", "z", "AI", "Agents"];

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.4 + index * 0.1,
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className={`inline-block mr-4 ${
            word === "AI" || word === "Agents"
              ? "gradient-text"
              : word === "SAP"
              ? "text-cyan-400"
              : "text-white"
          }`}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

const AnimatedSubtitle = () => (
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
  >
    Pobierz <span className="text-white font-semibold">3 inteligentne agenty</span> do 
    CAP, Fiori i Fiori Elements. Przyspiesz development,{" "}
    <span className="text-cyan-400">zautomatyzuj powtarzalne zadania</span> i buduj 
    aplikacje SAP szybciej niż kiedykolwiek.
  </motion.p>
);

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center gap-2 text-gray-500"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <motion.div className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-2">
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
        />
      </motion.div>
    </motion.div>
  </motion.div>
);

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
    >
      <FloatingBadge />
      <AnimatedTitle />
      <AnimatedSubtitle />

      {/* CTA Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.a
          href="#download"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg btn-premium relative overflow-hidden group"
        >
          <span className="relative z-10">Pobierz Agenty</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>

        <motion.a
          href="#agents"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 glass rounded-full font-semibold text-lg border border-white/10 hover:border-cyan-500/30 transition-colors"
        >
          Zobacz Agentów →
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-20 flex flex-wrap justify-center gap-12 text-center"
      >
        {[
          { value: "3", label: "AI Agents" },
          { value: "10x", label: "Szybszy Dev" },
          { value: "∞", label: "Możliwości" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + index * 0.1 }}
            className="group"
          >
            <div className="text-4xl md:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ScrollIndicator />
    </motion.section>
  );
}

