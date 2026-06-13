import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Globe, Wrench } from 'lucide-react';
import GlassCard from './GlassCard';

const Skills = () => {
  const skillsData = [
    {
      category: 'Languages',
      icon: <Code2 className="text-primary" size={20} />,
      glow: 'purple',
      skills: ['Python', 'Java', 'SQL', 'JavaScript'],
    },
    {
      category: 'AI / ML',
      icon: <BrainCircuit className="text-secondary" size={20} />,
      glow: 'cyan',
      skills: ['Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
    },
    {
      category: 'Web Development',
      icon: <Globe className="text-primary" size={20} />,
      glow: 'purple',
      skills: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS'],
    },
    {
      category: 'Tools',
      icon: <Wrench className="text-secondary" size={20} />,
      glow: 'cyan',
      skills: ['MongoDB', 'SQLite', 'Streamlit', 'Git', 'GitHub', 'VS Code'],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  return (
    <section
      id="skills"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          Skills & Tech
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      {/* Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
      >
        {skillsData.map((item, idx) => (
          <motion.div key={idx} variants={cardVariants} className="h-full">
            <GlassCard
              glowColor={item.glow}
              className="flex flex-col h-full glass-card-hover border border-zinc-200/10 dark:border-zinc-800/40 p-6"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/10">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-sm sm:text-base text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
                  {item.category}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="flex flex-col space-y-3.5 mt-auto">
                {item.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 text-sm font-light tracking-wide group"
                  >
                    <span>{skill}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-primary dark:group-hover:bg-secondary transition-colors duration-300" />
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
