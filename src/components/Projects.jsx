import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Bot, Shield, TrendingDown } from 'lucide-react';
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


// Interactive Tilt Container wrapper using React mouse listeners
const TiltCard = ({ children, className = '', glowColor = '' }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (clamp max rotation to ~10 degrees)
    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 10;

    setCoords({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="h-full"
    >
      <GlassCard glowColor={glowColor} className={`h-full flex flex-col justify-between p-8 border border-zinc-200/10 dark:border-zinc-800/40 ${className}`}>
        {children}
      </GlassCard>
    </div>
  );
};

const Projects = () => {
  const projectsData = [
    {
      title: 'Employee Attrition Prediction System',
      status: 'LIVE',
      description: 'Machine Learning based employee attrition prediction system utilizing the IBM HR Analytics dataset and Random Forest model with an interactive analytics dashboard.',
      tech: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
      liveUrl: 'https://employee-attrition-risk-analysis-edqv.onrender.com/',
      githubUrl: 'https://github.com/Princepratap9627',
      glow: 'purple',
      icon: <TrendingDown className="text-primary" size={22} />,
      badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      // Visual mock: Miniature Attrition risk chart / line representation
      visual: (
        <div className="w-full h-32 bg-zinc-950/40 dark:bg-black/40 rounded-xl p-4 flex flex-col justify-between border border-zinc-200/5 dark:border-zinc-800/30 overflow-hidden text-[10px] font-mono text-zinc-400">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span>MODEL METRICS</span>
            <span className="text-primary font-bold">ACCURACY: 91.4%</span>
          </div>
          <div className="flex items-end justify-between h-14 pt-2">
            {[35, 48, 25, 62, 50, 75, 40, 85, 30, 45, 60, 52].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-1">
                <div 
                  className="w-2.5 bg-gradient-to-t from-primary/50 to-secondary rounded-t-sm"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] text-zinc-600">
            <span>DEPT_HR</span>
            <span>DEPT_ENG</span>
            <span>DEPT_SALES</span>
          </div>
        </div>
      )
    },
    {
      title: 'RAKSHAK – Enterprise EDR Platform',
      status: 'UNDER DEVELOPMENT',
      description: 'Enterprise Endpoint Detection and Response (EDR) platform designed as a SOC dashboard for threat logging, intrusion detection, and real-time host telemetry auditing.',
      tech: ['Python', 'Flask', 'SQLite', 'Scapy', 'JavaScript'],
      githubUrl: 'https://github.com/Princepratap9627',
      glow: 'cyan',
      icon: <Shield className="text-secondary" size={22} />,
      badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse',
      // Visual mock: Terminal log lines
      visual: (
        <div className="w-full h-32 bg-zinc-950/70 dark:bg-black/60 rounded-xl p-4 flex flex-col border border-zinc-200/5 dark:border-zinc-800/30 overflow-hidden text-[9px] font-mono text-left space-y-1 select-none">
          <div className="flex items-center space-x-1.5 text-zinc-500 border-b border-zinc-900 pb-1 mb-1.5">
            <Terminal size={10} />
            <span>RAKSHAK_AGENT v0.1.2 - MONITORING</span>
          </div>
          <div className="text-emerald-500/80">[OK] Process monitoring thread initialized.</div>
          <div className="text-zinc-400">[INF] Scanning kernel objects for hooks...</div>
          <div className="text-zinc-500">[INF] File system integrity: 100% matched</div>
          <div className="text-red-400/90 animate-pulse">[WRN] PID: 4092 attempting unsigned Registry write. Blocked.</div>
        </div>
      )
    },
    {
      title: 'PrepWise AI',
      status: 'IN PROGRESS',
      description: 'AI-powered platform generating technical mock interview questionnaires, dynamic resume skill extraction, and personalized DSA progress trackers.',
      tech: ['React.js', 'Node.js', 'MongoDB', 'JavaScript'],
      githubUrl: 'https://github.com/Princepratap9627',
      glow: 'purple',
      icon: <Bot className="text-primary" size={22} />,
      badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      // Visual mock: Chat interface
      visual: (
        <div className="w-full h-32 bg-zinc-950/40 dark:bg-black/40 rounded-xl p-4 flex flex-col justify-between border border-zinc-200/5 dark:border-zinc-800/30 overflow-hidden text-[9px] font-mono text-left select-none">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <span className="text-secondary font-bold uppercase tracking-wider">AI Coach Panel</span>
            <span className="text-zinc-600">SESSION Active</span>
          </div>
          <div className="flex flex-col space-y-2 py-2.5">
            <div className="self-start bg-zinc-800/60 dark:bg-zinc-900/60 rounded-lg p-2 max-w-[85%] text-zinc-300">
              Q: Explain the time complexity of QuickSort.
            </div>
            <div className="self-end bg-primary/20 rounded-lg p-2 max-w-[85%] text-zinc-200 border border-primary/20">
              A: Average is O(N log N). Worst case is O(N²)...
            </div>
          </div>
        </div>
      )
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          Featured Projects
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
      >
        {projectsData.map((project, idx) => (
          <motion.div key={idx} variants={cardReveal}>
            <TiltCard glowColor={project.glow}>
              <div>
                {/* Header Icon + Status */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/10">
                    {project.icon}
                  </div>
                  <span className={`text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${project.badgeColor}`}>
                    {project.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-white mb-3 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed min-h-[72px]">
                  {project.description}
                </p>

                {/* Interactive visual module */}
                <div className="mb-6">
                  {project.visual}
                </div>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200/5 text-zinc-500 dark:text-zinc-400 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-3 border-t border-zinc-200/10">
                  {project.status === 'LIVE' && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-900 dark:text-white hover:text-primary dark:hover:text-secondary transition-colors group cursor-pointer"
                    >
                      <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group cursor-pointer ${
                        project.status === 'LIVE' ? 'ml-auto' : ''
                      }`}
                    >
                      <Github size={14} className="group-hover:rotate-12 transition-transform" />
                      <span>GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
