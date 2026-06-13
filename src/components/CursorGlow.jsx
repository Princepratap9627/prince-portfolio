import React, { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ targetX: -100, targetY: -100, currentX: -100, currentY: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable cursor glow on devices with pointer capability (no touchscreens)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let frameId;
    const update = () => {
      const mouse = mouseRef.current;
      
      // Interpolate trailing ring position (Inertia/Spring)
      if (mouse.currentX === -100) {
        mouse.currentX = mouse.targetX;
        mouse.currentY = mouse.targetY;
      } else {
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.12;
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.12;
      }

      // Update style translations directly on elements to prevent react re-renders
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.targetX}px, ${mouse.targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.currentX}px, ${mouse.currentY}px, 0)`;
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Inner solid laser pointer dot (instant) */}
      <div
        ref={dotRef}
        className="hidden dark:block pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-secondary z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      />
      {/* 2. Outer trailing glass-halo ring (lagging inertia) */}
      <div
        ref={ringRef}
        className="hidden dark:block pointer-events-none fixed top-0 left-0 w-12 h-12 rounded-full border border-primary/25 bg-primary/5 blur-[2px] z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
      />
    </>
  );
};

export default CursorGlow;
