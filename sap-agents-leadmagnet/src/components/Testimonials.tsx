"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Te agenty kompletnie zmieniły mój sposób pracy z SAP. Co zajmowało mi dzień, teraz robię w godzinę.",
    author: "Marcin K.",
    role: "Senior SAP Developer",
    company: "Enterprise Solutions",
    avatar: "MK",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    quote:
      "CAP Agent to game changer. Automatycznie generuje modele CDS z dokumentacji i best practices.",
    author: "Anna W.",
    role: "Tech Lead",
    company: "SAP Partner",
    avatar: "AW",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "Fiori Elements Agent zaoszczędził nam setki godzin przy budowaniu List Reports i Object Pages.",
    author: "Tomasz S.",
    role: "Fiori Architect",
    company: "Global Consulting",
    avatar: "TS",
    gradient: "from-orange-500 to-red-500",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-8 rounded-2xl glass border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
    >
      {/* Quote icon */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-cyan-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Content */}
      <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 mt-4">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center font-bold text-white text-sm`}
        >
          {testimonial.avatar}
        </motion.div>
        <div>
          <div className="font-semibold text-white">{testimonial.author}</div>
          <div className="text-sm text-gray-500">
            {testimonial.role} @ {testimonial.company}
          </div>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="opinie" className="relative py-32 px-6 overflow-hidden">
      {/* Floating decoration */}
      <motion.div
        style={{ x }}
        className="absolute top-20 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 mb-6"
          >
            Opinie developerów
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Zaufali nam </span>
            <span className="gradient-text">eksperci SAP</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Dołącz do społeczności developerów, którzy już transformują swój workflow
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl glass border border-white/5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Aktywnych użytkowników" },
              { value: "10K+", label: "Wygenerowanych plików" },
              { value: "98%", label: "Zadowolonych" },
              { value: "24/7", label: "Dostępność" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

