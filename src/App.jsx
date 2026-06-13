import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import MeshBackground from './components/MeshBackground';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. Loading Splash Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* 2. Main Site Contents (Revealed after loading completes) */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen text-zinc-900 dark:text-zinc-50 font-sans"
          >
            {/* Ambient Background Grid & Floating Mesh Blobs */}
            <MeshBackground />

            {/* Custom trailing laser pointer cursor in dark mode */}
            <CursorGlow />

            {/* Floating Navigation Dock */}
            <Navbar />

            {/* Page layout wrapper */}
            <main className="relative z-10 w-full flex flex-col items-center">
              {/* Sections Container */}
              <div className="w-full">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Resume />
                <Certificates />
                <Contact />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
