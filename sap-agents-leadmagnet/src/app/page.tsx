"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import {
  AnimatedBackground,
  Navbar,
  HeroSection,
  AgentsSection,
  FeaturesSection,
  Testimonials,
  EmailForm,
  Footer,
} from "@/components";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Animated background */}
      <AnimatedBackground />

      {/* Main content */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <AgentsSection />
        <FeaturesSection />
        <Testimonials />
        <EmailForm />
        <Footer />
      </main>
    </>
  );
}
