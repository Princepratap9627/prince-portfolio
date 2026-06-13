import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Give time for exit animation to complete (approx 500ms)
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(exitTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090B] text-white select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] animate-pulse" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] translate-x-12 translate-y-12 animate-pulse" />

          <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-4">
            {/* Logo Name Display */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl md:text-5xl font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              PRINCE PRATAP SINGH
            </motion.h1>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex items-center space-x-2 text-zinc-400 text-xs md:text-sm font-light tracking-[0.15em] uppercase"
            >
              <span>Initializing Experience</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
            </motion.div>

            {/* Loading progress visual line */}
            <div className="w-48 h-[1px] bg-zinc-800 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-primary to-secondary"
              />
            </div>

            {/* Fields list */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs md:text-sm tracking-[0.3em] font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary via-zinc-300 to-secondary uppercase mt-2"
            >
              AI &bull; Cybersecurity &bull; Modern Web
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
