import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const About = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          About Me
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={textVariants}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left column - Large Editorial Statement */}
        <div className="md:col-span-5 flex flex-col justify-between text-left">
          <p className="font-display font-light text-2xl sm:text-3xl text-zinc-800 dark:text-zinc-300 leading-tight">
            Bridging the gap between intelligent algorithms and secure infrastructure.
          </p>
          <div className="hidden md:block mt-8 text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            PRINCE PRATAP SINGH &bull; 2026
          </div>
        </div>

        {/* Right column - Main Text Card */}
        <div className="md:col-span-7">
          <GlassCard className="text-left flex flex-col justify-between h-full space-y-6">
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
              I am a Computer Science student passionate about Artificial Intelligence, Machine Learning, Cybersecurity, and building modern web applications.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
              I enjoy solving real-world problems and creating intelligent systems with clean, intuitive user experiences. By combining structured data modeling with secure software architecture, I build applications that are both robust and user-centric.
            </p>
            
            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200/10">
              <div>
                <h4 className="text-xs font-semibold text-primary uppercase tracking-widest">Focus Area</h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">Data Science & AI</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-secondary uppercase tracking-widest">Philosophy</h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">Clean, secure code</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
