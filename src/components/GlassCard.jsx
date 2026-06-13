import React from 'react';

const GlassCard = ({ children, className = '', hoverable = true, glowColor = '' }) => {
  const hoverStyles = hoverable ? 'glass-card-hover' : '';
  const customGlow = glowColor === 'purple' ? 'glow-purple' : glowColor === 'cyan' ? 'glow-cyan' : '';

  return (
    <div
      className={`glass dark:glass bg-zinc-100/10 dark:bg-[#111111]/45 border-zinc-200/10 dark:border-zinc-800/40 text-zinc-950 dark:text-zinc-50 rounded-2xl p-6 transition-all duration-500 overflow-hidden ${hoverStyles} ${customGlow} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
