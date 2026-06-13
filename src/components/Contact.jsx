import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Send } from 'lucide-react';
import GlassCard from './GlassCard';

// Custom GitHub Icon compatible with Lucide specs
const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom LinkedIn Icon compatible with Lucide specs
const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom Instagram Icon compatible with Lucide specs
const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'princepratap9627@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={22} />,
      url: 'https://github.com/Princepratap9627',
      glow: 'purple',
      username: '@Princepratap9627',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={22} />,
      url: 'https://linkedin.com/in/prince-pratap-singh-48892a340',
      glow: 'cyan',
      username: 'Prince Pratap Singh',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={22} />,
      url: 'https://instagram.com/prince.pratap_',
      glow: 'purple',
      username: '@prince.pratap_',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto pb-32"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          Get in Touch
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch text-left">
        
        {/* LEFT SIDE: One large Email card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7"
        >
          <GlassCard
            glowColor="purple"
            className="flex flex-col justify-between h-full p-8 md:p-10 border border-zinc-200/10 dark:border-zinc-800/40 relative overflow-hidden group"
          >
            {/* Ambient soft blue-purple gradient glow backdrop */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-secondary/35 via-primary/25 to-transparent rounded-full blur-[65px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="space-y-6 relative z-10">
              {/* Larger animated email icon container */}
              <div className="relative p-4 rounded-2xl bg-zinc-100/50 dark:bg-zinc-800/30 border border-zinc-200/5 dark:border-zinc-800/20 w-fit text-primary dark:text-secondary shadow-lg shadow-primary/5 flex items-center justify-center">
                {/* Glowing ripple background */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 dark:bg-secondary/5 animate-ping duration-[3000ms]" />
                <Mail size={32} className="relative z-10 animate-pulse duration-[2000ms]" />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight leading-tight">
                  Let's Build Something
                  <br />
                  Amazing Together.
                </h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                  I am always open to discussing AI, Cybersecurity, Machine Learning and innovative web applications.
                </p>
              </div>

              {/* Send Email Action Button */}
              <div className="pt-2">
                <motion.a
                  href={`mailto:${emailAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-primary/20 hover:shadow-primary/45 transition-shadow duration-300 cursor-pointer"
                >
                  <span>Send Email</span>
                  <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>

            {/* Premium Copy Email Bar */}
            <div className="mt-8 pt-6 border-t border-zinc-200/10 relative z-10">
              <label className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2.5">
                Direct Email
              </label>
              
              <div className="flex items-center justify-between p-1.5 rounded-2xl bg-zinc-200/40 dark:bg-zinc-950/60 border border-zinc-200/10">
                <span className="text-xs md:text-sm font-medium font-mono text-zinc-800 dark:text-zinc-300 pl-3.5 truncate">
                  {emailAddress}
                </span>

                {/* Copy Button */}
                <button
                  onClick={handleCopyEmail}
                  className="relative flex items-center justify-center p-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer shadow-md select-none"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="copied"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center space-x-1 text-[11px] font-semibold tracking-wider uppercase px-1"
                      >
                        <Check size={14} />
                        <span className="hidden sm:inline">Copied</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center space-x-1 text-[11px] font-semibold tracking-wider uppercase px-1"
                      >
                        <Copy size={14} />
                        <span className="hidden sm:inline">Copy</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* RIGHT SIDE: GitHub, LinkedIn, Instagram cards */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          {socialLinks.map((social, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="flex-1"
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer select-none"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="h-full"
                >
                  <GlassCard
                    glowColor={social.glow}
                    className="h-full flex flex-col justify-between p-7 border border-zinc-200/10 dark:border-zinc-800/40 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/10 text-zinc-800 dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
                        {social.icon}
                      </div>
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors uppercase">
                        Follow
                      </span>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-display font-bold text-base text-zinc-900 dark:text-white">
                        {social.name}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-1">
                        {social.username}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center mt-20 text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Prince Pratap Singh &bull; Created with React & Tailwind
      </div>
    </section>
  );
};

export default Contact;
