import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ShieldCheck, X, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';

const Certificates = () => {
  const [activeId, setActiveId] = useState(null);

  const certificatesData = [
    {
      id: 'cert-1',
      title: 'Machine Learning Specialization',
      issuer: 'Stanford Online & DeepLearning.AI',
      date: 'Dec 2024',
      credId: 'ML-99281-SDAI',
      glow: 'purple',
      details: 'Comprehensive 3-course curriculum covering Supervised Learning (Linear Regression, Logistic Regression, Neural Networks), Unsupervised Learning (Clustering, PCA, Anomaly Detection), and Recommender Systems / Reinforcement Learning.'
    },
    {
      id: 'cert-2',
      title: 'Google Cybersecurity Professional',
      issuer: 'Google Career Certificates',
      date: 'May 2025',
      credId: 'SEC-GGL-8472-SEC',
      glow: 'cyan',
      details: 'Focuses on security fundamentals, network security audits, vulnerability scanning using tools like Wireshark and tcpdump, security intelligence systems (SIEM), and Python coding for security automation.'
    },
    {
      id: 'cert-3',
      title: 'Data Science & Analytics Professional',
      issuer: 'IBM',
      date: 'Mar 2025',
      credId: 'DS-IBM-7492-ANL',
      glow: 'purple',
      details: 'In-depth training in Python data science libraries (Pandas, NumPy, Matplotlib, Seaborn), SQL database querying, data cleansing architectures, and dashboard construction.'
    },
    {
      id: 'cert-4',
      title: 'Neural Networks & Deep Learning',
      issuer: 'DeepLearning.AI',
      date: 'Feb 2025',
      credId: 'DL-AI-3948-NN',
      glow: 'cyan',
      details: 'Theoretical foundations and practical implementation of Deep Neural Networks, backpropagation algorithms, vectorization, hyperparameter tuning, and regularization techniques.'
    }
  ];

  const currentCert = certificatesData.find((c) => c.id === activeId);

  return (
    <section
      id="certificates"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          Certifications
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      {/* Grid Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {certificatesData.map((cert) => (
          <motion.div
            key={cert.id}
            layoutId={`card-container-${cert.id}`}
            onClick={() => setActiveId(cert.id)}
            className="cursor-pointer group h-full"
          >
            <GlassCard
              glowColor={cert.glow}
              className="h-full flex flex-col justify-between p-8 border border-zinc-200/10 dark:border-zinc-800/40 glass-card-hover"
            >
              <div>
                {/* Header Icon + Date */}
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/10 text-primary dark:text-secondary">
                    <Award size={22} />
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    <Calendar size={13} />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Info */}
                <motion.h3 
                  layoutId={`title-${cert.id}`}
                  className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300"
                >
                  {cert.title}
                </motion.h3>
                <motion.p 
                  layoutId={`issuer-${cert.id}`}
                  className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase"
                >
                  {cert.issuer}
                </motion.p>
              </div>

              {/* Decorative Visual Certificate Seals */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-zinc-200/10 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                <span className="truncate max-w-[150px]">ID: {cert.credId}</span>
                <span className="text-primary dark:text-secondary group-hover:underline flex items-center gap-1 select-none">
                  <span>View Details</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Apple Photos inspired Fullscreen Modal */}
      <AnimatePresence>
        {activeId && currentCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Expanded Content Card */}
            <motion.div
              layoutId={`card-container-${currentCert.id}`}
              className="relative w-full max-w-2xl bg-[#0F0F11] border border-zinc-800/80 rounded-3xl p-6 md:p-10 shadow-2xl text-left overflow-hidden z-10"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center space-x-2.5 text-xs text-secondary font-mono uppercase tracking-widest">
                  <ShieldCheck size={16} />
                  <span>Verified Credential</span>
                </div>

                {/* Typography details */}
                <div>
                  <motion.h3
                    layoutId={`title-${currentCert.id}`}
                    className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight"
                  >
                    {currentCert.title}
                  </motion.h3>
                  
                  <motion.p
                    layoutId={`issuer-${currentCert.id}`}
                    className="text-sm text-zinc-400 font-medium tracking-wide uppercase mt-1.5"
                  >
                    {currentCert.issuer}
                  </motion.p>
                </div>

                {/* Custom CSS Vector Certificate Preview Box */}
                <div className="w-full bg-[#09090B] border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center text-center space-y-4 relative overflow-hidden select-none border-t-2 border-t-primary/30">
                  {/* Subtle seal background pattern */}
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-5">
                    <Award size={180} className="text-white" />
                  </div>

                  <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">
                    Certificate of Completion
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-white font-light text-base md:text-lg">
                      Prince Pratap Singh
                    </div>
                    <div className="text-[10px] font-light text-zinc-500">
                      has successfully fulfilled all requirements to be awarded the title of
                    </div>
                    <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-wider">
                      {currentCert.title}
                    </div>
                  </div>

                  {/* Seals & Signatures mock */}
                  <div className="flex justify-between items-end w-full pt-4 border-t border-zinc-900 text-[9px] font-mono text-zinc-500">
                    <div className="flex flex-col items-start">
                      <span className="text-zinc-600">ISSUED</span>
                      <span className="text-zinc-400 uppercase">{currentCert.date}</span>
                    </div>
                    
                    {/* Golden Circle seal */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/25 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 animate-spin-slow">
                      <Award size={16} />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-zinc-600">CREDENTIAL ID</span>
                      <span className="text-zinc-400">{currentCert.credId}</span>
                    </div>
                  </div>
                </div>

                {/* Description details */}
                <p className="text-xs md:text-sm font-light text-zinc-400 leading-relaxed pt-2">
                  {currentCert.details}
                </p>

                {/* Back to grid */}
                <button
                  onClick={() => setActiveId(null)}
                  className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
