import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Resume', id: 'resume' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ];

  // Track scrolling to toggle styling and check active section
  useEffect(() => {
    const handleScroll = () => {
      // Style toggle
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
      setActiveSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled
            ? 'glass shadow-lg dark:shadow-black/40 border-zinc-200/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Name / Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-display font-bold tracking-[0.15em] text-sm text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
        >
          PRINCE
        </a>

        {/* Desktop Links (Linear / Raycast Dock Style) */}
        <div className="hidden md:flex items-center space-x-1 glass/5 py-1 px-1.5 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`relative px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/80 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons (Theme Toggle + Mobile Menu Trigger) */}
        <div className="flex items-center space-x-3">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-200/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-zinc-200/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Arc Browser Pill Overlay style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-4 right-4 z-40 glass rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 border border-zinc-200/10 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide uppercase transition-all ${
                    activeSection === link.id
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
