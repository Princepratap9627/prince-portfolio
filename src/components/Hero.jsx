import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import Orb3D from './Orb3D';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Right side Orb is shown first on mobile layout for immediate visual hook, but comes second on desktop */}
        <div className="md:col-span-5 md:order-last flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Orb3D />
          </motion.div>
        </div>

        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Badge Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full glass border border-zinc-200/10 text-xs tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold uppercase select-none"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>B.Tech CSE (Data Science)</span>
            <span className="text-zinc-600">&bull;</span>
            <span>AI & ML Enthusiast</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400"
          >
            PRINCE PRATAP
            <br />
            SINGH
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-medium text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-snug"
          >
            Building AI Systems, Cybersecurity Solutions,
            <br className="hidden sm:inline" />
            and Modern Web Applications.
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl font-light leading-relaxed"
          >
            Currently building AI systems, exploring Cybersecurity, and crafting modern digital experiences.
            <span className="block mt-2 font-medium text-zinc-700 dark:text-zinc-300">
              ✨ Always learning. Always building.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
          >
            {/* View Resume Button with magnetic physics */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              onClick={() => scrollToSection('resume')}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100 font-semibold text-sm tracking-wide shadow-xl shadow-primary/10 transition-shadow select-none group cursor-pointer"
            >
              <FileText size={15} className="group-hover:rotate-6 transition-transform" />
              <span>View Resume</span>
            </motion.button>

            {/* View Projects Button with glow outline */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              onClick={() => scrollToSection('projects')}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900/50 font-semibold text-sm tracking-wide select-none group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
