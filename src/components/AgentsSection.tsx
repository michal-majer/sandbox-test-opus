"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AgentCard from "./AgentCard";

const CAPIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const FioriIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const FioriElementsIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const agents = [
  {
    name: "CAP Agent",
    description:
      "Inteligentny asystent do SAP Cloud Application Programming Model. Generuje modele, serwisy i konfiguracje.",
    icon: <CAPIcon />,
    features: [
      "Generowanie modeli CDS",
      "Automatyczne serwisy OData",
      "Integracja z bazami danych",
      "Best practices z dokumentacji",
    ],
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    glowColor: "rgba(0, 212, 255, 0.3)",
  },
  {
    name: "Fiori Agent",
    description:
      "Twój ekspert od SAP Fiori. Tworzy UI5 komponenty, widoki i kontrolery z perfekcyjną architekturą.",
    icon: <FioriIcon />,
    features: [
      "Komponenty SAPUI5",
      "MVC architecture",
      "Responsywne layouty",
      "OData binding",
    ],
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    name: "Fiori Elements Agent",
    description:
      "Specjalista od annotation-driven UI. Buduje List Reports, Object Pages i Analytical Apps w mgnieniu oka.",
    icon: <FioriElementsIcon />,
    features: [
      "CDS Annotations",
      "List Report & Object Page",
      "Analytical List Page",
      "Draft handling",
    ],
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    glowColor: "rgba(249, 115, 22, 0.3)",
  },
];

export default function AgentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="agents"
      className="relative py-32 px-6"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 mb-6"
          >
            Poznaj Agentów
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Trzy potężne </span>
            <span className="gradient-text">AI Agents</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Każdy agent to wyspecjalizowany ekspert w swojej dziedzinie SAP,
            gotowy do pracy 24/7.
          </p>
        </motion.div>
      </div>

      {/* Floating decoration */}
      <motion.div
        style={{ y }}
        className="absolute left-10 top-40 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute right-10 bottom-40 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
      />

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.name}
              {...agent}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
      />
    </section>
  );
}

